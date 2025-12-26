const { app, BrowserWindow, Menu, Tray, nativeTheme } = require('electron')
const path = require('path')
const { spawn } = require('child_process');

const isDev = !app.isPackaged;

let tray = null;
let mainWindow = null;
let backendProcess = null;
let frontendProcess = null;
const kill = require('tree-kill');
const { exec } = require('child_process');

function killOrphanedProcesses() {
  return new Promise((resolve) => {
    console.log('🔍 Checking for orphaned processes...');
    
    exec('netstat -ano | findstr :3000', (err, stdout) => {
      if (stdout) {
        const lines = stdout.trim().split('\n');
        lines.forEach(line => {
          const pid = line.trim().split(/\s+/).pop();
          if (pid && !isNaN(pid)) {
            console.log(`Killing orphaned process on port 3000 (PID ${pid})`);
            exec(`taskkill /PID ${pid} /T /F`);
          }
        });
      }
    });
    
    exec('netstat -ano | findstr :5000', (err, stdout) => {
      if (stdout) {
        const lines = stdout.trim().split('\n');
        lines.forEach(line => {
          const pid = line.trim().split(/\s+/).pop();
          if (pid && !isNaN(pid)) {
            console.log(`Killing orphaned process on port 5000 (PID ${pid})`);
            exec(`taskkill /PID ${pid} /T /F`);
          }
        });
      }
    });
    
    setTimeout(resolve, 2000);
  });
}



function startFrontend() {
  if (frontendProcess) return;

  console.log('🚀 Starting frontend...');

  frontendProcess = spawn(
    'npm',
    ['run', 'start'],
    {
      cwd: path.join(__dirname), // client folder (where package.json lives)
      shell: true,
    }
  );

  frontendProcess.stdout.on('data', (data) => {
    console.log(`[frontend]: ${data}`);
  });

  frontendProcess.stderr.on('data', (data) => {
    console.error(`[frontend error]: ${data}`);
  });

  frontendProcess.on('close', (code) => {
    console.log(`🛑 Frontend exited with code ${code}`);
    frontendProcess = null;
  });
}

function startBackend() {
  if (backendProcess) return;

  console.log('🚀 Starting backend...');

  backendProcess = spawn(
    'dotnet',
    ['run'],
    {
      cwd: path.join(__dirname, '..'), // root where .csproj lives
      shell: true,
    }
  );

  backendProcess.stdout.on('data', (data) => {
    console.log(`[backend]: ${data}`);
  });

  backendProcess.stderr.on('data', (data) => {
    console.error(`[backend error]: ${data}`);
  });

  backendProcess.on('close', (code) => {
    console.log(`🛑 Backend exited with code ${code}`);
    backendProcess = null;
  });
}

function stopProcesses() {
  return new Promise((resolve) => {
    let pending = 0;
    
    if (frontendProcess?.pid) {
      pending++;
      console.log(`🧨 Killing frontend (PID ${frontendProcess.pid})`);
      kill(frontendProcess.pid, (err) => {
        if (err) console.error('Frontend kill error:', err);
        if (--pending === 0) resolve();
      });
      frontendProcess = null;
    }

    if (backendProcess?.pid) {
      pending++;
      console.log(`🧨 Killing backend (PID ${backendProcess.pid})`);
      kill(backendProcess.pid, (err) => {
        if (err) console.error('Backend kill error:', err);
        if (--pending === 0) resolve();
      });
      backendProcess = null;
    }

    if (pending === 0) resolve();
  });
}


function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'assets', 'logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  })



  if (isDev) {
    // Dev: Next.js dev server
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
    // Prod: Next.js build
    mainWindow.loadURL("http://localhost:3000");

    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  }

  const iconPath = path.join(__dirname, 'assets', 'logo.png');

  tray = new Tray(iconPath);

  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        mainWindow.show();
      }
    },
    {
      label: 'Quit',
      click: () => {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('Clumsy Apparel');
  tray.setContextMenu(trayMenu);

  const template = [
    {
      label: "File",
      submenu: [{ role: "quit" }]
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" }, { role: "redo" }, { type: "separator" },
        { role: "cut" }, { role: "copy" }, { role: "paste" },
        { role: "selectAll" }
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetzoom" },
        { role: "zoomin" },
        { role: "zoomout" },
        { type: "separator" },
        { role: "togglefullscreen" },
        { type: "separator" },
        {
          label: "Toggle Dark Mode",
          click: () => {
            nativeTheme.themeSource =
              nativeTheme.themeSource === "dark" ? "light" : "dark";

            mainWindow.webContents.send(
              "theme-updated",
              nativeTheme.shouldUseDarkColors
            );
          },
        },
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Learn More",
          click: () => require("electron").shell.openExternal("https://electronjs.org")
        }
      ]
    }
  ];

  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  tray.on('click', () => {
    mainWindow.isVisible()
      ? mainWindow.hide()
      : mainWindow.show();
  });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(async () => {
  await killOrphanedProcesses();
  startBackend();
  startFrontend();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  // Intentionally empty — app lives in tray
});

let isQuitting = false;

app.on('before-quit', async (e) => {
  if (isQuitting) return;
  e.preventDefault();
  isQuitting = true;
  console.log('🧹 Cleaning up child processes...');
  await stopProcesses();
  app.exit();
});

app.on('will-quit', async () => {
  await stopProcesses();
});
process.on('SIGINT', async () => {
  await stopProcesses();
  process.exit();
});

process.on('SIGTERM', async () => {
  await stopProcesses();
  process.exit();
});