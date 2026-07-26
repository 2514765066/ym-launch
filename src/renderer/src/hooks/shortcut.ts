import { useEventListener } from '@vueuse/core';
import { useLauncherUiStore } from '@/stores/launcher-ui';
import { useSettingStore } from '@/stores/setting';

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
  const { prePage, nextPage, hidden } = useLauncherUiStore();

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
      hidden();
    }
  });
};
