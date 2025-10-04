import { createRouter, createWebHistory } from 'vue-router'

import { authGuard } from './guards'
import MessageView from '@/pages/Messages.vue'
import ConfigurationView from '@/pages/GlobalConfiguration.vue'
import DashboardView from '@/pages/DashboardView.vue'
import SimulationView from '@/pages/Simulations.vue'
import UpdateView from '@/pages/UpdateEvents.vue'
import ProcessBuilderView from '@/pages/ProcessBuilder.vue'
import TestView from '@/pages/TestPage.vue'

const routes = [
  // commenting since using keycloak login
  // {
  //   path: '/',
  //   redirect: '/login'
  // },

  // {
  //   path: '/login',
  //   component: () => import('@/pages/LoginPage.vue')
  // },
  {
    path: '/home',
    component: () => import('@/pages/Home.vue'),
    //meta: { requiresAuth: true },
    meta: { requiresAuth: true } // changing it to true, making login mandatory
    //beforeEnter: authGuard // commenting, making login mandatory
  },
  {
    path: '/messages',
    // name: 'Messages',
    component: MessageView,
    meta: { requiresAuth: true }
  },
  {
    path: '/configuration',
    // name: 'ConfigurationView',
    component: ConfigurationView,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    // name: 'ConfigurationView',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/simulation',
    // name: 'ConfigurationView',
    component: SimulationView,
    meta: { requiresAuth: true }
  },
  {
    path: '/update',
    // name: 'ConfigurationView',
    component: UpdateView,
    meta: { requiresAuth: true }
  },
  {
    path: '/processes',
    // name: 'ConfigurationView',
    component: ProcessBuilderView,
    meta: { requiresAuth: true }
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
