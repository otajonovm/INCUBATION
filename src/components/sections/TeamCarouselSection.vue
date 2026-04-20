<script setup>
import BaseCarousel from '../common/BaseCarousel.vue'

defineProps({
  team: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section id="team" class="bg-[#efeff0] py-[72px] md:py-[110px] animate-fade-in-up">
    <div class="mx-auto w-full max-w-[1280px] px-4 md:px-6">
      <h2 class="m-0 text-center text-[clamp(34px,4vw,60px)] font-bold leading-[1.14] text-[#1a2744] mb-9">{{ team.title }}</h2>

      <BaseCarousel :items="team.members" :autoplay="true" :delay="5500">
        <template #item="{ item }">
          <article class="m-2 bg-white border border-[#d7dbe3] rounded-[18px] min-h-[390px] p-6 md:p-[30px] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 md:w-[78px] md:h-[78px] shrink-0 rounded-full bg-[#ebedf2] flex items-center justify-center text-2xl md:text-[28px]">👤</div>
                <div>
                  <h3 class="m-0 text-[#1a2744] text-[24px] md:text-[34px] font-bold">{{ item.name }}</h3>
                  <p class="m-0 mt-1 text-[#687792] text-sm md:text-[24px]">{{ item.role }}</p>
                </div>
              </div>
              <p class="mt-5 md:mt-6 mb-6 text-[#33466a] text-lg md:text-[30px] leading-relaxed">{{ item.description }}</p>
            </div>
            
            <div class="border-t border-[#e1e5ee] pt-4 md:pt-[22px] flex justify-between items-center text-[#1a2744] text-base md:text-[26px] font-bold">
              <span>TUIT INCUBATION CENTER</span>
              <span>✶</span>
            </div>
          </article>
        </template>
      </BaseCarousel>
    </div>
  </section>
</template>
