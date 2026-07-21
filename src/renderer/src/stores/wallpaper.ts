export const useWallpaperStore = defineStore('wallpaper', () => {
  //壁纸
  const wallpaper = ref('');

  //模糊程度
  const blur = ref(40);

  //获取壁纸
  const getWallpaper = async () => {
    wallpaper.value = await ipc.getWallpaper();
  };

  getWallpaper();

  return {
    wallpaper,
    blur,
    getWallpaper,
  };
});
