import { globalShortcut } from 'electron';

interface StartShortcutResult {
  success: boolean;
  error?: string;
}

interface StartShortcut {
  setShortcut: (shortcut: string) => StartShortcutResult;
}

let startShortcut: StartShortcut | undefined;

export const createStartShortcut = (handler: () => void) => {
  let activeShortcut = '';

  const setShortcut = (shortcut: string): StartShortcutResult => {
    const nextShortcut = shortcut.trim();

    if (nextShortcut === activeShortcut) {
      return { success: true };
    }

    const previousShortcut = activeShortcut;

    if (previousShortcut) {
      globalShortcut.unregister(previousShortcut);
    }

    if (!nextShortcut) {
      activeShortcut = '';
      return { success: true };
    }

    try {
      if (globalShortcut.register(nextShortcut, handler)) {
        activeShortcut = nextShortcut;
        return { success: true };
      }
    } catch {
      // Invalid accelerator strings are handled like unavailable shortcuts.
    }

    if (previousShortcut) {
      globalShortcut.register(previousShortcut, handler);
    }

    return {
      success: false,
      error: '该快捷键已被其他应用占用或无效',
    };
  };

  startShortcut = { setShortcut };

  return startShortcut;
};

export const setStartShortcut = (shortcut: string): StartShortcutResult => {
  if (!startShortcut) {
    return { success: false, error: '快捷键服务尚未准备就绪' };
  }

  return startShortcut.setShortcut(shortcut);
};
