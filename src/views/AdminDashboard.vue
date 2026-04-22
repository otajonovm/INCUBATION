<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'

const router = useRouter()
const CONTENT_TABLE = 'site_content'

const defaultStats = {
  startups: '8+',
  itProjects: '25+',
  investments: '2.5M+',
  students: '150+',
}

const defaultNewsItems = [
  { title: 'Inkubatsiya markazi tadbiri', image: '/uploads/yangiliklar/rasm/2022/Dec/06/CanK25-LcRc-.jpg' },
  { title: 'Taqdimot va seminar', image: '/uploads/slayder/rasm/2022/Dec/06/Z9uE04aZeZmx.png' },
  { title: 'Laboratoriya muhiti', image: '/uploads/slayder/rasm/2022/Dec/06/b9nHg-C-89iB.png' },
  { title: 'Yangi coworking maydoni', image: '/uploads/slayder/rasm/2022/Dec/06/bCntiTWHoqaQ.png' },
  { title: 'Loyihalar muhokamasi', image: '/uploads/slayder/rasm/2022/Dec/06/A3tt2tL9Dd02.png' },
]

const defaultTeamItems = [
  { name: 'Allanyazov R.B.', role: 'Yetakchi mutaxassis', description: 'Yetakchi mutaxassis, patent va mualliflik guvohnomalarini olishga texnik yordam ko‘rsatish bo‘yicha maʼsul xodim', image: '/uploads/bizningjamoa/rasm/2022/Dec/06/Kc_h7OMzJhMj.jpg' },
  { name: 'Eshonkulova F.M.', role: 'Loyihalar menedjer', description: 'loyihalar menedjeri, ilmiy loyihalar ishtirokchilari bilan ishlash bo‘yicha maʼsul xodim', image: '/uploads/bizningjamoa/rasm/2022/Dec/06/HFrJoqbozRca.jpg' },
  { name: 'Xayrullayev A.F.', role: 'Yetakchi mutaxassis', description: "Yetakchi mutaxassis, elektron xujjat aylanish tizimi bilan ishlash bo'yicha ma'sul xodim", image: '/uploads/bizningjamoa/rasm/2022/Dec/06/E3Eda8lkFYRq.png' },
]

const stats = ref({ ...defaultStats })
const newsItems = ref([...defaultNewsItems])
const teamItems = ref([...defaultTeamItems])
const projectItems = ref([])

const defaultAboutData = {
  title: 'Markaz Haqida',
  subtitle: 'TUIT Incubation Center haqida to\'liq ma\'lumot',
  description: 'Markaz haqida to\'liq ma\'lumot matni...',
  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  leadersTitle: 'Boshqaruv',
  leaders: [],
  employees: []
}
const aboutData = ref(JSON.parse(JSON.stringify(defaultAboutData)))
const researchProjects = ref([])
const journals = ref([])
const commercializationItems = ref([])

const getContentByKey = async (key, fallbackValue) => {
  const { data, error } = await supabase
    .from(CONTENT_TABLE)
    .select('value')
    .eq('key', key)
    .maybeSingle()

  if (error) {
    console.error(`${key} ni o'qishda xatolik:`, error.message)
    return fallbackValue
  }

  return data?.value ?? fallbackValue
}

const upsertContentByKey = async (key, value) => {
  const { error } = await supabase
    .from(CONTENT_TABLE)
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })

  if (error) {
    throw error
  }
}

onMounted(async () => {
  stats.value = await getContentByKey('site_stats', defaultStats)
  newsItems.value = await getContentByKey('site_news', defaultNewsItems)
  teamItems.value = await getContentByKey('site_team', defaultTeamItems)
  aboutData.value = await getContentByKey('site_about', JSON.parse(JSON.stringify(defaultAboutData)))
  projectItems.value = await getContentByKey('site_projects', [])
  researchProjects.value = await getContentByKey('site_research_projects', [])
  journals.value = await getContentByKey('site_journals', [])
  commercializationItems.value = await getContentByKey('site_commercialization', [])
})

