<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import BaseCarousel from '../common/BaseCarousel.vue'
import { supabase } from '../../supabase'
import { useLocalizedContent } from '../../composables/useLocalizedContent'

const props = defineProps({
  news: {
    type: Object,
    required: true,
  },
})

const localNewsItems = ref([])
let newsChannel = null
const { locale, localizedKey, getLocalizedValue } = useLocalizedContent()

const defaultNewsItems = [
  { title: 'Inkubatsiya markazi tadbiri', image: '/uploads/yangiliklar/rasm/2022/Dec/06/CanK25-LcRc-.jpg' },
  { title: 'Taqdimot va seminar', image: '/uploads/slayder/rasm/2022/Dec/06/Z9uE04aZeZmx.png' },
  { title: 'Laboratoriya muhiti', image: '/uploads/slayder/rasm/2022/Dec/06/b9nHg-C-89iB.png' },
  { title: 'Yangi coworking maydoni', image: '/uploads/slayder/rasm/2022/Dec/06/bCntiTWHoqaQ.png' },
  { title: 'Loyihalar muhokamasi', image: '/uploads/slayder/rasm/2022/Dec/06/A3tt2tL9Dd02.png' },
]

const loadNewsFromSupabase = async () => {
  const localized = await getLocalizedValue(supabase, 'site_news', defaultNewsItems)
  localNewsItems.value = localized?.length ? localized : defaultNewsItems
}

onMounted(async () => {
  await loadNewsFromSupabase()

  newsChannel = supabase
    .channel('site-news-updates')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'site_content', filter: `key=eq.${localizedKey('site_news')}` }, loadNewsFromSupabase)
    .subscribe()
})

watch(locale, async () => {
  if (newsChannel) {
    await supabase.removeChannel(newsChannel)
  }
  await loadNewsFromSupabase()
  newsChannel = supabase
    .channel(`site-news-updates-${locale.value}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'site_content', filter: `key=eq.${localizedKey('site_news')}` }, loadNewsFromSupabase)
    .subscribe()
})

onUnmounted(() => {
  if (newsChannel) {
    supabase.removeChannel(newsChannel)
  }
})

</script>

<template>
  <section id="news" class="bg-[#f0f0f1] py-[72px] md:py-[110px] animate-fade-in-up">
    <div class="mx-auto w-full max-w-[1280px] px-4 md:px-6">
      <div 
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 800, type: 'spring' } }"
        class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-16"
      >
        <h2 class="m-0 text-4xl md:text-5xl lg:text-[52px] font-extrabold leading-[1.15] bg-clip-text text-transparent bg-linear-to-r from-[#1a2744] to-[#2c4deb] pb-2">{{ news.title }}</h2>
        <a href="/site/ilmiy_tadqiqot" class="inline-flex items-center gap-2 text-[#1a2744] text-lg md:text-xl font-bold hover:text-[#5e73ff] transition-all group">
          {{ news.viewAll }} 
          <span class="p-2 rounded-full bg-white group-hover:bg-[#5e73ff] group-hover:text-white transition-colors duration-300 shadow-sm border border-gray-200">
             <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
          </span>
        </a>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 1000, delay: 200, type: 'spring' } }"
      >
        <BaseCarousel :items="localNewsItems" :autoplay="true" :delay="3000">
          <template #item="{ item }">
            <article class="p-2 md:p-3 w-full group cursor-pointer">
              <!-- Rasm qismi huddi rasmdagidek ko'rinishi uchun -->
              <div class="w-full aspect-[4/3] rounded-[24px] md:rounded-[32px] bg-cover bg-center overflow-hidden border-4 border-white shadow-[0_15px_30px_rgba(0,0,0,0.06)] group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500 relative">
                 <img :src="item.image" :alt="item.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" @error="$event.target.src='https://placehold.co/800x600/f0f0f1/53627f?text=Rasm+Topilmadi'" />
                 
                 <!-- Hover overlay -->
                 <div class="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </article>
          </template>
        </BaseCarousel>
      </div>
    </div>
  </section>
</template>
