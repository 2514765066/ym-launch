<template>
  <section
    ref="containerRef"
    class="launcher size-full flex transition-transform duration-500 ease-in-out"
  >
    <template v-for="(ids, index) in pageIds" :key="index">
      <LauncherPage :page="index" @end="handleEnd">
        <template v-for="id in ids" :key="id">
          <LauncherNode :id="id" />
        </template>
      </LauncherPage>
    </template>
  </section>
</template>

<script setup lang="ts">
import LauncherPage from './launcher-page/index.vue';
import LauncherNode from '@/features/launcher-node/index.vue';
import { useLauncherStore } from '@/stores/launcher';
import { useLayoutStore } from '@/stores/layout';

const { desktopIds } = storeToRefs(useLauncherStore());
const { setDesktopIds } = useLauncherStore();
const { selectedPage, maxPageCount, maxNodeCount } =
  storeToRefs(useLayoutStore());

const containerRef = useTemplateRef('containerRef');

//每一页的id
const pageIds = computed(() => {
  const result: string[][] = [[]];

  for (let i = 0; i < maxPageCount.value; i++) {
    const ids = desktopIds.value.slice(
      i * maxNodeCount.value,
      (i + 1) * maxNodeCount.value,
    );

    result.unshift(ids);
  }

  return result;
});

//处理结束
const handleEnd = () => {
  if (!containerRef.value) {
    return;
  }

  const ids = Array.from(
    containerRef.value.querySelectorAll<HTMLElement>('[data-id]'),
  ).map((item) => item.dataset.id!);

  console.log(ids);

  setDesktopIds(ids);
};
</script>

<style scoped lang="scss">
.launcher {
  transform: translateX(calc(v-bind('selectedPage') * -100%));
}
</style>