const saveStats = async () => {
  try {
    await Promise.all([
      upsertContentByKey('site_stats', stats.value),
      upsertContentByKey('site_news', newsItems.value),
      upsertContentByKey('site_team', teamItems.value),
      upsertContentByKey('site_about', aboutData.value),
      upsertContentByKey('site_projects', projectItems.value),
      upsertContentByKey('site_research_projects', researchProjects.value),
      upsertContentByKey('site_journals', journals.value),
      upsertContentByKey('site_commercialization', commercializationItems.value),
    ])
    alert("Barcha ma'lumotlar muvaffaqiyatli saqlandi!")
  } catch (error) {
    console.error('Saqlashda xatolik:', error)
    alert("Saqlashda xatolik yuz berdi. Supabase jadval va policy sozlamalarini tekshiring.")
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

// Markaz haqida rasmi uzatish
const handleAboutImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const MAX_WIDTH = 1200
      const MAX_HEIGHT = 800
      let width = img.width
      let height = img.height
      if (width > height) { if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH } } 
      else { if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT } }
      canvas.width = width; canvas.height = height; const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      aboutData.value.image = canvas.toDataURL('image/jpeg', 0.7)
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
}

const addNewLeader = () => {
  if(!aboutData.value.leaders) aboutData.value.leaders = []
  aboutData.value.leaders.push({ name: '', role: '', description: '', image: '' })
}
const removeLeader = (index) => aboutData.value.leaders.splice(index, 1)

const addNewEmployee = () => {
  if(!aboutData.value.employees) aboutData.value.employees = []
  aboutData.value.employees.push({ name: '', role: '' })
}
const removeEmployee = (index) => aboutData.value.employees.splice(index, 1)

// Startups yordamchi funksiyalari
const addNewProject = () => {
  projectItems.value.push({
    title: '',
    description: '',
    date: new Date().toLocaleDateString('uz-UZ').replace(/\//g, '.'),
    views: 20,
    image: ''
  })
}
const removeProject = (index) => projectItems.value.splice(index, 1)

const handleProjectImageUpload = (event, index) => {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const MAX_WIDTH = 800; const MAX_HEIGHT = 600; let width = img.width; let height = img.height
      if (width > height) { if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH } } 
      else { if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT } }
      canvas.width = width; canvas.height = height; const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      projectItems.value[index].image = canvas.toDataURL('image/jpeg', 0.6)
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
}

const handleLeaderImageUpload = (event, index) => {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const MAX_WIDTH = 400; const MAX_HEIGHT = 400; let width = img.width; let height = img.height
      if (width > height) { if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH } } 
      else { if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT } }
      canvas.width = width; canvas.height = height; const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      aboutData.value.leaders[index].image = canvas.toDataURL('image/jpeg', 0.6)
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
}

// Research Projects funksiyalari
const addNewResearchProject = () => {
  researchProjects.value.push({
    title: '',
    contractNumber: '',
    leader: '',
    description: '',
    year: new Date().getFullYear(),
    category: 'Fundamental'
  })
}
const removeResearchProject = (index) => researchProjects.value.splice(index, 1)

// Jurnallar funksiyalari
const addNewJournal = () => {
  journals.value.push({
    title: '',
    issueLabel: 'III',
    requirementsTitle: 'JURNAL NIZOMI VA TALABNOMASI',
    applicationText: 'JURNAL TALABNOMASI',
    image: '',
    applicationLink: '#'
  })
}

const removeJournal = (index) => journals.value.splice(index, 1)

const handleJournalFileUpload = (event, index) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const MAX_WIDTH = 700
      const MAX_HEIGHT = 900
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
      journals.value[index].image = canvas.toDataURL('image/jpeg', 0.7)
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
}

// Tijoratlashtirish funksiyalari
const addNewCommercializationItem = () => {
  commercializationItems.value.push({
    title: '',
    shortDescription: '',
    fullDescription: '',
    image: '',
    buttonText: 'Batafsil',
    featuresTitle: 'Funksiyalari',
    features: [''],
    usageTitle: "Qo'llanilish sohasi",
    usages: [''],
    gallery: []
  })
}

const removeCommercializationItem = (index) => commercializationItems.value.splice(index, 1)

