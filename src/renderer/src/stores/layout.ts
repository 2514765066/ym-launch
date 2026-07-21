import { defineStore } from 'pinia';
import { useLauncherStore } from './launcher';

export const useLayoutStore = defineStore('layout', () => {
  const launcherStore = useLauncherStore();

  //行数
  const rowCount = ref(5);

  //列数
  const colCount = ref(7);

  //选中的页
  const selectedPage = ref(0);

  //图标缩放大小
  const iconZoom = ref(0.5);

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

  return {
    rowCount,
    colCount,
    selectedPage,
    iconZoom,
    maxNodeCount,
    maxPageCount,
    nodeSize,
    prePage,
    nextPage,
  };
});
