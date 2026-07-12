<template>
  <section class="p-2 flex flex-col gap-1 bg-sidebar border-r">
    <Item v-for="route in router" :data="route" />
  </section>
</template>

<script setup lang="ts">
import Item from "./item.vue";
import router from "../router";
</script>

<style scoped lang="scss"></style>
