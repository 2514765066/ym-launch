<template>
  <AppNode v-if="isAppNode(node)" :data="node" />

  <GroupNode v-else-if="isGroupNode(node)" :data="node" />
</template>

<script setup lang="ts">
import GroupNode from './group-node.vue';
import AppNode from './app-node.vue';
import { useNodeStore } from '@/stores/node';

const props = defineProps<{
  id: string;
}>();

const { getNode, isGroupNode, isAppNode } = useNodeStore();

const node = computed(() => {
  return getNode(props.id);
});
</script>

<style scoped lang="scss"></style>
