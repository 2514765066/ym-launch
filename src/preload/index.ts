import { contextBridge, shell } from 'electron';
import { getIcon as getFileIcon } from 'icon-extractor-win';
import sharp from 'sharp';
import IpcApi from '../shared/ipc-render-register';

contextBridge.exposeInMainWorld('ipc', IpcApi);

contextBridge.exposeInMainWorld('api', {
  //获取图标
  async getIcon(path: string) {
    const buffer = getFileIcon(path);

    const iconBuffer = await sharp(buffer)
      .trim({
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    return `data:image/png;base64,${iconBuffer.toString('base64')}`;
  },

  //打开文件
  startApp(path: string) {
    shell.openPath(path);
  },

  //打开文件所在位置
  showItemInFolder(path: string) {
    shell.showItemInFolder(path);
  },
});
