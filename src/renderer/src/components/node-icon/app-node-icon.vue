<template>
  <div
    class="aspect-square relative flex-center rounded-lg"
    :class="{
      'opacity-0': dragNodeId == id,
    }"
    :style="
      !isGroup && {
        width: `${nodeSize}px`,
      }
    "
  >
    <img
      class="size-full object-contain drop-shadow-lg drop-shadow-black/30"
      :src="icon"
      v-if="icon"
    />

    <spinner class="size-1/2 text-muted-foreground" v-else />

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useNodeStore } from '@/stores/node';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import { useLauncherLayoutStore } from '@/stores/launcher-layout';
import { AppNode } from '@shared/type';
import { ClassValue } from 'vue';
import { Spinner } from '@/components/ui/spinner';

const props = defineProps<{
  viewClass?: ClassValue;
  id: string;
  isGroup?: boolean;
}>();

const { getNode } = useNodeStore();
const { dragNodeId } = storeToRefs(useLauncherUiStore());
const { nodeSize } = storeToRefs(useLauncherLayoutStore());

const node = computed(() => {
  return getNode(props.id) as AppNode;
});

//图标
const icon = ref('');

watchEffect(async () => {
  icon.value = await ipc.getIcon(node.value.path);
});
</script>

<style scoped lang="scss"></style>
