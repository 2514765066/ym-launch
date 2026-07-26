import { AppNode } from '@shared/type';
import { useLauncherStore } from './launcher';
import { nanoid } from 'nanoid';
import pinyin from 'pinyin';

export const useLauncherNodeStore = defineStore('node', () => {
  const { nodes, desktopIds } = storeToRefs(useLauncherStore());
  const {
    getNode,
    isGroupNode,
    isAppNode,
    removeDesktopId,
    removeAppFromGroup,
  } = useLauncherStore();

  //打开app
  const openAppNode = async (id: string) => {
    await ipcRenderer.invoke('hidden');

    const node = getNode(id) as AppNode;

    api.openPath(node.path);
  };

  //打开文件夹管理器
  const openAppNodeInFolder = async (id: string) => {
    await ipcRenderer.invoke('hidden');

    const node = getNode(id) as AppNode;

    api.openPathInFolder(node.path);
  };

  //创建group节点
  const createGroupNode = (targetId: string, dragId: string) => {
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

    nodes.value[targetNode.id] = {
      id: targetNode.id,
      label: '未命名',
      keyword: '',
      kind: 'group',
      children: [newTargetNode.id, dragNode.id],
    };

    removeDesktopId(dragNode.id);
  };

  // 拆散group节点
  const breakGroupNode = (groupId: string) => {
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

  //添加节点
  const addAppNode = async () => {
    const res: AppNode[] = await ipcRenderer.invoke('addAppNode');

    for (const item of res) {
      nodes.value[item.id] = item;

      desktopIds.value.push(item.id);
    }
  };

  // 添加app节点到group节点
  const moveAppToGroup = (groupId: string, appId: string) => {
    const groupNode = getNode(groupId);
    const appNode = getNode(appId);

    if (!isGroupNode(groupNode) || !isAppNode(appNode)) {
      return;
    }

    removeDesktopId(appNode.id);
    groupNode.children.push(appNode.id);
  };

  // 重命名节点
  const renameNode = (id: string, label: string) => {
    const node = getNode(id);

    node.label = label;
    node.keyword = pinyin(label).join('');
  };

  // 移除应用节点并清理所属分组
  const removeAppNode = (nodeId: string) => {
    // 待删除的应用节点
    const node = getNode(nodeId);

    if (!isAppNode(node)) {
      return;
    }

    // 包含待删除应用的分组
    const parentGroup = Object.values(nodes.value).find((item) => {
      return isGroupNode(item) && item.children.includes(nodeId);
    });

    if (isGroupNode(parentGroup)) {
      removeAppFromGroup(parentGroup.id, nodeId);

      // 删除后仍存在的分组数据
      const updatedGroup = getNode(parentGroup.id);

      if (isGroupNode(updatedGroup) && updatedGroup.children.length <= 1) {
        breakGroupNode(updatedGroup.id);
      }
    }

    removeDesktopId(nodeId);

    delete nodes.value[nodeId];
  };

  return {
    openAppNode,
    openAppNodeInFolder,
    moveAppToGroup,
    breakGroupNode,
    renameNode,
    addAppNode,
    createGroupNode,
    removeAppNode,
  };
});
