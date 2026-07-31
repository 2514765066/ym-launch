import { useStorage } from '@vueuse/core';
import { storagePre } from '@shared/app-info';
import type { AppNode, Node } from '@shared/type';

export const useNodeStore = defineStore('node', () => {
  // 应用和分组节点
  const nodes = useStorage<Record<string, Node>>(`${storagePre}:nodes`, {});

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

  return {
    nodes,
    getNode,
    appendNodes,
    isAppNode,
    isGroupNode,
    openAppNode,
    openAppNodeInFolder,
  };
});
