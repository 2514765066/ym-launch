import { IpcRenderer } from 'electron';

declare global {
  const ipcRenderer: IpcRenderer;
}

export {};
