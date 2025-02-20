import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './guards'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/home',
    component: () => import('../views/HomeView.vue'),
    //meta: { requiresAuth: true },
    meta: { requiresAuth: false },
    beforeEnter: authGuard
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
