import { readFile } from 'fs/promises';
import { getWallpaper as _getWallpaper } from 'wallpaper';

//获取壁纸
export const getWallpaper = async () => {
  const path = await _getWallpaper();

  const buffer = await readFile(path);

  const ext = path.split('.').pop(); // 获取扩展名

  return `data:image/${ext};base64,${buffer.toString('base64')}`;
};
