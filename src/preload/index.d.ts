type _Awaited<T> = T extends Promise<infer U> ? U : T;
type _Fn = (...args: any[]) => any;
type _Tail<T extends any[]> = T extends [any, ...infer R] ? R : [];
type _Invoke<F extends _Fn> = (
  ...args: _Tail<Parameters<F>>
) => Promise<_Awaited<ReturnType<F>>>;

type Ipc = typeof import('../main/ipc/index');
type IpcChannel = import('../shared/ipc-channels').IpcChannel;

declare global {
  const ipc: {
    [K in IpcChannel]: _Invoke<Ipc[K]>;
  };

  const __APP_VERSION__: string;
  const __APP_NAME__: string;
}

export {};
