<script setup>
import BaseCarousel from '../common/BaseCarousel.vue'

defineProps({
  news: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section id="news" class="bg-[#f0f0f1] py-[72px] md:py-[110px] animate-fade-in-up">
    <div class="mx-auto w-full max-w-[1280px] px-4 md:px-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-7 md:mb-9">
        <h2 class="m-0 text-[clamp(34px,4vw,60px)] font-bold leading-[1.14] text-[#1a2744]">{{ news.title }}</h2>
        <a href="#" class="text-[#1a2744] text-[22px] md:text-[32px] font-medium hover:text-[#ff6224] transition-colors">{{ news.viewAll }} ↗</a>
      </div>

      <BaseCarousel :items="news.items" :autoplay="true" :delay="4500">
        <template #item="{ item }">
          <article class="p-2 md:p-2.5 w-full">
            <div class="w-full aspect-square rounded-[20px] bg-cover bg-center" :class="item.imageClass" role="img" :aria-label="item.title"></div>
          </article>
        </template>
      </BaseCarousel>
    </div>
  </section>
</template>
