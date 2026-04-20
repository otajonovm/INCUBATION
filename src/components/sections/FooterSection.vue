<script setup>
defineProps({
  footer: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <footer class="bg-[#0b0d12] text-[#f2f3f6] pt-[72px] md:pt-[96px] pb-6 md:pb-6 animate-fade-in-up">
    <div class="mx-auto w-full max-w-[1280px] px-4 md:px-6 grid grid-cols-1 lg:grid-cols-[1.3fr_0.8fr_1fr] gap-10 md:gap-[52px]">
      <div>
        <h3 class="m-0 mb-4 md:mb-4 text-[24px] md:text-[34px] font-bold">{{ footer.newsletterTitle }}</h3>
        <div class="mt-4 md:mt-[22px] border border-[#e5e5e5] bg-[#f5f5f7] rounded-[14px] overflow-hidden flex items-center">
          <input type="email" :placeholder="footer.newsletterPlaceholder" aria-label="Email" class="flex-1 border-none bg-transparent outline-none text-[#22314d] text-lg md:text-[26px] p-4 md:py-5 md:px-[22px] w-full" />
          <button type="button" class="bg-[#ff6224] text-white shrink-0 rounded-[10px] m-2 w-12 h-12 md:w-[58px] md:h-[58px] flex items-center justify-center text-xl shadow-[0_14px_28px_rgba(255,98,36,0.25)] hover:-translate-y-px transition-transform">➤</button>
        </div>

        <p class="mt-6 md:mt-[24px] mb-3 text-lg md:text-[30px] font-medium">{{ footer.socialTitle }}</p>
        <div class="flex gap-3" aria-label="Ijtimoiy tarmoqlar">
          <a href="#" aria-label="Twitter" class="w-10 h-10 md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center border border-white/30 hover:bg-white/10 transition-colors">𝕏</a>
          <a href="#" aria-label="Facebook" class="w-10 h-10 md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center border border-white/30 hover:bg-white/10 transition-colors">f</a>
          <a href="#" aria-label="YouTube" class="w-10 h-10 md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center border border-white/30 hover:bg-white/10 transition-colors">▶</a>
          <a href="#" aria-label="LinkedIn" class="w-10 h-10 md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center border border-white/30 hover:bg-white/10 transition-colors">in</a>
          <a href="#" aria-label="Instagram" class="w-10 h-10 md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center border border-white/30 hover:bg-white/10 transition-colors">◉</a>
        </div>
      </div>

      <div>
        <h3 class="m-0 mb-4 text-[24px] md:text-[34px] font-bold">{{ footer.usefulLinksTitle }}</h3>
        <ul class="m-0 p-0 list-none grid gap-3 text-[#d5d9e2] text-base md:text-[28px]">
          <li v-for="link in footer.usefulLinks" :key="link">{{ link }}</li>
        </ul>
      </div>

      <div>
        <h3 class="m-0 mb-4 text-[24px] md:text-[34px] font-bold">{{ footer.contactTitle }}</h3>
        <ul class="m-0 p-0 list-none grid gap-3 text-[#d5d9e2] text-base md:text-[28px]">
          <li v-for="contact in footer.contacts" :key="contact">{{ contact }}</li>
        </ul>
      </div>
    </div>

    <div class="mx-auto w-full max-w-[1280px] px-4 md:px-6 mt-10 md:mt-[52px] border-t border-white/20 pt-6 md:pt-[24px] text-center text-sm md:text-[30px] text-white/80">
      {{ footer.copyright }}
    </div>
  </footer>
</template>
