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
import { useLauncherStore } from '@/stores/launcher';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import { useLauncherGridStore } from '@/stores/launcher-grid';
import { AppNode } from '@shared/type';
import { ClassValue } from 'vue';

const props = defineProps<{
  viewClass?: ClassValue;
  id: string;
  isGroup?: boolean;
}>();

const { getNode } = useLauncherStore();
const { dragNodeId } = storeToRefs(useLauncherUiStore());
const { nodeSize } = storeToRefs(useLauncherGridStore());

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
