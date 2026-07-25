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
import { useHover } from '@/hooks/hover';
import { useLauncherUiStore } from '@/stores/launcher-ui';

const { dragNodeId } = storeToRefs(useLauncherUiStore());
const { colCount, rowCount } = storeToRefs(useLauncherUiStore());
const { prePage, nextPage } = useLauncherUiStore();

//拖拽前一页
const [handlePreEnter, handlePreLeave] = useHover(prePage);

//拖拽后一页
const [handleNextEnter, handleNextLeave] = useHover(nextPage);
</script>

<style scoped lang="scss">
.launcher-page {
  grid-template-rows: repeat(v-bind('rowCount'), 1fr);
  grid-template-columns: repeat(v-bind('colCount'), 1fr);
}
</style>
