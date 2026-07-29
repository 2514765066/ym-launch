type Status = 'normal' | 'remove';

export const useLauncherUiStore = defineStore('ui', () => {
  //壁纸
  const wallpaper = ref('');

  //状态
  const status = ref<Status>('normal');

  //搜索关键字
  const keyword = ref('');

  //是否处于搜索状态
  const isSearching = computed(() => {
    return Boolean(keyword.value);
  });

  //选中的节点id
  const dragNodeId = ref<string | null>(null);

  //是否隐藏桌面
  const hiddenDesktop = ref(false);

  //设置壁纸
  const setWallpaper = (data: string) => {
    wallpaper.value = data;
  };

  // 设置选中的节点
  const setDragNodeId = (nodeId: string | null = null) => {
    dragNodeId.value = nodeId;
  };

  //设置状态
  const setStatus = (s: Status) => {
    status.value = s;
  };

  //每次打开重新获取壁纸
  ipc.on('show', () => {
    keyword.value = '';
  });

  return {
    status,
    keyword,
    isSearching,
    dragNodeId,
    hiddenDesktop,
    wallpaper,
    setWallpaper,
    setDragNodeId,
    setStatus,
  };
});
