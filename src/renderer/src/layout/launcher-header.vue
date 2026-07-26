<template>
  <section class="dark pt-16 pb-5 flex-center gap-4">
    <div class="glass w-70 h-11 px-4 flex items-center gap-3 rounded-full">
      <Search />

      <input
        class="size-full outline-none"
        placeholder="搜索应用"
        :value="keyword"
        @input="handleChange"
        :spellcheck="false"
      />
    </div>

    <DropdownMenu>
      <DropdownMenuTrigger>
        <button class="glass size-11 flex-center rounded-full cursor-pointer">
          <MoreHorizontal class="size-5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent class="w-49">
        <DropdownMenuItem @click="addAppNode">
          <Import />

          导入应用
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings />

          设置
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem @click="handleReload">
          <RotateCw />

          刷新
        </DropdownMenuItem>

        <DropdownMenuItem @click="hidden">
          <Power />

          关闭
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </section>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useLauncherNodeStore } from '@/stores/launcher-node';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import {
  Import,
  MoreHorizontal,
  Power,
  RotateCw,
  Search,
  Settings,
} from '@lucide/vue';

const { keyword } = storeToRefs(useLauncherUiStore());
const { addAppNode } = useLauncherNodeStore();
const { hidden, setStatus } = useLauncherUiStore();

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

const handleReload = () => {
  window.location.reload();
};
</script>

<style scoped lang="scss"></style>
