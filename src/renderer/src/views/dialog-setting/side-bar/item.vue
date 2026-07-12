<template>
  <section
    class="h-9 px-2 flex items-center gap-2 rounded-md hover:bg-accent dark:hover:bg-accent/50 transition-colors [&>svg]:size-5"
    :class="{
      'bg-accent dark:bg-accent/50': active,
    }"
    @click="handleClick"
  >
    <component :is="data.icon" />

    <span class="text-sm">{{ data.name }}</span>
  </section>
</template>

<script setup lang="ts">
import { selectedRouteID } from "../router";
import type { Route } from "../router";

const props = defineProps<{
  data: Route;
}>();

//是否激活
const active = computed(() => {
  return selectedRouteID.value == props.data.id;
});

const handleClick = () => {
  selectedRouteID.value = props.data.id;
};
</script>

<style scoped lang="scss"></style>
