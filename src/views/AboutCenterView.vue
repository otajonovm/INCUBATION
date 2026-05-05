<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import HeaderSection from '../components/sections/HeaderSection.vue'
import FooterSection from '../components/sections/FooterSection.vue'
import { useHomepageContent } from '../composables/useHomepageContent'
import { useLocalizedContent } from '../composables/useLocalizedContent'
import { supabase } from '../supabase'

const { t, tm } = useI18n()
const { content } = useHomepageContent()
const { locale, getLocalizedValue } = useLocalizedContent()

const defaultAbout = () => ({
  title: t('aboutPage.title'),
  subtitle: t('aboutPage.subtitle'),
  description: tm('aboutPage.paragraphs').join('\n\n'),
  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  leadersTitle: t('aboutPage.leadersTitle'),
  leaders: [],
})

const aboutData = ref(defaultAbout())

const loadAbout = async () => {
  const localizedDefault = {
    ...defaultAbout(),
    title: t('aboutPage.title'),
    subtitle: t('aboutPage.subtitle'),
  }

  aboutData.value = await getLocalizedValue(supabase, 'site_about', localizedDefault)
}

onMounted(async () => {
  window.scrollTo(0, 0)
  await loadAbout()
})

watch(locale, async () => {
  await loadAbout()
})
</script>

<template>
  <div class="min-h-screen bg-[#ececef] text-[#1a2744] font-sans selection:bg-[#ff6224] selection:text-white flex flex-col">
    <HeaderSection :nav="content.nav" class="bg-[#070511]" />
    
    <main class="overflow-x-hidden flex-1 pb-24">
      
      <!-- Hero Banner -->
      <section class="relative pt-[120px] pb-16 md:pt-[160px] md:pb-24 lg:pt-[200px] lg:pb-[120px] overflow-hidden bg-[#070511]">
        <div class="absolute inset-0 z-0">
          <img v-if="aboutData.image" :src="aboutData.image" :alt="t('aboutPage.title')" class="w-full h-full object-cover opacity-20 transform scale-105" @error="$event.target.src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80'" />
          <img v-else src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80" :alt="t('aboutPage.title')" class="w-full h-full object-cover opacity-20 transform scale-105" />
          <div class="absolute inset-0 bg-linear-to-b from-[#070511]/90 via-[#070511]/70 to-[#070511]"></div>
        </div>
        <div class="container relative z-10 mx-auto px-4 md:px-6">
          <div class="max-w-5xl text-left" v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { duration: 800, type: 'spring' } }">
            <div class="text-[#ff6224] font-bold text-sm md:text-base tracking-wider uppercase mb-4 flex items-center gap-2">
              <RouterLink to="/" class="text-white/70 hover:text-white transition-colors">{{ t('common.home') }}</RouterLink>
              <span class="w-1 h-1 rounded-full bg-white/50"></span>
              <span>{{ t('aboutPage.title') }}</span>
            </div>
            <h1 class="text-4xl md:text-6xl lg:text-[72px] font-black text-white leading-tight mb-6">
              {{ t('aboutPage.title') }}
            </h1>
            <p class="text-lg md:text-2xl text-white/90 font-medium max-w-3xl leading-relaxed">
              {{ t('aboutPage.subtitle') }}
            </p>
          </div>
        </div>
      </section>

      <div class="mx-auto w-full max-w-[1200px] px-4 md:px-6 py-12 md:py-20">

            <!-- Boshliqlar ro'yxati TEPADA -->
            <div class="mb-12" v-if="aboutData.leaders && aboutData.leaders.length > 0">
              <div class="flex flex-col gap-6">
                <!-- Boshliqlar sifatida ko'rinadi -->
                <div 
                  v-for="(leader, index) in aboutData.leaders" 
                  :key="index"
                  class="flex flex-col sm:flex-row items-center gap-8 p-6 md:p-8 bg-white rounded-2xl border border-gray-200 transition-all duration-300"
                >
                  <div class="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden shrink-0 border border-gray-100 bg-[#f8f9fc]">
                    <img v-if="leader.image" :src="leader.image" :alt="leader.name" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-4xl">👤</div>
                  </div>
                  <div class="text-center sm:text-left flex-1 items-start flex flex-col justify-center">
                    <h3 class="text-xl md:text-2xl font-bold text-[#1a2744] mb-1">{{ leader.name }}</h3>
                    <p class="text-sm font-bold text-[#2c4deb] uppercase tracking-wider mb-3">{{ leader.role }}</p>
                    <p class="text-[#53627f] text-sm md:text-[15px] leading-relaxed max-w-3xl">{{ leader.description }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- STATIK MATN -->
            <div class="prose prose-lg max-w-none text-[#53627f] leading-relaxed font-medium text-[16px] md:text-[17px] space-y-4">
              <p v-for="(paragraph, pIndex) in tm('aboutPage.paragraphs')" :key="pIndex">{{ paragraph }}</p>
            </div>
            
            <!-- Xodimlar ro'yxati ro'yxati (Dinamik xodimlar blokini biz tepada boshliqlarda qildik, hozir user ko'rsatgan qatorni beramiz) -->
            <div class="mt-8 pt-8 border-t border-gray-300">
              <p class="text-[#53627f] mb-4 text-[16px] md:text-[17px] font-medium">{{ t('aboutPage.employeesTitle') }}</p>
              <div class="space-y-4 text-[#53627f] font-medium text-[16px]">
                <p v-for="(emp, eIndex) in aboutData.employees" :key="eIndex">
                  <span class="font-bold text-[#1a2744]">{{ emp.name }}</span> – {{ emp.role }}
                </p>
              </div>
            </div>

            <div class="mt-12 pt-8 border-t border-gray-300 text-[#53627f] font-medium space-y-2 mb-12">
              <p><strong class="text-[#1a2744]">{{ t('aboutPage.addressLabel') }}</strong></p>
              <p>{{ t('aboutPage.address') }}</p>
              <br/>
              <p>{{ t('aboutPage.building') }}</p>
            </div>

      </div>
    </main>

    <!-- FOOTER -->
    <FooterSection :footer="content.footer" />
  </div>
</template>
