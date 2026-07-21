<template>
  <ContextMenuGroup>
    <ContextMenuItem>
      <SquareArrowOutUpRight />

      <span>打开</span>
    </ContextMenuItem>

    <ContextMenuItem>
      <FolderOpen />

      <span>在文件管理器中显示</span>
    </ContextMenuItem>
  </ContextMenuGroup>

  <ContextMenuSeparator />

  <ContextMenuGroup>
    <ContextMenuSub>
      <ContextMenuSubTrigger>
        <CornerUpRight />

        <span>移动到</span>
      </ContextMenuSubTrigger>

      <ContextMenuSubContent> </ContextMenuSubContent>
    </ContextMenuSub>

    <ContextMenuItem>
      <EyeOff />

      <span>隐藏</span>
    </ContextMenuItem>

    <ContextMenuItem>
      <SquarePen />

      <span>重命名</span>
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
} from '@/components/ui/context-menu';
import {
  CornerUpRight,
  EyeOff,
  FolderOpen,
  SquareArrowOutUpRight,
  SquarePen,
} from '@lucide/vue';
</script>

<style scoped lang="scss"></style>
