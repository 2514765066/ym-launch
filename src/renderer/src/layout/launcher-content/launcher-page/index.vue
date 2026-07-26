<template>
  <Base>
    <section
      ref="contentRef"
      class="launcher-page flex-1 grid place-items-center"
      :class="{
        '*:first:hidden!': dragNodeId && from === 'before',
        '*:last:hidden!': dragNodeId && from === 'after',
      }"
      :data-page="page"
    >
      <slot />
    </section>
  </Base>
</template>

<script setup lang="ts">
import { useSortable } from '@/hooks/sortable';
import Base from './base.vue';
import { SortableEvent } from 'sortablejs';
import { useLauncherUiStore } from '@/stores/launcher-ui.js';

const props = defineProps<{
  page: number;
}>();

const emit = defineEmits<{
  end: [];
}>();

const { colCount, rowCount, dragNodeId, maxNodeCount } =
  storeToRefs(useLauncherUiStore());
const { setDragNodeId } = useLauncherUiStore();

const contentRef = useTemplateRef('contentRef');

//从哪里来的元素
const from = ref<'before' | 'after' | null>(null);

//开始拖拽
const handleStart = (e: SortableEvent) => {
  setDragNodeId(e.item.dataset.id);
  from.value = null;
};

//拖拽结束
const handleEnd = () => {
  setDragNodeId();
  from.value = null;
  emit('end');
};

//顺序改变
const handelChange = (e: SortableEvent) => {
  const fromPage = Number(e.from.getAttribute('data-page'));

  const diff = props.page - fromPage;

  //从文件夹弹窗拖拽 -> 当前页是最后一个隐藏最后一个
  const kind = e.from.getAttribute('data-kind');

  if (kind === 'group-dialog' && e.to.children.length >= maxNodeCount.value) {
    from.value = 'after';
    return;
  }

  //从前往后推拽 -> 隐藏当页第一个
  if (diff > 0) {
    from.value = 'before';
    return;
  }

  //从后往前拖拽 -> 隐藏当页最后一个
  if (diff < 0) {
    from.value = 'after';
    return;
  }
};

//从组中拖拽进来
const handleAdd = (e: SortableEvent) => {
  handleEnd();

  const kind = e.from.getAttribute('data-kind');

  //解决拖拽进来出现两个元素的bug
  if (kind === 'group') {
    e.item.remove();
  }
};

//创建sortable
useSortable(contentRef, {
  onStart: handleStart,
  onEnd: handleEnd,
  onChange: handelChange,
  onAdd: handleAdd,
});
</script>

<style scoped lang="scss">
.launcher-page {
  grid-template-rows: repeat(v-bind('rowCount'), minmax(0, 1fr));
  grid-template-columns: repeat(v-bind('colCount'), minmax(0, 1fr));
}
</style>
