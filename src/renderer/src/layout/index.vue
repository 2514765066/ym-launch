<template>
  <LauncherBackground>
    <LauncherContextMenu>
      <Launcher
        :class="{
          'opacity-0': hiddenDesktop,
        }"
      />
    </LauncherContextMenu>
  </LauncherBackground>
</template>

<script setup lang="ts">
import LauncherBackground from './launcher-background.vue';
import LauncherContextMenu from '@/features/launcher-context-menu/index.vue';
import Launcher from './launcher/index.vue';
import { useLauncherSessionStore } from '@/stores/launcher-session';

const { hiddenDesktop } = storeToRefs(useLauncherSessionStore());
</script>

<style scoped lang="scss"></style>
