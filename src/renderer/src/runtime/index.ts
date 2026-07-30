import { useLauncherUiStore } from '@/stores/launcher-ui';
import { useClass } from './class';
import { useShortcut } from './shortcut';
import { useWheel } from './wheel';

// 初始化启动台运行时能力
export const useRuntimeStore = defineStore('runtime', () => {
  // 启动台界面操作
  const { setWallpaper } = useLauncherUiStore();

  //获取壁纸
  const refreshWallpaper = async () => {
    setWallpaper(await ipc.getWallpaper());
  };

  //每次打开重新获取壁纸
  ipc.on('show', refreshWallpaper);

  refreshWallpaper();
  useClass();
  useShortcut();
  useWheel();
});
