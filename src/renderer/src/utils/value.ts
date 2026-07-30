export const getValue = <T, C extends any[]>(
  updater: T | ((...args: C) => T),
  ...args: C
): T => {
  return typeof updater === 'function'
    ? (updater as (...args: C) => T)(...args)
    : updater;
};
