<template>
  <Dialog v-model:open="open">
    <DialogContent
      :aria-describedby="undefined"
      class="max-w-none! w-200 h-150 p-0! flex flex-col gap-0 bg-sidebar"
      @open-auto-focus.prevent
    >
      <TitleBar />

      <ResizablePanelGroup
        class="px-2 pb-2 flex-1 gap-1"
        direction="horizontal"
        autoSaveId="launcher-settings-layout"
      >
        <ResizablePanel :min-size="160" :default-size="260" size-unit="px">
          <SideBar />
        </ResizablePanel>

        <ResizableHandle class="bg-transparent" />

        <ResizablePanel :min-size="50">
          <component
            class="h-full border rounded-lg bg-background"
            :is="selectedRoute?.component"
          />
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
import TitleBar from './title-bar/index.vue';
import SideBar from './side-bar/index.vue';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { selectedRoute } from './router.js';
import { eventBus } from '@/utils/event-bus.js';

const open = ref(false);

eventBus.on('settingDialog', (value = true) => {
  open.value = value;
});
</script>

<style scoped lang="scss"></style>
