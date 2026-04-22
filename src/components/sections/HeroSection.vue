<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({
    hero: {
        type: Object,
        required: true,
    },
})

const isRegistrationOpen = ref(false)

const registrationForm = ref({
    fullName: '',
    projectName: '',
    phone: '',
    email: '',
    fileName: '',
})

const { t } = useI18n()

const openRegistrationForm = () => {
    isRegistrationOpen.value = true
}

const closeRegistrationForm = () => {
    isRegistrationOpen.value = false
}

const handleRegistrationFile = (event) => {
    const file = event.target.files?.[0]
    registrationForm.value.fileName = file ? file.name : ''
}

const submitRegistrationForm = () => {
    closeRegistrationForm()
}

const baseImg = (url, alt) => {
    const fallback = url.replace('/512.gif', '/512.png')
    return `<img src="${url}" onerror="this.onerror=null;this.src='${fallback}'" class="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" alt="${alt}" />`
}

const serviceItems = [
    { name: 'Graphic<br>Design', icon: baseImg('https://fonts.gstatic.com/s/e/notoemoji/latest/1f6e0_fe0f/512.gif', 'Graphic Design'), color: 'from-[#cf7b3e]' },
    { name: 'Blockchain<br>Development', icon: baseImg('https://fonts.gstatic.com/s/e/notoemoji/latest/2699_fe0f/512.gif', 'Blockchain Development'), color: 'from-[#2e2b4f]' },
    { name: 'Ecommerce<br>Development', icon: baseImg('https://fonts.gstatic.com/s/e/notoemoji/latest/1f6d2/512.gif', 'Ecommerce Development'), color: 'from-[#8d7c43]' },
    { name: 'Digital<br>Marketing', icon: baseImg('https://fonts.gstatic.com/s/e/notoemoji/latest/1f4e3/512.gif', 'Digital Marketing'), color: 'from-[#4e3f6d]' },
    { name: 'Web<br>Design', icon: baseImg('https://fonts.gstatic.com/s/e/notoemoji/latest/1f4bb/512.gif', 'Web Design'), color: 'from-[#2e5d6d]' },
    { name: 'App<br>Development', icon: baseImg('https://fonts.gstatic.com/s/e/notoemoji/latest/1f6e0_fe0f/512.gif', 'App Development'), color: 'from-[#5d2e3d]' },
]

const loopItems = [...serviceItems, ...serviceItems]
</script>

