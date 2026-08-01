<template>
  <ContextMenuGroup>
    <ContextMenuItem @click="insertBlankPage">
      <BetweenHorizonalStart />

      <span>新增空白页</span>
    </ContextMenuItem>
  </ContextMenuGroup>

  <ContextMenuSeparator />

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

  <template v-if="isCurrentPageEmpty">
    <ContextMenuSeparator />

    <ContextMenuGroup>
      <ContextMenuItem variant="destructive" @click="removeBlankPage">
        <Trash2 />

        <span>删除当前空白页</span>
      </ContextMenuItem>
    </ContextMenuGroup>
  </template>
</template>

<script setup lang="ts">
import {
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
} from '@/components/ui/context-menu';
import { useCoreStore } from '@/stores/core';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import { useLayoutStore } from '@/stores/layout';
import {
  ArrowDownToLine,
  BetweenHorizonalStart,
  FolderDown,
  SquarePen,
  Trash2,
} from '@lucide/vue';

// 启动台节点导入操作
const { addAppNode, addFolderNode } = useCoreStore();

// 空白页状态和操作
const layoutStore = useLayoutStore();
const { isCurrentPageEmpty } = storeToRefs(layoutStore);
const { insertBlankPage, removeBlankPage } = layoutStore;

// 启动台界面状态仓库
const launcherUiStore = useLauncherUiStore();

// 启动台界面状态操作
const { setStatus } = launcherUiStore;

// 启动台当前交互状态
const { status } = storeToRefs(launcherUiStore);

// 切换启动台编辑状态
const toggleRemoveStatus = () => {
  setStatus(status.value === 'remove' ? 'normal' : 'remove');
};
</script>

<style scoped lang="scss"></style>
