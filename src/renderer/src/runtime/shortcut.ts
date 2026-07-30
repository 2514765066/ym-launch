import { useEventListener } from '@vueuse/core';
import { useCoreStore } from '@/stores/core';
import { useSettingStore } from '@/stores/setting';
import { useLauncherLayoutStore } from '@/stores/launcher-layout';
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
  const { setSelectedPage } = useLauncherLayoutStore();
  // 启动台应用导入操作
  const { addAppNode } = useCoreStore();

  // 处理启动台快捷键
  const handleShortcutKeydown = (event: KeyboardEvent) => {
    if (hasOpenDialog()) {
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === 'o') {
      event.preventDefault();
      addAppNode();
      return;
    }

    if (event.ctrlKey && event.key === ',') {
      event.preventDefault();
      eventBus.emit('settingDialog');
      return;
    }

    if (isShortcutPressed(event, config.value.prePageShortcut)) {
      setSelectedPage((currentPage) => currentPage - 1);
      return;
    }

    if (isShortcutPressed(event, config.value.nextPageShortcut)) {
      setSelectedPage((currentPage) => currentPage + 1);
      return;
    }

    if (isShortcutPressed(event, config.value.hiddenShortcut)) {
      ipc.hidden();
    }
  };

  useEventListener('keydown', handleShortcutKeydown, {
    capture: true,
  });
};
