<template>
  <Dialog v-model:open="visible">
    <DialogContent
      class="glass min-w-[calc(80%+32px)] p-4 outline-0 rounded-4xl"
      overlay-class="bg-transparent"
      :aria-describedby="undefined"
      :show-close-button="false"
    >
      <DialogTitle
        class="w-full absolute top-0 translate-y-[calc(-100%-16px)] text-center text-2xl"
      >
        {{ groupNode.label }}
      </DialogTitle>

      <div
        ref="contentRef"
        class="size-full grid place-items-center"
        :style="{
          gridTemplateColumns: `repeat(${colCount},1fr)`,
        }"
        data-kind="group"
        @pointerenter="selectedNodeId && handleEnter()"
        @pointerleave="selectedNodeId && handleLeave()"
      >
        <template v-for="id in groupNode.children" :key="id">
          <div class="w-full flex-center aspect-square" :data-id="id">
            <LauncherNode :id="id" />
          </div>
        </template>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { SortableEvent } from 'sortablejs';
import LauncherNode from '@/features/launcher-node/index.vue';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useLauncherStore } from '@/stores/launcher';
import { useHover } from '@/hooks/hover';
import { eventBus } from '@/utils/event-bus.js';
import { GroupNode } from '@type';
import { useLayoutStore } from '@/stores/layout';
import { useSortable } from '@/hooks/sortable';
import { useLauncherSessionStore } from '@/stores/launcher-session';

const { colCount } = storeToRefs(useLayoutStore());
const {
  getNode,
  removeNode,
  removeAppFromGroup,
  setGroupChildren,
  breakGroup,
} = useLauncherStore();
const { selectedNodeId, hiddenDesktop } = storeToRefs(
  useLauncherSessionStore(),
);
const { setSelectedNodeId, setHiddenNodeId } = useLauncherSessionStore();

const contentRef = useTemplateRef('contentRef');

const groupId = ref('');
const visible = ref(false);

const groupNode = computed(() => {
  return getNode(groupId.value) as GroupNode;
});

const [handleLeave, handleEnter] = useHover(() => {
  visible.value = false;
}, 500);

//拖拽开始
const handleStart = (e: SortableEvent) => {
  setSelectedNodeId(e.item.dataset.id);

  if (groupNode.value.children.length !== 1) {
    return;
  }

  setHiddenNodeId(groupId.value);
};

//拖拽结束
const handleEnd = () => {
  setSelectedNodeId();
  setHiddenNodeId();

  if (!contentRef.value) {
    return;
  }

  const ids = Array.from(
    contentRef.value.querySelectorAll<HTMLElement>('[data-id]'),
  ).map((item) => item.dataset.id!);

  setGroupChildren(groupId.value, ids);
};

//拖拽离开组
const handleRemove = (e: SortableEvent) => {
  const appId = e.item.dataset.id!;

  removeAppFromGroup(groupId.value, appId);

  if (groupNode.value.children.length > 1) {
    return;
  }

  //如果只有一个节点拆分
  breakGroup(groupId.value);
};

const { createSortable } = useSortable(contentRef, {
  swapThreshold: 1,
  onStart: handleStart,
  onEnd: handleEnd,
  onRemove: handleRemove,
});

watch(visible, async (value) => {
  if (value === false) {
    hiddenDesktop.value = false;
    return;
  }

  await nextTick();

  createSortable();
});

eventBus.on('openGroupDialog', (id) => {
  groupId.value = id;
  visible.value = true;
  hiddenDesktop.value = true;
});
</script>

<style scoped lang="scss"></style>
