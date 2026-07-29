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
import { useLauncherGridStore } from '@/stores/launcher-grid';

const { dragNodeId } = storeToRefs(useLauncherUiStore());
const { config } = storeToRefs(useSettingStore());
const { prePage, nextPage } = useLauncherGridStore();

//拖拽前一页
const [handlePreEnter, handlePreLeave] = useHover(prePage);

//拖拽后一页
const [handleNextEnter, handleNextLeave] = useHover(nextPage);
</script>

<style scoped lang="scss">
.launcher-page {
  grid-template-rows: repeat(v-bind('config.rowCount'), 1fr);
  grid-template-columns: repeat(v-bind('config.colCount'), 1fr);
}
</style>
