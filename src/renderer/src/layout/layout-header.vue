<template>
  <section class="flex justify-center gap-4">
    <div class="glass-button w-[250px] h-11 px-3 flex items-center gap-2">
      <Search class="size-5 text-foreground/70" />

      <input
        type="text"
        placeholder="搜索应用..."
        class="size-full text-sm placeholder:text-foreground/40 outline-none"
        v-model="keyword"
      />
    </div>

    <button
      class="glass-button size-11 flex-center cursor-pointer"
      @click="addApps"
    >
      <PlusIcon class="size-5 text-foreground/70" />
    </button>

    <button
      class="glass-button size-11 flex-center cursor-pointer"
      @click="handleSetting"
    >
      <SettingsIcon class="size-5 text-foreground/70" />
    </button>
  </section>
</template>

<script setup lang="ts">
import eventEmitter from "@/hooks/eventEmitter";
import { useAppsStore } from "@/stores/useAppsStore";
import { PlusIcon, Search, SettingsIcon } from "lucide-vue-next";

const { keyword } = storeToRefs(useAppsStore());
const { addApps } = useAppsStore();

const handleSetting = () => {
  eventEmitter.emit("dialog-setting:show");
};
</script>

<style scoped lang="scss"></style>
