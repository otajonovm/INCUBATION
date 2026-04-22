<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useIntersectionObserver, useTransition, TransitionPresets } from '@vueuse/core'
import { supabase } from '../../supabase'
import { useI18n } from 'vue-i18n'
import { useLocalizedContent } from '../../composables/useLocalizedContent'

defineProps({
  stats: {
    type: Object,
    required: true,
  },
})

// Dinamik statistika ma'lumotlarini ushlab turuvchi reaktiv obyekt
const currentStats = ref({
  startups: '8+',
  itProjects: '24',
  investments: '2.5M+',
  students: '150+'
})

const statSectionRef = ref(null)
const isVisible = ref(false)
const { t } = useI18n()
const { locale, getLocalizedValue } = useLocalizedContent()

useIntersectionObserver(
  statSectionRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) isVisible.value = true
  },
  { threshold: 0.2 }
)

const parseVal = (strVal) => {
  const str = String(strVal)
  const numMatches = str.match(/[0-9.]+/g)
  const targetNum = numMatches ? parseFloat(numMatches[0]) : 0
  const suffix = str.replace(/[0-9.]/g, '')
  const hasDecimal = str.includes('.')
  return { targetNum, suffix, hasDecimal }
}

const tStartups = computed(() => isVisible.value ? parseVal(currentStats.value.startups).targetNum : 0)
const tItProjects = computed(() => isVisible.value ? parseVal(currentStats.value.itProjects).targetNum : 0)
const tInvestments = computed(() => isVisible.value ? parseVal(currentStats.value.investments).targetNum : 0)
const tStudents = computed(() => isVisible.value ? parseVal(currentStats.value.students).targetNum : 0)

const numStartups = useTransition(tStartups, { duration: 2500, transition: TransitionPresets.easeOutExpo })
const numItProjects = useTransition(tItProjects, { duration: 2500, transition: TransitionPresets.easeOutExpo })
const numInvestments = useTransition(tInvestments, { duration: 2500, transition: TransitionPresets.easeOutExpo })
const numStudents = useTransition(tStudents, { duration: 2500, transition: TransitionPresets.easeOutExpo })

const formatStat = (animNum, originalStr) => {
  const { suffix, hasDecimal } = parseVal(originalStr)
  if (hasDecimal) return animNum.value.toFixed(1) + suffix
  return Math.floor(animNum.value) + suffix
}

// Barcha statlar tayyor
const displayStats = computed(() => ({
  startups: formatStat(numStartups, currentStats.value.startups),
  itProjects: formatStat(numItProjects, currentStats.value.itProjects),
  investments: formatStat(numInvestments, currentStats.value.investments),
  students: formatStat(numStudents, currentStats.value.students)
}))

// Sahifa yuklanganda Supabase dan ma'lumotni yuklash
onMounted(async () => {
  currentStats.value = await getLocalizedValue(supabase, 'site_stats', currentStats.value)
})

watch(locale, async () => {
  currentStats.value = await getLocalizedValue(supabase, 'site_stats', currentStats.value)
})
</script>

<template>
  <section ref="statSectionRef" id="about" class="relative py-24 md:py-32 bg-white text-[#1a2744] overflow-hidden rounded-t-[40px] md:rounded-t-[60px] shadow-[0_-20px_40px_rgba(0,0,0,0.1)] z-30 -mt-10">

    <div class="mx-auto w-full max-w-7xl px-4 md:px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center relative z-10">
      
      <div 
        v-motion
        :initial="{ opacity: 0, x: -50 }"
        :visible="{ opacity: 1, x: 0, transition: { duration: 800, type: 'spring' } }"
      >
        <h2 class="m-0 text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.15] text-[#1a2744]">{{ stats.title }}</h2>
        <p v-for="(line, index) in stats.description" :key="index" class="mt-6 md:mt-8 text-[#53627f] text-base md:text-lg leading-relaxed font-medium">{{ line }}</p>
        
        <a href="/site/ilmiy_tadqiqot" class="mt-10 inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#2c4deb] to-[#5e73ff] text-white px-8 py-3.5 md:px-[34px] md:py-[14px] text-sm md:text-[16px] font-bold shadow-[0_10px_30px_rgba(94,115,255,0.3)] hover:shadow-[0_15px_40px_rgba(94,115,255,0.5)] hover:-translate-y-1 transition-all duration-300 gap-2 group">
          {{ stats.cta }}
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>

      <div class="relative w-full">
        <div 
          v-motion
          :initial="{ opacity: 0, x: 50 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 800, delay: 200, type: 'spring' } }"
          class="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 mt-8 lg:mt-0"
        >
          <article class="bg-[#fcfdfd] border border-gray-50 rounded-[28px] p-6 md:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.02)] flex flex-col justify-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] group sm:-translate-y-6">
            <div class="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.gif" alt="Startap" class="w-full h-full object-contain drop-shadow-sm" />
            </div>
            <p class="m-0 text-[#1a2744] text-[40px] md:text-[50px] font-bold leading-none tracking-tight">{{ displayStats.startups }}</p>
            <p class="mt-3 mb-0 text-[#53627f] text-sm md:text-base font-normal">{{ t('homePage.stats.cardLabels.startups') }}</p>
          </article>

          <article class="bg-[#fcfdfd] border border-gray-50 rounded-[28px] p-6 md:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.02)] flex flex-col justify-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] group sm:translate-y-6">
            <div class="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f4bb/512.gif" alt="IT Loyihalar" class="w-full h-full object-contain drop-shadow-sm" />
            </div>
            <p class="m-0 text-[#1a2744] text-[40px] md:text-[50px] font-bold leading-none tracking-tight">{{ displayStats.itProjects }}</p>
            <p class="mt-3 mb-0 text-[#53627f] text-sm md:text-base font-normal">{{ t('homePage.stats.cardLabels.itProjects') }}</p>
          </article>
        
          <!-- Card 3 -->
          <article class="bg-[#fcfdfd] border border-gray-50 rounded-[28px] p-6 md:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.02)] flex flex-col justify-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] group sm:-translate-y-6">
            <div class="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f4b8/512.gif" alt="Investitsiya" class="w-full h-full object-contain drop-shadow-sm" />
            </div>
            <p class="m-0 text-[#1a2744] text-[40px] md:text-[50px] font-bold leading-none tracking-tight">{{ displayStats.investments }}</p>
            <p class="mt-3 mb-0 text-[#53627f] text-sm md:text-base font-normal">{{ t('homePage.stats.cardLabels.investments') }}</p>
          </article>

          <!-- Card 4 -->
          <article class="bg-[#fcfdfd] border border-gray-50 rounded-[28px] p-6 md:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.02)] flex flex-col justify-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] group sm:translate-y-6">
            <div class="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f393/512.gif" alt="Talabalar" class="w-full h-full object-contain drop-shadow-sm" />
            </div>
            <p class="m-0 text-[#1a2744] text-[40px] md:text-[50px] font-bold leading-none tracking-tight">{{ displayStats.students }}</p>
            <p class="mt-3 mb-0 text-[#53627f] text-sm md:text-base font-normal">{{ t('homePage.stats.cardLabels.students') }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Any custom styles previously here */
</style>
