import { app, Tray, nativeImage } from 'electron';
import { optimizer } from '@electron-toolkit/utils';
import { createMainWindow } from './browser-window/main';
import '@/ipc/register';
import appIcon from '../../resources/icon.png?asset';
import { appName } from '@/../shared/app-info';
import { uIOhook } from 'uiohook-napi';

app.whenReady().then(() => {
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  const main = createMainWindow();

  const tray = createTray();

  tray.on('click', main.show);

  createHotCorner(() => {
    if (main.bw.isVisible()) {
      main.bw.hide();
      return;
    }

    main.show();
  });
});

//创建托盘
const createTray = () => {
  const tray = new Tray(nativeImage.createFromPath(appIcon));

  tray.setToolTip(appName);

  return tray;
};

//创建启动角
const createHotCorner = (handler: () => void) => {
  const cornerSize = 5;

  let isInCorner = false;

  uIOhook.on('mousemove', ({ x, y }) => {
    const inCorner = x <= cornerSize && y <= cornerSize;

    // 从外面进入角落
    if (inCorner && !isInCorner) {
      handler();
    }

    isInCorner = inCorner;
  });

  uIOhook.start();

  return () => {
    uIOhook.stop();
  };
};
