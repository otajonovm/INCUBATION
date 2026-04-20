<script setup>
import { ref } from 'vue';

defineProps({
  nav: {
    type: Object,
    required: true,
  },
})

const isMobileMenuOpen = ref(false);
</script>

<template>
  <header 
    v-motion
    :initial="{ opacity: 0, y: -20 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 600, type: 'spring', stiffness: 100 } }"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isMobileMenuOpen ? 'bg-[#070511] h-screen' : 'bg-[#070511]/70 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'"
  >
    <div class="mx-auto w-full max-w-7xl px-4 md:px-6">
      <div class="flex h-[82px] items-center justify-between gap-4">
        
        <!-- Logo Text -->
        <a href="#" class="shrink-0 text-xl font-extrabold tracking-wider text-white flex items-center z-50">
          <span class="text-[#ff6224] text-2xl mr-1">T</span>UIT<span class="text-white/50 text-sm ml-1 font-normal">.uz</span>
        </a>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-8 justify-center flex-1" aria-label="Asosiy navigatsiya">
          <a 
            v-for="(link, index) in nav.links" 
            :key="link.label" 
            :href="link.href" 
            v-motion
            :initial="{ opacity: 0, y: -10 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 + 200, duration: 500 } }"
            class="relative text-white/80 font-medium text-[16px] xl:text-[18px] transition-colors duration-300 hover:text-white group py-2"
          >
            {{ link.label }}
            <!-- Animated underline effect -->
            <span class="absolute left-0 bottom-0 w-0 h-[2px] bg-[#ff6224] transition-all duration-300 group-hover:w-full rounded-full"></span>
          </a>
        </nav>

        <!-- Right Actions (CTA + Mobile Menu Toggle) -->
        <div 
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{ opacity: 1, scale: 1, transition: { delay: 600, duration: 400 } }"
          class="shrink-0 flex items-center gap-4 z-50"
        >
          <a 
            href="#" 
            class="hidden sm:inline-flex group items-center gap-2 justify-center rounded-full bg-linear-to-r from-[#ff6224] to-[#ff4200] text-white px-5 py-[10px] md:py-[12px] md:px-[28px] text-[14px] md:text-[16px] font-bold shadow-[0_8px_20px_rgba(255,98,36,0.3)] hover:shadow-[0_12px_25px_rgba(255,98,36,0.4)] hover:-translate-y-1 transition-all duration-300"
          >
            {{ nav.cta }}
            <!-- Smooth arrow icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen" 
            class="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full border border-white/10 bg-white/5 active:bg-white/10 transition-colors"
            aria-label="Menyuni ochish"
          >
            <span class="w-5 h-[2px] bg-white transition-all duration-300 rounded" :class="isMobileMenuOpen ? 'rotate-45 translate-y-[6px]' : '-translate-y-1'"></span>
            <span class="w-5 h-[2px] bg-white transition-all duration-300 rounded" :class="isMobileMenuOpen ? 'opacity-0' : 'opacity-100 translate-y-0'"></span>
            <span class="w-5 h-[2px] bg-white transition-all duration-300 rounded" :class="isMobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : 'translate-y-1'"></span>
          </button>
        </div>

      </div>

      <!-- Mobile Menu Overlay -->
      <div 
        v-if="isMobileMenuOpen" 
        class="lg:hidden fixed inset-x-0 top-[82px] bottom-0 bg-[#070511] flex flex-col pt-10 px-6 gap-6 z-40 overflow-y-auto"
      >
        <a 
          v-for="link in nav.links" 
          :key="link.label" 
          :href="link.href" 
          @click="isMobileMenuOpen = false"
          class="text-white/80 font-medium text-[22px] hover:text-white pb-4 border-b border-white/5"
        >
          {{ link.label }}
        </a>
        <a 
          href="#" 
          class="sm:hidden group inline-flex items-center gap-2 justify-center rounded-full bg-linear-to-r from-[#ff6224] to-[#ff4200] text-white px-6 py-4 text-[16px] font-bold shadow-[0_8px_20px_rgba(255,98,36,0.3)] mt-4"
        >
          {{ nav.cta }}
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
      </div>

    </div>
  </header>
</template>
