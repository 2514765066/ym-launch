import { useStorage } from '@vueuse/core';
import { AppNode, Node } from '@shared/type';
import { appName } from '@shared/app-info';

export const useLauncherStore = defineStore('launcher', () => {
  //桌面节点
  const nodes = useStorage<Record<string, Node>>(`${appName}:nodes`, {});

  //节点顺序
  const desktopIds = useStorage<string[]>(`${appName}:desktopIds`, []);

  // 获取节点
  const getNode = (id: string) => {
    return nodes.value[id];
  };

  // 判断普通应用节点
  const isAppNode = (node?: Node) => {
    return node?.kind === 'app';
  };

  // 判断应用分组节点
  const isGroupNode = (node?: Node) => {
    return node?.kind === 'group';
  };

  //删除桌面节点
  const removeDesktopId = (nodeId: string) => {
    desktopIds.value = desktopIds.value.filter((id) => id != nodeId);
  };

  // 移除分组内应用
  const removeAppFromGroup = (groupId: string, appId: string) => {
    const group = getNode(groupId);

    if (!isGroupNode(group)) {
      return;
    }

    group.children = group.children.filter((id) => id !== appId);
  };

  //获取组内子元素
  const getGroupChildren = (nodeId: string) => {
    const node = getNode(nodeId);

    if (!isGroupNode(node)) {
      return [];
    }

    return node.children.map(getNode) as AppNode[];
  };

  //设置桌面元素
  const setDesktopIds = (ids: string[]) => {
    desktopIds.value = Array.from(new Set(ids));
  };

  // 设置组内子元素
  const setGroupChildren = (groupId: string, ids: string[]) => {
    const group = getNode(groupId);

    if (!isGroupNode(group)) {
      return;
    }

    group.children = Array.from(new Set(ids));
  };

  return {
    nodes,
    desktopIds,
    getNode,
    isAppNode,
    isGroupNode,
    removeDesktopId,
    removeAppFromGroup,
    getGroupChildren,
    setGroupChildren,
    setDesktopIds,
  };
});
