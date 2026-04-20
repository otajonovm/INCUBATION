<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = () => {
  // Oddiy test muhiti uchun - har qanday login/parolni qabul qilib admin bo'limiga o'tkazib yuboradi.
  // Agar xohlasangiz, qat'iy qilish uchun if(email.value === 'admin@tuit.uz' && password.value === 'admin123') kabi shart yozsa bo'ladi.
  
  if (email.value === 'admin' && password.value === 'admin') {
    localStorage.setItem('admin_auth', 'true')
    router.push('/admin/dashboard')
  } else {
    error.value = 'Xato! Test uchun Login: admin, Parol: admin ni kiriting.'
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#ececef] flex items-center justify-center p-4">
    <div class="bg-white p-8 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] max-w-md w-full">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-[#1a2744]">Admin Panel</h2>
        <p class="text-[#53627f] mt-2">Test muhiti, kirish uchun login va parolga: admin yozing</p>
      </div>
      <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
        <div v-if="error" class="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center font-medium">{{ error }}</div>
        <div>
          <label class="block text-sm font-semibold text-[#1a2744] mb-1.5">Loyiga (Login)</label>
          <input v-model="email" type="text" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-2 focus:ring-[#5e73ff]/20 transition-all font-medium text-[#1a2744]" placeholder="admin" required />
        </div>
        <div>
          <label class="block text-sm font-semibold text-[#1a2744] mb-1.5">Parol</label>
          <input v-model="password" type="password" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-2 focus:ring-[#5e73ff]/20 transition-all font-medium text-[#1a2744]" placeholder="••••••••" required />
        </div>
        <button type="submit" class="mt-4 w-full bg-linear-to-r from-[#2c4deb] to-[#5e73ff] hover:from-[#1b3be0] hover:to-[#4d64ff] text-white py-3.5 rounded-xl font-bold text-lg shadow-[0_10px_20px_rgba(94,115,255,0.3)] transition-all flex justify-center items-center gap-2">
          Tizimga Kirish
        </button>
      </form>
    </div>
  </div>
</template>
