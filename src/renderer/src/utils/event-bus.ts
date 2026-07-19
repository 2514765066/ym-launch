type EventMap = {};

type EventName = keyof EventMap;
type EventHandler<T extends EventName> = (...args: EventMap[T]) => void;

class EventBus {
  private listeners = new Map<EventName, Set<(...args: any[]) => void>>();

  // 监听事件
  on<T extends EventName>(eventName: T, handler: EventHandler<T>) {
    const handlers = this.listeners.get(eventName) ?? new Set();

    handlers.add(handler);
    this.listeners.set(eventName, handlers);

    return () => {
      handlers.delete(handler);

      if (handlers.size === 0) {
        this.listeners.delete(eventName);
      }
    };
  }

  // 触发事件
  emit<T extends EventName>(eventName: T, ...args: EventMap[T]) {
    this.listeners.get(eventName)?.forEach((handler) => {
      handler(...args);
    });
  }
}

export const eventBus = new EventBus();
