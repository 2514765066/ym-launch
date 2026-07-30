<template>
  <LauncherBackground>
    <LauncherContextMenu>
      <section
        class="size-full flex flex-col"
        :class="{
          'opacity-0': hiddenDesktop,
        }"
        data-kind="panel"
        @click="handleClick"
      >
        <LauncherHeader />

        <LauncherContent />

        <LauncherFooter />
      </section>
    </LauncherContextMenu>
  </LauncherBackground>
</template>

<script setup lang="ts">
import LauncherBackground from './launcher-background.vue';
import LauncherContextMenu from '@/features/launcher-context-menu/index.vue';
import LauncherContent from './launcher-content/index.vue';
import { useLauncherUiStore } from '@/stores/launcher-ui.js';
import LauncherFooter from './launcher-footer.vue';
import { useEventListener } from '@vueuse/core';
import LauncherHeader from './launcher-header.vue';
import { useRuntimeStore } from '@/runtime';
import { useLauncherLayoutStore } from '@/stores/launcher-layout';

useRuntimeStore();
const { hiddenDesktop } = storeToRefs(useLauncherUiStore());
const { setStatus } = useLauncherUiStore();
const { setSelectedPage } = useLauncherLayoutStore();

const handleClick = () => {
  setStatus('normal');
};

useEventListener('wheel', (e) => {
  if (e.deltaY < 0) {
    setSelectedPage((c) => c - 1);
    return;
  }

  if (e.deltaY > 0) {
    setSelectedPage((c) => c + 1);
    return;
  }
});
</script>

<style scoped lang="scss"></style>
