import { useSettingStore } from '@/stores/setting';
import { eventBus } from '@/utils/event-bus';
import MessageBox from '@/components/message-box';
import { useStorage } from '@vueuse/core';
import { isOverOneDay } from '@/utils/date';
import { storagePre } from '@shared/app-info';

type Status =
  'init' | 'checking' | 'update-not-available' | 'downloading' | 'downloaded';

export const useUpdateStore = defineStore('update', () => {
  const { config } = storeToRefs(useSettingStore());

  //状态
  const status = ref<Status>('init');

  //上次更新时间
  const lastUpdateTime = useStorage(`${storagePre}:lastUpdateTime`, 0);

  //下载进度
  const downloadProgress = ref(0);

  //检查更新
  const checkUpdate = async () => {
    status.value = 'checking';

    try {
      const res = await ipc.checkUpdate();

      //没有更新
      if (res == false) {
        status.value = 'update-not-available';
        return;
      }

      status.value = 'downloading';
    } catch (e) {
      eventBus.emit('error', '更新失败,请检查网络');

      status.value = 'init';

      console.error(e);
    }
  };

  //初始化
  const init = () => {
    if (config.value.autoUpdate) {
      const now = Date.now();

      if (isOverOneDay(lastUpdateTime.value, now)) {
        checkUpdate();
        lastUpdateTime.value = now;
      }
    }
  };

  //监听下载进度
  ipc.on('download-progress', (percent: number) => {
    downloadProgress.value = Math.floor(percent);

    if (percent == 100) {
      status.value = 'downloaded';
    }
  });

  //下载完成
  ipc.on('update-downloaded', async () => {
    if (!config.value.installUpdatePrompt) {
      await ipc.installUpdate();
      return;
    }

    //安装
    const res = await MessageBox.confirm({
      title: '安装新版本',
      description: '新版本下载完成,是否安装?',
    });

    //不安装
    if (!res) {
      return;
    }

    await ipc.installUpdate();
  });

  init();

  return {
    status,
    downloadProgress,
    checkUpdate,
  };
});
