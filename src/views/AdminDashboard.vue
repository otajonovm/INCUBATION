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

// Yangiliklar uchun ref (rasmlar URL ro'yhati)
const newsItems = ref([
  { title: 'Inkubatsiya markazi tadbiri', image: '/uploads/yangiliklar/rasm/2022/Dec/06/CanK25-LcRc-.jpg' },
  { title: 'Taqdimot va seminar', image: '/uploads/slayder/rasm/2022/Dec/06/Z9uE04aZeZmx.png' },
  { title: 'Laboratoriya muhiti', image: '/uploads/slayder/rasm/2022/Dec/06/b9nHg-C-89iB.png' },
  { title: 'Yangi coworking maydoni', image: '/uploads/slayder/rasm/2022/Dec/06/bCntiTWHoqaQ.png' },
  { title: 'Loyihalar muhokamasi', image: '/uploads/slayder/rasm/2022/Dec/06/A3tt2tL9Dd02.png' }
])

// Bizning jamoa uchun
const teamItems = ref([
  { name: 'Allanyazov R.B.', role: 'Yetakchi mutaxassis', description: 'Yetakchi mutaxassis, patent va mualliflik guvohnomalarini olishga texnik yordam ko‘rsatish bo‘yicha maʼsul xodim', image: '/uploads/bizningjamoa/rasm/2022/Dec/06/Kc_h7OMzJhMj.jpg' },
  { name: 'Eshonkulova F.M.', role: 'Loyihalar menedjer', description: 'loyihalar menedjeri, ilmiy loyihalar ishtirokchilari bilan ishlash bo‘yicha maʼsul xodim', image: '/uploads/bizningjamoa/rasm/2022/Dec/06/HFrJoqbozRca.jpg' },
  { name: 'Xayrullayev A.F.', role: 'Yetakchi mutaxassis', description: 'Yetakchi mutaxassis, elektron xujjat aylanish tizimi bilan ishlash bo\'yicha ma\'sul xodim', image: '/uploads/bizningjamoa/rasm/2022/Dec/06/E3Eda8lkFYRq.png' }
])

// Boshlang'ich qiymatlarni LocalStorage dan olish
onMounted(() => {
  const savedStats = localStorage.getItem('site_stats')
  if (savedStats) {
    stats.value = JSON.parse(savedStats)
  }

  const savedNews = localStorage.getItem('site_news')
  if (savedNews) {
    newsItems.value = JSON.parse(savedNews)
  }

  const savedTeam = localStorage.getItem('site_team')
  if (savedTeam) {
    teamItems.value = JSON.parse(savedTeam)
  }
})

// O'zgarishlarni saqlash
const saveStats = () => {
  try {
    localStorage.setItem('site_stats', JSON.stringify(stats.value))
    localStorage.setItem('site_news', JSON.stringify(newsItems.value))
    localStorage.setItem('site_team', JSON.stringify(teamItems.value))
    alert('Ma\'lumotlar muvaffaqiyatli saqlandi!')
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      alert("Xatolik: Rasmlar hajmi juda katta! Iltimos kichikroq rasmlar yuklang yoki eskilari o'chiring (LocalStorage to'ldi).")
    } else {
      alert("Saqlashda xatolik yuz berdi!")
    }
  }
}

// Yangi rasm qo'shish
const addNewImage = () => {
  newsItems.value.push({ title: 'Yangi rasm', image: '' })
}

// Rasmni o'chirish
const removeImage = (index) => {
  newsItems.value.splice(index, 1)
}

// Kompyuterdan rasm yuklash va xotira(Base64)ga o'zgartirish
const handleFileUpload = (event, index) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    // Rasmni o'qiymiz
    const img = new Image()
    img.onload = () => {
      // LocalStorage chekloviga tushmasligi uchun hajmini kichiklashtirish (siqish) uchun Canvas yaratamiz
      const canvas = document.createElement('canvas')
      const MAX_WIDTH = 800
      const MAX_HEIGHT = 600
      let width = img.width
      let height = img.height

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height
          height = MAX_HEIGHT
        }
      }
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      // Tasvirni sifatini tushirib siqilgan JPEG variantga aylantirish (Base64)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.6)
      newsItems.value[index].image = dataUrl
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
}

// Bizning jamoa uchun funksiyalar
const addNewTeamItem = () => {
  teamItems.value.push({ name: '', role: '', description: '', image: '' })
}

const removeTeamItem = (index) => {
  teamItems.value.splice(index, 1)
}

