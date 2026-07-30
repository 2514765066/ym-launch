<template>
  <div class="relative rounded-lg">
    <img
      class="aspect-square object-contain drop-shadow-lg drop-shadow-black/30"
      :class="
        cn(viewClass, {
          'opacity-0': dragNodeId == id,
        })
      "
      :style="
        !isGroup && {
          width: `${nodeSize}px`,
        }
      "
      :src="icon"
      v-if="icon"
    />

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';
import { useNodeStore } from '@/stores/node';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import { useLauncherLayoutStore } from '@/stores/launcher-layout';
import { AppNode } from '@shared/type';
import { ClassValue } from 'vue';

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
