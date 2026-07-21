export type MenuKind = 'app' | 'group' | null;

export const useMenuStore = defineStore('menu', () => {
  //节点右键菜单
  const nodeMenuKind = ref<MenuKind>(null);

  const setNodeMenuKind = (kind: MenuKind = null) => {
    nodeMenuKind.value = kind;
  };

  return {
    nodeMenuKind,
    setNodeMenuKind,
  };
});
