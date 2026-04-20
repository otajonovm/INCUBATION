<script setup>
defineProps({
  tasks: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section id="tasks" class="bg-[#e4e7f0] py-[72px] md:py-[110px] animate-fade-in-up">
    <div class="mx-auto w-full max-w-[1280px] px-4 md:px-6 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-10 items-start">
      <div class="min-h-[300px] md:min-h-[540px] rounded-[20px] bg-[linear-gradient(140deg,#d9dee7_10%,#bfc8d6_70%)] w-full h-full" aria-hidden="true"></div>
      <div>
        <h2 class="m-0 mb-6 text-[clamp(34px,4vw,60px)] font-bold leading-[1.14] text-[#1a2744]">{{ tasks.title }}</h2>
        <ul class="list-none p-0 m-0 mt-6 grid gap-5 md:gap-5">
          <li v-for="point in tasks.points" :key="point" class="relative pl-9 text-[#465775] text-base md:text-[30px] leading-tight">
            <span class="absolute left-0 top-1 md:top-2 text-[#233f68] text-base md:text-xl">●</span>
            {{ point }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
