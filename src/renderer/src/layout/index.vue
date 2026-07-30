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
import LauncherHeader from './launcher-header.vue';
import { useRuntimeStore } from '@/runtime';

useRuntimeStore();
// 启动台桌面隐藏状态
const { hiddenDesktop } = storeToRefs(useLauncherUiStore());
// 启动台交互状态操作
const { setStatus } = useLauncherUiStore();

// 重置启动台交互状态
const handleClick = () => {
  setStatus('normal');
};
</script>

<style scoped lang="scss"></style>
