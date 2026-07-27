import { app } from 'electron';
import { optimizer } from '@electron-toolkit/utils';
import { createMainWindow } from './browser-window/main';
import { createHotCorner } from './hooks/hot-corner';
import { createStartShortcut } from './hooks/start-shortcut';
import { createTray } from './hooks/tray';
import { productName } from '@shared/app-info';
import '@/ipc/register';
import '@/utils/update';

//单一实例锁
if (!app.requestSingleInstanceLock()) {
  app.exit();
}

app.whenReady().then(() => {
  const main = createMainWindow();

  const tray = createTray([
    {
      label: `打开 ${productName}`,
      click() {
        main.show();
      },
    },
    {
      label: `退出 ${productName}`,
      click() {
        app.quit();
      },
    },
  ]);

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

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  app.on('second-instance', main.show);
});
