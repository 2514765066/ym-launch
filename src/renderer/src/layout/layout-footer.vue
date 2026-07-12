<template>
  <section class="flex justify-center gap-3">
    <div
      class="glass-button size-2.5 cursor-pointer"
      v-for="(_, index) in pageSize"
      :key="index"
      :class="{ 'bg-white/80!': index == currentPage }"
      @click="handleClick(index)"
    />
  </section>
</template>

<script setup lang="ts">
import { useLayoutStore } from "@/stores/useLayoutStore";

const { pageSize, currentPage } = storeToRefs(useLayoutStore());

//切换页码
const handleClick = (page: number) => {
  currentPage.value = page;
};
</script>

<style scoped lang="scss"></style>
