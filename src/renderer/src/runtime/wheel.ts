import { useEventListener, useThrottleFn } from '@vueuse/core';
import { useLayoutStore } from '@/stores/layout';
import { hasOpenDialog } from '@/utils/dialog';

// 滚轮翻页节流时间
const wheelThrottleDuration = 400;

// 注册启动台滚轮翻页
export const useWheel = () => {
  // 启动台页面切换操作
  const { setSelectedPage } = useLayoutStore();

  // 节流处理启动台翻页滚轮，且不在尾沿补充调用
  const handleWheel = useThrottleFn(
    (event: WheelEvent) => {
      if (hasOpenDialog()) {
        return;
      }

      if (event.deltaY < 0) {
        setSelectedPage((currentPage) => currentPage - 1);
        return;
      }

      if (event.deltaY > 0) {
        setSelectedPage((currentPage) => currentPage + 1);
      }
    },
    wheelThrottleDuration,
    false,
  );

  useEventListener('wheel', handleWheel);
};
