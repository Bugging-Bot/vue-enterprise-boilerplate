import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './guards'
import MessageView from '../views/MessageView.vue'
import ConfigurationView from '@/views/ConfigurationView.vue'
import DashboardView from '@/views/DashboardView.vue'
import SimulationView from '@/views/SimulationView.vue'
import UpdateView from '@/views/UpdateView.vue'
import ProcessBuilderView from '@/views/ProcessBuilderView.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
