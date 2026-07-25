import { contextBridge, shell, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('ipcRenderer', {
  invoke(channel: string, ...args: any[]) {
    return ipcRenderer.invoke(channel, ...args);
  },
});

contextBridge.exposeInMainWorld('api', {
  //打开文件
  openPath(path: string) {
    shell.openPath(path);
  },

  //打开文件所在位置
  openPathInFolder(path: string) {
    shell.showItemInFolder(path);
  },
});
