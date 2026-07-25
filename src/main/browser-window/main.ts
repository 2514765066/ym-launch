import { BrowserWindow, screen } from 'electron';
import { join } from 'path';
import { load } from '.';

export const createMainWindow = () => {
  const point = screen.getCursorScreenPoint();
  const display = screen.getDisplayNearestPoint(point);

  const bw = new BrowserWindow({
    x: display.bounds.x,
    y: display.bounds.y,
    width: display.bounds.width,
    height: display.bounds.height,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    resizable: false,
    transparent: true,
    // alwaysOnTop: true,
    // skipTaskbar: true,

    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
    },
  });

  load(bw);

  return {
    bw,
    show: () => {
      bw.setOpacity(0);
      bw.show();

      setTimeout(() => {
        bw.setOpacity(1);
      }, 100);
    },
  };
};
