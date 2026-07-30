import { useEventListener } from '@vueuse/core';
import { useCoreStore } from '@/stores/core';
import { useSettingStore } from '@/stores/setting';
import { useLauncherLayoutStore } from '@/stores/launcher-layout';
import { eventBus } from '@/utils/event-bus';

const isShortcutPressed = (event: KeyboardEvent, shortcut: string) => {
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

export const useShortcut = () => {
  const { config } = storeToRefs(useSettingStore());
  const { setSelectedPage } = useLauncherLayoutStore();
  const { addAppNode } = useCoreStore();

  useEventListener('keydown', (event) => {
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
      setSelectedPage((c) => c - 1);
      return;
    }

    if (isShortcutPressed(event, config.value.nextPageShortcut)) {
      setSelectedPage((c) => c + 1);
      return;
    }

    if (isShortcutPressed(event, config.value.hiddenShortcut)) {
      ipc.hidden();
    }
  });
};
