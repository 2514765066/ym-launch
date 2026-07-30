<template>
  <ContextMenuGroup>
    <ContextMenuItem @click="handleOpen">
      <FolderOpen />

      <span>打开</span>
    </ContextMenuItem>

    <ContextMenuSeparator />

    <ContextMenuItem @click="breakGroupNode(id)">
      <Ungroup />

      <span>拆散</span>
    </ContextMenuItem>
  </ContextMenuGroup>

  <ContextMenuGroup>
    <ContextMenuItem @click="handleRename">
      <SquarePen />

      <span>编辑</span>
    </ContextMenuItem>
  </ContextMenuGroup>

  <ContextMenuSeparator />

  <ContextMenuGroup>
    <ContextMenuItem variant="destructive" @click="removeGroupNode(id)">
      <Trash2 />

      <span>删除</span>
    </ContextMenuItem>
  </ContextMenuGroup>
</template>

<script setup lang="ts">
import {
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
} from '@/components/ui/context-menu';
import { useCoreStore } from '@/stores/core';
import { eventBus } from '@/utils/event-bus';
import { FolderOpen, SquarePen, Trash2, Ungroup } from '@lucide/vue';

const props = defineProps<{
  id: string;
}>();

const { breakGroupNode, removeGroupNode } = useCoreStore();

const handleOpen = () => {
  eventBus.emit('openGroupDialog', props.id);
};

const handleRename = () => {
  eventBus.emit('openEditDialog', props.id);
};
</script>

<style scoped lang="scss"></style>
