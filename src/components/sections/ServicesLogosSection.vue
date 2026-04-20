<script setup>
defineProps({
  services: {
    type: Object,
    required: true,
  },
})

// Bizda bor logotiplar ro'yhati va ularning devicon SVG lari
const techLogos = [
  { name: 'Kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg' },
  { name: 'Magento', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/magento/magento-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Sketch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sketch/sketch-original.svg' },
  { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
  { name: 'Swift', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg' },
  { name: 'Android', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' },
  { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
  { name: 'Google Cloud', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' }
]

// Infinite scrolling marquee uchun ro'yhatni ko'paytiramiz (x2 marta vizual teshik qolmasligi uchun array.concat)
const duplicatedLogos = [...techLogos, ...techLogos]

const getIcon = (title) => {
  if (title === 'Design') {
    return `<img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3a8/512.gif" class="w-20 h-20 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300" alt="Design" />`
  } else if (title === 'Robotics') {
    return `<img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f916/512.gif" class="w-20 h-20 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300" alt="Robotics" />`
  } else {
    // Coworking
    return `<img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f91d/512.gif" class="w-20 h-20 object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300" alt="Coworking" />`
  }
}
</script>

<template>
  <section id="services" class="relative py-24 md:py-32 bg-[#f8f9fc] text-[#1a2744] overflow-hidden -mt-10 pt-36">
    <div class="mx-auto w-full max-w-7xl px-4 md:px-6 relative z-10">
      
      <!-- Sarlavha Qismi -->
      <div 
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 800, type: 'spring' } }"
        class="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16"
      >
        <div class="inline-block px-4 py-1.5 rounded-full bg-[#2c4deb]/10 text-[#2c4deb] font-bold text-sm mb-4 tracking-wider uppercase">Inklyuziv Muhit</div>
        <h2 class="m-0 text-4xl md:text-5xl lg:text-[52px] font-extrabold leading-[1.15] bg-clip-text text-transparent bg-linear-to-r from-[#1a2744] to-[#2c4deb] pb-2">{{ services.sectionTitle }}</h2>
        <p class="mt-6 text-[#53627f] text-base md:text-lg leading-relaxed font-medium">{{ services.sectionDescription }}</p>
      </div>

      <!-- Xizmatlar Qutilari (Cards) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-20">
        <article 
          v-for="(card, index) in services.cards" 
          :key="card.title"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 800, delay: index * 150, type: 'spring' } }"
          class="bg-white border border-gray-100 rounded-[32px] p-8 md:p-10 shadow-[0_15px_30px_rgba(0,0,0,0.03)] flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] group"
        >
          <div 
            class="w-24 h-24 flex items-center justify-center mb-6" 
            v-html="getIcon(card.title)"
          ></div>
          <h3 class="m-0 text-2xl md:text-[28px] font-bold text-[#1a2744] mb-4">{{ card.title }}</h3>
          <p class="m-0 text-[#53627f] text-base leading-relaxed">{{ card.text }}</p>
        </article>
      </div>

      <!-- Texnologiyalar Slayderi (Infinite CSS Marquee) -->
      <div class="mt-24 md:mt-32 pt-16 relative w-full overflow-hidden">
        <p 
          v-motion
          :initial="{ opacity: 0 }"
          :visible="{ opacity: 1, transition: { duration: 1000, delay: 300 } }"
          class="text-center font-bold text-[#8a99b5] uppercase tracking-[0.2em] text-sm mb-10"
        >
          Biz bilan ishlashda qo'llaniladigan texnologiyalar
        </p>
        
        <div class="relative flex overflow-hidden group py-4">
          <!-- Marquee Track 1 -->
          <div class="flex whitespace-nowrap animate-marquee items-center gap-6 pr-6">
             <span 
                v-for="(logo, i) in duplicatedLogos" 
                :key="'m1-'+i" 
                class="inline-flex items-center justify-center gap-3 px-7 py-3 bg-white rounded-full border border-gray-100 shadow-[0_8px_16px_rgba(0,0,0,0.04)] text-[#1a2744] font-bold text-lg hover:scale-105 hover:text-[#2c4deb] hover:border-[#2c4deb]/30 transition-all cursor-default"
             >
                <img :src="logo.icon" :alt="logo.name" class="w-7 h-7 object-contain drop-shadow-sm" />
                {{ logo.name }}
             </span>
          </div>
          <!-- Marquee Track 2 -->
          <div class="flex whitespace-nowrap animate-marquee2 absolute top-4 items-center gap-6 pr-6">
             <span 
                v-for="(logo, i) in duplicatedLogos" 
                :key="'m2-'+i" 
                class="inline-flex items-center justify-center gap-3 px-7 py-3 bg-white rounded-full border border-gray-100 shadow-[0_8px_16px_rgba(0,0,0,0.04)] text-[#1a2744] font-bold text-lg hover:scale-105 hover:text-[#2c4deb] hover:border-[#2c4deb]/30 transition-all cursor-default"
             >
                <img :src="logo.icon" :alt="logo.name" class="w-7 h-7 object-contain drop-shadow-sm" />
                {{ logo.name }}
             </span>
          </div>

          <!-- Gradient Fade effect for ends -->
          <div class="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#f8f9fc] to-transparent pointer-events-none z-10"></div>
          <div class="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#f8f9fc] to-transparent pointer-events-none z-10"></div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.animate-marquee {
  animation: marquee 40s linear infinite;
  min-width: 100%;
}

.animate-marquee2 {
  animation: marquee2 40s linear infinite;
  min-width: 100%;
}

.group:hover .animate-marquee,
.group:hover .animate-marquee2 {
  animation-play-state: paused;
}

@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}

@keyframes marquee2 {
  0% { transform: translateX(100%); }
  100% { transform: translateX(0%); }
}
</style>
