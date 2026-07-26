<template>
  <section class="dark size-full flex-center" :data-id="data.id">
    <div
      class="flex-center flex-col gap-2"
      :data-id="data.id"
      :data-kind="data.kind"
      v-on-long-press="handleLongPress"
      @mousedown.left="handleMousedown"
      @mouseup.left="handleMouseup"
      @click.stop
    >
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
import { vOnLongPress } from '@vueuse/components';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import { Node } from '@shared/type';

const props = defineProps<{
  data: Node;
}>();

const emits = defineEmits<{
  click: [];
}>();

const { status } = storeToRefs(useLauncherUiStore());
const { setStatus } = useLauncherUiStore();

let time = 0;

const handleMousedown = () => {
  time = Date.now();
};

const handleMouseup = () => {
  const diff = Date.now() - time;

  if (diff > 200) {
    return;
  }

  emits('click');
};

const handleLongPress = () => {
  if (status.value == 'search') {
    return;
  }

  setStatus('remove');
};
</script>

<style scoped lang="scss"></style>
