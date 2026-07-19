import { BrowserWindow, screen } from 'electron';
import { join } from 'path';
import { load } from '.';

export function createMainWindow() {
  const point = screen.getCursorScreenPoint();
  const display = screen.getDisplayNearestPoint(point);

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
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
    },
  });

  load(mainWindow);
}
