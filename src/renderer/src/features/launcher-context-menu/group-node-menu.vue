<template>
  <ContextMenuGroup>
    <ContextMenuItem @click="breakGroupNode(id)">
      <Ungroup />

      <span>拆散</span>
    </ContextMenuItem>
  </ContextMenuGroup>

  <ContextMenuSeparator />

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
import { SquarePen, Ungroup } from '@lucide/vue';

const props = defineProps<{
  id: string;
}>();

const { breakGroupNode } = useLauncherNodeStore();

const handleRename = () => {
  eventBus.emit('openEditDialog', props.id);
};
</script>

<style scoped lang="scss"></style>
