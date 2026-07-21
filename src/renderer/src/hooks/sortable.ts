import { onMounted, onUnmounted, type Ref } from 'vue';
import Sortable, { type Options } from 'sortablejs';

const commonOptions: Options = {
  group: 'launcher',
  animation: 150,
  preventOnFilter: false,
  swapThreshold: 0.4,
  invertSwap: true,
  forceFallback: true,
  fallbackOnBody: true,
  fallbackClass: 'opacity-100!',
  ghostClass: 'opacity-0',
};

export const useSortable = (el: Ref<HTMLElement | null>, options?: Options) => {
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

    sortable = Sortable.create(el.value, { ...commonOptions, ...options });
  };

  onMounted(createSortable);
  onUnmounted(destroySortable);

  return {
    getSortable: () => sortable,
    destroySortable,
    createSortable,
  };
};
