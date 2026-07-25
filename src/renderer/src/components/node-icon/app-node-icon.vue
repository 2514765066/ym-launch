<template>
  <img
    class="aspect-square object-cover rounded-[24%]"
    :class="{
      'opacity-0': dragNodeId == id,
    }"
    :style="
      !isGroup && {
        width: `${nodeSize}px`,
      }
    "
    :src="icon"
    v-if="icon"
  />
</template>

<script setup lang="ts">
import { useLauncherStore } from '@/stores/launcher';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import { AppNode } from '@shared/type';

const props = defineProps<{
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

onMounted(async () => {
  icon.value = await ipcRenderer.invoke('getIcon', node.value.path);
});
</script>

<style scoped lang="scss"></style>
