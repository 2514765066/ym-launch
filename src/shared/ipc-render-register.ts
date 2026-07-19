import { ipcRenderer } from 'electron';
import ipcChannels from './ipc-channel';

//注册事件
const ipcApi = Object.fromEntries(
  ipcChannels.map((channel) => [
    channel,
    (...args: unknown[]) => ipcRenderer.invoke(channel, ...args),
  ]),
);

export default ipcApi;
