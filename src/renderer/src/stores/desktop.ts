import { useStorage } from '@vueuse/core';
import { appName } from '@shared/app-info';
import type { DesktopSlot } from '@/utils/desktop-layout';

export const useDesktopStore = defineStore('desktop', () => {
  // 包含空槽的一维桌面数据
  const desktop = useStorage<DesktopSlot[]>(`${appName}:desktopIds`, []);

  // 覆盖桌面数据
  const setDesktop = (value: DesktopSlot[]) => {
    desktop.value = value;
  };

  // 将桌面节点所在槽位置空
  const removeDesktopId = (nodeId: string) => {
    // 待移除节点的槽位索引
    const nodeIndex = desktop.value.indexOf(nodeId);

    if (nodeIndex < 0) {
      return;
    }

    desktop.value[nodeIndex] = null;
  };

  // 在桌面原槽位替换节点
  const replaceDesktopId = (nodeId: string, ids: string[]) => {
    const index = desktop.value.indexOf(nodeId);

    desktop.value.splice(index, 1, ...ids);
  };

  // 向桌面末尾追加节点
  const appendDesktopIds = (nodeIds: string[]) => {
    desktop.value.push(...nodeIds);
  };

  return {
    desktop,
    setDesktop,
    removeDesktopId,
    replaceDesktopId,
    appendDesktopIds,
  };
});
