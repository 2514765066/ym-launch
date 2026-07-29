<template>
  <section
    ref="containerRef"
    class="launcher size-full min-h-0 flex transition-transform duration-500 ease-in-out"
  >
    <template v-for="(ids, index) in pageIds" :key="index">
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
import { useLauncherUiStore } from '@/stores/launcher-ui';
import { matchKeyword } from '@/utils/search';

const { desktopIds, nodes } = storeToRefs(useLauncherStore());
const { setDesktopIds } = useLauncherStore();
const { selectedPage, maxPageCount, maxNodeCount, keyword } =
  storeToRefs(useLauncherUiStore());

const containerRef = useTemplateRef('containerRef');

//每一页的id
const pageIds = computed(() => {
  if (keyword.value) {
    const result: string[][] = [];

    //按搜索词筛选出的节点
    const filterNodes = Object.values(nodes.value).filter(
      (node) =>
        matchKeyword(node.keyword, keyword.value) ||
        matchKeyword(node.label, keyword.value),
    );

    for (let i = 0; i < filterNodes.length / maxNodeCount.value; i++) {
      const nodes = filterNodes.slice(
        i * maxNodeCount.value,
        (i + 1) * maxNodeCount.value,
      );

      result.push(nodes.map((node) => node.id));
    }

    return result;
  }

  const result: string[][] = [];

  for (let i = 0; i < maxPageCount.value; i++) {
    const ids = desktopIds.value.slice(
      i * maxNodeCount.value,
      (i + 1) * maxNodeCount.value,
    );

    result.push(ids);
  }

  return result;
});

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
