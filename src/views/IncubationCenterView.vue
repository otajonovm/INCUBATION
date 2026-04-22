<script setup>
import { ref, onMounted, computed } from 'vue'
import HeaderSection from '../components/sections/HeaderSection.vue'
import FooterSection from '../components/sections/FooterSection.vue'
import NewsCarouselSection from '../components/sections/NewsCarouselSection.vue'
import TasksSection from '../components/sections/TasksSection.vue'
import homepageContent from '../data/homepageContent'
import { normalizeContent } from '../utils/textNormalize'
import { supabase } from '../supabase'

const content = normalizeContent(homepageContent)

// Bosh sahifa ma'lumotlarini to'g'rilaymiz (news, tasks)
const newsData = ref([])
const tasksData = ref(content.tasks)
const projectsData = ref([])

const defaultProjects = [
  {
    title: "Inklyuziv ta'limda bolalarning nutqini rivojlantirishning multimedia texnologiyalariga asoslangan holda...",
    description: "Inklyuziv ta'limda imkoniyati cheklangan bolalarni nutq nuqsonlarini bartaraf etish...",
    date: "01.08.2022/30.09.2022",
    views: 20,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Inklyuziv ta'limda bolalarning nutqini rivojlantirishning multimedia texnologiyalariga asoslangan yechimlari",
    description: "Inklyuziv ta'limda imkoniyati cheklangan bolalarni nutq nuqsonlarini bartaraf etish usullari...",
    date: "01.08.2022/30.09.2022",
    views: 20,
    image: "https://images.unsplash.com/photo-1531297172867-4a406936ee27?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Favqulodda vaziyatlarda qo'llaniluvchi ko'p funktsiyali robot yaratish",
    description: "Favqulodda vaziyatlarda qo'llaniluvchi masofaviy, shifrlangan simsiz tarmoq orqali boshqarish...",
    date: "01.08.2022/30.09.2022",
    views: 20,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80"
  }
]

onMounted(async () => {
  window.scrollTo(0, 0)
  
  // Loyihalar va Startaplar malumotlarini olish
  const { data: pData } = await supabase.from('site_content').select('value').eq('key', 'site_projects').maybeSingle()
  if (pData?.value && Array.isArray(pData.value)) {
    projectsData.value = pData.value
  } else {
    projectsData.value = defaultProjects
  }

  // Yangiliklarni jalb qilish
  const { data: nData } = await supabase.from('site_content').select('value').eq('key', 'site_news').maybeSingle()
  if (nData?.value) {
    newsData.value = nData.value
  } else {
    newsData.value = content.news.items
  }
  
  // Vazifalarni ham olish mumkin, lekin hozir tasksData static homepageContent dan olinyapti.
  // Agar vazifalar bazada bo'lsa:
  // const { data: tData } = await supabase.from('site_content').select('value').eq('key', 'site_tasks').maybeSingle()
})

// Paginatsiya mantiqi
const currentPage = ref(1)
const itemsPerPage = 4

