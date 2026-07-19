import { getLnkTargetPs1Path } from '../services/path';
import { execFile } from 'child_process';

//获取lnk文件的目标路径
export const getLnkTarget = (paths: string[]) => {
  const { promise, resolve } = Promise.withResolvers<string[]>();

  execFile(
    'powershell.exe',
    [
      '-NoProfile',
      '-ExecutionPolicy',
      'Bypass',
      '-File',
      getLnkTargetPs1Path,
      ...paths,
    ],
    (err, stdout) => {
      if (err) {
        resolve([]);
        return;
      }

      resolve(JSON.parse(stdout));
    },
  );

  return promise;
};
