<template>
  <section class="min-w-full h-full flex">
    <div class="w-[10%] h-full"></div>

    <VueDraggable
      class="content-page flex-1 grid"
      group="content-page"
      :animation="200"
      :forceFallback="true"
      v-model="model"
      @end="$emit('end')"
    >
      <template v-for="item in model" :key="item.id">
        <Item :data="item" />
      </template>
    </VueDraggable>

    <div class="w-[10%] h-full"></div>
  </section>
</template>

<script setup lang="ts">
import { VueDraggable } from "vue-draggable-plus";
import Item from "./item.vue";
import { App } from "@/stores/useAppsStore";
import { useLayoutStore } from "@/stores/useLayoutStore";

const { rowCount, colCount } = storeToRefs(useLayoutStore());

const model = defineModel<App[]>({ required: true });

defineEmits<{
  end: [];
}>();
</script>

<style lang="scss">
.content-page {
  grid-template-columns: repeat(v-bind("colCount"), 1fr);
  grid-template-rows: repeat(v-bind("rowCount"), 1fr);
}
</style>
