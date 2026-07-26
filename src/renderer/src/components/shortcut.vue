<template>
  <Button
    :class="{
      'px-2': !isRecording,
    }"
    :variant="isRecording ? 'outline' : 'ghost'"
    @click="handleClick"
    @keyup.stop.prevent="handleShortcutKeydown"
    @blur="handleBlur"
  >
    <span v-if="isRecording">请按下快捷键</span>

    <span v-else-if="!model">暂无快捷键</span>

    <KbdGroup v-else>
      <template v-for="(key, index) in shortcutParts" :key="key">
        <Kbd>{{ key }}</Kbd>
        <span v-if="index < shortcutParts.length - 1">+</span>
      </template>
    </KbdGroup>
  </Button>
</template>

<script setup lang="ts">
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { Button } from '@/components/ui/button';
import { shortcutMap } from '@/map';

const model = defineModel<string>({
  required: true,
});

const isRecording = ref(false);

//拆分快捷键
const shortcutParts = computed(() =>
  model.value.split('+').map((key) => shortcutMap[key] ?? key),
);

//开始
const handleClick = (event: MouseEvent) => {
  isRecording.value = true;
  (event.currentTarget as HTMLButtonElement).focus();
};

//结束
const handleBlur = () => {
  isRecording.value = false;
};

//处理按下
const handleShortcutKeydown = async (event: KeyboardEvent) => {
  if (!isRecording.value) {
    return;
  }

  if (event.key == 'Control' || event.key == 'Shift' || event.key == 'Alt') {
    event.preventDefault();
    return;
  }

  const result: string[] = [];

  if (event.ctrlKey) {
    result.push('Control');
  }

  if (event.shiftKey) {
    result.push('Shift');
  }

  if (event.altKey) {
    result.push('Alt');
  }

  result.push(event.key.toUpperCase());

  model.value = result.join('+');

  isRecording.value = false;
};
</script>

<style scoped lang="scss"></style>
