import { IpcRenderer } from 'electron';

declare global {
  const ipcRenderer: IpcRenderer;
  const api: {
    openPath: (path: string) => void;
    openPathInFolder: (path: string) => void;
  };
}

export {};
