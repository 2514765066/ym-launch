<template>
  <section class="dark py-5 flex-center">
    <main
      class="w-fit p-2.5 flex gap-3 rounded-full transition-all"
      :class="{
        glass: isHover,
        'opacity-0': pageCount == 1,
      }"
      @mouseenter="handleEnter"
      @mouseleave="handleLeave"
    >
      <div
        class="size-2.5 rounded-full backdrop-blur bg-foreground/30 hover:scale-110 transition-transform"
        :class="{
          'bg-foreground!': selectedPage == index,
        }"
        v-for="(_, index) in pageCount"
        :key="index"
        @click="setSelectedPage(index)"
      ></div>
    </main>
  </section>
</template>

<script setup lang="ts">
import { useIsHover } from '@/hooks/use-hover';
import { useLauncherLayoutStore } from '@/stores/launcher-layout';

const launcherLayoutStore = useLauncherLayoutStore();
const { selectedPage, pageCount } = storeToRefs(launcherLayoutStore);
const { setSelectedPage } = launcherLayoutStore;

const [isHover, handleEnter, handleLeave] = useIsHover(0);
</script>

<style scoped lang="scss"></style>
