import { useLauncherUiStore } from '@/stores/launcher-ui';

// 同步全局运行时类名
export const useClass = () => {
  const { status } = storeToRefs(useLauncherUiStore());

  //晃动
  watchEffect(() => {
    if (status.value == 'remove') {
      document.body.classList.add('launcher-remove');
      return;
    }

    document.body.classList.remove('launcher-remove');
  });
};
