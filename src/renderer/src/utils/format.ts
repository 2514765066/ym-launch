import { shortcutMap } from '@/map';

//格式化快捷键
export const formatShortcut = (shortcut: string, join: boolean = true) => {
  const result = shortcut
    .toLowerCase()
    .split('+')
    .map((key) => shortcutMap[key] ?? key.toUpperCase());

  if (join) {
    return result.join('+');
  }

  return result;
};
