import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import './style.css'
import App from './App.vue'
import router from './router'

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
app.use(MotionPlugin)
app.mount('#app')
