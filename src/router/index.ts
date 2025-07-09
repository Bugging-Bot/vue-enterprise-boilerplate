import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './guards'
import MessageView from '@/pages/MessageView.vue'
import ConfigurationView from '@/pages/ConfigurationView.vue'
import DashboardView from '@/pages/DashboardView.vue'
import SimulationView from '@/pages/SimulationView.vue'
import UpdateView from '@/pages/UpdateView.vue'
import ProcessBuilderView from '@/pages/ProcessBuilderView.vue'
import TestView from '@/pages/TestView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/pages/LoginView.vue')
  },
  {
    path: '/home',
    component: () => import('@/pages/HomeView.vue'),
    //meta: { requiresAuth: true },
    meta: { requiresAuth: false },
    beforeEnter: authGuard
  },
  {
    path: '/messages',
    // name: 'Messages',
    component: MessageView,
    meta: { requiresAuth: false }
  },
  {
    path: '/configuration',
    // name: 'ConfigurationView',
    component: ConfigurationView,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    // name: 'ConfigurationView',
    component: DashboardView,
    meta: { requiresAuth: false }
  },
  {
    path: '/simulation',
    // name: 'ConfigurationView',
    component: SimulationView,
    meta: { requiresAuth: false }
  },
  {
    path: '/update',
    // name: 'ConfigurationView',
    component: UpdateView,
    meta: { requiresAuth: false }
  },
  {
    path: '/processes',
    // name: 'ConfigurationView',
    component: ProcessBuilderView,
    meta: { requiresAuth: false }
  },
  {
    path: '/test',
    // name: 'ConfigurationView',
    component: TestView,
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
