<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <slot></slot>
    </TooltipTrigger>

    <TooltipContent
      :class="{
        dark: isDark,
      }"
    >
      {{ content }}

      <Kbd class="ml-2" v-if="shortcut">{{ shortcut }}</Kbd>
    </TooltipContent>
  </Tooltip>
</template>

<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Kbd from '@/components/ui/kbd/Kbd.vue';

withDefaults(
  defineProps<{
    content?: string;
    shortcut?: string;
    isDark?: boolean;
  }>(),
  {
    isDark: true,
  },
);
</script>

<style scoped lang="scss"></style>
