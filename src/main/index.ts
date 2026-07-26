import { app, Tray, nativeImage } from 'electron';
import { optimizer } from '@electron-toolkit/utils';
import { createMainWindow } from './browser-window/main';
import '@/ipc/register';
import appIcon from '../../resources/icon.png?asset';
import { productName } from '@/../shared/app-info';
import { createHotCorner } from './hooks/hot-corner';

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

  tray.setToolTip(productName);

  return tray;
};
