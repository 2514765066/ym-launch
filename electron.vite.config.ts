import { resolve } from 'path';
import { defineConfig } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import { version, name, productName } from './package.json';
import tailwindcss from '@tailwindcss/vite';
import autoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  main: {
    define: {
      __APP_VERSION__: JSON.stringify(version),
      __APP_NAME__: JSON.stringify(name),
      __APP_PRODUCT_NAME__: JSON.stringify(productName),
    },
    resolve: {
      alias: {
        '@': resolve('src/main'),
        '@shared': resolve('src/shared'),
        '@resources': resolve('resources'),
      },
    },
  },
  preload: {},
  renderer: {
    define: {
      __APP_VERSION__: JSON.stringify(version),
      __APP_NAME__: JSON.stringify(name),
      __APP_PRODUCT_NAME__: JSON.stringify(productName),
    },
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '@shared': resolve('src/shared'),
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
