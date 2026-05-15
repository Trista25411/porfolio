// 引入後修改content，來設定掃描路徑 => 寫入 src 路徑，才會去翻.vue 檔案，有寫 text-preset-1，才把對應的 CSS 程式碼打包出來，沒用到的就不會打包，讓檔案變得很小
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

