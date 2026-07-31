import { nanoid } from 'nanoid';
import pinyin from 'pinyin';
import type { AppNode } from '@shared/type';
import { useDesktopStore } from './desktop';
import { useLauncherLayoutStore } from './launcher-layout';
import { useNodeStore } from './node';

export const useCoreStore = defineStore('core', () => {
  // 桌面节点数据仓库
  const nodeStore = useNodeStore();

  // 应用和分组节点
  const { nodes } = storeToRefs(nodeStore);

  // 节点数据操作
  const { getNode, appendNodes, isAppNode, isGroupNode, removeAppFromGroup } =
    nodeStore;

  // 桌面布局操作
  const { removeDesktopId, replaceDesktopId, appendDesktopIds } =
    useDesktopStore();

  // 启动台布局操作
  const { setSelectedPage } = useLauncherLayoutStore();

  // 创建应用分组
  const createGroupNode = (targetId: string, dragId: string) => {
    // 作为新分组位置的应用节点
    const targetNode = getNode(targetId);

    // 拖入新分组的应用节点
    const dragNode = getNode(dragId);

    if (!isAppNode(targetNode) || !isAppNode(dragNode)) {
      return;
    }

    // 分组内保留的目标应用副本
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

  // 拆散应用分组
  const breakGroupNode = (groupId: string) => {
    // 需要拆散的应用分组
    const group = getNode(groupId);

    if (!isGroupNode(group)) {
      return;
    }

    replaceDesktopId(groupId, group.children);
    delete nodes.value[group.id];
  };

  // 保存导入节点并跳转到最后一个新增节点所在页
  const appendImportedNodes = (importedNodes: AppNode[]) => {
    if (importedNodes.length === 0) {
      return;
    }

    appendNodes(importedNodes);
    appendDesktopIds(importedNodes.map((node) => node.id));
    setSelectedPage((_, max) => max - 1);
  };

  // 添加应用节点
  const addAppNode = async () => {
    // 用户选择后新增的应用节点
    const importedNodes = await ipc.addAppNode();

    appendImportedNodes(importedNodes);
  };

  // 添加文件夹应用节点
  const addFolderNode = async () => {
    // 用户选择后新增的文件夹节点
    const importedNodes = await ipc.addFolderNode();

    appendImportedNodes(importedNodes);
  };

  // 添加应用到已有分组
  const moveAppToGroup = (groupId: string, appId: string) => {
    // 接收应用的分组节点
    const groupNode = getNode(groupId);

    // 需要移动的应用节点
    const appNode = getNode(appId);

    if (!isGroupNode(groupNode) || !isAppNode(appNode)) {
      return;
    }

    removeDesktopId(appNode.id);
    groupNode.children.push(appNode.id);
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

  // 重命名节点
  const renameNode = (id: string, label: string) => {
    // 需要重命名的节点
    const node = getNode(id);

    node.label = label;
    node.keyword = pinyin(label).join('');
  };

  return {
    createGroupNode,
    breakGroupNode,
    addAppNode,
    addFolderNode,
    moveAppToGroup,
    removeAppNode,
    renameNode,
  };
});
