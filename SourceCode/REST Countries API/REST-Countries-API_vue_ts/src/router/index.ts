// import { createRouter, createWebHistory } from 'vue-router'
// GitHub Pages 無法調整伺服器內部路由重導向（Rewrites）的免費靜態空間，把 History 模式 改成 Hash 模式（網址會帶有 # 符號） => 告訴瀏覽器：「# 後面的東西是前端 Vue 自己的路由，伺服器請不要管它！」=> 不管網址怎麼變、怎麼重新整理，都不會再出現白屏或 404 了！
// 原先路徑名稱是 /，但實際上在github pages上是 /projectsLink/REST-Countries-API_vue_ts/index.html，history模式沒辦法沒辦法自由變動

//  改引入Hash 模式
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/index.html',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      // 路徑報錯 => ts不認得vue檔案，要到env.d.ts加入宣告
    },
        {
          // 原先路徑用'/detail'寫死，導致後面卡片不能顯示他的路徑位置，要改成'/detail/:id'
          // 讓每個卡片點進去都是他自己的 id 網頁資訊
      path: '/detail/:id',
      name: 'country-detail',
      component: () => import('../views/CountryView.vue'),
    },
  ],
})

export default router
