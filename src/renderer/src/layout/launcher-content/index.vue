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
import { useLauncherLayoutStore } from '@/stores/launcher-layout';

// 启动台布局状态
const launcherLayoutStore = useLauncherLayoutStore();

// 当前页面列表与选中页
const { pages, selectedPage } = storeToRefs(launcherLayoutStore);

// 拖拽写回和节点页面选择能力
const { setDraggedDesktopPages } = launcherLayoutStore;

// 启动台所有页面的容器
const containerRef = useTemplateRef('containerRef');

// 处理拖拽结束后的逐页布局写回
const handleEnd = () => {
  if (!containerRef.value) {
    return;
  }

  //所有页面元素
  const pageElements =
    containerRef.value.querySelectorAll<HTMLElement>('[data-page]');

  //页面中的子元素
  const desktopPages = Array.from(pageElements).map((pageElement) => {
    const children = Array.from(pageElement.children);

    return children
      .map((child) => (child as HTMLElement).dataset.id)
      .filter((id): id is string => Boolean(id));
  });

  setDraggedDesktopPages(desktopPages);
};
</script>

<style scoped lang="scss">
.launcher {
  transform: translateX(calc(v-bind('selectedPage') * -100%));
}
</style>
