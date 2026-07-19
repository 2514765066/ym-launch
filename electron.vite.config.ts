import { resolve } from 'path';
import { defineConfig } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import { version, name } from './package.json';
import tailwindcss from '@tailwindcss/vite';
import autoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@': resolve('src/main'),
        '@type': resolve('src/type.ts'),
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
        '@type': resolve('src/type.ts'),
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
