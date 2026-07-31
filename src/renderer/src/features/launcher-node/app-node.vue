<template>
  <BaseNode
    :data="data"
    @pointerenter="notSelf && handleEnter()"
    @pointerleave="notSelf && handleLeave()"
    @pointerup="notSelf && handleDrop()"
    @click="handleClick"
  >
    <AppNodeIcon
      :class="{
        'outline-[10%] outline-primary': notSelf && isHover,
      }"
      :id="data.id"
    >
      <button
        class="aspect-square p-1 absolute top-0 left-0 -translate-1/4 rounded-full bg-white shadow-lg shadow-black/30"
        :style="{
          width: `${(nodeSize / 10) * 3}px`,
        }"
        v-if="status == 'remove'"
        @click.stop="removeAppNode(props.data.id)"
      >
        <X class="size-full text-black" />
      </button>
    </AppNodeIcon>
  </BaseNode>
</template>

<script setup lang="ts">
import { X } from '@lucide/vue';
import { useIsHover } from '@/hooks/use-hover.js';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import { AppNode } from '@shared/type';
import BaseNode from './base-node.vue';
import { useNodeStore } from '@/stores/node.js';
import { useCoreStore } from '@/stores/core';
import AppNodeIcon from '@/components/node-icon/app-node-icon.vue';
import { useLayoutStore } from '@/stores/layout';

const props = defineProps<{
  data: AppNode;
}>();

const { dragNodeId, status } = storeToRefs(useLauncherUiStore());
const { nodeSize } = storeToRefs(useLayoutStore());
const { openAppNode } = useNodeStore();
const { createGroupNode, removeAppNode } = useCoreStore();

const [isHover, handleEnter, handleLeave] = useIsHover();

//当前元素是不是自己
const notSelf = computed(() => {
  return dragNodeId.value && props.data.id != dragNodeId.value;
});

// 处理放入分组
const handleDrop = () => {
  handleLeave();

  createGroupNode(props.data.id, dragNodeId.value!);
};

//打开应用
const handleClick = () => {
  if (dragNodeId.value || status.value == 'remove') {
    return;
  }

  openAppNode(props.data.id);
};
</script>

<style scoped lang="scss"></style>
