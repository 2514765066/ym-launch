<template>
  <ContextMenuGroup>
    <ContextMenuItem>
      <FolderOpen />

      <span>打开</span>
    </ContextMenuItem>
  </ContextMenuGroup>

  <ContextMenuSeparator />

  <ContextMenuGroup>
    <ContextMenuItem>
      <SquarePen />

      <span>重命名</span>
    </ContextMenuItem>
  </ContextMenuGroup>

  <ContextMenuSeparator />

  <ContextMenuGroup>
    <ContextMenuItem>
      <Ungroup />

      <span>拆散</span>
    </ContextMenuItem>
  </ContextMenuGroup>
</template>

<script setup lang="ts">
import {
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
} from '@/components/ui/context-menu';
import { FolderOpen, SquarePen, Ungroup } from '@lucide/vue';
</script>

<style scoped lang="scss"></style>
