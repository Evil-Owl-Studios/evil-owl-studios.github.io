import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../../public/tools/convo-editor',
    emptyOutDir: true
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css:{
    preprocessorOptions:{
      scss: {
        additionalData: `
          @import '@/assets/global.scss';
          $iconPath: "@/assets/img";
          @import '@/assets/icons.scss';
          `
      }
    }
  }
})
