import { ipcMain } from 'electron';
import * as ipc from './index';

//注册事件
for (const [key, handler] of Object.entries(ipc)) {
  ipcMain.handle(key, handler);
}
