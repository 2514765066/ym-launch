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
      v-for="id in groupIds.slice(0, 7)"
      :key="id"
      :id="id"
      is-group
    />
  </div>
</template>

<script setup lang="ts">
import AppNodeIcon from './app-node-icon.vue';
import { useLayoutStore } from '@/stores/layout';
import { useDesktopStore } from '@/stores/desktop';

// 分组节点数据
const props = defineProps<{
  id: string;
}>();

// 启动台节点尺寸
const { nodeSize } = storeToRefs(useLayoutStore());

// 分组 ID 查询能力
const { getGroupIds } = useDesktopStore();

// 分组内的应用 ID
const groupIds = computed(() => {
  return getGroupIds(props.id);
});
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
