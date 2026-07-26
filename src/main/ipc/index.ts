import { formatApps } from '../utils/app';
import { BrowserWindow, dialog, IpcMainEvent } from 'electron';
import getFileIcon from 'extract-file-icon';
import sharp from 'sharp';

//添加应用
export const addAppNode = async () => {
  const result = await dialog.showOpenDialog({
    title: '添加应用程序',
    properties: ['openFile', 'multiSelections'],
    filters: [{ name: '启动程序', extensions: ['exe', 'lnk'] }],
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
