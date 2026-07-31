import getFileIcon from 'extract-file-icon';
import sharp from 'sharp';

const BASE64_PRE = 'data:image/png;base64,';

// 已处理图标的内存缓存
const iconCache = new Map<string, string>();

//获取网页的图标
export const getUrlIcon = async (target: string | URL) => {
  const url = new URL(target);

  const cachedIcon = iconCache.get(url.href);

  if (cachedIcon) {
    return cachedIcon;
  }

  const res = `https://icon.horse/icon/${url.hostname}`;

  iconCache.set(url.href, res);

  return res;
};

//获取本地图标
export const getPathIcon = async (path: string) => {
  const cachedIcon = iconCache.get(path);

  if (cachedIcon) {
    return cachedIcon;
  }

  // 从系统提取的 48 像素图标数据
  const fileIcon = getFileIcon(path, 48 as 64);

  // 去除透明边缘后的图标数据
  const iconBuffer = await sharp(fileIcon)
    .trim({
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const res = BASE64_PRE + iconBuffer.toBase64();

  iconCache.set(path, res);

  return res;
};
