import { useStorage } from '@vueuse/core';
import { Node } from '@type';

export const useLauncherStore = defineStore('launcher', () => {
  //桌面节点
  const nodes = useStorage<Record<string, Node>>('nodes', {});

  //节点顺序
  const desktopIds = useStorage<string[]>('nodes', []);

  //是否拖拽
  const isDragging = ref(false);

  //拖拽id
  const draggingNodeId = ref('');

  // 设置拖拽状态
  const setDragging = (value: boolean, id = '') => {
    isDragging.value = value;
    draggingNodeId.value = value ? id : '';
  };

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

  return {
    nodes,
    desktopIds,
    isDragging,
    draggingNodeId,
    getNode,
    isAppNode,
    isGroupNode,
    setDragging,
  };
});
