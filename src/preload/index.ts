import { contextBridge, shell } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import getFileIcon from "extract-file-icon";
import sharp from "sharp";

const api = {
  //获取图标
  async getIcon(path: string) {
    const buffer = getFileIcon(path, 48);

    const iconBuffer = await sharp(buffer)
      .trim({
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    return `data:image/png;base64,${iconBuffer.toString("base64")}`;
  },

  //打开文件
  startApp(path: string) {
    shell.openPath(path);
  },

  //打开文件所在位置
  showItemInFolder(path: string) {
    shell.showItemInFolder(path);
  },
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}

export type PreloadAPI = typeof api;
