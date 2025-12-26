const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onThemeUpdated: (callback) =>
    ipcRenderer.on("theme-updated", (_event, isDark) => callback(isDark))
});