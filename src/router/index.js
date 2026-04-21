import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true }
    }
  ]
})

// Oddiy avtorizatsiya himoyasi (test uchun LocalStorage dan foydalanamiz)      
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !localStorage.getItem('admin_auth')) {
    return '/admin/login'
  }
  return true
})

export default router
