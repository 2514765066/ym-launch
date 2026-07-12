<template>
  <Layout />

  <DialogSetting />

  <img :src="wallpaper" class="wh-screen fixed top-0 left-0 -z-10" />
</template>

<script setup lang="ts">
import { useEventListener, useThrottleFn } from "@vueuse/core";
import DialogSetting from "@/views/dialog-setting/index.vue";
import Layout from "@/layout/index.vue";
import { useWallpaperStore } from "@/stores/useWallpaperStore";
import { useLayoutStore } from "@/stores/useLayoutStore";

const { wallpaper } = storeToRefs(useWallpaperStore());
const { prePage, nextPage } = useLayoutStore();

//注册键盘事件
useEventListener("keyup", e => {
  if (e.key == "ArrowLeft") {
    prePage();
    return;
  }

  if (e.key == "ArrowRight") {
    nextPage();
    return;
  }
});

//注册鼠标事件
useEventListener(
  "wheel",
  useThrottleFn((e: WheelEvent) => {
    if (e.deltaY < 0 || e.deltaX < 0) {
      prePage();
      return;
    }

    if (e.deltaY > 0 || e.deltaX > 0) {
      nextPage();
      return;
    }
  }),
);
</script>

<style scoped lang="scss"></style>
