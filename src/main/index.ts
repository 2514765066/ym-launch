import { app, Tray, nativeImage, Menu } from 'electron';
import { optimizer } from '@electron-toolkit/utils';
import { createMainWindow } from './browser-window/main';
import '@/ipc/register';
import appIcon from '../../resources/icon.png?asset';
import { productName } from '@/../shared/app-info';
import { createHotCorner } from './hooks/hot-corner';
import { createStartShortcut } from './hooks/start-shortcut';
import '@/utils/update';

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

  createStartShortcut(() => {
    if (main.bw.isVisible()) {
      return;
    }

    main.show();
  });
});

//创建托盘
const createTray = () => {
  const tray = new Tray(nativeImage.createFromPath(appIcon));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: `退出 ${productName}`,
      click() {
        app.quit();
      },
    },
  ]);

  tray.setToolTip(productName);
  tray.setContextMenu(contextMenu);

  return tray;
};
