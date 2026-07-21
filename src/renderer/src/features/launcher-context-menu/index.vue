<template>
  <ContextMenu>
    <ContextMenuTrigger as-child @contextmenu.capture="handleContextMenu">
      <slot></slot>
    </ContextMenuTrigger>

    <ContextMenuContent class="min-w-49" v-if="nodeMenuKind">
      <component :is="menuMap[nodeMenuKind]" v-if="nodeMenuKind" />
    </ContextMenuContent>
  </ContextMenu>
</template>

<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
} from '@/components/ui/context-menu';
import { MenuKind, useMenuStore } from '@/stores/menu';
import { menuMap } from '.';

const { nodeMenuKind } = storeToRefs(useMenuStore());
const { setNodeMenuKind } = useMenuStore();

//处理右键菜单
const handleContextMenu = (event: MouseEvent) => {
  const element = event.target as HTMLElement;

  const target = element.closest('[data-kind]') as HTMLElement;

  if (!target) {
    event.preventDefault();
    return;
  }

  const kind = target.dataset.kind as MenuKind;

  setNodeMenuKind(kind);
};
</script>

<style scoped lang="scss"></style>
