<template>
  <section class="flex flex-col gap-1">
    <Item v-for="route in router" :data="route" />
  </section>
</template>

<script setup lang="ts">
import Item from './item.vue';
import router from '../router.js';
</script>

<style scoped lang="scss"></style>
