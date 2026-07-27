import { formatApps } from '../utils/app';
import { app, BrowserWindow, dialog, IpcMainEvent } from 'electron';
import getFileIcon from 'extract-file-icon';
import sharp from 'sharp';
import { readFile } from 'fs/promises';
import { getWallpaper as _getWallpaper } from 'wallpaper';
import {
  checkUpdate as _checkUpdate,
  downloadUpdate as _downloadUpdate,
  installUpdate as _installUpdate,
} from 'ym-publish';
import { autoUpdater } from 'electron-updater';
import { setHotCorner as _setHotCorner } from '../hooks/hot-corner';
import { setStartShortcut as _setStartShortcut } from '../hooks/start-shortcut';
import type { HotCornerPosition } from '@shared/type';

//获取壁纸
export const getWallpaper = async () => {
  const path = await _getWallpaper();

  const buffer = await readFile(path);

  const ext = path.split('.').pop(); // 获取扩展名

  return `data:image/${ext};base64,${buffer.toString('base64')}`;
};

//添加应用
export const addAppNode = async ({ sender }: IpcMainEvent) => {
  const bw = BrowserWindow.fromWebContents(sender);

  const result = await dialog.showOpenDialog(bw!, {
    title: '添加应用程序',
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: '启动程序', extensions: ['*'] }],
  });

  if (result.canceled) {
    return [];
  }

  return formatApps(result.filePaths);
};

// 已处理图标的内存缓存
const iconCache = new Map<string, string>();

// 获取应用图标的 Base64 数据
export const getIcon = async (_, path: string) => {
  // 当前路径已缓存的图标数据
  const cachedIcon = iconCache.get(path);

  if (cachedIcon) {
    return cachedIcon;
  }

  // 从系统提取的 48 像素图标数据
  const fileIcon = getFileIcon(path, 48 as 64);

  const iconBuffer = await sharp(fileIcon)
    .trim({
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  // 可直接赋给 img src 的图标数据
  const base64Icon = `data:image/png;base64,${iconBuffer.toString('base64')}`;

  iconCache.set(path, base64Icon);

  return base64Icon;
};

//隐藏应用
export const hidden = ({ sender }: IpcMainEvent) => {
  const bw = BrowserWindow.fromWebContents(sender);

  bw?.hide();
};

//检查更新
export const checkUpdate = async () => {
  const res = await autoUpdater.checkForUpdates();

  if (!res?.isUpdateAvailable) {
    return false;
  }

  return res?.updateInfo.version;
};

//安装
export const installUpdate = () => {
  autoUpdater.quitAndInstall(true, true);
};

//设置启动角配置
export const setHotCorner = (
  _,
  config: { disabled: boolean; position: HotCornerPosition },
) => {
  _setHotCorner(config);
};

//设置快速启动的快捷键
export const setStartShortcut = (_, shortcut: string) => {
  _setStartShortcut(shortcut);
};

//设置开机自启动
export const setOpenAtLogin = (_, openAtLogin: boolean) => {
  app.setLoginItemSettings({ openAtLogin });
};
