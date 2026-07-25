import { nanoid } from 'nanoid';
import { basename, extname } from 'path';
import { AppNode } from '@shared/type';
import { shell } from 'electron';

export const formatApps = async (paths: string[]): Promise<AppNode[]> => {
  return paths.map((path) => {
    const { target } = shell.readShortcutLink(path);

    const label = basename(path, extname(path));

    return { label, path: target, id: nanoid(), kind: 'app' };
  });
};
