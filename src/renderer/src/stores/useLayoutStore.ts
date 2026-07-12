import { useAppsStore } from "./useAppsStore";

export const useLayoutStore = defineStore("layout", () => {
  const appsStore = useAppsStore();

  //列数
  const colCount = ref(7);

  //行数
  const rowCount = ref(5);

  //总数
  const maxCount = computed(() => colCount.value * rowCount.value);

  //当前页码
  const currentPage = ref(0);

  //页数
  const pageSize = computed(() => {
    return Math.ceil(appsStore.apps.length / maxCount.value);
  });

  //上一页
  const prePage = () => {
    if (currentPage.value == 0) {
      return;
    }

    currentPage.value--;
  };

  //下一页
  const nextPage = () => {
    if (currentPage.value == pageSize.value - 1) {
      return;
    }

    currentPage.value++;
  };

  return {
    colCount,
    rowCount,
    maxCount,
    pageSize,
    currentPage,
    prePage,
    nextPage,
  };
});
