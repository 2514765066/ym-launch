<template>
  <div class="relative rounded-[24%]">
    <img
      class="aspect-square object-contain rounded-[inherit] drop-shadow-lg drop-shadow-black/30"
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
import { AppNode } from '@shared/type';

const props = defineProps<{
  viewClass?: string;
  id: string;
  isGroup?: boolean;
}>();

const { getNode } = useLauncherStore();
const { dragNodeId, nodeSize } = storeToRefs(useLauncherUiStore());

const node = computed(() => {
  return getNode(props.id) as AppNode;
});

//图标
const icon = ref('');

watchEffect(async () => {
  icon.value = await ipcRenderer.invoke('getIcon', node.value.path);
});
</script>

<style scoped lang="scss"></style>
