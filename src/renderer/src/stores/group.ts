import { useStorage } from '@vueuse/core';
import { storagePre } from '@shared/app-info';

export const useGroupStore = defineStore('group', () => {
  // 每个分组包含的应用 ID
  const groupAppIds = useStorage<Record<string, string[]>>(
    `${storagePre}:groupIds`,
    {},
  );

  // 获取分组中的应用 ID
  const getGroupAppIds = (groupId: string) => {
    return groupAppIds.value[groupId] ?? [];
  };

  // 设置分组中的应用 ID
  const setGroupAppIds = (groupId: string, appIds: string[]) => {
    groupAppIds.value[groupId] = Array.from(new Set(appIds));
  };

  // 添加应用到分组
  const addGroupApp = (groupId: string, appId: string) => {
    const appIds = (groupAppIds.value[groupId] ??= []);

    if (!appIds.includes(appId)) {
      appIds.push(appId);
    }
  };

  // 从分组移除应用
  const removeGroupApp = (groupId: string, appId: string) => {
    const appIds = groupAppIds.value[groupId];

    const index = appIds.indexOf(appId);

    if (index == -1) {
      return;
    }

    appIds.splice(index, 1);
  };

  // 查找应用所属的分组 ID
  const findAppGroupId = (appId: string) => {
    const group = Object.entries(groupAppIds.value).find(([, appIds]) => {
      return appIds.includes(appId);
    });

    return group?.[0];
  };

  // 删除分组数据
  const removeGroup = (groupId: string) => {
    delete groupAppIds.value[groupId];
  };

  return {
    groupAppIds,
    getGroupAppIds,
    setGroupAppIds,
    addGroupApp,
    removeGroupApp,
    findAppGroupId,
    removeGroup,
  };
});
