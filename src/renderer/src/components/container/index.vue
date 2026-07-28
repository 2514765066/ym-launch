<template>
  <ScrollArea class="min-h-0">
    <div :class="cn('max-w-290 w-[85%] mx-auto', viewClass)">
      <slot></slot>
    </div>
  </ScrollArea>
</template>

<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ClassValue } from 'vue';

defineProps<{
  viewClass?: ClassValue;
}>();
</script>

<style scoped lang="scss"></style>
