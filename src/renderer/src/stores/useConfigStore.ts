import { useStorage } from "@vueuse/core";

//创建配置
const createConfig = () => {
  return {
    //自动更新
    autoUpdate: true,

    //选中的仓库
    repo: "gitee",
  };
};

export const useConfigStore = defineStore("config", () => {
  const config = useStorage("settings", createConfig(), localStorage, {
    mergeDefaults: true,
  });

  //重置
  const resetConfig = () => {
    config.value = createConfig();
  };

  return {
    config,
    resetConfig,
  };
});
