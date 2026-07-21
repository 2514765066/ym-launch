export const useLauncherSessionStore = defineStore('launcher-session', () => {
  //选中的节点id
  const selectedNodeId = ref<string | null>(null);

  //拖拽期间暂时隐藏的桌面节点
  const hiddenNodeId = ref<string | null>(null);

  //是否隐藏桌面元素
  const hiddenDesktop = ref(false);

  // 设置选中的节点
  const setSelectedNodeId = (nodeId: string | null = null) => {
    selectedNodeId.value = nodeId;
  };

  // 暂时隐藏桌面节点
  const setHiddenNodeId = (nodeId: string | null = null) => {
    hiddenNodeId.value = nodeId;
  };

  return {
    selectedNodeId,
    hiddenNodeId,
    hiddenDesktop,
    setHiddenNodeId,
    setSelectedNodeId,
  };
});
