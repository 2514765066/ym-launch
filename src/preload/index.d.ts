import { type ElectronIpc } from 'plugin-electron-ipc';

declare global {
  // 渲染进程可直接使用的类型安全 IPC 接口
  const ipc: ElectronIpc;
}

export {};
