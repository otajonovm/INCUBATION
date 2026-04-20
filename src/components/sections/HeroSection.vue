<script setup>
defineProps({
    hero: {
        type: Object,
        required: true,
    },
})

const baseSvg = (path) => `<svg xmlns="http://www.w3.org/2000/svg" class="w-28 h-28 md:w-36 md:h-36 text-white opacity-90 drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2"><path stroke-linecap="round" stroke-linejoin="round" d="${path}" /></svg>`;

const serviceItems = [
    { name: 'Graphic<br>Design', icon: baseSvg('M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'), color: 'from-[#cf7b3e]' },
    { name: 'Blockchain<br>Development', icon: baseSvg('M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'), color: 'from-[#2e2b4f]' },
    { name: 'Ecommerce<br>Development', icon: baseSvg('M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'), color: 'from-[#8d7c43]' },
    { name: 'Digital<br>Marketing', icon: baseSvg('M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z'), color: 'from-[#4e3f6d]' },
    { name: 'Web<br>Design', icon: baseSvg('M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'), color: 'from-[#2e5d6d]' },
    { name: 'App<br>Development', icon: baseSvg('M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'), color: 'from-[#5d2e3d]' }
];

const loopItems = [...serviceItems, ...serviceItems];
</script>

<template>
    <section
        class="relative min-h-[90vh] bg-[#070511] text-white pt-24 md:pt-32 pb-24 md:pb-32 overflow-hidden flex items-center">

        <!-- Video Background (adapted from your snippet) -->
        <div class="absolute inset-0 z-0 overflow-hidden bg-[#070511]">
          <video autoplay muted loop playsinline class="w-full h-full object-cover opacity-50 transition-opacity duration-1000" id="myVideo" poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa">
            <source src="https://cdn.pixabay.com/video/2020/05/25/40131-424933934_large.mp4" type="video/mp4">
          </video>
          <div class="absolute inset-0 bg-[#070511]/70 backdrop-blur-[2px]"></div> <!-- Dark overlay for text readability -->
        </div>

        <!-- Glowing background elements -->
        <div
            class="pointer-events-none absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-10 w-[800px] h-[800px] rounded-full border-[1px] border-white/5 opacity-50 z-0">
        </div>
        <div
            class="pointer-events-none absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-[200px] w-[1000px] h-[1000px] rounded-full border-[1px] border-white/5 opacity-30 z-0">
        </div>
        <div
            class="pointer-events-none absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-[50px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,138,0,0.5),transparent_60%)] opacity-60 z-0 blur-[60px]">
        </div>

        <div class="mx-auto w-full max-w-7xl px-4 md:px-6 relative z-10 flex flex-col gap-16 lg:gap-24">

            <div class="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-start">
                <!-- Left Content -->
                <div class="max-w-2xl mt-10">
                    <h1 v-motion :initial="{ opacity: 0, y: 50 }"
                        :enter="{ opacity: 1, y: 0, transition: { duration: 800, type: 'spring' } }"
                        class="m-0 mb-6 text-5xl md:text-6xl lg:text-[76px] font-extrabold tracking-tight leading-[1.1] uppercase drop-shadow-lg">
                        <span class="block text-white">TUIT INCUBATION</span>
                        <span
                            class="block bg-linear-to-r from-white via-white to-white/60 bg-clip-text text-transparent">CENTER</span>
                    </h1>
                    <p v-motion :initial="{ opacity: 0, y: 30 }"
                        :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 800 } }"
                        class="mb-10 text-white/90 text-lg md:text-[22px] leading-relaxed max-w-lg font-medium drop-shadow-md">
                        Jamiyatning texnologik innovatsiyani qabul qilish darajasi uning taraqqiyotida hal qiluvchi
                        omildir
                    </p>
                    <a v-motion :initial="{ opacity: 0, scale: 0.9 }"
                        :enter="{ opacity: 1, scale: 1, transition: { delay: 400, duration: 600 } }"
                        href="./contact.html"
                        class="inline-flex items-center gap-3 rounded-full bg-linear-to-r from-[#2c4deb] to-[#5e73ff] text-white px-7 py-4 text-base md:text-lg font-bold shadow-[0_10px_30px_rgba(94,115,255,0.4)] hover:shadow-[0_15px_40px_rgba(94,115,255,0.6)] hover:-translate-y-1 transition-all duration-300">
                        Loyihangizni ro'yxatdan o'tkazing
                        <i class="fa-solid fa-arrow-trend-up"></i>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                        </svg>
                    </a>
                </div>

                <!-- Right Content (Play button + text) -->
                <div v-motion :initial="{ opacity: 0, x: 50 }"
                    :enter="{ opacity: 1, x: 0, transition: { delay: 300, duration: 800 } }"
                    class="flex items-center gap-6 max-w-[22rem] mt-0 lg:mt-16 ml-auto mr-4 lg:pr-10">
                    <a href="https://www.youtube.com/watch?v=Aty3TV4Yn4I" target="_blank"
                        class="shrink-0 flex items-center justify-center w-16 h-16 md:w-[72px] md:h-[72px] rounded-full border border-[#ff6224]/30 bg-linear-to-br from-[#ff6224] to-[#ff4200] text-white cursor-pointer shadow-[0_0_0_10px_rgba(255,98,36,0.15)] hover:shadow-[0_0_0_15px_rgba(255,98,36,0.25)] hover:scale-105 transition-all duration-300"
                        aria-label="Play video">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 ml-1 drop-shadow-lg" viewBox="0 0 24 24"
                            fill="currentColor">
                            <path d="M5 3v18l15-9L5 3z" />
                        </svg>
                    </a>
                    <div class="flex flex-col">
                        <p class="m-0 text-base md:text-xl font-bold text-white leading-snug drop-shadow-md">
                            Tijoratlashtirishga mo'ljallangan loyihalar</p>
                        <p class="m-0 mt-2 text-sm md:text-base text-white/70 leading-snug">Startap, Ilmiy innovatsion
                            ishlanmalar.</p>
                    </div>
                </div>
            </div>

            <!-- Glass Cards / Infinite Carousel overlapping bottom right area -->
            <div v-motion :initial="{ opacity: 0, y: 80 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 500, duration: 1000 } }"
                class="relative w-full z-20 mt-10 md:mt-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                <div class="flex gap-6 w-max animate-infinite-scroll hover:[animation-play-state:paused]">
                    <a v-for="(item, index) in loopItems" :key="index" href="#"
                        class="group w-[280px] md:w-[320px] shrink-0 flex flex-col justify-end items-center text-center p-8 h-[340px] md:h-[400px] rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-3 hover:bg-white/10 hover:border-white/20 relative overflow-hidden">

                        <div class="absolute inset-x-0 top-0 h-[65%] w-full flex items-center justify-center pt-8 group-hover:scale-110 transition-transform duration-700"
                            v-html="item.icon"></div>

                        <div
                            :class="`absolute bottom-0 inset-x-0 h-40 bg-linear-to-t ${item.color}/50 to-transparent -z-10`">
                        </div>

                        <h3 class="m-0 text-xl md:text-[24px] font-bold tracking-wide text-white relative z-10 leading-[1.3]"
                            v-html="item.name"></h3>
                    </a>
                </div>
            </div>

        </div>
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