const totalPages = computed(() => {
  return Math.ceil(projectsData.value.length / itemsPerPage) || 1
})

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return projectsData.value.slice(start, end)
})

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Loyiha qismiga qayta fokuslash uchun qisqa scroll logikasi qoshsa ham boladi.
    document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#ececef] text-[#1a2744] font-sans selection:bg-[#ff6224] selection:text-white flex flex-col">
    <HeaderSection :nav="content.nav" class="bg-[#070511]" />
    
    <main class="overflow-x-hidden flex-1 pb-24">
      
      <!-- Hero Banner xuddi rasmda ko'rsatilgandek -->
      <section class="relative pt-[120px] pb-16 md:pt-[160px] md:pb-24 lg:pt-[200px] lg:pb-[120px] overflow-hidden bg-[#070511]">
        <div class="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80" alt="Background" class="w-full h-full object-cover opacity-20 transform scale-105" />
          <div class="absolute inset-0 bg-linear-to-b from-[#070511]/90 via-[#070511]/70 to-[#070511]"></div>
        </div>
        <div class="container relative z-10 mx-auto px-4 md:px-6">
          <div class="max-w-5xl text-left">
            <div class="text-[#ff6224] font-bold text-sm md:text-base tracking-wider uppercase mb-4 flex items-center gap-2">
              <span class="text-white/70">Home</span>
              <span class="w-1 h-1 rounded-full bg-white/50"></span>
              <span>TUIT Incubation Center</span>
            </div>
            <h1 class="text-4xl md:text-6xl lg:text-[72px] font-black text-white leading-tight mb-6">
              TUIT Incubation Center
            </h1>
            <p class="text-lg md:text-2xl text-white/90 font-medium max-w-3xl leading-relaxed">
              Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti "TUIT INCUBATION CENTER" faoliyati
            </p>
          </div>
        </div>
      </section>

      <!-- Statik Matn qismi -->
      <div class="mx-auto w-full max-w-[1200px] px-4 md:px-6 py-12 md:py-20">
        <h2 class="text-3xl md:text-4xl font-extrabold text-[#1a2744] mb-8 text-center md:text-left leading-tight">
          Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti "TUIT INCUBATION CENTER" faoliyati
        </h2>
        
        <div class="prose prose-lg max-w-none text-[#53627f] leading-relaxed font-medium space-y-6 text-[16px] md:text-[17px]">
          <p>
            Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti "TUIT INCUBATION CENTER" faoliyati ilg'or startap g'oyalar va innovatsion ishlarni monitoring qilish, tanlash hamda inkubatsiya qilish, dasturiy mahsulot yaratish va amaliyotga tadbiq etish kabi vazifalarini bajaradi. Universitetda faoliyati boshlangan markazda kovorking, Dizayn, robototexnika, dasturchilar uchun maxsus bo'limlarda talabalar o'z ilmiy g'oyalarini amalga oshirish uchun ish olib bormoqda. Inkubatsiya markazida talabalar uchun ilmiy-texnik g'oyalarni amalga oshiruvchi kichik innovatsion loyihalarning samarali faoliyat ko'rsatishi uchun qulay shart-sharoitlar yaratib berilgan.
          </p>
          <p>
            Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti "TUIT INCUBATION CENTER" faoliyati boshlangandan buyon korxona va tashkilotlar bilan Memorandumlar imzolash, Talabalarning loyihalarini xorijiy va mahalliy investorlarga taqdimotlari tashkil etish va "IT-Park" yaqin hamkorlikda startap loyihalarni shakllantirish ustida ish olib bormoqda.
          </p>
          <p>
            Hozirda talabalarning ilmiy-texnik muammolarining yechimiga yyo'naltirilgan ilg'or va innovatsion ishlanmalar, texnologik loyiha va startap loyihalar bazasini shakllantirish bo'yicha universitet talabalari bilan hamkorlikda loyihalar shakllantirilmoqda. Jumladan bir necha mahalliy korxonalarining dasturiy ta'minotlarini ishlab chiqish ustida ish olib bormoqda. Talabalarning bitiruv malakaviy ishlari, magistrlik dissertatsiyalari mavzularini ushbu ilmiy muammolariga yo'naltirilish va startap loyiha tarzida amaliyotga tadbiq etish ishlari amalga oshirilmoqda.
          </p>
          <p>
            Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti "TUIT INCUBATION CENTER" universitetda IT sohasidagi loyihalarni tayyorlash va rivojlantirish uchun qulay shart-sharoitlar yaratish, yoshlar uchun dasturlashga oid sohalarda talab etiladigan innovatsion yechimlarni amalda tadbiq qilishga imkon yaratish maqsadida yoshlar startap-loyihalarini rivojlantirish uchun xizmat qilish asosiy faoliyat yo'nalishidir.
          </p>
        </div>
      </div>

      <!-- Yangiliklar va e'lonlar (Home pagedan) -->
      <div class="bg-white py-12 md:py-16 border-t border-gray-100">
         <NewsCarouselSection :news="{ title: 'Yangiliklar va e\'lonlar', items: newsData }" />
      </div>

      <!-- Asosiy Vazifalar (Home pagedan) -->
      <div class="bg-gray-50 py-12 md:py-16">
        <TasksSection :tasks="tasksData" />
      </div>

      <!-- Loyiha va Startaplar (Dinamik + Paginatsiya) -->
      <div id="projects-section" class="mx-auto w-full max-w-[1200px] px-4 md:px-6 py-16 md:py-24">
        <h2 class="text-3xl md:text-5xl font-extrabold text-[#1a2744] mb-12 text-center tracking-tight">
          Loyiha va Startaplar
        </h2>

        <div v-if="paginatedProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Card -->
          <article 
            v-for="(project, index) in paginatedProjects" 
            :key="index"
            class="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col hover:-translate-y-2 transition-transform duration-300 group"
          >
            <!-- Meta top -->
            <div class="px-6 py-4 flex justify-between items-center border-b border-gray-50 text-sm font-medium text-gray-500">
              <span>{{ project.date }}</span>
              <span class="flex items-center gap-1.5">
                {{ project.views || 0 }} 
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
              </span>
            </div>
            
            <!-- Image -->
            <div class="h-[220px] w-full overflow-hidden bg-gray-100 relative">
              <img :src="project.image" :alt="project.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-1">
              <h3 class="text-[18px] md:text-xl font-bold text-[#1a2744] mb-3 leading-snug line-clamp-3">
                {{ project.title }}
              </h3>
              <p class="text-[#53627f] text-sm md:text-base leading-relaxed flex-1 line-clamp-4">
                {{ project.description }}
              </p>
            </div>
          </article>
        </div>
        
        <div v-else class="text-center py-12 text-gray-500 text-lg">
          Hozircha loyihalar mavjud emas.
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-12 md:mt-16">
          <button 
            @click="changePage(currentPage - 1)" 
            :disabled="currentPage === 1"
            class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-500 disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-colors"
          >
            <!-- Left Arrow -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>

          <button 
            v-for="page in totalPages" 
            :key="page"
            @click="changePage(page)"
            :class="[
              'w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all text-sm',
              currentPage === page 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-500'
            ]"
          >
            {{ page }}
          </button>

          <button 
            @click="changePage(currentPage + 1)" 
            :disabled="currentPage === totalPages"
            class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-500 disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-colors"
          >
            <!-- Right Arrow -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

    </main>

    <FooterSection :footer="content.footer" />
  </div>
</template>