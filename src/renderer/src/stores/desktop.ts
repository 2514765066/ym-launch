import { useStorage } from '@vueuse/core';
import { storagePre } from '@shared/app-info';

export const useDesktopStore = defineStore('desktop', () => {
  // 包含空槽的一维桌面数据
  const desktopIds = useStorage<(string | null)[]>(
    `${storagePre}:desktopIds`,
    [],
  );

  // 桌面中的节点 ID
  const desktopNodeIds = computed(() => {
    return desktopIds.value.filter((id): id is string => id !== null);
  });

  // 将桌面节点所在槽位置空
  const removeDesktopId = (nodeId: string) => {
    // 待移除节点的槽位索引
    const nodeIndex = desktopIds.value.indexOf(nodeId);

    if (nodeIndex < 0) {
      return;
    }

    desktopIds.value[nodeIndex] = null;
  };

  return {
    desktopIds,
    desktopNodeIds,
    removeDesktopId,
  };
});
