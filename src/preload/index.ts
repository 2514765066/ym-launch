import { contextBridge } from 'electron';
import { electronIpc } from 'plugin-electron-ipc';

contextBridge.exposeInMainWorld('ipc', electronIpc);
