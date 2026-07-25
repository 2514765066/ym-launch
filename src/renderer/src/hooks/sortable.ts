import { onMounted, onUnmounted, type Ref, watch } from 'vue';
import Sortable, { type Options } from 'sortablejs';
import { useLauncherUiStore } from '@/stores/launcher-ui';

const commonOptions: Options = {
  group: 'launcher',
  animation: 200,
  preventOnFilter: false,
  invertSwap: true,
  forceFallback: true,
  fallbackOnBody: true,
  fallbackClass: 'opacity-100!',
  ghostClass: 'opacity-0',
};

export const useSortable = (el: Ref<HTMLElement | null>, options?: Options) => {
  // 布局配置仓库
  const LauncherUiStore = useLauncherUiStore();

  // Sortable 实例
  let sortable: Sortable | null = null;

  //销毁实例
  const destroySortable = () => {
    if (sortable) {
      sortable.destroy();
      sortable = null;
    }
  };

  //创建实例
  const createSortable = () => {
    destroySortable();

    if (!el.value) return;

    sortable = Sortable.create(el.value, {
      ...commonOptions,
      ...options,
      swapThreshold: LauncherUiStore.iconZoom,
    });
  };

  // 同步图标缩放对应的交换阈值
  watch(
    () => LauncherUiStore.iconZoom,
    (iconZoom) => {
      sortable?.option('swapThreshold', iconZoom);
    },
  );

  watch(
    () => LauncherUiStore.status,
    (status) => {
      sortable?.option('disabled', status == 'edit');
    },
  );

  onMounted(createSortable);
  onUnmounted(destroySortable);

  return {
    getSortable: () => sortable,
    destroySortable,
    createSortable,
  };
};
