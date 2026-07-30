import { useEventListener } from '@vueuse/core';
import { useLauncherLayoutStore } from '@/stores/launcher-layout';
import { hasOpenDialog } from '@/utils/dialog';

// 注册启动台滚轮翻页
export const useWheel = () => {
  // 启动台页面切换操作
  const { setSelectedPage } = useLauncherLayoutStore();

  // 处理启动台翻页滚轮
  const handleWheel = (event: WheelEvent) => {
    if (hasOpenDialog()) {
      return;
    }

    if (event.deltaY < 0) {
      setSelectedPage((currentPage) => currentPage - 1);
      return;
    }

    if (event.deltaY > 0) {
      setSelectedPage((currentPage) => currentPage + 1);
      return;
    }
  };

  useEventListener('wheel', handleWheel);
};
