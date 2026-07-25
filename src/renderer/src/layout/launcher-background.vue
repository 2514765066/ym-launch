<template>
  <section class="size-screen relative overflow-hidden">
    <img class="absolute inset-0 object-cover" :src="wallpaper" />

    <div
      class="size-full"
      :style="{
        backdropFilter: `blur(${blur}px)`,
      }"
    >
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLauncherUiStore } from '@/stores/launcher-ui';

const { wallpaper, blur } = storeToRefs(useLauncherUiStore());
</script>

<style scoped lang="scss"></style>
