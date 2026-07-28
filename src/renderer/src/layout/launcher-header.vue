<template>
  <section class="dark pt-16 pb-5 flex-center gap-4">
    <div class="glass w-70 h-11 px-4 flex items-center gap-3 rounded-full">
      <Search class="text-foreground/70" />

      <input
        class="size-full outline-none"
        placeholder="搜索应用"
        :value="keyword"
        @input="handleChange"
        :spellcheck="false"
      />
    </div>

    <Tooltip content="打开设置" shortcut="Ctrl+,">
      <button
        class="glass size-11 flex-center rounded-full cursor-pointer"
        @click="handleSetting"
      >
        <Settings class="text-foreground/70" />
      </button>
    </Tooltip>
  </section>
</template>

<script setup lang="ts">
import { useLauncherNodeStore } from '@/stores/launcher-node';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import { eventBus } from '@/utils/event-bus';
import { useEventListener } from '@vueuse/core';
import { Search, Settings } from '@lucide/vue';
import Tooltip from '@/components/tooltip.vue';

const { keyword } = storeToRefs(useLauncherUiStore());
const { addAppNode } = useLauncherNodeStore();
const { setStatus } = useLauncherUiStore();

const handleChange = (e: Event) => {
  const el = e.target as HTMLInputElement;

  keyword.value = el.value.trim();

  //如果有内容就是搜索
  if (keyword.value !== '') {
    setStatus('search');
    return;
  }

  setStatus('normal');
};

const handleSetting = () => {
  eventBus.emit('settingDialog');
};

useEventListener('keydown', (e) => {
  if (!e.ctrlKey) return;

  switch (e.key.toLowerCase()) {
    case 'o':
      e.preventDefault();
      addAppNode();
      return;
    case ',':
      e.preventDefault();
      handleSetting();
      return;
  }
});
</script>

<style scoped lang="scss"></style>
