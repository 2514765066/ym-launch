<template>
  <Base>
    <section
      ref="contentRef"
      class="launcher-page flex-1 grid place-items-center"
      :class="{
        '*:first:hidden': selectedNodeId && from === 'before',
        '*:last:hidden': selectedNodeId && from === 'after',
      }"
      :data-page="page"
    >
      <slot />
    </section>
  </Base>
</template>

<script setup lang="ts">
import { useLauncherStore } from '@/stores/launcher';
import { useLayoutStore } from '@/stores/layout';
import { useSortable } from '@/hooks/sortable';
import Base from './base.vue';
import { SortableEvent } from 'sortablejs';
import { useLauncherSessionStore } from '@/stores/launcher-session.js';

const props = defineProps<{
  page: number;
}>();

const emit = defineEmits<{
  end: [];
}>();

const { selectedNodeId } = storeToRefs(useLauncherSessionStore());
const { setSelectedNodeId } = useLauncherSessionStore();
const { colCount, rowCount, maxNodeCount } = storeToRefs(useLayoutStore());

const contentRef = useTemplateRef('contentRef');

//从哪里来的元素
const from = ref<'before' | 'after' | null>(null);

//开始拖拽
const handleStart = (e: SortableEvent) => {
  setSelectedNodeId(e.item.dataset.id);
  from.value = null;
};

//拖拽结束
const handleEnd = () => {
  setSelectedNodeId();
  from.value = null;
  emit('end');
};

//顺序改变
const handelChange = (e: SortableEvent) => {
  const childrenCount = contentRef.value?.children.length ?? 0;

  if (childrenCount <= maxNodeCount.value) {
    return;
  }

  //从组中拖拽过来
  const kind = e.from.getAttribute('data-kind');

  if (kind === 'group') {
    from.value = 'after';
    return;
  }

  const fromPage = Number(e.from.getAttribute('data-page'));

  const diff = props.page - fromPage;

  if (diff === 0) {
    return;
  }

  if (diff > 0) {
    from.value = 'before';
    return;
  }

  from.value = 'after';
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
