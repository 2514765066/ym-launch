<template>
  <AppNode v-if="node.kind == 'app'" :data="node" />

  <GroupNode v-else-if="node.kind == 'group'" :data="node" />
</template>

<script setup lang="ts">
import GroupNode from './group-node.vue';
import AppNode from './app-node.vue';
import { useLauncherStore } from '@/stores/launcher';

const props = defineProps<{
  id: string;
}>();

const { getNode } = useLauncherStore();

const node = computed(() => {
  return getNode(props.id);
});
</script>

<style scoped lang="scss"></style>
