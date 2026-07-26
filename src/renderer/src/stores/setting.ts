import { useStorage } from '@vueuse/core';
import { appName } from '@shared/app-info';
import type { HotCornerPosition } from '@shared/type';

//创建配置
const createConfig = () => {
  return {
    //模糊程度
    blur: 40,

    //遮罩程度
    mask: 0,

    //行数
    rowCount: 5,

    //列数
    colCount: 7,

    //图标缩放大小
    iconZoom: 40,

    //自动更新
    autoUpdate: false,

    hotCornerDisabled: false,
    hotCornerPosition: 'top-left' as HotCornerPosition,
  };
};

export const useSettingStore = defineStore('setting', () => {
  const config = useStorage(
    `${appName}:setting`,
    createConfig(),
    localStorage,
    {
      mergeDefaults: true,
    },
  );

  //重置
  const resetConfig = () => {
    config.value = createConfig();
  };

  watch(
    () => [config.value.hotCornerDisabled, config.value.hotCornerPosition],
    ([disabled, position]) => {
      ipcRenderer.invoke('setHotCorner', { disabled, position });
    },
    { immediate: true },
  );

  return {
    config,
    resetConfig,
  };
});
