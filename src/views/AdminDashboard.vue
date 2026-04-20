<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const stats = ref({
  startups: '8+',
  itProjects: '25+',
  investments: '2.5M+',
  students: '150+'
})

// Boshlang'ich qiymatlarni LocalStorage dan olish
onMounted(() => {
  const savedStats = localStorage.getItem('site_stats')
  if (savedStats) {
    stats.value = JSON.parse(savedStats)
  }
})

// O'zgarishlarni saqlash
const saveStats = () => {
  localStorage.setItem('site_stats', JSON.stringify(stats.value))
  alert('Ma\'lumotlar muvaffaqiyatli saqlandi!')
}

const logout = () => {
  localStorage.removeItem('admin_auth')
  router.push('/admin/login')
}
</script>

<template>
  <div class="min-h-screen bg-[#ececef] p-4 md:p-8 font-sans text-[#1a2744]">
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 class="text-3xl font-bold">Boshqaruv Paneli</h1>
        <div class="flex gap-3">
          <router-link to="/" class="px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">Saytga qaytish</router-link>
          <button @click="logout" class="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm">Chiqish</button>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
        <h2 class="text-xl font-bold mb-6 border-b pb-4">Statistika Raqamlarini O'zgartirish</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-[#53627f]">Startap loyihalar</label>
            <input v-model="stats.startups" type="text" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-2 focus:ring-[#5e73ff]/20 font-bold text-lg" />
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-[#53627f]">IT Loyihalar</label>
            <input v-model="stats.itProjects" type="text" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-2 focus:ring-[#5e73ff]/20 font-bold text-lg" />
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-[#53627f]">Jalb qilingan investitsiya ($)</label>
            <input v-model="stats.investments" type="text" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-2 focus:ring-[#5e73ff]/20 font-bold text-lg" />
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-[#53627f]">O'qitilgan talabalar</label>
            <input v-model="stats.students" type="text" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-2 focus:ring-[#5e73ff]/20 font-bold text-lg" />
          </div>
        </div>

        <div class="mt-8 pt-6 border-t flex justify-end">
          <button @click="saveStats" class="bg-linear-to-r from-[#2c4deb] to-[#5e73ff] hover:from-[#1b3be0] hover:to-[#4d64ff] text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-[0_10px_20px_rgba(94,115,255,0.3)] transition-all">
            O'zgarishlarni Saqlash
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
