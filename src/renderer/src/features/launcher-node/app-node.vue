<template>
  <section
    class="app-node aspect-square relative flex-center shrink-0"
    @pointerenter="notSelf && handleEnter()"
    @pointerleave="notSelf && handleLeave()"
    @pointerup="notSelf && handleDrop()"
  >
    <img
      class="size-full object-cover rounded-[20%]"
      :class="{
        'outline-[10%] outline-white/20': notSelf && isHover,
      }"
      src="@/assets/bg.jpg"
    />

    <span class="absolute bottom-0 translate-y-[calc(100%+4px)] truncate">
      {{ data.label }}
    </span>
  </section>
</template>

<script setup lang="ts">
import { useIsHover } from '@/hooks/hover';
import { useLauncherStore } from '@/stores/launcher';
import { useLauncherSessionStore } from '@/stores/launcher-session';
import { useLayoutStore } from '@/stores/layout';
import { AppNode } from '@type';

const props = defineProps<{
  data: AppNode;
}>();

const { nodeSize } = storeToRefs(useLayoutStore());
const { selectedNodeId } = storeToRefs(useLauncherSessionStore());
const { createGroup } = useLauncherStore();

const [isHover, handleEnter, handleLeave] = useIsHover();

//当前元素是不是自己
const notSelf = computed(() => {
  return selectedNodeId.value && props.data.id != selectedNodeId.value;
});

const handleDrop = () => {
  handleLeave();

  createGroup(props.data.id, selectedNodeId.value!);
};
</script>

<style scoped lang="scss">
.app-node {
  width: calc(v-bind('nodeSize') * 1px);
}
</style>