const addFeature = (itemIndex) => {
  if (!Array.isArray(commercializationItems.value[itemIndex].features)) {
    commercializationItems.value[itemIndex].features = []
  }
  commercializationItems.value[itemIndex].features.push('')
}

const removeFeature = (itemIndex, featureIndex) => {
  commercializationItems.value[itemIndex].features.splice(featureIndex, 1)
}

const addUsage = (itemIndex) => {
  if (!Array.isArray(commercializationItems.value[itemIndex].usages)) {
    commercializationItems.value[itemIndex].usages = []
  }
  commercializationItems.value[itemIndex].usages.push('')
}

const removeUsage = (itemIndex, usageIndex) => {
  commercializationItems.value[itemIndex].usages.splice(usageIndex, 1)
}

const addGalleryImage = (itemIndex) => {
  if (!Array.isArray(commercializationItems.value[itemIndex].gallery)) {
    commercializationItems.value[itemIndex].gallery = []
  }
  commercializationItems.value[itemIndex].gallery.push('')
}

const removeGalleryImage = (itemIndex, imageIndex) => {
  commercializationItems.value[itemIndex].gallery.splice(imageIndex, 1)
}

const handleCommercializationCoverUpload = (event, index) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const MAX_WIDTH = 900
      const MAX_HEIGHT = 620
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
      commercializationItems.value[index].image = canvas.toDataURL('image/jpeg', 0.75)
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
}

