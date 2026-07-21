<template>
  <section
    class="group-node aspect-square relative flex-center"
    :class="{
      'hidden!': hiddenNodeId === data.id,
    }"
    @pointerenter="notSelf && handleEnter()"
    @pointerleave="notSelf && handleLeave()"
    @pointerup="notSelf && handleDrop()"
    @click="handleClick"
  >
    <div
      class="glass size-full grid grid-cols-4 grid-rows-4 gap-[6%] p-[8%] rounded-[20%] transition-transform ease-in-out"
      :class="{
        'scale-110': notSelf && isHover,
      }"
    >
      <template v-for="item in children.slice(0, 7)" :key="item.id">
        <img
          class="aspect-square object-cover rounded-[30%]"
          :class="{
            'opacity-0': selectedNodeId == item.id,
          }"
          src="@/assets/bg.jpg"
        />
      </template>
    </div>

    <span class="absolute bottom-0 translate-y-[calc(100%+4px)] truncate">
      {{ data.label }}
    </span>
  </section>
</template>

<script setup lang="ts">
import { useIsHover } from '@/hooks/hover';
import { useLauncherStore } from '@/stores/launcher';
import { eventBus } from '@/utils/event-bus';
import { GroupNode } from '@type';
import { useLayoutStore } from '@/stores/layout';
import { useLauncherSessionStore } from '@/stores/launcher-session';

const props = defineProps<{
  data: GroupNode;
}>();

const { selectedNodeId, hiddenNodeId } = storeToRefs(useLauncherSessionStore());
const { getGroupChildren, addAppToGroup } = useLauncherStore();
const { maxNodeCount, nodeSize } = storeToRefs(useLayoutStore());

const [isHover, handleEnter, handleLeave] = useIsHover();

//当前元素不是自己
const notSelf = computed(() => {
  return selectedNodeId.value && props.data.id != selectedNodeId.value;
});

//所有子元素
const children = computed(() => {
  return getGroupChildren(props.data.id);
});

// 打开应用分组
const handleClick = () => {
  eventBus.emit('openGroupDialog', props.data.id);
};

// 处理放入分组
const handleDrop = () => {
  handleLeave();

  //超过最大数
  if (maxNodeCount.value == children.value.length) {
    return;
  }

  addAppToGroup(props.data.id, selectedNodeId.value!);
};
</script>

<style scoped lang="scss">
.group-node {
  width: calc(v-bind('nodeSize') * 1px);

  > div > * {
    &:nth-child(1) {
      grid-area: 1 / 1 / 3 / 3;
    }

    &:nth-child(2) {
      grid-area: 1 / 3 / 3 / 5;
    }

    &:nth-child(3) {
      grid-area: 3 / 1 / 5 / 3;
    }
  }
}
</style>
