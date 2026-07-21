import { useStorage } from '@vueuse/core';
import { AppNode, GroupNode, Node } from '@type';
import { nanoid } from 'nanoid';

const createGroupNode = (groupId: string, children: string[]): GroupNode => {
  return {
    id: groupId,
    label: '未命名',
    kind: 'group',
    children,
  };
};

export const useLauncherStore = defineStore('launcher', () => {
  //桌面节点
  const nodes = useStorage<Record<string, Node>>('nodes', {
    '1': {
      id: '1',
      label: '1',
      path: '123',
      kind: 'app',
    },
    '2': {
      id: '2',
      label: '2',
      path: '123',
      kind: 'app',
    },
    '3': {
      id: '3',
      label: '3',
      path: '123',
      kind: 'app',
    },
  });

  //节点顺序
  const desktopIds = useStorage<string[]>('desktopIds', ['1', '2', '3']);

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

  //移除节点
  const removeNode = (nodeId: string) => {
    removeDesktopId(nodeId);

    delete nodes.value[nodeId];
  };

  // 移除分组内应用
  const removeAppFromGroup = (groupId: string, appId: string) => {
    const group = getNode(groupId);

    if (!isGroupNode(group)) {
      return;
    }

    group.children = group.children.filter((id) => id !== appId);
  };

  const removeAppsFromGroups = (ids: Iterable<string>) => {
    const idSet = new Set(ids);

    if (idSet.size === 0) {
      return;
    }

    for (const node of Object.values(nodes.value)) {
      if (isGroupNode(node)) {
        node.children = node.children.filter((id) => !idSet.has(id));
      }
    }
  };

  //获取组内子元素
  const getGroupChildren = (nodeId: string) => {
    const node = getNode(nodeId);

    if (!isGroupNode(node)) {
      return [];
    }

    return node.children.map(getNode) as AppNode[];
  };

  const normalizeIds = (ids: string[]) => {
    const result: string[] = [];
    const seen = new Set<string>();

    for (const id of ids) {
      if (seen.has(id) || !nodes.value[id]) {
        continue;
      }

      seen.add(id);
      result.push(id);
    }

    return result;
  };

  //设置桌面元素
  const setDesktopIds = (ids: string[]) => {
    desktopIds.value = normalizeIds(ids);
    removeAppsFromGroups(desktopIds.value);
  };

  // 设置组内子元素
  const setGroupChildren = (groupId: string, ids: string[]) => {
    const group = getNode(groupId);

    if (!isGroupNode(group)) {
      return;
    }

    group.children = normalizeIds(ids);
  };

  // 添加app节点到group节点
  const addAppToGroup = (targetId: string, dragId: string) => {
    const targetNode = getNode(targetId);
    const dragNode = getNode(dragId);

    if (!isGroupNode(targetNode) || !isAppNode(dragNode)) {
      return;
    }

    removeDesktopId(dragNode.id);
    removeAppsFromGroups([dragNode.id]);
    targetNode.children.push(dragNode.id);
  };

  //创建group节点
  const createGroup = (targetId: string, dragId: string) => {
    const targetNode = getNode(targetId);
    const dragNode = getNode(dragId);

    if (!isAppNode(targetNode) || !isAppNode(dragNode)) {
      return;
    }

    const newTargetNode: AppNode = {
      ...targetNode,
      id: nanoid(),
    };

    nodes.value[newTargetNode.id] = newTargetNode;

    nodes.value[targetNode.id] = createGroupNode(targetNode.id, [
      newTargetNode.id,
      dragNode.id,
    ]);

    removeDesktopId(dragNode.id);
  };

  // 拆散group节点
  const breakGroup = (groupId: string) => {
    const group = getNode(groupId);

    if (!isGroupNode(group)) {
      return;
    }

    const desktopIndex = desktopIds.value.indexOf(groupId);

    if (desktopIndex < 0) {
      return;
    }

    desktopIds.value.splice(desktopIndex, 1, ...group.children);

    delete nodes.value[group.id];
  };

  // 重命名节点
  const renameNode = (id: string, label: string) => {
    const node = getNode(id);

    if (!node) {
      return;
    }

    node.label = label;
  };

  return {
    nodes,
    desktopIds,
    getNode,
    isAppNode,
    isGroupNode,
    removeNode,
    removeAppFromGroup,
    getGroupChildren,
    setGroupChildren,
    setDesktopIds,
    addAppToGroup,
    createGroup,
    breakGroup,
    renameNode,
  };
});
