<template>
  <Layout />

  <LauncherGroupDialog />
  <LauncherEditDialog />
</template>

<script setup lang="ts">
import Layout from '@/layout/index.vue';
import LauncherGroupDialog from '@/features/launcher-dialog/group-dialog.vue';
import LauncherEditDialog from '@/features/launcher-dialog/edit-dialog.vue';
</script>

<style scoped lang="scss"></style>
