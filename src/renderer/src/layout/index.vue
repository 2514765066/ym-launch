<template>
  <div
    class="layout wh-screen py-14 flex flex-col items-center gap-8 overflow-hidden"
  >
    <LayoutHeader />

    <LayoutContent />

    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from "./layout-header.vue";
import LayoutContent from "./layout-content/index.vue";
import LayoutFooter from "./layout-footer.vue";
</script>

<style scoped lang="scss">
.layout {
  backdrop-filter: blur(100px);
}
</style>
