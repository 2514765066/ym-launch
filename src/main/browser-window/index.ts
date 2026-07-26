import { BrowserWindow } from 'electron';

type BwsKey = 'main';

export const browserWindows = new Map<BwsKey, BrowserWindow>();
