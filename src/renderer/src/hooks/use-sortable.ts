import type { Ref } from 'vue';
import Sortable, { type Options } from 'sortablejs';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import { useSettingStore } from '@/stores/setting';

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
  // 是否处于搜索状态
  const { isSearching, status } = storeToRefs(useLauncherUiStore());
  const { config } = storeToRefs(useSettingStore());

  // Sortable 实例
  let sortable: Sortable | null = null;

  const getDisabled = () => {
    return status.value !== 'normal' || isSearching.value;
  };

  const getSwapThreshold = () => {
    return config.value.iconZoom / 100;
  };

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
      swapThreshold: getSwapThreshold(),
      disabled: getDisabled(),
    });
  };

  // 同步图标缩放对应的交换阈值
  watchEffect(() => {
    // 当前图标缩放对应的交换阈值
    const swapThreshold = getSwapThreshold();

    sortable?.option('swapThreshold', swapThreshold);
  });

  //根据编辑和搜索状态禁用拖拽
  watchEffect(() => {
    // 当前交互状态是否需要禁用拖拽
    const disabled = getDisabled();

    sortable?.option('disabled', disabled);
  });

  onMounted(createSortable);
  onUnmounted(destroySortable);

  return {
    getSortable: () => sortable,
    destroySortable,
    createSortable,
  };
};
