import { useStorage } from '@vueuse/core';
import { storagePre } from '@shared/app-info';
import type { DesktopSlot } from '@/utils/desktop-layout';

export const useDesktopStore = defineStore('desktop', () => {
  // 包含空槽的一维桌面数据
  const desktopIds = useStorage<DesktopSlot[]>(`${storagePre}:desktopIds`, []);

  // 按分组节点保存的应用 ID
  const groupIds = useStorage<Record<string, string[]>>(
    `${storagePre}:groupIds`,
    {},
  );

  // 覆盖桌面数据
  const setDesktop = (value: DesktopSlot[]) => {
    desktopIds.value = value;
  };

  // 将桌面节点所在槽位置空
  const removeDesktopId = (nodeId: string) => {
    // 待移除节点的槽位索引
    const nodeIndex = desktopIds.value.indexOf(nodeId);

    if (nodeIndex < 0) {
      return;
    }

    desktopIds.value[nodeIndex] = null;
  };

  // 在桌面原槽位替换节点
  const replaceDesktopId = (nodeId: string, ids: string[]) => {
    const index = desktopIds.value.indexOf(nodeId);

    desktopIds.value.splice(index, 1, ...ids);
  };

  // 向桌面末尾追加节点
  const appendDesktopIds = (nodeIds: string[]) => {
    desktopIds.value.push(...nodeIds);
  };

  // 判断分组是否已有独立的 ID 数据
  const hasGroupIds = (groupId: string) => {
    return groupId in groupIds.value;
  };

  // 获取分组内的应用 ID
  const getGroupIds = (groupId: string) => {
    return groupIds.value[groupId] ?? [];
  };

  // 覆盖分组内的应用 ID
  const setGroupIds = (groupId: string, nodeIds: string[]) => {
    groupIds.value[groupId] = Array.from(new Set(nodeIds));
  };

  // 向分组末尾追加应用 ID
  const appendGroupId = (groupId: string, nodeId: string) => {
    const group = getGroupIds(groupId);

    group.push(nodeId);
  };

  // 从指定分组移除应用 ID
  const removeGroupId = (groupId: string, nodeId: string) => {
    const group = getGroupIds(groupId).filter((id) => id !== nodeId);

    setGroupIds(groupId, group);
  };

  // 查找应用当前所属的分组 ID
  const findGroupId = (nodeId: string) => {
    // 包含目标应用的分组数据
    const group = Object.entries(groupIds.value).find(([, nodeIds]) => {
      return nodeIds.includes(nodeId);
    });

    return group?.[0];
  };

  // 删除指定分组的 ID 数据
  const removeGroupIds = (groupId: string) => {
    groupIds.value = Object.fromEntries(
      Object.entries(groupIds.value).filter(([id]) => {
        return id !== groupId;
      }),
    );
  };

  return {
    desktopIds,
    groupIds,
    setDesktop,
    removeDesktopId,
    replaceDesktopId,
    appendDesktopIds,
    hasGroupIds,
    getGroupIds,
    setGroupIds,
    appendGroupId,
    removeGroupId,
    findGroupId,
    removeGroupIds,
  };
});
