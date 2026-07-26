<template>
  <Dialog v-model:open="visible">
    <DialogContent
      class="dark glass min-w-[calc(80%+32px)] p-4 outline-0 rounded-[48px]"
      overlay-class="bg-transparent"
      :aria-describedby="undefined"
      :show-close-button="false"
    >
      <DialogTitle
        class="w-full absolute top-0 translate-y-[calc(-100%-32px)] text-center text-2xl font-normal"
      >
        {{ groupNode.label || '未命名' }}
      </DialogTitle>

      <div
        ref="contentRef"
        class="size-full grid place-items-center"
        :style="{
          gridTemplateColumns: `repeat(${colCount},1fr)`,
        }"
        data-kind="group-dialog"
        @pointerenter="dragNodeId && handleEnter()"
        @pointerleave="dragNodeId && handleLeave()"
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
import { GroupNode } from '@shared/type';
import { useSortable } from '@/hooks/sortable';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import { useLauncherNodeStore } from '@/stores/launcher-node';

const { colCount } = storeToRefs(useLauncherUiStore());
const { getNode, removeAppFromGroup, setGroupChildren } = useLauncherStore();
const { dragNodeId, hiddenDesktop } = storeToRefs(useLauncherUiStore());
const { setDragNodeId } = useLauncherUiStore();
const { breakGroupNode } = useLauncherNodeStore();

const contentRef = useTemplateRef('contentRef');

//组id
const groupId = ref('');

// 弹窗可见状态
const visible = ref(false);

// 当前弹窗对应的有效分组
const groupNode = computed(() => {
  return getNode(groupId.value) as GroupNode;
});

const [handleLeave, handleEnter] = useHover(() => {
  visible.value = false;
}, 500);

//拖拽开始
const handleStart = (e: SortableEvent) => {
  setDragNodeId(e.item.dataset.id);

  if (groupNode.value.children.length !== 1) {
    return;
  }
};

//拖拽结束
const handleEnd = () => {
  setDragNodeId();

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
  breakGroupNode(groupId.value);
};

const { createSortable } = useSortable(contentRef, {
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

// 分组被拆散后关闭弹窗
watch(groupNode, (node) => {
  if (node || !visible.value) {
    return;
  }

  visible.value = false;
});

eventBus.on('openGroupDialog', (id) => {
  groupId.value = id;
  hiddenDesktop.value = true;
  visible.value = true;
});
</script>

<style scoped lang="scss"></style>
