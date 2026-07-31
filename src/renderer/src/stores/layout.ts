import { matchKeyword } from '@/utils/search';
import { useSettingStore } from './setting';
import { useLauncherUiStore } from './launcher-ui';
import { useDesktopStore } from './desktop';
import { useNodeStore } from './node';
import {
  chunkDesktopItems,
  createDesktopLayout,
  findDesktopNodeLocation,
  getDesktopPages,
  getResizedPageIndex,
  isDesktopNodeId,
  resizeDesktopLayout,
  resolveDraggedPageOverflow,
} from '@/utils/desktop-layout';
import { getValue } from '@/utils/value';

export const useLayoutStore = defineStore('layout', () => {
  // 启动台节点数据
  const { nodes } = storeToRefs(useNodeStore());

  // 一维桌面数据
  const { desktopIds } = storeToRefs(useDesktopStore());

  // 覆盖一维桌面数据
  const { setDesktop } = useDesktopStore();

  // 启动台外观设置
  const { config } = storeToRefs(useSettingStore());

  // 启动台搜索关键词
  const { keyword } = storeToRefs(useLauncherUiStore());

  // 选中的页
  const selectedPage = ref(0);

  // 节点尺寸
  const nodeSize = computed(() => {
    return (
      (window.innerWidth / config.value.colCount) *
      0.8 *
      (config.value.iconZoom / 100)
    );
  });

  // 每页可容纳的节点数量
  const pageSize = computed(() => {
    return config.value.rowCount * config.value.colCount;
  });

  // 当前状态下可见的节点 ID
  const visibleIds = computed(() => {
    if (!keyword.value) {
      return desktopIds.value.filter(isDesktopNodeId);
    }

    return Object.values(nodes.value)
      .filter((node) => {
        return (
          matchKeyword(node.keyword, keyword.value) ||
          matchKeyword(node.label, keyword.value)
        );
      })
      .map((node) => {
        return node.id;
      });
  });

  // 根据空槽边界或搜索结果拆分出的页面节点 ID
  const pages = computed(() => {
    if (!keyword.value) {
      return getDesktopPages(desktopIds.value, pageSize.value);
    }

    return chunkDesktopItems(visibleIds.value, pageSize.value);
  });

  // 当前可见节点对应的页数
  const pageCount = computed(() => {
    return pages.value.length;
  });

  // 校正页码至当前有效范围
  const clampPage = (page: number) => {
    return Math.min(Math.max(page, 0), Math.max(pageCount.value - 1, 0));
  };

  // 设置选中的页面
  const setSelectedPage = (
    page: number | ((current: number, max: number) => number),
  ) => {
    const value = getValue(page, selectedPage.value, pageCount.value);

    selectedPage.value = clampPage(value);
  };

  // 选中桌面节点所在页面
  const selectDesktopNode = (nodeId: string) => {
    // 节点在当前页面布局中的位置
    const nodeLocation = findDesktopNodeLocation(
      desktopIds.value,
      pageSize.value,
      nodeId,
    );

    if (!nodeLocation) {
      return;
    }

    setSelectedPage(nodeLocation.pageIndex);
  };

  // 写入拖拽后的页面并处理满页溢出
  const setDraggedDesktopPages = (draggedPages: string[][]) => {
    // 将拖拽溢出节点拆到独立页面后的布局
    const resolvedPages = resolveDraggedPageOverflow(
      draggedPages,
      pageSize.value,
    );

    setDesktop(createDesktopLayout(resolvedPages, pageSize.value));
  };

  // 可见节点或布局变化后保持当前页有效
  watch(pageCount, () => {
    selectedPage.value = clampPage(selectedPage.value);
  });

  // 页面容量变化时保留旧页面边界并校正选中页
  watch(
    pageSize,
    (newPageSize, oldPageSize) => {
      // 选中旧页面调整容量后对应的首个页面
      const resizedPageIndex = getResizedPageIndex(
        desktopIds.value,
        oldPageSize,
        newPageSize,
        selectedPage.value,
      );

      setDesktop(
        resizeDesktopLayout(desktopIds.value, oldPageSize, newPageSize),
      );
      selectedPage.value = resizedPageIndex;
    },
    {
      flush: 'sync',
    },
  );

  return {
    selectedPage,
    pageSize,
    visibleIds,
    pages,
    pageCount,
    nodeSize,
    setSelectedPage,
    selectDesktopNode,
    setDraggedDesktopPages,
  };
});
