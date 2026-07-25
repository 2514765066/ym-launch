<template>
  <div
    class="group-node-icon glass aspect-square grid grid-cols-4 grid-rows-4 gap-[6%] rounded-[24%] transition-transform ease-in-out"
    :style="{
      width: `${(nodeSize / 10) * 11}px`,
      padding: `${nodeSize / 10}px`,
    }"
  >
    <AppNodeIcon
      class="rounded-[30%]"
      v-for="id in data.children.slice(0, 7)"
      :key="id"
      :id="id"
      is-group
    />
  </div>
</template>

<script setup lang="ts">
import { GroupNode } from '@shared/type';
import AppNodeIcon from './app-node-icon.vue';
import { useLauncherUiStore } from '@/stores/launcher-ui';

const props = defineProps<{
  data: GroupNode;
}>();

const { nodeSize } = storeToRefs(useLauncherUiStore());
</script>

<style scoped lang="scss">
.group-node-icon {
  > * {
    &:nth-child(1) {
      grid-area: 1 / 1 / 3 / 3;
    }

    &:nth-child(2) {
      grid-area: 1 / 3 / 3 / 5;
    }

    &:nth-child(3) {
      grid-area: 3 / 1 / 5 / 3;
    }
  }
}
</style>
