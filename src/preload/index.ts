import { contextBridge, shell, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('ipcRenderer', {
  on(channel: string, handler: () => void) {
    return ipcRenderer.on(channel, handler);
  },
  invoke(channel: string, ...args: any[]) {
    return ipcRenderer.invoke(channel, ...args);
  },
});

contextBridge.exposeInMainWorld('api', {
  //打开文件
  async openPath(path: string) {
    await ipcRenderer.invoke('hidden');

    shell.openPath(path);
  },

  //打开文件所在位置
  async openPathInFolder(path: string) {
    await ipcRenderer.invoke('hidden');

    shell.showItemInFolder(path);
  },

  //打开网址
  async openUrl(url: string) {
    await ipcRenderer.invoke('hidden');

    shell.openExternal(url);
  },
});
