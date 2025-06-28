import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: 'https://github.com/weda90/yarn-vue-app',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
