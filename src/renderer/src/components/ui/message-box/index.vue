<template>
  <AlertDialog v-model:open="data.visible">
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
        <AlertDialogCancel class="flex-1" @click="handleCancel">
          {{ data.cancelButtonText || "取消" }}
        </AlertDialogCancel>

        <AlertDialogAction class="flex-1" @click="handleConfirm">
          {{ data.confirmButtonText || "确定" }}
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
} from "@/components/ui/alert-dialog";
import { data } from "./message-box";

//处理确定
const handleConfirm = () => {
  data.onConfirm();
  data.visible = false;
};

//处理取消
const handleCancel = () => {
  data.onCancel();
  data.visible = false;
};
</script>

<style scoped lang="scss"></style>
