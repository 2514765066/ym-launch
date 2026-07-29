import { useLauncherUiStore } from './launcher-ui';

export const useRuntimeStore = defineStore('runtime', () => {
  const { setWallpaper } = useLauncherUiStore();

  //获取壁纸
  const refreshWallpaper = async () => {
    setWallpaper(await ipc.getWallpaper());
  };

  //每次打开重新获取壁纸
  ipc.on('show', refreshWallpaper);

  refreshWallpaper();
});
