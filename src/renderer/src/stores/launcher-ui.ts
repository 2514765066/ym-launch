import { eventBus } from '@/utils/event-bus';
import { matchKeyword } from '@/utils/search';
import { useLauncherStore } from './launcher';
import { useSettingStore } from './setting';

type Status = 'normal' | 'remove';

export const useLauncherUiStore = defineStore('ui', () => {
  const launcherStore = useLauncherStore();
  const { desktopIds, nodes } = storeToRefs(launcherStore);
  const { config } = storeToRefs(useSettingStore());

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

  //选中的页
  const selectedPage = ref(0);

  //最大节点数量
  const maxNodeCount = computed(() => {
    return config.value.rowCount * config.value.colCount;
  });

  // 当前状态下可见的节点 ID
  const visibleIds = computed(() => {
    if (!keyword.value) {
      return desktopIds.value;
    }

    return Object.values(nodes.value)
      .filter((node) => {
        return (
          matchKeyword(node.keyword, keyword.value) ||
          matchKeyword(node.label, keyword.value)
        );
      })
      .map((node) => node.id);
  });

  // 根据最大节点数拆分出的页面节点 ID
  const pages = computed(() => {
    return Array.from(
      { length: Math.ceil(visibleIds.value.length / maxNodeCount.value) },
      (_, index) => {
        return visibleIds.value.slice(
          index * maxNodeCount.value,
          (index + 1) * maxNodeCount.value,
        );
      },
    );
  });

  // 当前可见节点对应的页数
  const pageCount = computed(() => {
    return pages.value.length;
  });

  //节点尺寸
  const nodeSize = computed(() => {
    return (
      (window.innerWidth / config.value.colCount) *
      0.8 *
      (config.value.iconZoom / 100)
    );
  });

  // 校正页码至当前有效范围
  const clampPage = (page: number) => {
    return Math.min(Math.max(page, 0), Math.max(pageCount.value - 1, 0));
  };

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
    selectedPage.value = clampPage(page);
  };

  // 上一页
  const prePage = () => {
    if (selectedPage.value === 0) {
      return;
    }

    setSelectedPage(selectedPage.value - 1);
  };

  // 下一页
  const nextPage = () => {
    if (selectedPage.value >= pageCount.value - 1) {
      return;
    }

    setSelectedPage(selectedPage.value + 1);
  };

  //获取壁纸
  const getWallpaper = async () => {
    wallpaper.value = await ipc.getWallpaper();
  };

  //添加删除css
  watchEffect(() => {
    if (status.value == 'remove') {
      document.body.classList.add('launcher-remove');
      return;
    }

    document.body.classList.remove('launcher-remove');
  });

  // 可见节点或布局变化后保持当前页有效
  watch(pageCount, () => {
    selectedPage.value = clampPage(selectedPage.value);
  });

  //每次打开重新获取壁纸
  ipc.on('show', () => {
    keyword.value = '';
    eventBus.emit('settingDialog', false);
    getWallpaper();
  });

  getWallpaper();

  return {
    status,
    keyword,
    isSearching,
    dragNodeId,
    selectedPage,
    maxNodeCount,
    visibleIds,
    pages,
    pageCount,
    nodeSize,
    hiddenDesktop,
    wallpaper,
    setSelectedPage,
    prePage,
    nextPage,
    setDragNodeId,
    setStatus,
  };
});
