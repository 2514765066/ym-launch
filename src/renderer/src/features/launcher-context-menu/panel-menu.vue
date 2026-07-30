<template>
  <ContextMenuGroup>
    <ContextMenuItem @click="addAppNode">
      <ArrowDownToLine />

      <span>导入应用</span>

      <ContextMenuShortcut> Ctrl+O </ContextMenuShortcut>
    </ContextMenuItem>

    <ContextMenuItem @click="toggleRemoveStatus">
      <SquarePen />

      <span>{{ status === 'remove' ? '退出编辑状态' : '进入编辑状态' }}</span>
    </ContextMenuItem>
  </ContextMenuGroup>

  <ContextMenuSeparator />

  <ContextMenuGroup>
    <ContextMenuItem @click="handleClose">
      <Power />

      <span>关闭</span>

      <ContextMenuShortcut>
        {{ formatShortcut(config.hiddenShortcut) }}
      </ContextMenuShortcut>
    </ContextMenuItem>
  </ContextMenuGroup>
</template>

<script setup lang="ts">
import {
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from '@/components/ui/context-menu';
import { useCoreStore } from '@/stores/core';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import { useSettingStore } from '@/stores/setting';
import { ArrowDownToLine, Power, SquarePen } from '@lucide/vue';
import { formatShortcut } from '@/utils/format';

const { addAppNode } = useCoreStore();
const launcherUiStore = useLauncherUiStore();
const { setStatus } = launcherUiStore;
const { config } = storeToRefs(useSettingStore());
const { status } = storeToRefs(launcherUiStore);

const toggleRemoveStatus = () => {
  setStatus(status.value === 'remove' ? 'normal' : 'remove');
};

const handleClose = () => {
  ipc.hidden();
};
</script>

<style scoped lang="scss"></style>
