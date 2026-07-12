export const useWallpaperStore = defineStore("wallpaper", () => {
  const wallpaper = ref("");

  //获取壁纸
  const getWallpaper = async () => {
    wallpaper.value = await electron.ipcRenderer.invoke("getScreenCapture");
  };

  getWallpaper();

  return {
    wallpaper,
    getWallpaper,
  };
});
