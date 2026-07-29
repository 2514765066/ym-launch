<template>
  <section
    ref="containerRef"
    class="launcher size-full min-h-0 flex transition-transform duration-500 ease-in-out"
  >
    <template v-for="(ids, index) in pages" :key="index">
      <LauncherPage :page="index" @end="handleEnd">
        <LauncherNode v-for="id in ids" :key="id" :id="id" />
      </LauncherPage>
    </template>
  </section>
</template>

<script setup lang="ts">
import LauncherPage from './launcher-page/index.vue';
import LauncherNode from '@/features/launcher-node/index.vue';
import { useLauncherStore } from '@/stores/launcher';
import { useLauncherGridStore } from '@/stores/launcher-grid';

const { setDesktopIds } = useLauncherStore();
const { pages, selectedPage } = storeToRefs(useLauncherGridStore());

const containerRef = useTemplateRef('containerRef');

//处理结束
const handleEnd = async () => {
  if (!containerRef.value) {
    return;
  }

  const ids = Array.from(
    containerRef.value.querySelectorAll<HTMLElement>('[data-id]'),
  ).map((item) => item.dataset.id!);

  setDesktopIds(ids);
};
</script>

<style scoped lang="scss">
.launcher {
  transform: translateX(calc(v-bind('selectedPage') * -100%));
}
</style>
