import { browserWindows } from '@/browser-window';
import { appName } from '@shared/app-info';
import { autoUpdater } from 'electron-updater';

autoUpdater.setFeedURL(
  `https://gitee.com/yxingyus/${appName}/releases/download/latest`,
);

//发现更新
autoUpdater.on('update-available', () => {
  autoUpdater.downloadUpdate();
});

//下载进度
autoUpdater.on('download-progress', (info) => {
  const main = browserWindows.get('main');

  main?.webContents.send('download-progress', info.percent);
});

//下载完成
autoUpdater.on('update-downloaded', () => {
  const main = browserWindows.get('main');

  main?.webContents.send('update-downloaded');
});
