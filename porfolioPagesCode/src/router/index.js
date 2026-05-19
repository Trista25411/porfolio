import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/index.html',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/projects/:id',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    return savedPosition || { top: 0 };
  },
});

export default router
