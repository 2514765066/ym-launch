<template>
  <component
    :is="nodeMap[node.kind]"
    :data-id="id"
    :data-kind="node.kind"
    :data="node"
  />
</template>

<script setup lang="ts">
import { useLauncherStore } from '@/stores/launcher';
import { nodeMap } from '.';

const props = defineProps<{
  id: string;
}>();

const { getNode } = useLauncherStore();

const node = computed(() => {
  return getNode(props.id);
});
</script>

<style scoped lang="scss"></style>
