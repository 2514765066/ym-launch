<template>
  <BaseNode
    :data="data"
    @pointerenter="notSelf && handleEnter()"
    @pointerleave="notSelf && handleLeave()"
    @pointerup="notSelf && handleDrop()"
    @click="handleClick"
  >
    <GroupNodeIcon
      :class="{
        'scale-110': notSelf && isHover,
      }"
      :data="data"
    />

    <span class="truncate">
      {{ data.label || '未命名' }}
    </span>
  </BaseNode>
</template>

<script setup lang="ts">
import { useIsHover } from '@/hooks/hover';
import { useLauncherStore } from '@/stores/launcher';
import { eventBus } from '@/utils/event-bus';
import { GroupNode } from '@shared/type';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import BaseNode from './base-node.vue';
import { useLauncherNodeStore } from '@/stores/launcher-node';
import GroupNodeIcon from '@/components/node-icon/group-node-icon.vue';

const props = defineProps<{
  data: GroupNode;
}>();

const { dragNodeId } = storeToRefs(useLauncherUiStore());
const { getGroupChildren } = useLauncherStore();
const { maxNodeCount } = storeToRefs(useLauncherUiStore());
const { moveAppToGroup } = useLauncherNodeStore();

const [isHover, handleEnter, handleLeave] = useIsHover();

//当前元素不是自己
const notSelf = computed(() => {
  return dragNodeId.value && props.data.id != dragNodeId.value;
});

//所有子元素
const children = computed(() => {
  return getGroupChildren(props.data.id);
});

// 处理放入分组
const handleDrop = () => {
  handleLeave();

  //超过最大数
  if (maxNodeCount.value == children.value.length) {
    return;
  }

  moveAppToGroup(props.data.id, dragNodeId.value!);
};

// 打开应用分组
const handleClick = () => {
  if (dragNodeId.value) {
    return;
  }

  eventBus.emit('openGroupDialog', props.data.id);
};
</script>

<style scoped lang="scss"></style>
