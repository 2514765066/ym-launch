<template>
  <section class="dark size-full flex-center" :data-id="data.id">
    <div
      class="relative flex-center flex-col gap-2"
      :data-id="data.id"
      :data-kind="data.kind"
      v-on-long-press="handleLongPress"
      @click.stop="handleClick"
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

const { setStatus } = useLauncherUiStore();

let islongpress = false;

const handleClick = () => {
  if (islongpress) {
    islongpress = false;
    return;
  }

  emits('click');
};

const handleLongPress = () => {
  islongpress = true;
  setStatus('edit');
};
</script>

<style scoped lang="scss"></style>
