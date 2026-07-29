import { matchKeyword } from '@/utils/search';
import { useLauncherStore } from './launcher';
import { useSettingStore } from './setting';
import { useLauncherUiStore } from './launcher-ui';

export const useLauncherGridStore = defineStore('launcher-grid', () => {
  const { desktopIds, nodes } = storeToRefs(useLauncherStore());
  const { config } = storeToRefs(useSettingStore());
  const { keyword } = storeToRefs(useLauncherUiStore());

  //选中的页
  const selectedPage = ref(0);

  //节点尺寸
  const nodeSize = computed(() => {
    return (
      (window.innerWidth / config.value.colCount) *
      0.8 *
      (config.value.iconZoom / 100)
    );
  });

  //每页数量
  const pageSize = computed(() => {
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
      { length: Math.ceil(visibleIds.value.length / pageSize.value) },
      (_, index) => {
        return visibleIds.value.slice(
          index * pageSize.value,
          (index + 1) * pageSize.value,
        );
      },
    );
  });

  // 当前可见节点对应的页数
  const pageCount = computed(() => {
    return pages.value.length;
  });

  // 校正页码至当前有效范围
  const clampPage = (page: number) => {
    return Math.min(Math.max(page, 0), Math.max(pageCount.value - 1, 0));
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

  // 可见节点或布局变化后保持当前页有效
  watch(pageCount, () => {
    selectedPage.value = clampPage(selectedPage.value);
  });

  return {
    selectedPage,
    pageSize,
    visibleIds,
    pages,
    pageCount,
    nodeSize,
    setSelectedPage,
    prePage,
    nextPage,
  };
});
