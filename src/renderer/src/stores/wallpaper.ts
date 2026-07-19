export const useWallpaperStore = defineStore('wallpaper', () => {
  const wallpaper = ref('');

  //获取壁纸
  const getWallpaper = async () => {
    wallpaper.value = await ipc.getWallpaper();
  };

  getWallpaper();

  return {
    wallpaper,
    getWallpaper,
  };
});
