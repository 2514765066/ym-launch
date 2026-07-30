<template>
  <ContextMenuGroup>
    <ContextMenuItem @click="openAppNode(id)">
      <AppNodeIcon class="size-4" view-class="drop-shadow-none!" :id="id" />

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
import { eventBus } from '@/utils/event-bus';
import { CornerUpRight, FolderOpen, SquarePen, Trash2 } from '@lucide/vue';

const props = defineProps<{
  id: string;
}>();

const nodeStore = useNodeStore();
const { nodes } = storeToRefs(nodeStore);
const { openAppNode, openAppNodeInFolder } = nodeStore;
const { moveAppToGroup, removeAppNode } = useCoreStore();

//所有的文件夹节点
const groupNodes = computed(() => {
  return Object.values(nodes.value).filter((node) => node.kind == 'group');
});

//所在的group id
const currentGroupId = computed(() => {
  const group = groupNodes.value.find((g) => g.children.includes(props.id));

  return group?.id;
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
