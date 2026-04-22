<script setup>
defineProps({
  footer: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <footer class="bg-[#0B0D14] text-white pt-16 md:pt-24 pb-8 animate-fade-in-up font-sans">
    <div class="mx-auto w-full max-w-[1280px] px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr] gap-12 lg:gap-16">
      
      <!-- Column 1: Newsletter & Socials -->
      <div class="flex flex-col pr-0 lg:pr-10">
        <h3 class="text-[28px] md:text-[32px] font-semibold leading-[1.3] mb-6 tracking-tight">
          {{ footer.newsletterTitle }}
        </h3>
        
        <!-- Input Group -->
        <div class="flex items-center bg-[#F9FAFB] rounded-[10px] p-2 mb-8 shadow-inner">
          <input 
            type="email" 
            :placeholder="footer.newsletterPlaceholder" 
            aria-label="Email" 
            class="flex-1 bg-transparent border-none outline-none text-[#6b7280] text-[17px] px-4 placeholder:text-[#9ca3af] placeholder:font-light font-medium" 
          />
          <button 
            type="button" 
            class="bg-[#FF6A28] hover:bg-[#E55B20] text-white shrink-0 rounded-[8px] w-[56px] h-[46px] flex items-center justify-center transition-colors shadow-md"
          >
            <!-- Arrow Icon SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
            </svg>
          </button>
        </div>

        <h4 class="text-[24px] font-medium mb-5 tracking-tight">{{ footer.socialTitle }}</h4>
        
        <!-- Social Icons -->
        <div class="flex gap-[14px] items-center">
          <a href="#" class="w-[38px] h-[38px] rounded-full flex items-center justify-center border border-white/20 text-[#a1a1aa] hover:border-white hover:text-white text-sm transition-all focus:ring-2 focus:ring-[#FF6A28]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" class="w-[38px] h-[38px] rounded-full flex items-center justify-center border border-white/20 text-[#a1a1aa] hover:border-white hover:text-white text-sm transition-all focus:ring-2 focus:ring-[#FF6A28]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
          </a>
          <a href="#" class="w-[38px] h-[38px] rounded-full flex items-center justify-center border border-white/20 text-[#a1a1aa] hover:border-white hover:text-white transition-all focus:ring-2 focus:ring-[#FF6A28]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 6v12l10-6z"/></svg>
          </a>
          <a href="#" class="w-[38px] h-[38px] rounded-full flex items-center justify-center border border-white/20 text-[#a1a1aa] hover:border-white hover:text-white text-sm transition-all focus:ring-2 focus:ring-[#FF6A28]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
          </a>
          <a href="#" class="w-[38px] h-[38px] rounded-full flex items-center justify-center border border-white/20 text-[#a1a1aa] hover:border-white hover:text-white transition-all focus:ring-2 focus:ring-[#FF6A28]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"/><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0z"/></svg>
          </a>
        </div>
      </div>

      <!-- Column 2: Useful Links -->
      <div class="flex flex-col">
        <h3 class="text-[26px] font-semibold mb-6 tracking-tight">{{ footer.usefulLinksTitle }}</h3>
        <ul class="flex flex-col gap-5 text-[#E0E2E7] text-[18px] font-light">
          <li v-for="link in footer.usefulLinks" :key="link">
            <a href="#" class="hover:text-[#FF6A28] transition-colors leading-snug">{{ link }}</a>
          </li>
        </ul>
      </div>

      <!-- Column 3: Contact -->
      <div class="flex flex-col">
        <h3 class="text-[26px] font-semibold mb-6 tracking-tight">{{ footer.contactTitle }}</h3>
        <ul class="flex flex-col gap-5 text-[#E0E2E7] text-[18px] font-light">
          <li v-for="contact in footer.contacts" :key="contact" class="leading-relaxed">
            {{ contact }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Copyright Bottom -->
    <div class="mx-auto w-full max-w-[1280px] px-6 lg:px-8 mt-[70px] text-center border-t border-[#1C2028] pt-[30px] pb-4 text-[20px] text-[#E0E2E7] font-light tracking-wide">
      {{ footer.copyright }}
    </div>
  </footer>
</template>
