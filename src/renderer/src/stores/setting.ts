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

    //安装更新前是否显示确认弹窗
    installUpdatePrompt: false,

    //开机自启动
    openAtLogin: true,

    //启动角是否禁用
    hotCornerDisabled: false,

    //启动角位置
    hotCornerPosition: 'top-left' as HotCornerPosition,

    //快速启动快捷键
    startShortcut: '',

    //隐藏启动器快捷键
    hiddenShortcut: 'Escape',

    //上一页快捷键
    prePageShortcut: 'ArrowLeft',

    //下一页快捷键
    nextPageShortcut: 'ArrowRight',
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

  //设置启动角配置
  watchEffect(() => {
    ipcRenderer.invoke('setHotCorner', {
      disabled: config.value.hotCornerDisabled,
      position: config.value.hotCornerPosition,
    });
  });

  //设置快捷键
  watchEffect(() => {
    ipcRenderer.invoke('setStartShortcut', config.value.startShortcut);
  });

  //设置开机自启动
  watchEffect(() => {
    ipcRenderer.invoke('setOpenAtLogin', config.value.openAtLogin);
  });

  return {
    config,
    resetConfig,
  };
});
