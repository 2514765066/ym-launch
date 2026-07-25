<template>
  <LauncherBackground>
    <LauncherContextMenu>
      <section
        class="size-full flex flex-col"
        :class="{
          'opacity-0': hiddenDesktop,
        }"
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

const { hiddenDesktop } = storeToRefs(useLauncherUiStore());
const { prePage, nextPage, setStatus, hidden } = useLauncherUiStore();

const handleClick = () => {
  setStatus('normal');
};

useEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      prePage();
      return;
    case 'ArrowRight':
      nextPage();
      return;
    case 'Escape':
      hidden();
      return;
  }
});

useEventListener('wheel', (e) => {
  if (e.deltaY < 0) {
    prePage();
    return;
  }

  if (e.deltaY > 0) {
    nextPage();
    return;
  }
});
</script>

<style scoped lang="scss"></style>
