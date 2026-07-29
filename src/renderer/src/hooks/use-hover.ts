import { onUnmounted } from 'vue';

export const useHover = (onEnter: () => void, delay: number = 200) => {
  let timer: number | null = null;

  const clearTimer = () => {
    if (timer == null) {
      return;
    }

    window.clearTimeout(timer);

    timer = null;
  };

  const handleEnter = () => {
    clearTimer();

    timer = window.setTimeout(() => {
      onEnter?.();
    }, delay);
  };

  onUnmounted(() => {
    clearTimer();
  });

  return [handleEnter, clearTimer];
};

export const useIsHover = (
  delay: number = 200,
): [Ref<boolean>, () => void, () => void] => {
  const isHover = ref(false);

  const handleLeave = () => {
    clearTimer();

    isHover.value = false;
  };

  const [handleEnter, clearTimer] = useHover(() => {
    isHover.value = true;
  }, delay);

  return [isHover, handleEnter, handleLeave];
};
