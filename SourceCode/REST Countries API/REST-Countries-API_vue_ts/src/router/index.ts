import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