<template>
    <section class="relative min-h-screen bg-[#070511] text-white pt-[90px] pb-10 overflow-hidden flex flex-col justify-center">

        <div class="absolute inset-0 z-0 overflow-hidden bg-[#070511]">
          <video autoplay muted loop playsinline class="w-full h-full object-cover opacity-50 transition-opacity duration-1000" id="myVideo" poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-connection-lines-in-space-20078-large.mp4" type="video/mp4">
          </video>
          <div class="absolute inset-0 bg-[#070511]/70 backdrop-blur-[2px]"></div>
        </div>

        <div class="pointer-events-none absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-10 w-[800px] h-[800px] rounded-full border-[1px] border-white/5 opacity-50 z-0"></div>
        <div class="pointer-events-none absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-[200px] w-[1000px] h-[1000px] rounded-full border-[1px] border-white/5 opacity-30 z-0"></div>
        <div class="pointer-events-none absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-[50px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,138,0,0.5),transparent_60%)] opacity-60 z-0 blur-[60px]"></div>

        <div class="mx-auto w-full max-w-7xl px-4 md:px-6 relative z-10 flex flex-col justify-between h-full flex-1 gap-8">

            <div class="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center flex-1 mt-4 md:mt-8">
                <div class="max-w-2xl">
                    <h1 v-motion :initial="{ opacity: 0, y: 50 }"
                        :enter="{ opacity: 1, y: 0, transition: { duration: 800, type: 'spring' } }"
                        class="m-0 mb-4 md:mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-extrabold tracking-tight leading-[1.1] uppercase drop-shadow-lg">
                        <span class="block text-white">{{ hero.title }}</span>
                    </h1>
                    <p v-motion :initial="{ opacity: 0, y: 30 }"
                        :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 800 } }"
                        class="mb-8 text-white/90 text-base sm:text-lg md:text-[22px] leading-relaxed max-w-lg font-medium drop-shadow-md">
                        {{ hero.description }}
                    </p>
                    <button v-motion :initial="{ opacity: 0, scale: 0.9 }"
                        :enter="{ opacity: 1, scale: 1, transition: { delay: 400, duration: 600 } }"
                        type="button"
                        @click="openRegistrationForm"
                        class="inline-flex items-center gap-3 rounded-full bg-linear-to-r from-[#2c4deb] to-[#5e73ff] text-white px-6 py-3.5 md:px-7 md:py-4 text-sm sm:text-base md:text-lg font-bold shadow-[0_10px_30px_rgba(94,115,255,0.4)] hover:shadow-[0_15px_40px_rgba(94,115,255,0.6)] hover:-translate-y-1 transition-all duration-300">
                        {{ hero.cta }}
                        <i class="fa-solid fa-arrow-trend-up"></i>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                        </svg>
                    </button>
                </div>

                <div v-motion :initial="{ opacity: 0, x: 50 }"
                    :enter="{ opacity: 1, x: 0, transition: { delay: 300, duration: 800 } }"
                    class="flex items-center gap-4 sm:gap-6 max-w-[22rem] ml-auto mr-auto lg:mr-4 lg:pr-10 mt-8 lg:mt-0 pb-4 lg:pb-0">
                    <a href="https://www.youtube.com/watch?v=Aty3TV4Yn4I" target="_blank"
                        class="shrink-0 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] rounded-full border border-[#ff6224]/30 bg-linear-to-br from-[#ff6224] to-[#ff4200] text-white cursor-pointer shadow-[0_0_0_10px_rgba(255,98,36,0.15)] hover:shadow-[0_0_0_15px_rgba(255,98,36,0.25)] hover:scale-105 transition-all duration-300"
                        aria-label="Play video">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 sm:w-7 sm:h-7 ml-1 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5 3v18l15-9L5 3z" />
                        </svg>
                    </a>
                    <div class="flex flex-col">
                        <p class="m-0 text-sm sm:text-base md:text-xl font-bold text-white leading-snug drop-shadow-md">{{ hero.videoText }}</p>
                        <p class="m-0 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-white/70 leading-snug">{{ hero.videoSubtext }}</p>
                    </div>
                </div>
            </div>

            <div v-motion :initial="{ opacity: 0, y: 80 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 500, duration: 1000 } }"
                class="relative w-full z-20 overflow-hidden mb-6 lg:mb-10 mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                <div class="flex gap-4 sm:gap-6 w-max animate-infinite-scroll hover:[animation-play-state:paused]">
                    <a v-for="(item, index) in loopItems" :key="index" href="#"
                        class="group w-[220px] sm:w-[260px] md:w-[300px] shrink-0 flex flex-col justify-end items-center text-center p-6 lg:p-8 h-[240px] sm:h-[280px] md:h-[340px] rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-3 hover:bg-white/10 hover:border-white/20 relative overflow-hidden">

                        <div class="absolute inset-x-0 top-0 h-[65%] w-full flex items-center justify-center pt-6 lg:pt-8 group-hover:scale-110 transition-transform duration-700" v-html="item.icon"></div>

                        <div :class="`absolute bottom-0 inset-x-0 h-40 bg-linear-to-t ${item.color}/50 to-transparent -z-10`"></div>

                        <h3 class="m-0 text-base sm:text-lg md:text-[22px] font-bold tracking-wide text-white relative z-10 leading-[1.3]" v-html="item.name"></h3>
                    </a>
                </div>
            </div>

        </div>

        <Teleport to="body">
            <Transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div v-if="isRegistrationOpen" class="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 bg-black/60 backdrop-blur-sm" @click.self="closeRegistrationForm">
                    <div class="w-full max-w-[760px] rounded-[28px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.35)] overflow-hidden">
                        <div class="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
                            <h2 class="text-2xl md:text-[40px] font-extrabold text-[#111827] leading-tight">{{ t('homePage.hero.modalTitle') }}</h2>
                            <button type="button" @click="closeRegistrationForm" class="w-10 h-10 rounded-full bg-[#f3f4f6] text-[#111827] hover:bg-[#e5e7eb] transition-colors flex items-center justify-center" :aria-label="t('common.close')">✕</button>
                        </div>

                        <form class="px-6 md:px-10 pt-8 pb-8 md:pb-10" @submit.prevent="submitRegistrationForm">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-x-6 md:gap-y-8">
                                <label class="flex items-center gap-3 border-b border-[#e5e7eb] py-4 text-[#64748b] text-base md:text-[18px] focus-within:text-[#111827]">
                                    <span class="text-[#475569] text-lg">👤</span>
                                    <input v-model="registrationForm.fullName" type="text" :placeholder="t('homePage.hero.fullName')" class="w-full border-none outline-none bg-transparent text-[#1f2937] placeholder:text-[#64748b] text-base md:text-[18px]" />
                                </label>

                                <label class="flex items-center gap-3 border-b border-[#e5e7eb] py-4 text-[#64748b] text-base md:text-[18px] focus-within:text-[#111827]">
                                    <span class="text-[#475569] text-lg">✎</span>
                                    <input v-model="registrationForm.projectName" type="text" :placeholder="t('homePage.hero.projectName')" class="w-full border-none outline-none bg-transparent text-[#1f2937] placeholder:text-[#64748b] text-base md:text-[18px]" />
                                </label>

                                <label class="md:col-span-2 flex items-center gap-3 border-b border-[#e5e7eb] py-4 text-[#64748b] text-base md:text-[18px] focus-within:text-[#111827] mt-2 md:mt-0">
                                    <span class="text-[#475569] text-lg">☎</span>
                                    <input v-model="registrationForm.phone" type="tel" :placeholder="t('homePage.hero.phone')" class="w-full border-none outline-none bg-transparent text-[#1f2937] placeholder:text-[#64748b] text-base md:text-[18px]" />
                                </label>

                                <label class="md:col-span-2 flex items-center gap-3 border-b border-[#e5e7eb] py-4 text-[#64748b] text-base md:text-[18px] focus-within:text-[#111827] mt-2 md:mt-0">
                                    <span class="text-[#475569] text-lg">✉</span>
                                    <input v-model="registrationForm.email" type="email" :placeholder="t('homePage.hero.email')" class="w-full border-none outline-none bg-transparent text-[#1f2937] placeholder:text-[#64748b] text-base md:text-[18px]" />
                                </label>

                                <div class="md:col-span-2 pt-7 md:pt-8">
                                    <p class="m-0 mb-4 text-[#111827] font-semibold text-base md:text-[18px]">{{ t('homePage.hero.uploadTitle') }}</p>
                                    <label class="inline-flex items-center gap-3 cursor-pointer rounded-xl border border-[#d1d5db] bg-[#f9fafb] px-4 py-3 text-[#111827] hover:bg-[#f3f4f6] transition-colors w-full md:w-fit">
                                        <span class="px-3 py-1 rounded-lg bg-white border border-[#d1d5db] text-sm md:text-base">{{ t('homePage.hero.chooseFile') }}</span>
                                        <span class="text-sm md:text-base text-[#64748b] truncate max-w-[240px] md:max-w-[320px]">{{ registrationForm.fileName || t('homePage.hero.fileNotSelected') }}</span>
                                        <input type="file" class="hidden" @change="handleRegistrationFile" />
                                    </label>
                                </div>
                            </div>

                            <div class="pt-8 md:pt-10">
                                <button type="submit" class="rounded-[8px] bg-[#2a82a8] px-5 py-3 text-white text-base font-medium hover:bg-[#1f7396] transition-colors shadow-sm">Saqlash</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </section>
</template>

<style scoped>
@keyframes scroll-left {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(calc(-50% - 12px));
    }
}

.animate-infinite-scroll {
    animation: scroll-left 35s linear infinite;
}
</style>
