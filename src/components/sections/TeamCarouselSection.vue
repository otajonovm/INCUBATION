<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseCarousel from '../common/BaseCarousel.vue'
import { supabase } from '../../supabase'
import { useLocalizedContent } from '../../composables/useLocalizedContent'

const props = defineProps({
  team: {
    type: Object,
    required: true,
  },
})

const teamMembers = ref([])
let teamChannel = null
const { t } = useI18n()
const { locale, localizedKey, getLocalizedValue } = useLocalizedContent()

const defaultTeamMembers = [
  { name: 'Allanyazov R.B.', role: 'Yetakchi mutaxassis', description: 'Yetakchi mutaxassis, patent va mualliflik guvohnomalarini olishga texnik yordam ko‘rsatish bo‘yicha maʼsul xodim', image: '/uploads/bizningjamoa/rasm/2022/Dec/06/Kc_h7OMzJhMj.jpg' },
  { name: 'Eshonkulova F.M.', role: 'Loyihalar menedjer', description: 'loyihalar menedjeri, ilmiy loyihalar ishtirokchilari bilan ishlash bo‘yicha maʼsul xodim', image: '/uploads/bizningjamoa/rasm/2022/Dec/06/HFrJoqbozRca.jpg' },
  { name: 'Xayrullayev A.F.', role: 'Yetakchi mutaxassis', description: "Yetakchi mutaxassis, elektron xujjat aylanish tizimi bilan ishlash bo'yicha ma'sul xodim", image: '/uploads/bizningjamoa/rasm/2022/Dec/06/E3Eda8lkFYRq.png' },
]

const loadTeamFromSupabase = async () => {
  const fallback = props.team.members?.length ? props.team.members : defaultTeamMembers
  const localized = await getLocalizedValue(supabase, 'site_team', fallback)
  teamMembers.value = localized?.length ? localized : fallback
}

onMounted(async () => {
  await loadTeamFromSupabase()

  teamChannel = supabase
    .channel('site-team-updates')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'site_content', filter: `key=eq.${localizedKey('site_team')}` }, loadTeamFromSupabase)
    .subscribe()
})

watch(locale, async () => {
  if (teamChannel) {
    await supabase.removeChannel(teamChannel)
  }
  await loadTeamFromSupabase()
  teamChannel = supabase
    .channel(`site-team-updates-${locale.value}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'site_content', filter: `key=eq.${localizedKey('site_team')}` }, loadTeamFromSupabase)
    .subscribe()
})

onUnmounted(() => {
  if (teamChannel) {
    supabase.removeChannel(teamChannel)
  }
})
</script>

<template>
  <section id="team" class="relative bg-white py-20 md:py-28 overflow-hidden z-10" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { duration: 800 } }">
    
    <!-- Background Elements -->
    <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2c4deb]/5 rounded-full blur-3xl -z-10 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ff6224]/5 rounded-full blur-3xl -z-10 pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

    <div class="mx-auto w-full max-w-[1280px] px-4 md:px-6">
      <div class="text-center mb-16" v-motion :initial="{ opacity: 0, y: 30 }" :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }">
        <h2 class="text-4xl md:text-[60px] font-bold leading-tight mb-4 inline-block text-transparent bg-clip-text bg-linear-to-r from-[#2c4deb] to-[#5e73ff]">
          {{ team.title || t('teamSection.title') }}
        </h2>
      </div>

      <div v-if="teamMembers.length > 0">
        <BaseCarousel :items="teamMembers" :autoplay="true" :delay="6000">       
          <template #item="{ item }">
            <article class="m-3 h-full bg-white/70 backdrop-blur-md border border-gray-100 rounded-3xl min-h-[440px] p-8 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(44,77,235,0.08)] transition-all duration-300 group">
              <div class="flex flex-col items-center text-center">
                <!-- User Image -->
                <div class="w-28 h-28 md:w-32 md:h-32 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg ring-2 ring-[#2c4deb]/10 group-hover:ring-[#2c4deb]/40 transition-all duration-500 scale-100 group-hover:scale-[1.03]">
                  <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" @error="$event.target.src='https://placehold.co/150/f0f0f1/53627f?text=?'"/>
                  <div v-else class="w-full h-full bg-gray-100 flex items-center justify-center text-5xl">👤</div>
                </div>
                
                <!-- Content -->
                <h3 class="m-0 text-xl md:text-2xl font-extrabold text-[#1a2744] group-hover:text-[#2c4deb] transition-colors">{{ item.name }}</h3>
                <p class="m-0 mt-1 text-[#ff6224] font-semibold text-sm md:text-base tracking-wide uppercase">{{ item.role }}</p>
                <div class="w-12 h-1 bg-linear-to-r from-[#2c4deb] to-[#5e73ff] rounded-full my-4 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <p class="min-h-[96px] md:min-h-[120px] text-[#53627f] text-sm md:text-[15px] leading-relaxed line-clamp-4">{{ item.description }}</p>
              </div>

              <!-- Footer -->
              <div class="mt-8 pt-5 border-t border-gray-100 flex justify-between items-center w-full">
                <span class="text-xs md:text-sm font-bold text-[#1a2744] uppercase tracking-wider flex items-center gap-2">
                  <div class="w-5 h-5 rounded-full bg-[#2c4deb]/10 flex items-center justify-center text-[10px]">✨</div>
                  {{ t('teamSection.badge') }}
                </span>
              </div>
            </article>
          </template>
        </BaseCarousel>
      </div>
    </div>
  </section>
</template>
