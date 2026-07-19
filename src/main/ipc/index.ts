import { formatApps } from '../utils/app';
import { dialog } from 'electron';
import { readFile } from 'fs/promises';
import { getWallpaper as _getWallpaper } from 'wallpaper';

//获取壁纸
export const getWallpaper = async () => {
  const path = await _getWallpaper();

  const buffer = await readFile(path);

  const ext = path.split('.').pop(); // 获取扩展名

  return `data:image/${ext};base64,${buffer.toString('base64')}`;
};

//添加应用
export const addApps = async () => {
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
