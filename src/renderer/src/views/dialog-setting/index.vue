<template>
  <Dialog v-model:open="open">
    <DialogContent
      class="max-w-none! w-[60vw] h-[70vh] p-0! overflow-hidden"
      @interact-outside="handleInteractOutside"
    >
      <VisuallyHidden as-child>
        <DialogTitle>
          <DialogDescription />
        </DialogTitle>
      </VisuallyHidden>

      <div class="dialog-content size-full grid">
        <SideBar class="col-start-1 col-end-2 row-start-1 row-end-3" />

        <component
          class="col-start-2 col-end-3 row-start-2 row-end-3"
          :is="selectedRoute?.component"
        />
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import SideBar from './side-bar/index.vue';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import eventEmitter from '@/hooks/eventEmitter';
import { VisuallyHidden } from 'reka-ui';
import { selectedRoute } from './router';

const open = ref(false);

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement;

  if (target.closest('[data-sonner-toast]')) {
    event.preventDefault();
  }
};

eventEmitter.on('dialog-setting:show', () => {
  open.value = true;
});
</script>

<style scoped lang="scss">
.dialog-content {
  grid-template-columns: 220px calc(100% - 220px);
  grid-template-rows: 44px calc(100% - 44px);
}
</style>
