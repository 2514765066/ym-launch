import { screen } from 'electron';
import { uIOhook } from 'uiohook-napi';
import type { HotCornerPosition } from '@shared/type';

interface HotCornerConfig {
  disabled: boolean;
  position: HotCornerPosition;
}

interface HotCorner {
  setConfig: (config: HotCornerConfig) => void;
}

let hotCorner: HotCorner | undefined;

export const createHotCorner = (handler: () => void) => {
  const cornerSize = 5;
  let disabled = false;
  let position: HotCornerPosition = 'top-left';
  let isInCorner = false;
  let started = false;

  const start = () => {
    if (!started) {
      uIOhook.start();
      started = true;
    }
  };

  const stop = () => {
    if (started) {
      uIOhook.stop();
      started = false;
    }
  };

  const isMouseInCorner = (x: number, y: number) => {
    const display = screen.getDisplayNearestPoint({ x, y });
    const { x: left, y: top, width, height } = display.bounds;
    const right = left + width - 1;
    const bottom = top + height - 1;

    switch (position) {
      case 'bottom-left':
        return x <= left + cornerSize && y >= bottom - cornerSize;
      case 'top-right':
        return x >= right - cornerSize && y <= top + cornerSize;
      case 'bottom-right':
        return x >= right - cornerSize && y >= bottom - cornerSize;
      case 'top-left':
        return x <= left + cornerSize && y <= top + cornerSize;
    }
  };

  uIOhook.on('mousemove', ({ x, y }) => {
    const inCorner = !disabled && isMouseInCorner(x, y);

    if (inCorner && !isInCorner) {
      handler();
    }

    isInCorner = inCorner;
  });

  const instance: HotCorner = {
    setConfig(config) {
      disabled = config.disabled;
      position = config.position;
      isInCorner = false;

      if (disabled) {
        stop();
      } else {
        start();
      }
    },
  };

  hotCorner = instance;
  instance.setConfig({ disabled, position });

  return instance;
};

export const setHotCorner = (config: HotCornerConfig) => {
  hotCorner?.setConfig(config);
};
