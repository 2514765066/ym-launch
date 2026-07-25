import { is } from '@electron-toolkit/utils';
import { BrowserWindow } from 'electron';
import { join } from 'path';

//加载文件
export const load = (bw: BrowserWindow) => {
  bw.on('ready-to-show', () => {
    bw.show();
  });

  //生产模式
  if (!is.dev) {
    bw.loadFile(join(__dirname, '../renderer/index.html'));

    return;
  }

  //开发模式
  bw.loadURL(`${process.env['ELECTRON_RENDERER_URL']}`);
  bw.webContents.openDevTools({ mode: 'detach' });
};
