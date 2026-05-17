import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: command === 'build' ? '/porfolio/projectsLink/REST-Countries-API_vue_ts/' : '/',

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
    },

    // 因 npm run build 打包到 dist 裡面檔案出現以 _ 開頭檔案 
    // => GitHub Pages 預設用 Jekyll 的工具來建立網頁，有規定：「只要是底線 _ 開頭的資料夾或檔案，視為內部私有檔案，拒絕編譯上傳！」，因此加入這段修改檔案
    build: {
      rollupOptions: {
        output: {
          // 1. 移除了會引發 Windows 路徑亂碼的 sanitizeFileName
          // 2. 改用更安全的方式：在輸出檔名時，動態把開頭的底線 [name] 去掉
          chunkFileNames: (chunkInfo) => {
            const name = chunkInfo.name.startsWith('_') ? chunkInfo.name.slice(1) : chunkInfo.name;
            return `assets/${name}-[hash].js`;
          },
          entryFileNames: (chunkInfo) => {
            const name = chunkInfo.name.startsWith('_') ? chunkInfo.name.slice(1) : chunkInfo.name;
            return `assets/${name}-[hash].js`;
          },
          assetFileNames: (assetInfo) => {
            // 處理個別資產（如 CSS、圖片）名稱
            const originalName = assetInfo.name || '';
            const name = originalName.startsWith('_') ? originalName.slice(1) : originalName;
            return `assets/${name}-[hash].[ext]`;
          }
        },
      }
    }
  }
})