// Kompyuterdan rasm yuklash va xotira(Base64)ga o'zgartirish (Jamoa uchun)
const handleTeamFileUpload = (event, index) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const MAX_WIDTH = 400
      const MAX_HEIGHT = 400
      let width = img.width
      let height = img.height

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height
          height = MAX_HEIGHT
        }
      }
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      const dataUrl = canvas.toDataURL('image/jpeg', 0.6)
      teamItems.value[index].image = dataUrl
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
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

      <!-- Yangiliklar rasmlarini boshqarish qismi -->
      <div class="bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)] mt-8">
        <div class="flex justify-between items-center mb-6 border-b pb-4">
          <h2 class="text-xl font-bold">Yangiliklar va E'lonlar Rasmlari (Karusel)</h2>
          <button @click="addNewImage" class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2">
            <span>+</span> Yangi rasm qo'shish
          </button>
        </div>

        <div class="space-y-4">
          <div v-for="(item, index) in newsItems" :key="index" class="p-4 border border-gray-100 rounded-xl bg-gray-50 relative group">
            <button @click="removeImage(index)" class="absolute top-4 right-4 text-red-500 hover:text-red-700 opacity-60 hover:opacity-100 transition-opacity" title="O'chirish">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
            <div class="space-y-3 pr-10">
              <div>
                <label class="block text-xs font-semibold text-[#53627f] mb-2">Kompyuterdan rasm tanlash yoki URL Link kiriting</label>
                <div class="flex flex-col sm:flex-row gap-3">
                  <input v-model="item.image" type="text" placeholder="https://... yoki /uploads/..." class="flex-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-1 focus:ring-[#5e73ff]/20 text-sm" />
                  <label class="px-5 py-2.5 bg-[#f8f9fc] hover:bg-[#e6efff] text-[#2c4deb] border border-[#5e73ff]/20 rounded-lg cursor-pointer text-sm font-bold whitespace-nowrap flex items-center justify-center transition-colors">
                     Jilddan Tanlash
                     <input type="file" @change="handleFileUpload($event, index)" accept="image/*" class="hidden" />
                  </label>
                </div>
              </div>
              <div class="hidden">
                 <!-- Biz faqat rasmni ko'rsatamiz, bu yerda saqlab qo'yish uchun titleni yashirin qoldiramiz -->
                <input v-model="item.title" type="hidden" />
              </div>
              <div class="pt-2">
                 <img v-if="item.image" :src="item.image" class="h-20 w-auto rounded border border-gray-200 object-cover" @error="$event.target.src='https://placehold.co/150/f0f0f1/53627f?text=Topilmadi'" />
              </div>
            </div>
          </div>
          <div v-if="newsItems.length === 0" class="text-center py-6 text-gray-500">
            Hech qanday rasm yo'q. Yangi rasm qo'shing.
          </div>
        </div>

        <div class="mt-8 pt-6 border-t flex justify-end">
          <button @click="saveStats" class="bg-linear-to-r from-[#2c4deb] to-[#5e73ff] hover:from-[#1b3be0] hover:to-[#4d64ff] text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-[0_10px_20px_rgba(94,115,255,0.3)] transition-all">
            O'zgarishlarni Saqlash
          </button>
        </div>
      </div>

      <!-- Bizning Jamoa boshqarish qismi -->
      <div class="bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)] mt-8 mb-8">
        <div class="flex justify-between items-center mb-6 border-b pb-4">
          <h2 class="text-xl font-bold">Bizning Jamoa (A'zolar)</h2>
          <button @click="addNewTeamItem" class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2">
            <span>+</span> Yangi a'zo qo'shish
          </button>
        </div>

        <div class="space-y-4">
          <div v-for="(item, index) in teamItems" :key="index" class="p-4 border border-gray-100 rounded-xl bg-gray-50 relative group">
            <button @click="removeTeamItem(index)" class="absolute top-4 right-4 text-red-500 hover:text-red-700 opacity-60 hover:opacity-100 transition-opacity" title="O'chirish">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
            <div class="space-y-4 pr-10">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-[#53627f] mb-1">Ism va familiya</label>
                  <input v-model="item.name" type="text" placeholder="Masalan: Allanyazov R.B." class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-1 focus:ring-[#5e73ff]/20 text-sm" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#53627f] mb-1">Lavozimi (Role)</label>
                  <input v-model="item.role" type="text" placeholder="Masalan: Yetakchi mutaxassis" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-1 focus:ring-[#5e73ff]/20 text-sm" />
                </div>
              </div>
              
              <div>
                <label class="block text-xs font-semibold text-[#53627f] mb-1">Batafsil ma'lumot</label>
                <textarea v-model="item.description" rows="2" placeholder="Xodimning vazifalari va batafsil ma'lumoti" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-1 focus:ring-[#5e73ff]/20 text-sm resize-y"></textarea>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#53627f] mb-2">Rasm tanlash yoki URL Link kiriting</label>
                <div class="flex flex-col sm:flex-row gap-3">
                  <input v-model="item.image" type="text" placeholder="https://... yoki /uploads/..." class="flex-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-1 focus:ring-[#5e73ff]/20 text-sm" />
                  <label class="px-5 py-2.5 bg-[#f8f9fc] hover:bg-[#e6efff] text-[#2c4deb] border border-[#5e73ff]/20 rounded-lg cursor-pointer text-sm font-bold whitespace-nowrap flex items-center justify-center transition-colors">
                    Jilddan Tanlash
                    <input type="file" @change="handleTeamFileUpload($event, index)" accept="image/*" class="hidden" />
                  </label>
                </div>
              </div>
              <div class="pt-2">
                <img v-if="item.image" :src="item.image" class="h-20 w-20 rounded-full border border-gray-200 object-cover shadow-sm" @error="$event.target.src='https://placehold.co/150/f0f0f1/53627f?text=Topilmadi'" />
              </div>
            </div>
          </div>
          <div v-if="teamItems.length === 0" class="text-center py-6 text-gray-500">
            Hech qanday a'zo yo'q. Yangi a'zo qo'shing.
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
