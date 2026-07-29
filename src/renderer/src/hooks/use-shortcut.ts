import { useEventListener } from '@vueuse/core';
import { useSettingStore } from '@/stores/setting';
import { useLauncherGridStore } from '@/stores/launcher-grid';

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
  const { prePage, nextPage } = useLauncherGridStore();

  useEventListener('keydown', (event) => {
    if (isShortcutPressed(event, config.value.prePageShortcut)) {
      prePage();
      return;
    }

    if (isShortcutPressed(event, config.value.nextPageShortcut)) {
      nextPage();
      return;
    }

    if (isShortcutPressed(event, config.value.hiddenShortcut)) {
      ipc.hidden();
    }
  });
};
