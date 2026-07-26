import { eventBus } from '@/utils/event-bus';
import { useLauncherStore } from './launcher';
import { useSettingStore } from './setting';

type Status = 'normal' | 'remove' | 'search';

export const useLauncherUiStore = defineStore('ui', () => {
  const launcherStore = useLauncherStore();
  const { config } = storeToRefs(useSettingStore());

  //壁纸
  const wallpaper = ref('');

  //状态
  const status = ref<Status>('normal');

  //搜索关键字
  const keyword = ref('');

  //选中的节点id
  const dragNodeId = ref<string | null>(null);

  //是否隐藏桌面
  const hiddenDesktop = ref(false);

  //选中的页
  const selectedPage = ref(0);

  //最大节点数量
  const maxNodeCount = computed(() => {
    return config.value.rowCount * config.value.colCount;
  });

  //最大页数
  const maxPageCount = computed(() => {
    return Math.ceil(launcherStore.desktopIds.length / maxNodeCount.value);
  });

  //节点尺寸
  const nodeSize = computed(() => {
    return (
      (window.innerWidth / config.value.colCount) *
      0.8 *
      (config.value.iconZoom / 100)
    );
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
    ipcRenderer.invoke('hidden');
  };

  //获取壁纸
  const getWallpaper = async () => {
    wallpaper.value = await ipcRenderer.invoke('getWallpaper');
  };

  //添加删除css
  watchEffect(() => {
    if (status.value == 'remove') {
      document.body.classList.add('launcher-remove');
      return;
    }

    document.body.classList.remove('launcher-remove');
  });

  //每次打开重新获取壁纸
  ipcRenderer.on('show', () => {
    keyword.value = '';
    eventBus.emit('settingDialog', false);
    getWallpaper();
  });

  getWallpaper();

  return {
    status,
    keyword,
    dragNodeId,
    selectedPage,
    maxNodeCount,
    maxPageCount,
    nodeSize,
    hiddenDesktop,
    wallpaper,
    setSelectedPage,
    prePage,
    nextPage,
    setDragNodeId,
    setStatus,
    hidden,
  };
});
