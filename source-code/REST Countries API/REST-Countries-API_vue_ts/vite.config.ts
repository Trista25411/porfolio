import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  // plugins: [
  //   vue(),
  //   vueDevTools(),
  // ],

  // 因ion-的icon報錯，改成以下內容
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 告訴 Vue：所有以 ion- 開頭的標籤都不是 Vue 組件，不要去解析它們
          isCustomElement: (tag) => tag.startsWith('ion-')
        }
      }
    }),
  ],
resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
