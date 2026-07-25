import { resolve } from 'path';
import { defineConfig } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import { version, name } from './package.json';
import tailwindcss from '@tailwindcss/vite';
import autoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  main: {
    define: {
      __APP_VERSION__: JSON.stringify(version),
      __APP_NAME__: JSON.stringify(name),
    },
    resolve: {
      alias: {
        '@': resolve('src/main'),
        '@type': resolve('src/shared/type.ts'),
        '@shared/*': resolve('src/shared'),
      },
    },
  },
  preload: {},
  renderer: {
    define: {
      __APP_VERSION__: JSON.stringify(version),
      __APP_NAME__: JSON.stringify(name),
    },
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '@shared/type': resolve('src/shared/type.ts'),
        '@shared/app-info': resolve('src/shared/app-info.ts'),
      },
    },
    plugins: [
      vue(),
      tailwindcss(),
      autoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: true,
      }),
    ],
  },
});
