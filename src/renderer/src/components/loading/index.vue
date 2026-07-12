<template>
  <div class="flex-center fixed inset-0 bg-black/60 z-9999" v-if="visible">
    <Spinner class="size-10" />
  </div>
</template>

<script setup lang="ts">
import { visible } from "./loading";
import { Spinner } from "@/components/ui/spinner";
</script>

<style scoped lang="scss"></style>
