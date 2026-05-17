import { createRouter, createWebHashHistory } from 'vue-router'
// 預設載入首頁元件
import HomeView from '@/views/HomeView.vue'
// 將所有路由元件改為靜態載入
import AboutView from '@/views/AboutView.vue'
import PointView from '@/views/PointView.vue'
import InformationView from '@/views/InformationView.vue'
import VideoView from '@/views/VideoView.vue'
import FutureView from '@/views/FutureView.vue'
import ResourceMapView from '@/views/ResourceMapView.vue'
import EventMessageView from '@/views/EventMessageView.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  
  // 每次切換頁面時，自動滾動到頁面頂部
  scrollBehavior(to, from, savedPosition) {
    // 如果有儲存的捲動位置 (例如：點擊瀏覽器的「上一頁」按鈕)
    if (savedPosition) {
      return savedPosition
    }
    // 如果目標是頁面內的錨點 (hash)，則不進行任何捲動
    // 這就是解決您點擊按鈕時頁面跳轉的關鍵
    if (to.hash) {
      return {}
    }
    // 其他所有正常的頁面切換，都捲動到頁面頂端
    return { top: 0 }
  },
  
  // 定義路由規則
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView 
    },
    {
      path: '/point',
      name: 'point',
      component: PointView 
    },
    {
      path: '/information',
      name: 'information',
      component: InformationView 
    },
    {
      path: '/video',
      name: 'video',
      component: VideoView 
    },
    {
      path: '/future',
      name: 'future',
      component: FutureView 
    },
    {
      path: '/resource-map',
      name: 'resource-map',
      component: ResourceMapView 
    },
    {
      path: '/event/:id',
      // 路由名稱，方便在程式中引用
      name: 'EventDetail',
      component: EventMessageView, 
      // 啟用 props，這樣 Vue Router 會自動將 :id 作為 prop 傳遞給 EventMessageView 元件
      props: true
    },
  ]
})

export default router
