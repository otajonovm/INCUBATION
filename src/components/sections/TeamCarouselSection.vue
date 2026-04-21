<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BaseCarousel from '../common/BaseCarousel.vue'

const props = defineProps({
  team: {
    type: Object,
    required: true,
  },
})

// Bizning jamoa ro'yxati
const teamMembers = ref([])

const loadTeamFromStorage = () => {
  const saved = localStorage.getItem('site_team')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) {
        teamMembers.value = parsed
        return
      }
    } catch(e) {
      console.error("Local storage ma'lumotlarini o'qishda xatolik:", e)
    }
  }
  // Agar storage bo'lmasa, propdan default qiymat olamiz
  teamMembers.value = props.team.members || []
}

onMounted(() => {
  loadTeamFromStorage()
  window.addEventListener('storage', loadTeamFromStorage)
})

onUnmounted(() => {
  window.removeEventListener('storage', loadTeamFromStorage)
})
</script>

<template>
  <section id="team" class="relative bg-white py-20 md:py-28 overflow-hidden z-10" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { duration: 800 } }">
    
    <!-- Background Elements -->
    <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2c4deb]/5 rounded-full blur-3xl -z-10 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ff6224]/5 rounded-full blur-3xl -z-10 pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

    <div class="mx-auto w-full max-w-[1280px] px-4 md:px-6">
      <div class="text-center mb-16" v-motion :initial="{ opacity: 0, y: 30 }" :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }">
        <h2 class="text-4xl md:text-[60px] font-bold leading-tight mb-4 inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#2c4deb] to-[#5e73ff]">
          {{ team.title || 'Bizning Jamoa' }}
        </h2>
      </div>

      <div v-if="teamMembers.length > 0">
        <BaseCarousel :items="teamMembers" :autoplay="true" :delay="6000" :itemsToShow="3">       
          <template #item="{ item }">
            <article class="m-3 bg-white/70 backdrop-blur-md border border-gray-100 rounded-3xl min-h-[420px] p-8 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(44,77,235,0.08)] transition-all duration-300 group">
              <div class="flex flex-col items-center text-center">
                <!-- User Image -->
                <div class="w-28 h-28 md:w-32 md:h-32 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg ring-2 ring-[#2c4deb]/10 group-hover:ring-[#2c4deb]/40 transition-all duration-500 scale-100 group-hover:scale-[1.03]">
                  <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" @error="$event.target.src='https://placehold.co/150/f0f0f1/53627f?text=?'"/>
                  <div v-else class="w-full h-full bg-gray-100 flex items-center justify-center text-5xl">👤</div>
                </div>
                
                <!-- Content -->
                <h3 class="m-0 text-xl md:text-2xl font-extrabold text-[#1a2744] group-hover:text-[#2c4deb] transition-colors">{{ item.name }}</h3>
                <p class="m-0 mt-1 text-[#ff6224] font-semibold text-sm md:text-base tracking-wide uppercase">{{ item.role }}</p>
                <div class="w-12 h-1 bg-gradient-to-r from-[#2c4deb] to-[#5e73ff] rounded-full my-4 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <p class="text-[#53627f] text-sm md:text-[15px] leading-relaxed line-clamp-3 md:line-clamp-none">{{ item.description }}</p>
              </div>

              <!-- Footer -->
              <div class="mt-8 pt-5 border-t border-gray-100 flex justify-between items-center w-full">
                <span class="text-xs md:text-sm font-bold text-[#1a2744] uppercase tracking-wider flex items-center gap-2">
                  <div class="w-5 h-5 rounded-full bg-[#2c4deb]/10 flex items-center justify-center text-[10px]">✨</div>
                  TUIT INCUBATION
                </span>
              </div>
            </article>
          </template>
        </BaseCarousel>
      </div>
    </div>
  </section>
</template>
