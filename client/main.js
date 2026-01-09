const { app, BrowserWindow, Menu, Tray, nativeTheme, dialog} = require('electron')
const path = require('path')
const { spawn } = require('child_process');
const http = require('http');

const isDev = !app.isPackaged;

const gotTheLock = app.requestSingleInstanceLock();
const { exec } = require('child_process');

let tray = null;
let mainWindow = null;
let backendProcess = null;

const fetch = require('node-fetch');


if (!gotTheLock) {
  console.log('🚫 Another instance is already running. Exiting...');
  app.quit();
  process.exit(0);
}


function getBackendCommand() {
  if (isDev) {
    return {
      command: 'dotnet',
      args: ['run'],
      cwd: path.join(__dirname, '..'), // project root
    };
  }
  const backendPath = path.join(process.resourcesPath, 'backend');

  return {
    command: path.join(backendPath, 'clumsyapparel.exe'),
    args: [],
    cwd: backendPath,
  };
}

function startFrontend() {
  console.log('🚀 Starting frontend...');
  frontendProcess = spawn('npm', ['run', 'dev'], {
    cwd: __dirname,
    shell: true,
  });

  frontendProcess.stdout.on('data', (data) => {
    console.log(`[frontend]: ${data.toString()}`);
  });

  frontendProcess.stderr.on('data', (data) => {
    console.error(`[frontend error]: ${data.toString()}`);
  });

  frontendProcess.on('close', (code) => {
    console.log(`🛑 Frontend exited with code ${code}`);
    frontendProcess = null;
  });
}

function startBackend() {
  if (backendProcess) return;

  const { command, args, cwd } = getBackendCommand();

  console.log('🚀 Starting backend...');

  backendProcess = spawn(command, args, {
    cwd,
    shell: isDev,
  });

  backendProcess.stdout.on('data', (data) => {
    console.log(`[backend]: ${data}`);
  });

  backendProcess.stderr.on('data', (data) => {
    console.error(`[backend error]: ${data}`);
  });

  backendProcess.on('close', (code) => {
    console.log(`🛑 Backend exited with code ${code}`);
    backendProcess = null;

    if (code !== 0 && code !== null) {
      dialog.showErrorBox(
        'Application Error',
        `The backend service stopped unexpectedly (code ${code}).\n\nPlease restart the application. If the problem persists, contact support.`
      );
      app.quit();
    }
  });
}

function stopProcesses() {
  return new Promise((resolve) => {
    console.log('🧨 Killing processes on ports...');

    exec('netstat -ano | findstr :3000', (err, stdout) => {
      if (stdout) {
        stdout.trim().split('\n').forEach(line => {
          const pid = line.trim().split(/\s+/).pop();
          if (pid && !isNaN(pid)) exec(`taskkill /PID ${pid} /T /F`);
        });
      }
    });

    exec('netstat -ano | findstr :5000', (err, stdout) => {
      if (stdout) {
        stdout.trim().split('\n').forEach(line => {
          const pid = line.trim().split(/\s+/).pop();
          if (pid && !isNaN(pid)) exec(`taskkill /PID ${pid} /T /F`);
        });
      }
    });

    setTimeout(resolve, 1500);
  });
}

async function waitForBackend(
  url = "http://localhost:5000/health",
  retries = 30,
  delay = 500
) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await new Promise((resolve) => {
        http.get(url, (res) => {
          resolve(res.statusCode === 200);
        }).on('error', () => {
          resolve(false);
        });
      });

      if (result) {
        console.log("✅ Backend is healthy");
        return;
      }
    } catch (err) {
      // backend not ready yet
    }

    console.log(`⏳ Waiting for backend... (${i + 1}/${retries})`);
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  throw new Error("❌ Backend did not become healthy in time");
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



  mainWindow.loadURL(isDev ? "http://localhost:3000" : "http://localhost:5000");

  tray = new Tray(path.join(__dirname, 'assets', 'logo.png'));
  tray.setToolTip('Clumsy Apparel');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Show App', click: () => mainWindow.show() },
    { label: 'Quit', click: () => { app.isQuiting = true; app.quit(); } }
  ]));



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
  try {
    startBackend();
    await waitForBackend();
    if (isDev) startFrontend();
    createWindow();
  } catch (err) {
    console.error(err);

    dialog.showErrorBox(
      'Startup Failed',
      'The application failed to start.\n\n' +
      'Error: ' + err.message + '\n\n' +
      'Please try:\n' +
      '1. Restarting the application\n' +
      '2. Checking if another instance is running\n' +
      '3. Contacting support if the issue persists'
    );

    app.quit();
  }

  app.on('second-instance', () => {
    console.log('🔁 Second instance detected');

    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.show();
      mainWindow.focus();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => { });

let isQuitting = false;

app.on('before-quit', async (e) => {
  if (isQuitting) return;
  e.preventDefault();
  isQuitting = true;
  await stopProcesses();
  app.exit();
});

process.on('SIGINT', async () => {
  await stopProcesses();
  setTimeout(() => process.exit(), 500);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  dialog.showErrorBox(
    'Unexpected Error',
    'An unexpected error occurred:\n\n' + error.message
  );
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
  dialog.showErrorBox(
    'Unexpected Error',
    'An unexpected error occurred:\n\n' + reason
  );
});