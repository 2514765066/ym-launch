import { useStorage } from '@vueuse/core';
import { appName } from '@shared/app-info';
import { AppNode, Node } from '@shared/type';

export const useNodeStore = defineStore('node', () => {
  // 应用和分组节点
  const nodes = useStorage<Record<string, Node>>(`${appName}:nodes`, {});

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

  //新增节点
  const appendNodes = (data: Node[]) => {
    for (const item of data) {
      nodes.value[item.id] = item;
    }
  };

  // 打开应用
  const openAppNode = (id: string) => {
    // 需要打开的应用节点
    const node = getNode(id) as AppNode;

    ipc.openPath(node.path);
  };

  // 在文件管理器中打开应用
  const openAppNodeInFolder = (id: string) => {
    // 需要定位的应用节点
    const node = getNode(id) as AppNode;

    ipc.openPathInFolder(node.path);
  };

  // 移除分组内应用
  const removeAppFromGroup = (groupId: string, appId: string) => {
    // 需要移除应用的分组节点
    const group = getNode(groupId);

    if (!isGroupNode(group)) {
      return;
    }

    group.children = group.children.filter((id) => {
      return id !== appId;
    });
  };

  // 获取组内子元素
  const getGroupChildren = (nodeId: string) => {
    // 需要读取子元素的分组节点
    const node = getNode(nodeId);

    if (!isGroupNode(node)) {
      return [];
    }

    return node.children.map(getNode) as AppNode[];
  };

  // 设置组内子元素
  const setGroupChildren = (groupId: string, ids: string[]) => {
    // 需要更新子元素的分组节点
    const group = getNode(groupId);

    if (!isGroupNode(group)) {
      return;
    }

    group.children = Array.from(new Set(ids));
  };

  return {
    nodes,
    getNode,
    appendNodes,
    isAppNode,
    isGroupNode,
    openAppNode,
    openAppNodeInFolder,
    removeAppFromGroup,
    getGroupChildren,
    setGroupChildren,
  };
});
