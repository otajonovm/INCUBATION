<script setup>
defineProps({
  services: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section id="services" class="bg-[#e8eaf2] py-[72px] md:py-[110px] animate-fade-in-up">
    <div class="mx-auto w-full max-w-[1280px] px-4 md:px-6">
      <div class="flex flex-col items-center justify-center text-center gap-6 mb-9 overflow-hidden">
        <h2 class="m-0 text-[clamp(34px,4vw,60px)] font-bold leading-[1.14] text-[#1a2744]">{{ services.sectionTitle }}</h2>
        <p class="m-0 max-w-[920px] text-[#53627f] text-base md:text-[30px] leading-relaxed">{{ services.sectionDescription }}</p>
      </div>

      <div class="mt-11 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article v-for="card in services.cards" :key="card.title" class="bg-white rounded-[18px] shadow-[0_20px_50px_rgba(19,23,32,0.08)] p-8 text-center transition-transform hover:-translate-y-1">
          <div class="text-[54px] leading-none mb-3">{{ card.icon }}</div>
          <h3 class="m-0 mb-3 text-[28px] md:text-[46px] font-bold text-[#1a2744]">{{ card.title }}</h3>
          <p class="m-0 text-[#53627f] text-base md:text-[28px] leading-tight">{{ card.text }}</p>
        </article>
      </div>

      <div class="mt-16 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 items-center">
        <span v-for="logo in services.logos" :key="logo" class="text-center text-[#5f6c85] font-semibold text-lg md:text-[24px]">{{ logo }}</span>
      </div>
    </div>
  </section>
</template>
