<template>
  <Base>
    <section
      ref="contentRef"
      class="launcher-page flex-1 grid place-items-center"
      :class="{
        '*:last:hidden!': dragNodeId && hasOverflow,
      }"
      :data-page="page"
    >
      <slot />
    </section>
  </Base>
</template>

<script setup lang="ts">
import { useSortable } from '@/hooks/use-sortable.js';
import Base from './base.vue';
import { SortableEvent } from 'sortablejs';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import { useSettingStore } from '@/stores/setting';
import { useLayoutStore } from '@/stores/layout';

const props = defineProps<{
  page: number;
}>();

const emit = defineEmits<{
  end: [];
}>();

// 当前正在拖拽的节点 ID
const { dragNodeId } = storeToRefs(useLauncherUiStore());

// 当前页面最大节点数量
const { pageSize } = storeToRefs(useLayoutStore());

// 启动台行列设置
const { config } = storeToRefs(useSettingStore());

// 设置当前拖拽节点
const { setDragNodeId } = useLauncherUiStore();

// 当前页的可排序容器
const contentRef = useTemplateRef('contentRef');

// 当前页面是否存在拖拽溢出节点
const hasOverflow = ref(false);

// 开始拖拽
const handleStart = (e: SortableEvent) => {
  setDragNodeId(e.item.dataset.id);
  hasOverflow.value = false;
};

// 拖拽结束
const handleEnd = () => {
  setDragNodeId();

  hasOverflow.value = false;

  emit('end');
};

// 根据目标页容量更新溢出节点占位
const handelChange = (e: SortableEvent) => {
  hasOverflow.value = e.to.children.length > pageSize.value;
};

// 处理其他容器拖入并清理 Sortable 遗留节点
const handleAdd = async (e: SortableEvent) => {
  handleEnd();

  await nextTick();

  e.item.remove();
};

// 创建页面排序实例
useSortable(contentRef, {
  onStart: handleStart,
  onEnd: handleEnd,
  onChange: handelChange,
  onAdd: handleAdd,
});
</script>

<style scoped lang="scss">
.launcher-page {
  grid-template-rows: repeat(v-bind('config.rowCount'), minmax(0, 1fr));
  grid-template-columns: repeat(v-bind('config.colCount'), minmax(0, 1fr));
}
</style>
