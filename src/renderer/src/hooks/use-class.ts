import { useLauncherUiStore } from '@/stores/launcher-ui';

//全局的类样式
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
