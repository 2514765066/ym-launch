import { ElectronAPI } from "@electron-toolkit/preload";
import { PreloadAPI } from "./index";

declare global {
  const api: PreloadAPI;
  const electron: ElectronAPI;
}
