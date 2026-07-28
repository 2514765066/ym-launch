<template>
  <TooltipProvider>
    <Layout />
  </TooltipProvider>

  <LauncherGroupDialog />
  <LauncherEditDialog />
  <LauncherSetting />

  <Toaster />
</template>

<script setup lang="ts">
import Layout from '@/layout/index.vue';
import LauncherGroupDialog from '@/features/launcher-dialog/group-dialog.vue';
import LauncherEditDialog from '@/features/launcher-dialog/edit-dialog.vue';
import LauncherSetting from '@/features/launcher-settings/index.vue';
import { eventBus } from './utils/event-bus';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { toast } from 'vue-sonner';
import 'vue-sonner/style.css';

eventBus.on('success', (message) => {
  toast.success(message, {
    duration: 1500,
    position: 'top-center',
  });
});

eventBus.on('error', (message) => {
  toast.error(message, {
    duration: 1500,
    position: 'top-center',
  });
});
</script>

<style scoped lang="scss"></style>
