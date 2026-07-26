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
</template>

<script setup lang="ts">
import {
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
} from '@/components/ui/context-menu';
import { useLauncherNodeStore } from '@/stores/launcher-node';
import { eventBus } from '@/utils/event-bus';
import { FolderOpen, SquarePen, Ungroup } from '@lucide/vue';

const props = defineProps<{
  id: string;
}>();

const { breakGroupNode } = useLauncherNodeStore();

const handleOpen = () => {
  eventBus.emit('openGroupDialog', props.id);
};

const handleRename = () => {
  eventBus.emit('openEditDialog', props.id);
};
</script>

<style scoped lang="scss"></style>
