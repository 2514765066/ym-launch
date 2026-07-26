import { appName } from '@shared/app-info';
import type { HotCornerPosition } from '@shared/type';

export const issueUrl = `https://github.com/2514765066/${appName}/issues`;

export const updateContentUrl = `https://github.com/2514765066/${appName}/blob/main/docs/release-note.md`;

export const updateMap = {
  checking: '正在检查更新...',
  updateAvailable: '发现更新',
  updateNotAvailable: '已是最新版',
  downloading: (value: number | string) => `下载中: ${value}%`,
};

export const hotCornerMap: Record<HotCornerPosition, string> = {
  'top-left': '左上角',
  'bottom-left': '左下角',
  'top-right': '右上角',
  'bottom-right': '右下角',
};
