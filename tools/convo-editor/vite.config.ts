import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/tools/convo-editor/',
  build: {
    outDir: '../../public/tools/convo-editor',
    emptyOutDir: true,
  },
  plugins: [
    vue(),
  ],
  define:{
    APP_VERSION: JSON.stringify(process.env.npm_package_version)
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css:{
    preprocessorOptions:{
      scss: {
        additionalData: `
          @import '@/assets/themes.scss';
          @import '@/assets/global.scss';
          $iconPath: "@/assets/img";
          @import '@/assets/icons.scss';
          `
      }
    }
  }
})
