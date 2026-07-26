<template>
  <section class="wh-full flex flex-col relative">
    <div
      class="max-w-290 mb-4 w-[85%] mx-auto relative z-10"
      v-if="$slots.header && (!isEmpty || (isEmpty && emptyWidthHeader))"
    >
      <slot name="header"></slot>
    </div>

    <div
      class="wh-full absolute left-50 top-50 -translate-x-50 -translate-y-50"
      v-if="$slots.empty && isEmpty"
    >
      <slot name="empty"></slot>
    </div>

    <ScrollArea class="min-h-0" view-class="pb-4" v-else>
      <div class="h-full max-w-290 w-[85%] mx-auto">
        <slot></slot>
      </div>
    </ScrollArea>

    <slot name="footer"></slot>
  </section>
</template>

<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area';

defineProps<{
  isEmpty?: boolean;
  emptyWidthHeader?: boolean;
}>();
</script>

<style scoped lang="scss"></style>
