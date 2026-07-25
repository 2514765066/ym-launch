<template>
  <ContextMenuGroup>
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
</template>

<script setup lang="ts">
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
import { useLauncherStore } from '@/stores/launcher';
import { useLauncherNodeStore } from '@/stores/launcher-node';
import { eventBus } from '@/utils/event-bus';
import { CornerUpRight, FolderOpen, SquarePen } from '@lucide/vue';

const props = defineProps<{
  id: string;
}>();

const { nodes } = storeToRefs(useLauncherStore());
const { openAppNodeInFolder, moveAppToGroup } = useLauncherNodeStore();

//所有的文件夹节点
const groupNodes = computed(() => {
  return Object.values(nodes.value).filter((node) => node.kind == 'group');
});

//所在的group id
const currentGroupId = computed(() => {
  return groupNodes.value.find((g) => g.children.includes(props.id));
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
