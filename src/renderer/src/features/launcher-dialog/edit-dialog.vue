<template>
  <Dialog v-model:open="visible">
    <DialogContent
      class="w-80"
      overlay-class="bg-transparent"
      :aria-describedby="undefined"
      as="form"
      @submit.prevent="handleSubmit"
    >
      <main class="pt-8 flex flex-col items-center gap-6">
        <AppNodeIcon :id="node.id" v-if="isAppNode(node)" />

        <GroupNodeIcon :data="node" v-else-if="isGroupNode(node)" />

        <Field>
          <FieldLabel>应用名称</FieldLabel>

          <Input v-model.trim="label" />
        </Field>
      </main>

      <DialogFooter>
        <DialogClose as-child>
          <Button class="flex-1" variant="outline"> 取消 </Button>
        </DialogClose>

        <Button class="flex-1" type="submit"> 确定 </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Field, FieldLabel } from '@/components/ui/field';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { eventBus } from '@/utils/event-bus';
import { useLauncherStore } from '@/stores/launcher';
import { useLauncherNodeStore } from '@/stores/launcher-node';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import GroupNodeIcon from '@/components/node-icon/group-node-icon.vue';
import AppNodeIcon from '@/components/node-icon/app-node-icon.vue';

const { hiddenDesktop } = storeToRefs(useLauncherUiStore());
const { getNode, isAppNode, isGroupNode } = useLauncherStore();
const { renameNode } = useLauncherNodeStore();

//组id
const nodeId = ref('');

// 弹窗可见状态
const visible = ref(false);

//名称
const label = ref('');

//节点
const node = computed(() => {
  return getNode(nodeId.value);
});

watch(visible, (value) => {
  if (value === false) {
    hiddenDesktop.value = false;
    return;
  }
});

// 提交重命名
const handleSubmit = () => {
  renameNode(nodeId.value, label.value);

  visible.value = false;
};

eventBus.on('openEditDialog', async (id) => {
  nodeId.value = id;

  label.value = node.value.label;

  hiddenDesktop.value = true;
  visible.value = true;
});
</script>

<style scoped lang="scss"></style>
