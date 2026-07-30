<template>
  <section class="size-full flex shrink-0">
    <div
      class="w-[10%] h-full shrink-0"
      @pointerenter="dragNodeId && handlePreEnter()"
      @pointerleave="dragNodeId && handlePreLeave()"
    ></div>

    <slot />

    <div
      class="w-[10%] h-full shrink-0"
      @pointerenter="dragNodeId && handleNextEnter()"
      @pointerleave="dragNodeId && handleNextLeave()"
    ></div>
  </section>
</template>

<script setup lang="ts">
import { useHover } from '@/hooks/use-hover';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import { useSettingStore } from '@/stores/setting';
import { useLauncherLayoutStore } from '@/stores/launcher-layout';

const { dragNodeId } = storeToRefs(useLauncherUiStore());
const { config } = storeToRefs(useSettingStore());
const { setSelectedPage } = useLauncherLayoutStore();

//拖拽前一页
const [handlePreEnter, handlePreLeave] = useHover(() => {
  setSelectedPage((c) => c - 1);
});

//拖拽后一页
const [handleNextEnter, handleNextLeave] = useHover(() => {
  setSelectedPage((c) => c + 1);
});
</script>

<style scoped lang="scss">
.launcher-page {
  grid-template-rows: repeat(v-bind('config.rowCount'), 1fr);
  grid-template-columns: repeat(v-bind('config.colCount'), 1fr);
}
</style>
