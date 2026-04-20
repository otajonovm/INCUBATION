<script setup>
defineProps({
  stats: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section id="about" class="relative py-24 md:py-32 bg-[#070511] text-white overflow-hidden">
    <!-- Glowing background elements -->
    <div class="pointer-events-none absolute top-0 -left-[200px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(94,115,255,0.15),transparent_60%)] blur-[60px] z-0"></div>
    <div class="pointer-events-none absolute bottom-0 -right-[200px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,98,36,0.15),transparent_60%)] blur-[60px] z-0"></div>

    <div class="mx-auto w-full max-w-7xl px-4 md:px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center relative z-10">
      
      <!-- Left Content -->
      <div 
        v-motion
        :initial="{ opacity: 0, x: -50 }"
        :visible="{ opacity: 1, x: 0, transition: { duration: 800, type: 'spring' } }"
      >
        <span class="inline-block text-[#ff6224] text-sm md:text-base font-bold uppercase tracking-widest mb-4">Biz Hidemiz</span>
        <h2 class="m-0 text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.15] text-white drop-shadow-md">Loyihangiz uchun eng yaxshi veb va mobil ilovalarni ishlab chiquvchilarni yollang</h2>
        <p v-for="(line, index) in stats.description" :key="index" class="mt-6 md:mt-8 text-white/70 text-base md:text-lg leading-relaxed font-medium">{{ line }}</p>
        
        <a href="/site/ilmiy_tadqiqot" class="mt-10 inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#2c4deb] to-[#5e73ff] text-white px-8 py-3.5 md:px-[34px] md:py-[14px] text-sm md:text-[16px] font-bold shadow-[0_10px_30px_rgba(94,115,255,0.3)] hover:shadow-[0_15px_40px_rgba(94,115,255,0.5)] hover:-translate-y-1 transition-all duration-300 gap-2 group">
          Batafsil
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>

      <!-- Right Content (Stat Cards) -->
      <div 
        v-motion
        :initial="{ opacity: 0, x: 50 }"
        :visible="{ opacity: 1, x: 0, transition: { duration: 800, delay: 200, type: 'spring' } }"
        class="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 mt-8 lg:mt-0"
      >
        <!-- Card 1 -->
        <article class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col justify-center transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 group sm:translate-y-6">
          <div class="w-14 h-14 rounded-full bg-[#ff6224]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-[#ff6224]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 3.82-13.82 2.37 2.37 0 0 1 2.53-.78 1.48 1.48 0 0 1 1.09 1.09 2.37 2.37 0 0 1-.78 2.53A22 22 0 0 1 12 15z"></path><path d="M3.5 11.5A2.5 2.5 0 0 0 6 14"></path><path d="M10.4 4.1L12 6"></path><path d="m14 8.5 1.5 1.5"></path><path d="M15 12h4"></path><path d="M18 15h4v4h-4z"></path></svg>
          </div>
          <p class="m-0 text-white text-[42px] md:text-[52px] font-extrabold leading-none drop-shadow-md">8+</p>
          <p class="mt-3 mb-0 text-white/70 text-sm md:text-base font-medium leading-snug">Startap loyihalar</p>
        </article>

        <!-- Card 2 -->
        <article class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col justify-center transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 group">
          <div class="w-14 h-14 rounded-full bg-[#5e73ff]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-[#5e73ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" w="20" h="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          </div>
          <p class="m-0 text-white text-[42px] md:text-[52px] font-extrabold leading-none drop-shadow-md">500+</p>
          <p class="mt-3 mb-0 text-white/70 text-sm md:text-base font-medium leading-snug">Ilmiy tadqiqot loyihalari</p>
        </article>

        <!-- Card 3 -->
        <article class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col justify-center transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 group sm:translate-y-6">
          <div class="w-14 h-14 rounded-full bg-[#20b486]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-[#20b486]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <p class="m-0 text-white text-[42px] md:text-[52px] font-extrabold leading-none drop-shadow-md">80+</p>
          <p class="mt-3 mb-0 text-white/70 text-sm md:text-base font-medium leading-snug">Xo'jalik shartnoma loyihalari</p>
        </article>

        <!-- Card 4 -->
        <article class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col justify-center transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 group">
          <div class="w-14 h-14 rounded-full bg-[#fbbc05]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-[#fbbc05]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
          </div>
          <p class="m-0 text-white text-[42px] md:text-[52px] font-extrabold leading-none drop-shadow-md">50+</p>
          <p class="mt-3 mb-0 text-white/70 text-sm md:text-base font-medium leading-snug">Xalqaro loyihalar</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Any custom styles previously here */
</style>
