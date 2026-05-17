import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/00-HomeView.vue'),
    },
    {
      path: '/dest',
      name: 'dest',
      component: () => import('../views/01-DestinationView.vue'),
    },
    {
      path: '/crew',
      name: 'crew',
      component: () => import('../views/02-CrewView.vue'),
    },
    {
      path: '/tech',
      name: 'tech',
      component: () => import('../views/03-TechnologyView.vue'),
    },
  ],
})

export default router
