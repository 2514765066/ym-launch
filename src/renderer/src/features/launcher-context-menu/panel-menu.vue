<template>
  <ContextMenuGroup>
    <ContextMenuItem @click="addAppNode">
      <ArrowDownToLine />

      <span>导入应用</span>
    </ContextMenuItem>

    <ContextMenuItem @click="addFolderNode">
      <FolderDown />

      <span>导入文件夹</span>
    </ContextMenuItem>
  </ContextMenuGroup>

  <ContextMenuSeparator />

  <ContextMenuGroup>
    <ContextMenuItem @click="toggleRemoveStatus">
      <SquarePen />

      <span>{{ status === 'remove' ? '退出编辑' : '编辑' }}</span>
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
import { ArrowDownToLine, FolderDown, Power, SquarePen } from '@lucide/vue';
import { formatShortcut } from '@/utils/format';

// 启动台节点导入操作
const { addAppNode, addFolderNode } = useCoreStore();

// 启动台界面状态仓库
const launcherUiStore = useLauncherUiStore();

// 启动台界面状态操作
const { setStatus } = launcherUiStore;

// 启动台设置配置
const { config } = storeToRefs(useSettingStore());

// 启动台当前交互状态
const { status } = storeToRefs(launcherUiStore);

// 切换启动台编辑状态
const toggleRemoveStatus = () => {
  setStatus(status.value === 'remove' ? 'normal' : 'remove');
};

// 关闭启动台窗口
const handleClose = () => {
  ipc.hidden();
};
</script>

<style scoped lang="scss"></style>
