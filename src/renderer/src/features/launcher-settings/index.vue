<template>
  <Dialog v-model:open="visible">
    <DialogContent
      :aria-describedby="undefined"
      class="max-w-none! w-200 h-150 p-0! overflow-hidden"
      @open-auto-focus.prevent
    >
      <ResizablePanelGroup
        class="flex-1"
        direction="horizontal"
        autoSaveId="launcher-settings-layout"
      >
        <ResizablePanel :min-size="160" :default-size="260" size-unit="px">
          <SideBar />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel :min-size="50">
          <component class="h-full" :is="selectedRoute?.component" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import SideBar from './side-bar/index.vue';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { selectedRoute } from './router.js';
import { eventBus } from '@/utils/event-bus.js';

const visible = ref(false);

eventBus.on('settingDialog', (value = true) => {
  visible.value = value;
});

ipc.on('show', () => {
  visible.value = false;
});
</script>

<style scoped lang="scss"></style>
