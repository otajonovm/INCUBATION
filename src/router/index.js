import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import AboutCenterView from '../views/AboutCenterView.vue'
import IncubationCenterView from '../views/IncubationCenterView.vue'
import ResearchProjectsView from '../views/ResearchProjectsView.vue'
import JournalsView from '../views/JournalsView.vue'
import CommercializationView from '../views/CommercializationView.vue'
import CommercializationDetailView from '../views/CommercializationDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutCenterView
    },
    {
      path: '/incubation',
      name: 'incubation',
      component: IncubationCenterView
    },
    {
      path: '/research',
      name: 'research',
      component: ResearchProjectsView
    },
    {
      path: '/journals',
      name: 'journals',
      component: JournalsView
    },
    {
      path: '/commercialization',
      name: 'commercialization',
      component: CommercializationView
    },
    {
      path: '/commercialization/:slug',
      name: 'commercialization-detail',
      component: CommercializationDetailView
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
