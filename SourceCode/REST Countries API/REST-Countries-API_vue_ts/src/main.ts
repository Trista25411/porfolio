import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 要把base.css的樣式表也一併匯入到main.ts不只是main.css，不然不會執行
import './assets/base.css';
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
