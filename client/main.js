const { app, BrowserWindow, Menu, Tray, nativeTheme } = require('electron')
const path = require('path')

const isDev = !app.isPackaged;

let tray = null;
let mainWindow = null;

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

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  // Intentionally empty — app lives in tray
});