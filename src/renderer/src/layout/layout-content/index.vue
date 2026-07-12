<template>
  <section class="size-full">
    <div class="size-full flex">
      <ContentPage
        v-for="(_, index) in formatApps"
        :key="index"
        v-model="formatApps[index]"
        @end="handleEnd"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import ContentPage from "./content-page/index.vue";
import { App } from "@/stores/useAppsStore";
import { useLayoutStore } from "@/stores/useLayoutStore";
import { useAppsStore } from "@/stores/useAppsStore";

const { apps } = storeToRefs(useAppsStore());
const { currentPage, maxCount } = storeToRefs(useLayoutStore());

const formatApps = ref<App[][]>([]);

watchEffect(() => {
  const result: App[][] = [];

  for (let i = 0; i < Math.ceil(apps.value.length / maxCount.value); i++) {
    const slice = apps.value.slice(
      i * maxCount.value,
      (i + 1) * maxCount.value,
    );

    result.push(slice);
  }

  formatApps.value = result;
});

const handleEnd = () => {
  apps.value = formatApps.value.flat();
};

//解决动态css
const styleEl = document.createElement("style");

onMounted(() => {
  document.head.appendChild(styleEl);

  watchEffect(() => {
    styleEl.textContent = `
      .content-page > *:nth-child(n + ${maxCount.value + 1}) {
        display: none !important;
      }
    `;
  });
});

onUnmounted(() => {
  styleEl.remove();
});
</script>

<style scoped lang="scss">
section {
  > div {
    transform: translateX(v-bind("-currentPage * 50 + '%'"));
    transition: transform 0.5s;
    transition-timing-function: ease;
  }
}
</style>
