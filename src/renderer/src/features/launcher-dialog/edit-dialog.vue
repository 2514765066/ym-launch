<template>
  <Dialog v-model:open="visible">
    <DialogContent
      class="w-80"
      :aria-describedby="undefined"
      as="form"
      @submit.prevent="handleSubmit"
    >
      <main class="pt-8 flex flex-col items-center gap-6">
        <AppNodeIcon class="size-20!" :id="node.id" v-if="isAppNode(node)" />

        <GroupNodeIcon
          view-class="size-20!"
          :id="node.id"
          v-else-if="isGroupNode(node)"
        />

        <Field>
          <FieldLabel>应用名称</FieldLabel>

          <Input v-model.trim="label" />
        </Field>
      </main>

      <DialogFooter>
        <DialogClose as-child>
          <Button class="flex-1" variant="outline"> 取消 </Button>
        </DialogClose>

        <Button class="flex-1" type="submit" :disabled="label.length == 0">
          确定
        </Button>
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
import { useNodeStore } from '@/stores/node';
import { useCoreStore } from '@/stores/core';
import GroupNodeIcon from '@/components/node-icon/group-node-icon.vue';
import AppNodeIcon from '@/components/node-icon/app-node-icon.vue';

// 节点查询能力
const { getNode, isAppNode, isGroupNode } = useNodeStore();

// 节点重命名能力
const { renameNode } = useCoreStore();

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

// 提交重命名
const handleSubmit = () => {
  renameNode(nodeId.value, label.value);

  visible.value = false;
};

eventBus.on('openEditDialog', async (id) => {
  nodeId.value = id;

  label.value = node.value.label;

  visible.value = true;
});

ipc.on('show', () => {
  visible.value = false;
});
</script>

<style scoped lang="scss"></style>
