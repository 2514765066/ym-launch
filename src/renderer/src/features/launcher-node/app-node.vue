<template>
  <BaseNode
    :data="data"
    @pointerenter="notSelf && handleEnter()"
    @pointerleave="notSelf && handleLeave()"
    @pointerup="notSelf && handleDrop()"
    @click="handleClick"
  >
    <AppNodeIcon
      class="drop-shadow-xl"
      :id="data.id"
      :class="{
        'outline-[10%] outline-white/20': notSelf && isHover,
      }"
    >
      <button
        class="aspect-square p-1 absolute top-0 left-0 -translate-1/4 rounded-full bg-white"
        :style="{
          width: `${(nodeSize / 10) * 3}px`,
        }"
        v-if="status == 'edit'"
        @click.stop="removeAppNode(props.data.id)"
      >
        <X class="size-full text-black" />
      </button>
    </AppNodeIcon>

    <span class="truncate">
      {{ data.label }}
    </span>
  </BaseNode>
</template>

<script setup lang="ts">
import { X } from '@lucide/vue';
import { useIsHover } from '@/hooks/hover';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import { AppNode } from '@shared/type';
import BaseNode from './base-node.vue';
import { useLauncherNodeStore } from '@/stores/launcher-node.js';
import AppNodeIcon from '@/components/node-icon/app-node-icon.vue';

const props = defineProps<{
  data: AppNode;
}>();

const { dragNodeId, status, nodeSize } = storeToRefs(useLauncherUiStore());
const { createGroupNode, removeAppNode, openAppNode } = useLauncherNodeStore();

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
  if (dragNodeId.value || status.value == 'edit') {
    return;
  }

  openAppNode(props.data.id);
};
</script>

<style scoped lang="scss"></style>
