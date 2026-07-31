import { useEventListener } from '@vueuse/core';
import { useSettingStore } from '@/stores/setting';
import { useLayoutStore } from '@/stores/layout';
import { eventBus } from '@/utils/event-bus';
import { hasOpenDialog } from '@/utils/dialog';

// 判断按键事件是否匹配目标快捷键
const isShortcutPressed = (event: KeyboardEvent, shortcut: string) => {
  // 当前按下的组合键
  const pressedShortcut = [
    event.ctrlKey && 'Control',
    event.shiftKey && 'Shift',
    event.altKey && 'Alt',
    event.key,
  ]
    .filter(Boolean)
    .join('+');

  return pressedShortcut.toLowerCase() === shortcut.toLowerCase();
};

// 注册启动台快捷键
export const useShortcut = () => {
  // 启动台快捷键设置
  const { config } = storeToRefs(useSettingStore());
  // 启动台页面切换操作
  const { setSelectedPage } = useLayoutStore();

  // 处理启动台快捷键
  const handleShortcutKeydown = (event: KeyboardEvent) => {
    if (hasOpenDialog()) {
      return;
    }

    //设置
    if (event.ctrlKey && event.key === ',') {
      event.preventDefault();
      eventBus.emit('settingDialog');
      return;
    }

    //上一页
    if (isShortcutPressed(event, config.value.prePageShortcut)) {
      setSelectedPage((currentPage) => currentPage - 1);
      return;
    }

    //下一页
    if (isShortcutPressed(event, config.value.nextPageShortcut)) {
      setSelectedPage((currentPage) => currentPage + 1);
      return;
    }

    //隐藏
    if (isShortcutPressed(event, config.value.hiddenShortcut)) {
      ipc.hidden();
    }
  };

  useEventListener('keydown', handleShortcutKeydown, {
    capture: true,
  });
};
