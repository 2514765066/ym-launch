import { useLauncherStore } from './launcher';

type Status = 'normal' | 'remove' | 'search';

export const useLauncherUiStore = defineStore('launcher-ui', () => {
  const launcherStore = useLauncherStore();

  //壁纸
  const wallpaper = ref('');

  //模糊程度
  const blur = ref(40);

  //状态
  const status = ref<Status>('normal');

  //搜索关键字
  const keyword = ref('');

  //选中的节点id
  const dragNodeId = ref<string | null>(null);

  //是否隐藏桌面
  const hiddenDesktop = ref(false);

  //行数
  const rowCount = ref(5);

  //列数
  const colCount = ref(7);

  //选中的页
  const selectedPage = ref(0);

  //图标缩放大小
  const iconZoom = ref(0.4);

  //最大节点数量
  const maxNodeCount = computed(() => {
    return rowCount.value * colCount.value;
  });

  //最大页数
  const maxPageCount = computed(() => {
    return Math.ceil(launcherStore.desktopIds.length / maxNodeCount.value);
  });

  //节点尺寸
  const nodeSize = computed(() => {
    return (window.innerWidth / colCount.value) * 0.8 * iconZoom.value;
  });

  // 设置选中的节点
  const setDragNodeId = (nodeId: string | null = null) => {
    dragNodeId.value = nodeId;
  };

  //设置状态
  const setStatus = (s: Status) => {
    status.value = s;
  };

  //设置选中的
  const setSelectedPage = (page: number) => {
    selectedPage.value = page;
  };

  // 上一页
  const prePage = () => {
    if (selectedPage.value === 0) {
      return;
    }

    selectedPage.value--;
  };

  // 下一页
  const nextPage = () => {
    if (selectedPage.value == maxPageCount.value - 1) {
      return;
    }

    selectedPage.value++;
  };

  //隐藏应用
  const hidden = () => {
    keyword.value = '';

    ipcRenderer.invoke('hidden');
  };

  //添加删除css
  watchEffect(() => {
    if (status.value == 'remove') {
      document.body.classList.add('launcher-remove');
      return;
    }

    document.body.classList.remove('launcher-remove');
  });

  ipcRenderer.on('updateWallpaper', (_, data: string) => {
    wallpaper.value = data;
  });

  return {
    status,
    keyword,
    dragNodeId,
    rowCount,
    colCount,
    selectedPage,
    iconZoom,
    maxNodeCount,
    maxPageCount,
    nodeSize,
    hiddenDesktop,
    wallpaper,
    blur,
    setSelectedPage,
    prePage,
    nextPage,
    setDragNodeId,
    setStatus,
    hidden,
  };
});
