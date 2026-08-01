<template>
  <ContextMenuGroup>
    <ContextMenuItem @click="openAppNode(id)">
      <AppNodeIcon class="size-4! drop-shadow-none!" :id="id" />

      <span>打开</span>
    </ContextMenuItem>

    <ContextMenuItem @click="openAppNodeInFolder(id)">
      <FolderOpen />

      <span>在文件管理器中显示</span>
    </ContextMenuItem>
  </ContextMenuGroup>

  <ContextMenuSeparator />

  <ContextMenuGroup>
    <ContextMenuSub>
      <ContextMenuSubTrigger
        :class="{
          'opacity-50': groupNodes.length == 0,
        }"
        :disabled="groupNodes.length == 0"
      >
        <CornerUpRight />

        <span>移动到</span>
      </ContextMenuSubTrigger>

      <ContextMenuSubContent>
        <ContextMenuRadioGroup
          :model-value="currentGroupId"
          @update:model-value="handleMove"
        >
          <ContextMenuRadioItem
            v-for="node in groupNodes"
            :key="node.id"
            :value="node.id"
          >
            {{ node.label }}
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuSubContent>
    </ContextMenuSub>

    <ContextMenuItem @click="handleRename">
      <SquarePen />

      <span>编辑</span>
    </ContextMenuItem>
  </ContextMenuGroup>

  <ContextMenuSeparator />

  <ContextMenuGroup>
    <ContextMenuItem variant="destructive" @click="removeAppNode(id)">
      <Trash2 />

      <span>删除</span>
    </ContextMenuItem>
  </ContextMenuGroup>
</template>

<script setup lang="ts">
import AppNodeIcon from '@/components/node-icon/app-node-icon.vue';
import {
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
} from '@/components/ui/context-menu';
import { useNodeStore } from '@/stores/node';
import { useCoreStore } from '@/stores/core';
import { useDesktopStore } from '@/stores/desktop';
import { useGroupStore } from '@/stores/group';
import { eventBus } from '@/utils/event-bus';
import { CornerUpRight, FolderOpen, SquarePen, Trash2 } from '@lucide/vue';

// 应用节点 ID
const props = defineProps<{
  id: string;
}>();

// 节点数据仓库
const nodeStore = useNodeStore();

// 所有应用和分组节点
const { nodes } = storeToRefs(nodeStore);

// 应用节点操作
const { openAppNode, openAppNodeInFolder, isGroupNode } = nodeStore;

// 应用移动和删除能力
const { moveAppToGroup, removeAppNode } = useCoreStore();

// 桌面数据仓库
const desktopStore = useDesktopStore();

// 桌面节点 ID
const { desktopNodeIds } = storeToRefs(desktopStore);

// 应用所属分组查询能力
const { findAppGroupId } = useGroupStore();

// 按桌面展示顺序排列的文件夹节点
const groupNodes = computed(() => {
  return desktopNodeIds.value
    .map((nodeId) => {
      return nodes.value[nodeId];
    })
    .filter(isGroupNode);
});

//所在的group id
const currentGroupId = computed(() => {
  return findAppGroupId(props.id);
});

//重命名
const handleRename = () => {
  eventBus.emit('openEditDialog', props.id);
};

//移动
const handleMove = (groupId) => {
  moveAppToGroup(groupId, props.id);
};
</script>

<style scoped lang="scss"></style>