const handleCommercializationGalleryUpload = (event, itemIndex, imageIndex) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const MAX_WIDTH = 900
      const MAX_HEIGHT = 620
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

      if (!Array.isArray(commercializationItems.value[itemIndex].gallery)) {
        commercializationItems.value[itemIndex].gallery = []
      }
      commercializationItems.value[itemIndex].gallery[imageIndex] = canvas.toDataURL('image/jpeg', 0.75)
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

      <!-- Markaz Haqida boshqarish qismi -->
      <div class="bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)] mt-8">
        <h2 class="text-xl font-bold mb-6 border-b pb-4">"Markaz Haqida" Sahifasi Kontenti</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-[#53627f] mb-1">Sarlavha</label>
            <input v-model="aboutData.title" type="text" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-2 focus:ring-[#5e73ff]/20 font-semibold" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#53627f] mb-1">Qisqacha sarlavha (tag sarlavha)</label>
            <input v-model="aboutData.subtitle" type="text" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-2 focus:ring-[#5e73ff]/20 font-semibold text-[#ff6224]" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#53627f] mb-1">Batafsil matn</label>
            <textarea v-model="aboutData.description" rows="5" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-2 focus:ring-[#5e73ff]/20 font-medium"></textarea>
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#53627f] mb-2">Asosiy fon rasmi (URL yoki yuklash)</label>
            <div class="flex flex-col sm:flex-row gap-3">
              <input v-model="aboutData.image" type="text" placeholder="https://..." class="flex-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-1 focus:ring-[#5e73ff]/20 text-sm" />
              <label class="px-5 py-2.5 bg-[#f8f9fc] hover:bg-[#e6efff] text-[#2c4deb] border border-[#5e73ff]/20 rounded-lg cursor-pointer text-sm font-bold whitespace-nowrap flex items-center justify-center transition-colors">
                Fayl Tanlash
                <input type="file" @change="handleAboutImageUpload" accept="image/*" class="hidden" />
              </label>
            </div>
            <img v-if="aboutData.image" :src="aboutData.image" class="mt-3 h-32 w-auto rounded-lg border border-gray-200 object-cover" />
          </div>

          <!-- About saytidagi Xodimlar / Boshliqlar -->
          <div class="mt-10 border-t border-gray-100 pt-8">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
              <h3 class="text-lg font-bold text-[#1a2744]">Boshqaruv / Hodimlar (Faqat shu sahifa uchun)</h3>
              <button @click="addNewLeader" class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2">
                <span>+</span> Yangi hodim qo'shish
              </button>
            </div>
            <div class="space-y-6">
              <div v-for="(leader, lIndex) in aboutData.leaders" :key="lIndex" class="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm relative group">
                <button @click="removeLeader(lIndex)" class="absolute top-4 right-4 text-red-500 hover:text-red-700 opacity-60 hover:opacity-100 transition-opacity" title="O'chirish">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 pr-10">
                  <div>
                    <label class="block text-xs font-semibold text-[#53627f] mb-1">Ism va familiya</label>
                    <input v-model="leader.name" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-1 focus:ring-[#5e73ff]/20 text-sm font-semibold" placeholder="Masalan: G'ayratov Valijon" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-[#53627f] mb-1">Lavozim</label>
                    <input v-model="leader.role" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-1 focus:ring-[#5e73ff]/20 text-sm font-medium" placeholder="Masalan: Markaz rahbari" />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-xs font-semibold text-[#53627f] mb-1">Batafsil ma'lumot (Qisqacha ta'rif)</label>
                    <textarea v-model="leader.description" rows="2" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-1 focus:ring-[#5e73ff]/20 text-sm" placeholder="Xodimning ma'suliyatlari va tajribasi haqida..."></textarea>
                  </div>
                  <div class="md:col-span-2 flex flex-col sm:flex-row gap-4 items-end">
                    <div class="flex-1 w-full">
                      <label class="block text-xs font-semibold text-[#53627f] mb-1">Xodim Rasmi (Kvadrat shakldagi rasm tavsiya etiladi)</label>
                      <input v-model="leader.image" type="text" placeholder="https://..." class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-1 focus:ring-[#5e73ff]/20 text-sm" />
                    </div>
                    <label class="px-5 py-2.5 bg-[#f8f9fc] hover:bg-[#e6efff] text-[#2c4deb] border border-[#5e73ff]/20 rounded-lg cursor-pointer text-sm font-bold flex-shrink-0 transition-colors flex items-center justify-center">
                      Tanlash
                      <input type="file" @change="handleLeaderImageUpload($event, lIndex)" accept="image/*" class="hidden" />
                    </label>
                    <div class="h-16 w-16 rounded-full border border-gray-200 overflow-hidden shadow-sm flex-shrink-0 relative bg-gray-50 flex items-center justify-center">
                       <img v-if="leader.image" :src="leader.image" class="w-full h-full object-cover" />
                       <span v-else class="text-2xl text-gray-300">👤</span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="aboutData.leaders.length === 0" class="text-center py-6 text-gray-500 border border-dashed rounded-xl border-gray-300 bg-gray-50">
                Hech qanday hodim qo'shilmagan.
              </div>
            </div>
          </div>

          <!-- Xodimlar ro'yxati (oddiy matn ko'rinishida) -->
          <div class="mt-10 border-t border-gray-100 pt-8">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
              <h3 class="text-lg font-bold text-[#1a2744]">Xodimlar ro'yxati</h3>
              <button @click="addNewEmployee" class="px-4 py-2 bg-[#ff6224] hover:bg-[#e5521b] text-white rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2">
                <span>+</span> Yangi xodim qo'shish
              </button>
            </div>
            <div class="space-y-4">
              <div v-for="(emp, eIndex) in aboutData.employees" :key="eIndex" class="p-4 border border-gray-100 rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative group flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div class="flex-1 w-full">
                  <label class="block text-xs font-semibold text-[#53627f] mb-1">Xodim F.I.Sh</label>
                  <input v-model="emp.name" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-1 focus:ring-[#5e73ff]/20 text-sm font-bold text-[#1a2744]" placeholder="Masalan: Normatov Sh.B" />
                </div>
                <div class="flex-[2] w-full">
                  <label class="block text-xs font-semibold text-[#53627f] mb-1">Lavozim va vazifasi</label>
                  <input v-model="emp.role" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-1 focus:ring-[#5e73ff]/20 text-sm font-medium text-[#53627f]" placeholder="Masalan: Bosh mutaxassis, elektron hujjat aylanish tizimi bilan ishlash bo'yicha ma'sul xodim" />
                </div>
                <button @click="removeEmployee(eIndex)" class="mt-4 md:mt-6 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors self-end md:self-auto shrink-0" title="O'chirish">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <div v-if="!aboutData.employees || aboutData.employees.length === 0" class="text-center py-6 text-gray-500 border border-dashed rounded-xl border-gray-300 bg-gray-50">
                Hozircha xodimlar ro'yxati bush. "Yangi xodim qo'shish" tugmasini bosing.
              </div>
            </div>
          </div>
        </div>
        <div class="mt-8 pt-6 border-t flex justify-end">
          <button @click="saveStats" class="bg-linear-to-r from-[#2c4deb] to-[#5e73ff] hover:from-[#1b3be0] hover:to-[#4d64ff] text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-[0_10px_20px_rgba(94,115,255,0.3)] transition-all">
            "Markaz Haqida" qismini Saqlash
          </button>
        </div>
      </div>

      <!-- Loyiha va Startaplar boshqarish qismi -->
      <div class="bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)] mt-8">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h2 class="text-xl font-bold border-b pb-4 flex-1 m-0">Loyiha va Startaplar (TUIT Incubation sahifasi uchun)</h2>
          <button @click="addNewProject" class="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center justify-center gap-2">
            <span>+</span> Yangi Loyiha
          </button>
        </div>

        <div class="space-y-6 mt-4">
          <div v-for="(project, pIndex) in projectItems" :key="pIndex" class="p-6 border border-gray-100 rounded-2xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative group hover:border-[#5e73ff]/30 transition-colors">
            
            <button @click="removeProject(pIndex)" class="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors z-10" title="O'chirish">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pr-10">
              <div class="md:col-span-2">
                <label class="block text-xs font-bold text-[#53627f] mb-1">Loyiha sarlavhasi</label>
                <input v-model="project.title" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-1 focus:ring-[#5e73ff]/20 font-bold text-[#1a2744]" placeholder="Sarlavhani kiriting" />
              </div>
              
              <div>
                <label class="block text-xs font-bold text-[#53627f] mb-1">Amalga oshirish sanasi/muddati</label>
                <input v-model="project.date" type="text" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-1 focus:ring-[#5e73ff]/20 text-sm font-medium" placeholder="Masalan: 01.08.2022/30.09.2022" />
              </div>
              
              <div>
                <label class="block text-xs font-bold text-[#53627f] mb-1">Ko'rishlar soni</label>
                <input v-model="project.views" type="number" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-1 focus:ring-[#5e73ff]/20 text-sm font-medium" placeholder="Masalan: 20" />
              </div>

              <div class="md:col-span-2">
                <label class="block text-xs font-bold text-[#53627f] mb-1">Loyiha tavsifi (Batafsil malumot)</label>
                <textarea v-model="project.description" rows="3" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] focus:ring-1 focus:ring-[#5e73ff]/20 text-sm" placeholder="Loyihaning mohiyati hamda maqsadi haqida yozing..."></textarea>
              </div>

              <div class="md:col-span-2 flex flex-col md:flex-row items-end gap-4">
                <div class="flex-1 w-full">
                  <label class="block text-xs font-bold text-[#53627f] mb-1">Loyiha Rasmi URL yoki Yuklash</label>
                  <input v-model="project.image" type="text" placeholder="https://" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#5e73ff] font-mono text-xs focus:ring-1 focus:ring-[#5e73ff]/20" />
                </div>
                <label class="px-5 py-2.5 bg-[#f8f9fc] hover:bg-[#e6efff] text-[#2c4deb] border border-[#5e73ff]/20 rounded-lg cursor-pointer text-sm font-bold flex-shrink-0 transition-colors flex items-center justify-center">
                  Rasm tanlash
                  <input type="file" @change="handleProjectImageUpload($event, pIndex)" accept="image/*" class="hidden" />
                </label>
                <div class="w-24 h-24 rounded-lg bg-gray-100 overflow-hidden border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm relative">
                   <img v-if="project.image" :src="project.image" class="w-full h-full object-cover" />
                   <span v-else class="text-gray-400 text-xs text-center px-2">Rasm yo'q</span>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="projectItems.length === 0" class="text-center py-10 text-gray-500 border border-dashed rounded-xl border-gray-300 bg-gray-50">
            Hech qanday loyiha qo'shilmagan. Yuqoridagi "Yangi Loyiha" tugmasini bosing.
          </div>
        </div>

        <div class="mt-8 pt-6 border-t flex justify-end">
          <button @click="saveStats" class="bg-linear-to-r from-[#2c4deb] to-[#5e73ff] hover:from-[#1b3be0] hover:to-[#4d64ff] text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-[0_10px_20px_rgba(94,115,255,0.3)] transition-all">
            Loyiha va Startaplarni Saqlash
          </button>
        </div>
      </div>

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
            Hech qanday a'zo yo'q. Yangi a'zo qo'shish.
          </div>
        </div>

        <div class="mt-8 pt-6 border-t flex justify-end">
          <button @click="saveStats" class="bg-linear-to-r from-[#2c4deb] to-[#5e73ff] hover:from-[#1b3be0] hover:to-[#4d64ff] text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-[0_10px_20px_rgba(94,115,255,0.3)] transition-all">
            O'zgarishlarni Saqlash
          </button>
        </div>
      </div>

      <!-- Jurnallar -->
      <div class="bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)] mt-8 mb-8">
        <div class="flex justify-between items-center mb-6 border-b pb-4">
          <h2 class="text-xl font-bold">Jurnallar</h2>
          <button @click="addNewJournal" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2">
            <span>+</span> Yangi jurnal qo'shish
          </button>
        </div>

        <div class="space-y-4">
          <div v-for="(journal, index) in journals" :key="index" class="p-4 border border-gray-100 rounded-xl bg-gray-50 relative group">
            <button @click="removeJournal(index)" class="absolute top-4 right-4 text-red-500 hover:text-red-700 opacity-60 hover:opacity-100 transition-opacity" title="O'chirish">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>

            <div class="space-y-4 pr-10">
              <div>
                <label class="block text-xs font-semibold text-[#53627f] mb-1">Jurnal nomi</label>
                <input v-model="journal.title" type="text" placeholder="Jurnal nomi" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-sm" />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-[#53627f] mb-1">Yuqori belgi (masalan III)</label>
                  <input v-model="journal.issueLabel" type="text" placeholder="III" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-sm" />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-xs font-semibold text-[#53627f] mb-1">Kartadagi matn</label>
                  <input v-model="journal.requirementsTitle" type="text" placeholder="JURNAL NIZOMI VA TALABNOMASI" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-sm" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#53627f] mb-1">Pastki tugma matni</label>
                <input v-model="journal.applicationText" type="text" placeholder="JURNAL TALABNOMASI" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-sm" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#53627f] mb-1">Talabnoma havolasi (URL/PDF)</label>
                <input v-model="journal.applicationLink" type="text" placeholder="https://..." class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-sm" />
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#53627f] mb-2">Muqova rasmi (URL yoki yuklash)</label>
                <div class="flex flex-col sm:flex-row gap-3">
                  <input v-model="journal.image" type="text" placeholder="https://... yoki /uploads/..." class="flex-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-sm" />
                  <label class="px-5 py-2.5 bg-[#f8f9fc] hover:bg-[#e6efff] text-[#2c4deb] border border-[#5e73ff]/20 rounded-lg cursor-pointer text-sm font-bold whitespace-nowrap flex items-center justify-center transition-colors">
                    Jilddan Tanlash
                    <input type="file" @change="handleJournalFileUpload($event, index)" accept="image/*" class="hidden" />
                  </label>
                </div>
                <div class="pt-2">
                  <img v-if="journal.image" :src="journal.image" class="h-28 w-24 rounded border border-gray-200 object-cover" @error="$event.target.src='https://placehold.co/300x450/e5e7eb/475569?text=Topilmadi'" />
                </div>
              </div>
            </div>
          </div>

          <div v-if="journals.length === 0" class="text-center py-6 text-gray-500">
            Hech qanday jurnal yo'q. Yangi jurnal qo'shing.
          </div>
        </div>

        <div class="mt-8 pt-6 border-t flex justify-end">
          <button @click="saveStats" class="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-[0_10px_20px_rgba(59,130,246,0.3)] transition-all">
            Jurnallarni saqlash
          </button>
        </div>
      </div>

      <!-- Tijoratlashtirish -->
      <div class="bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)] mt-8 mb-8">
        <div class="flex justify-between items-center mb-6 border-b pb-4">
          <h2 class="text-xl font-bold">Tijoratlashtirish</h2>
          <button @click="addNewCommercializationItem" class="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2">
            <span>+</span> Yangi blok qo'shish
          </button>
        </div>

        <div class="space-y-4">
          <div v-for="(item, cIndex) in commercializationItems" :key="cIndex" class="p-4 border border-gray-100 rounded-xl bg-gray-50 relative group">
            <button @click="removeCommercializationItem(cIndex)" class="absolute top-4 right-4 text-red-500 hover:text-red-700 opacity-60 hover:opacity-100 transition-opacity" title="O'chirish">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>

            <div class="space-y-4 pr-10">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-[#53627f] mb-1">Sarlavha</label>
                  <input v-model="item.title" type="text" placeholder="Masalan: GPS Monitoringi" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#53627f] mb-1">Tugma matni</label>
                  <input v-model="item.buttonText" type="text" placeholder="Batafsil" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm" />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-xs font-semibold text-[#53627f] mb-1">Qisqa tavsif</label>
                  <textarea v-model="item.shortDescription" rows="2" placeholder="Kartada ko'rinadigan qisqa matn" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm resize-y"></textarea>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-xs font-semibold text-[#53627f] mb-1">Batafsil tavsif (to'liq sahifa uchun)</label>
                  <textarea v-model="item.fullDescription" rows="4" placeholder="Loyiha haqida to'liq ma'lumot" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm resize-y"></textarea>
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-[#53627f] mb-2">Asosiy rasm</label>
                <div class="flex flex-col sm:flex-row gap-3">
                  <input v-model="item.image" type="text" placeholder="https://... yoki /uploads/..." class="flex-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-sm" />
                  <label class="px-5 py-2.5 bg-[#f8f9fc] hover:bg-[#e6efff] text-[#2c4deb] border border-[#5e73ff]/20 rounded-lg cursor-pointer text-sm font-bold whitespace-nowrap flex items-center justify-center transition-colors">
                    Jilddan Tanlash
                    <input type="file" @change="handleCommercializationCoverUpload($event, cIndex)" accept="image/*" class="hidden" />
                  </label>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-3 border border-gray-200 rounded-lg bg-white">
                  <div class="flex justify-between items-center mb-2">
                    <label class="block text-xs font-semibold text-[#53627f]">Funksiyalar ro'yxati</label>
                    <button @click="addFeature(cIndex)" class="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700">+ qo'shish</button>
                  </div>
                  <input v-model="item.featuresTitle" type="text" placeholder="Funksiyalari" class="w-full mb-2 px-3 py-2 rounded border border-gray-200 text-sm" />
                  <div v-for="(feature, fIndex) in item.features" :key="fIndex" class="flex gap-2 mb-2">
                    <input v-model="item.features[fIndex]" type="text" class="flex-1 px-3 py-2 rounded border border-gray-200 text-sm" placeholder="Funksiya matni" />
                    <button @click="removeFeature(cIndex, fIndex)" class="px-2 rounded bg-red-100 text-red-700">×</button>
                  </div>
                </div>

                <div class="p-3 border border-gray-200 rounded-lg bg-white">
                  <div class="flex justify-between items-center mb-2">
                    <label class="block text-xs font-semibold text-[#53627f]">Qo'llanilish sohasi</label>
                    <button @click="addUsage(cIndex)" class="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700">+ qo'shish</button>
                  </div>
                  <input v-model="item.usageTitle" type="text" placeholder="Qo'llanilish sohasi" class="w-full mb-2 px-3 py-2 rounded border border-gray-200 text-sm" />
                  <div v-for="(usage, uIndex) in item.usages" :key="uIndex" class="flex gap-2 mb-2">
                    <input v-model="item.usages[uIndex]" type="text" class="flex-1 px-3 py-2 rounded border border-gray-200 text-sm" placeholder="Soha matni" />
                    <button @click="removeUsage(cIndex, uIndex)" class="px-2 rounded bg-red-100 text-red-700">×</button>
                  </div>
                </div>
              </div>

              <div class="p-3 border border-gray-200 rounded-lg bg-white">
                <div class="flex justify-between items-center mb-2">
                  <label class="block text-xs font-semibold text-[#53627f]">Galereya rasmlari</label>
                  <button @click="addGalleryImage(cIndex)" class="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700">+ rasm qo'shish</button>
                </div>
                <div v-for="(galleryImage, gIndex) in item.gallery" :key="gIndex" class="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2 mb-2">
                  <input v-model="item.gallery[gIndex]" type="text" placeholder="https://..." class="w-full px-3 py-2 rounded border border-gray-200 text-sm" />
                  <label class="px-3 py-2 bg-[#f8f9fc] hover:bg-[#e6efff] text-[#2c4deb] border border-[#5e73ff]/20 rounded-lg cursor-pointer text-xs font-bold whitespace-nowrap flex items-center justify-center transition-colors">
                    Yuklash
                    <input type="file" @change="handleCommercializationGalleryUpload($event, cIndex, gIndex)" accept="image/*" class="hidden" />
                  </label>
                  <button @click="removeGalleryImage(cIndex, gIndex)" class="px-3 py-2 rounded bg-red-100 text-red-700 text-xs">O'chirish</button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="commercializationItems.length === 0" class="text-center py-6 text-gray-500">
            Hech qanday tijoratlashtirish bloki yo'q. Yangi blok qo'shing.
          </div>
        </div>

        <div class="mt-8 pt-6 border-t flex justify-end">
          <button @click="saveStats" class="bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-[0_10px_20px_rgba(16,185,129,0.3)] transition-all">
            Tijoratlashtirishni saqlash
          </button>
        </div>
      </div>

      <!-- Ilmiy Tadqiqot Loyihalari -->
      <div class="bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)] mt-8 mb-8">
        <div class="flex justify-between items-center mb-6 border-b pb-4">
          <h2 class="text-xl font-bold">Ilmiy Tadqiqot Loyihalari</h2>
          <button @click="addNewResearchProject" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2">
            <span>+</span> Yangi loyiha qo'shish
          </button>
        </div>

        <div class="space-y-4">
          <div v-for="(project, index) in researchProjects" :key="index" class="p-4 border border-gray-100 rounded-xl bg-gray-50 relative group">
            <button @click="removeResearchProject(index)" class="absolute top-4 right-4 text-red-500 hover:text-red-700 opacity-60 hover:opacity-100 transition-opacity" title="O'chirish">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
            <div class="space-y-4 pr-10">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-[#53627f] mb-1">Shartnoma Raqami</label>
                  <input v-model="project.contractNumber" type="text" placeholder="Masalan: IT-2023-01" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 text-sm" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#53627f] mb-1">Loyiha Nomi</label>
                  <input v-model="project.title" type="text" placeholder="Loyiha nomi" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 text-sm" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#53627f] mb-1">Yil (Raqam)</label>
                  <input v-model="project.year" type="number" placeholder="2023" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 text-sm" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-[#53627f] mb-1">Kategoriya</label>
                  <select v-model="project.category" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 text-sm bg-white">
                    <option value="Fundamental">Fundamental loyihalar</option>
                    <option value="Amaliy">Amaliy loyihalar</option>
                    <option value="Xalqaro">Xalqaro loyihalar</option>
                    <option value="Innovatsion">Innovatsion loyihalar</option>
                  </select>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-xs font-semibold text-[#53627f] mb-1">Loyiha Rahbari (F.I.SH)</label>
                  <input v-model="project.leader" type="text" placeholder="Masalan: Allanyazov R.B." class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 text-sm" />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-xs font-semibold text-[#53627f] mb-1">Loyiha haqida qisqacha ma'lumot</label>
                  <textarea v-model="project.description" rows="3" placeholder="Ma'lumot" class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 text-sm resize-y"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div v-if="researchProjects.length === 0" class="text-center py-6 text-gray-500">
            Hech qanday loyiha yo'q. Yangi loyiha qo'shish tugmasini bosing.
          </div>
        </div>

        <div class="mt-8 pt-6 border-t flex justify-end">
          <button @click="saveStats" class="bg-linear-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-[0_10px_20px_rgba(99,102,241,0.3)] transition-all">
            Loyiha ma'lumotlarini saqlash
          </button>
        </div>
      </div>

    </div>
  </div>
</template>
