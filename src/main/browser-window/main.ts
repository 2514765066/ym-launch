import { BrowserWindow, screen } from "electron";
import { join } from "path";
import { is } from "@electron-toolkit/utils";

export function createMainWindow() {
  const displays = screen.getAllDisplays();

  // 主屏
  const primaryDisplay = screen.getPrimaryDisplay();

  // 第二个屏幕（如果存在）
  const display = displays.find(d => d.id === primaryDisplay.id)!;

  const mainWindow = new BrowserWindow({
    x: display.bounds.x,
    y: display.bounds.y,
    width: display.bounds.width,
    height: display.bounds.height,

    frame: false,
    show: false,
    autoHideMenuBar: true,
    resizable: false,
    transparent: true,

    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
    mainWindow.webContents.openDevTools({ mode: "detach" });
  });

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}
