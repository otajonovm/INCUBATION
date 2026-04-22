import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

// Eski Service Worker ni o'chirib tashlash (Workbox/PWA xatoliklarini to'xtatadi)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister()
    }
  })
}

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(MotionPlugin)
app.mount('#app')
