import { app } from 'electron';
import { optimizer } from '@electron-toolkit/utils';
import { createMainWindow } from './browser-window/main';
import '@/ipc/register';

app.whenReady().then(() => {
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createMainWindow();
});
