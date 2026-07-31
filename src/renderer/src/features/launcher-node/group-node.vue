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
      :id="data.id"
    />
  </BaseNode>
</template>

<script setup lang="ts">
import { useIsHover } from '@/hooks/use-hover.js';
import { useCoreStore } from '@/stores/core';
import { eventBus } from '@/utils/event-bus';
import { GroupNode } from '@shared/type';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import BaseNode from './base-node.vue';
import { useLayoutStore } from '@/stores/layout';
import GroupNodeIcon from '@/components/node-icon/group-node-icon.vue';
import { useDesktopStore } from '@/stores/desktop';

// 分组节点数据
const props = defineProps<{
  data: GroupNode;
}>();

// 当前拖拽的节点 ID
const { dragNodeId } = storeToRefs(useLauncherUiStore());

// 分组移动能力
const { moveAppToGroup } = useCoreStore();

// 启动台页面容量
const { pageSize } = storeToRefs(useLayoutStore());

// 分组 ID 查询能力
const { getGroupIds } = useDesktopStore();

// 分组节点悬停状态
const [isHover, handleEnter, handleLeave] = useIsHover();

//当前元素不是自己
const notSelf = computed(() => {
  return dragNodeId.value && props.data.id != dragNodeId.value;
});

// 分组内的应用 ID
const groupIds = computed(() => {
  return getGroupIds(props.data.id);
});

// 处理放入分组
const handleDrop = () => {
  handleLeave();

  //超过最大数
  if (pageSize.value == groupIds.value.length) {
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
