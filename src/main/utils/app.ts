import { nanoid } from "nanoid";
import { getLnkTarget } from "./lnk";
import { basename, extname } from "path";

export const formatApps = async (paths: string[]) => {
  const targetPaths = await getLnkTarget(paths);

  return targetPaths.map(path => {
    const name = basename(path, extname(path));

    return { name, path, id: nanoid() };
  });
};
