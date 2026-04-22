<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans">
    <!-- Navbar -->
    <HeaderSection :nav="content.nav" class="bg-[#070511]" />

    <!-- Hero Banner -->
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
            <span>Ilmiy Tadqiqot Loyihalari</span>
          </div>
          <h1 class="text-4xl md:text-6xl lg:text-[72px] font-black text-white leading-tight mb-6">
            Ilmiy Tadqiqot Loyihalari
          </h1>
          <p class="text-lg md:text-2xl text-white/90 font-medium max-w-3xl leading-relaxed">
            Toshkent Axborot Texnologiyalari Universiteti qoshidagi ilmiy tadqiqot markazi loyihalari
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <!-- Content State -->
      <div v-else-if="projects.length > 0">
        <!-- Year Tabs -->
        <div class="mb-10 flex flex-wrap justify-center gap-3 border-b border-gray-200 pb-4">
          <button 
            v-for="yearStr in availableYears" 
            :key="yearStr"
            @click="activeYear = yearStr"
            :class="[
              'px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm',
              activeYear === yearStr 
                ? 'bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-2' 
                : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200'
            ]"
          >
            {{ yearStr }} yil
          </button>
        </div>

        <!-- Categories and Projects for Active Year -->
        <div class="space-y-12">
          <div 
            v-for="(categoryProjects, categoryName) in categorizedProjectsForActiveYear" 
            :key="categoryName"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
          >
            <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center border-b pb-3 border-gray-100">
              <span class="bg-indigo-100 text-indigo-700 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </span>
              {{ categoryName }} loyihalar ({{ categoryProjects.length }} ta)
            </h2>
            
            <div class="space-y-4">
              <div 
                v-for="(project, index) in categoryProjects" 
                :key="index"
                class="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200"
              >
                <!-- Accordion Header -->
                <button 
                  @click="toggleProject(project.id)"
                  class="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-150 text-left"
                >
                  <div class="flex-grow pr-4">
                    <div class="flex flex-wrap items-center gap-2 mb-1">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Shartnoma: {{ project.contractNumber }}
                      </span>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 leading-tight">
                      {{ project.title }}
                    </h3>
                  </div>
                  <div class="flex-shrink-0 ml-2">
                    <svg 
                      class="w-6 h-6 text-gray-500 transform transition-transform duration-200" 
                      :class="{ 'rotate-180': expandedProject === project.id }"
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <!-- Accordion Body -->
                <div v-show="expandedProject === project.id" class="px-6 py-5 bg-white border-t border-gray-200">
                  <div class="mb-4 flex items-center">
                    <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-3">
                      {{ getInitials(project.leader) }}
                    </div>
                    <div>
                      <p class="text-sm text-gray-500 uppercase tracking-wide font-semibold">Loyiha rahbari</p>
                      <p class="text-base font-medium text-gray-900">{{ project.leader }}</p>
                    </div>
                  </div>
                  
                  <div class="relative">
                    <p class="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base bg-gray-50 p-4 border-l-4 border-indigo-500 rounded-r-lg">
                      {{ project.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
          <div v-if="Object.keys(categorizedProjectsForActiveYear).length === 0" class="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">{{ activeYear }} yilda loyihalar topilmadi</h3>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
        <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">Loyihalar mavjud emas</h3>
        <p class="mt-2 text-gray-500">Hozircha ilmiy tadqiqot loyihalari ma'lumotlari kiritilmagan.</p>
      </div>
    </main>

    <!-- Footer -->
    <FooterSection :footer="content.footer" class="mt-auto" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import homepageContent from '../data/homepageContent'
import { normalizeContent } from '../utils/textNormalize'
import { supabase } from '../supabase'
import HeaderSection from '../components/sections/HeaderSection.vue'
import FooterSection from '../components/sections/FooterSection.vue'

const content = normalizeContent(homepageContent)

const loading = ref(true)
const projects = ref([])
const activeYear = ref('')
const expandedProject = ref(null)

// Utils
const getInitials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

const toggleProject = (index) => {
  if (expandedProject.value === index) {
    expandedProject.value = null
  } else {
    expandedProject.value = index
  }
}

// Data fetching
const fetchProjects = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .eq('key', 'site_research_projects')
      .single()
      
    if (error && error.code !== 'PGRST116') throw error
    
    if (data && data.value && Array.isArray(data.value)) {
      // Add fake ids if needed just for the accordion state
      projects.value = data.value.map((p, i) => ({...p, id: `proj-${i}`}))
      
      // Set initial active year safely
      if (projects.value.length > 0) {
        const years = [...new Set(projects.value.map(p => p.year))].sort((a,b) => b - a)
        if(years.length > 0) activeYear.value = String(years[0])
      }
    }
  } catch (error) {
    console.error('Error fetching research projects:', error)
  } finally {
    loading.value = false
  }
}

// Computed properties for UI filtering
const availableYears = computed(() => {
  const years = projects.value.map(p => p.year)
  return [...new Set(years)].sort((a, b) => b - a).map(String) // Sort descending
})

const categorizedProjectsForActiveYear = computed(() => {
  if (!activeYear.value) return {}
  
  const filtered = projects.value.filter(p => String(p.year) === activeYear.value)
  
  const categories = {}
  filtered.forEach(project => {
    const cat = project.category || 'Boshqa'
    if (!categories[cat]) {
      categories[cat] = []
    }
    categories[cat].push(project)
  })
  
  return categories
})

onMounted(() => {
  fetchProjects()
})
</script>

<style scoped>
/* Custom styles if needed beyond Tailwind */
</style>
