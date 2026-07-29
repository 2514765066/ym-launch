<template>
  <AlertDialog :open="data.visible" @update:open="handleOpenChange">
    <AlertDialogContent class="w-100">
      <AlertDialogHeader>
        <AlertDialogTitle>
          {{ data.title }}
        </AlertDialogTitle>

        <AlertDialogDescription>
          {{ data.description }}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel class="flex-1" @click.capture="handleCancel">
          {{ data.cancelButtonText || '取消' }}
        </AlertDialogCancel>

        <AlertDialogAction class="flex-1" @click.capture="handleConfirm">
          {{ data.confirmButtonText || '确定' }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { data, resolveConfirm } from './message-box';

// 处理确定
const handleConfirm = () => {
  resolveConfirm(true);
};

// 处理取消
const handleCancel = () => {
  resolveConfirm(false);
};

// 将非按钮关闭行为统一视为取消
const handleOpenChange = (visible: boolean) => {
  if (visible) {
    return;
  }

  resolveConfirm(false);
};
</script>

<style scoped lang="scss"></style>
