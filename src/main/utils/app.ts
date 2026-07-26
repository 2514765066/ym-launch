import { nanoid } from 'nanoid';
import { basename, extname } from 'path';
import { AppNode } from '@shared/type';
import { shell } from 'electron';
import pinyin from 'pinyin';

export const formatApps = async (paths: string[]): Promise<AppNode[]> => {
  return paths.map((path) => {
    const ext = extname(path);

    let target = path;

    if (ext == '.lnk') {
      target = shell.readShortcutLink(path).target;
    }

    const label = basename(path, ext);

    return {
      id: nanoid(),
      label,
      path: target,
      keyword: pinyin(label).join(''),
      kind: 'app',
    };
  });
};
