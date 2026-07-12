import { useStorage } from "@vueuse/core";

export interface App {
  id: string;
  groupId: number;
  name: string;
  path: string;
}

export const useAppsStore = defineStore("apps", () => {
  const apps = useStorage<App[]>("apps", [], localStorage);

  const keyword = ref("");

  //添加应用
  const addApps = async () => {
    const res: App[] = await electron.ipcRenderer.invoke("addApps");

    res.forEach(item => {
      item.groupId = 0;
    });

    apps.value.push(...res);

    await nextTick();

    return res.map(app => app.id);
  };

  //删除应用
  const removeApps = (ids: string | string[]) => {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    apps.value = apps.value.filter(app => !ids.includes(app.id));

    return ids;
  };

  return {
    apps,
    keyword,
    addApps,
    removeApps,
  };
});
