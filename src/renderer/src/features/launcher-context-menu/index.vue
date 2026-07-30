<template>
  <ContextMenu>
    <ContextMenuTrigger
      as-child
      :disabled="isSearching"
      @contextmenu.capture="handleContextMenu"
    >
      <slot></slot>
    </ContextMenuTrigger>

    <ContextMenuContent class="min-w-49" v-if="menuKind">
      <component
        :is="menuMap[menuKind]"
        v-bind="menuKind === 'panel' ? {} : { id: nodeId }"
      />
    </ContextMenuContent>
  </ContextMenu>
</template>

<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
} from '@/components/ui/context-menu';
import { menuMap } from '.';
import { useLauncherUiStore } from '@/stores/launcher-ui';

const { isSearching } = storeToRefs(useLauncherUiStore());

export type MenuKind = 'app' | 'group' | 'panel' | null;

const menuKind = ref<MenuKind>(null);
const nodeId = ref<string | null>(null);

//处理右键菜单
const handleContextMenu = (event: MouseEvent) => {
  const element = event.target as HTMLElement;

  const target = element.closest('[data-menu-kind]') as HTMLElement;

  if (!target) {
    event.preventDefault();
    return;
  }

  const kind = target.dataset.menuKind as MenuKind;
  const id = target.dataset.id as string;

  nodeId.value = id;
  menuKind.value = kind;
};
</script>

<style scoped lang="scss"></style>
