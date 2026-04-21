<script setup>
defineProps({
  tasks: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section id="tasks" class="relative bg-white py-24 md:py-32 overflow-hidden z-10 border-t border-gray-100">
    <div class="mx-auto w-full max-w-[1280px] px-4 md:px-6 relative">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        <!-- Rasm qismi (Chap tomon) -->
        <div 
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 800, type: 'spring' } }"
          class="relative w-full max-w-md mx-auto lg:max-w-full"
        >
          <!-- Orqa fon gradient bezak -->
          <div class="absolute -top-8 -left-8 w-40 h-40 md:w-56 md:h-56 bg-[#2c4deb]/10 rounded-full blur-3xl z-0"></div>
          <div class="absolute -bottom-8 -right-8 w-40 h-40 md:w-56 md:h-56 bg-[#00d084]/10 rounded-full blur-3xl z-0"></div>
          
          <!-- Rasm blok -->
          <div class="relative z-10 rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-50 bg-white">
             <!-- Real rasm havolasi (ularning dizaynidagi o'rniga mos yuqori sifatli rasmlardan biri yoki siz taklif qilgan kabi tabassumli odam) -->
             <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=80" alt="Asosiy vazifalar" class="w-full h-full object-cover aspect-[4/5] object-center hover:scale-105 transition-transform duration-700" />
          </div>
        </div>

        <!-- Matnlar (O'ng tomon) -->
        <div class="flex flex-col justify-center">
          <h2 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200, type: 'spring' } }"
            class="m-0 text-3xl md:text-4xl lg:text-[44px] font-extrabold leading-[1.2] bg-clip-text text-transparent bg-linear-to-r from-[#1a2744] to-[#2c4deb] pb-3 mb-8 md:mb-10"
          >
            {{ tasks.title }}
          </h2>
          
          <ul class="list-none p-0 m-0 space-y-5 md:space-y-6">
            <li 
              v-for="(point, index) in tasks.points" 
              :key="index"
              v-motion
              :initial="{ opacity: 0, x: 30 }"
              :visible="{ opacity: 1, x: 0, transition: { duration: 600, delay: 400 + (index * 150), type: 'spring' } }"
              class="relative pl-12 md:pl-16 text-[#53627f] text-base md:text-lg leading-relaxed font-medium group"
            >
              <!-- MAXSUS DIZAYNLI MARKER (CHECKMARK) -->
              <span class="absolute left-0 top-1 w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#f0f4ff] group-hover:bg-linear-to-tr from-[#2c4deb] to-[#5e73ff] text-[#2c4deb] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm border border-[#2c4deb]/10 group-hover:border-transparent group-hover:shadow-[0_10px_20px_rgba(44,77,235,0.3)] group-hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              {{ point }}
            </li>
          </ul>
        </div>
        
      </div>
    </div>
  </section>
</template>
