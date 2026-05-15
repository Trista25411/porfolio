import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 指引檔案引用 
import './assets/main.css'   // 引入Tailwind 與 Preset 樣式

const app = createApp(App)

app.use(router) // 在 App.vue 中使用了 <RouterView />，如果不寫這行告訴 Vue 要使用路由插件，程式會因為找不到路由資訊而出現紅色報錯
app.mount('#app')