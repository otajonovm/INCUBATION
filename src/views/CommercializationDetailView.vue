<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import HeaderSection from '../components/sections/HeaderSection.vue'
import FooterSection from '../components/sections/FooterSection.vue'
import { useHomepageContent } from '../composables/useHomepageContent'
import { useLocalizedContent } from '../composables/useLocalizedContent'
import { supabase } from '../supabase'

const { t } = useI18n()
const { content } = useHomepageContent()
const { locale, getLocalizedValue } = useLocalizedContent()
const route = useRoute()
const router = useRouter()

const defaultCommercialization = [
  {
    title: 'Biometricheskaya Sistema Ucheta Rabochego Vremeni',
    shortDescription: 'Ministerstva visshego obrazovaniya, Yuridicheskiye litsa, Litsa, zanimayushiyesya vidom deyatelnosti.',
    fullDescription: "Loyiha ish vaqtini raqamli kuzatish va tahlil qilish uchun mo'ljallangan. Tizim markaziy monitoring, hisobotlar va integratsiya imkoniyatlariga ega.",
    image: 'https://picsum.photos/seed/commercial-1/900/620',
    buttonText: 'Batafsil',
    featuresTitle: 'Funksiyalari',
    features: [
      'Markazlashtirilgan monitoringni tashkil etish imkoniyati',
      'Har qanday fayl formatida hisobotlarni yaratish',
      'Statistikani yuritish'
    ],
    usageTitle: "Qo'llanilish sohasi",
    usages: ['Vazirliklar', 'Yuridik shaxslar', 'Xususiy tashkilotlar'],
    gallery: ['https://picsum.photos/seed/commercial-1a/900/620', 'https://picsum.photos/seed/commercial-1b/900/620']
  },
  {
    title: 'Raqamlarni Tanish Tizimi',
    shortDescription: "Bojxona postlari, Yo'l harakati xavfsizligini ta'minlash, pullik to'xtash joylari, korxonalarning to'xtash joylari.",
    fullDescription: "Raqamlarni avtomatik aniqlash tizimi transport oqimini boshqarish, xavfsizlik va kirish-chiqishni nazorat qilishda qo'llaniladi.",
    image: 'https://picsum.photos/seed/commercial-2/900/620',
    buttonText: 'Batafsil',
    featuresTitle: 'Funksiyalari',
    features: [
      'Avtoturargoh vaqtini hisoblash',
      'To‘siqlar bilan integratsiya',
      'Avtomatlashtirilgan eshiklar bilan integratsiya'
    ],
    usageTitle: "Qo'llanilish sohasi",
    usages: ['Bojxona postlari', "Yo'l harakati xavfsizligi", 'Pullik avtoturargoh'],
    gallery: ['https://picsum.photos/seed/commercial-2a/900/620', 'https://picsum.photos/seed/commercial-2b/900/620']
  },
  {
    title: 'GPS Monitoringi',
    shortDescription: 'Korxona va tashkilotlar avtomobillari, yuridik shaxslar va jismoniy shaxslar avtomobillari monitoringi.',
    fullDescription: 'GPS monitoring platformasi transport vositalarini real-time kuzatib borish, yo‘nalishlarni boshqarish va hisobot olish imkonini beradi.',
    image: 'https://picsum.photos/seed/commercial-3/900/620',
    buttonText: 'Batafsil',
    featuresTitle: 'Funksiyalari',
    features: [
      'Real-time kuzatib borish',
      'Hisobot va tahlil imkoniyatlari',
      'Boshqa tizimlar bilan integratsiya'
    ],
    usageTitle: "Qo'llanilish sohasi",
    usages: ['Korxona avtomobillari', 'Yuridik shaxslar', 'Jismoniy shaxslar'],
    gallery: ['https://picsum.photos/seed/commercial-3a/900/620', 'https://picsum.photos/seed/commercial-3b/900/620']
  }
]

const loading = ref(true)
const allItems = ref([])
const activeImageIndex = ref(0)

const toSlug = (text) => {
  if (!text) return ''
  return text
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const withSlugs = (items) => {
  return items.map((item, index) => {
    const baseSlug = item.slug || item.id || toSlug(item.title) || `project-${index + 1}`
    return { ...item, slug: `${baseSlug}-${index + 1}` }
  })
}

const currentItem = computed(() => {
  const slug = route.params.slug
  return allItems.value.find((item) => item.slug === slug) || null
})

const currentImage = computed(() => {
  if (!currentItem.value) return ''
  const gallery = currentItem.value.gallery || []
  if (gallery.length === 0) return currentItem.value.image || ''
  return gallery[activeImageIndex.value] || gallery[0]
})

const previousImage = () => {
  const gallery = currentItem.value?.gallery || []
  if (gallery.length <= 1) return
  activeImageIndex.value = (activeImageIndex.value - 1 + gallery.length) % gallery.length
}

const nextImage = () => {
  const gallery = currentItem.value?.gallery || []
  if (gallery.length <= 1) return
  activeImageIndex.value = (activeImageIndex.value + 1) % gallery.length
}

const loadItems = async () => {
  loading.value = true
  try {
    const localized = await getLocalizedValue(supabase, 'site_commercialization', defaultCommercialization)
    const source = Array.isArray(localized) && localized.length > 0 ? localized : defaultCommercialization
    allItems.value = withSlugs(source)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  window.scrollTo(0, 0)
  await loadItems()
})

watch(locale, async () => {
  await loadItems()
})
</script>

<template>
  <div class="min-h-screen bg-[#ececef] text-[#1a2744] font-sans selection:bg-[#ff6224] selection:text-white flex flex-col">
    <HeaderSection :nav="content.nav" class="bg-[#070511]" />

    <main class="overflow-x-hidden flex-1 pb-24">
      <section class="relative pt-[120px] pb-16 md:pt-[160px] md:pb-24 lg:pt-[200px] lg:pb-[120px] overflow-hidden bg-[#070511]">
        <div class="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80" alt="Background" class="w-full h-full object-cover opacity-20 transform scale-105" />
          <div class="absolute inset-0 bg-linear-to-b from-[#070511]/90 via-[#070511]/70 to-[#070511]"></div>
        </div>
        <div class="container relative z-10 mx-auto px-4 md:px-6">
          <div class="max-w-5xl text-left">
            <div class="text-[#ff6224] font-bold text-sm md:text-base tracking-wider uppercase mb-4 flex items-center gap-2">
              <RouterLink to="/" class="text-white/70 hover:text-white transition-colors">{{ t('common.home') }}</RouterLink>
              <span class="w-1 h-1 rounded-full bg-white/50"></span>
              <span @click="router.push('/commercialization')" class="cursor-pointer hover:text-white">{{ t('commercializationPage.title') }}</span>
              <span class="w-1 h-1 rounded-full bg-white/50"></span>
              <span>{{ currentItem?.title || t('commercializationDetail.project') }}</span>
            </div>
            <h1 class="text-3xl md:text-5xl lg:text-[56px] font-black text-white leading-tight mb-5">
              {{ currentItem?.title || t('commercializationDetail.defaultTitle') }}
            </h1>
            <p class="text-lg md:text-2xl text-white/90 font-medium max-w-3xl leading-relaxed">
              {{ currentItem?.shortDescription || t('commercializationDetail.defaultDesc') }}
            </p>
          </div>
        </div>
      </section>

      <section class="mx-auto w-full max-w-[1200px] px-4 md:px-6 py-12 md:py-16">
        <div v-if="loading" class="text-center py-16 text-gray-500">{{ t('common.loading') }}</div>

        <div v-else-if="!currentItem" class="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <h2 class="text-2xl font-bold mb-3">{{ t('commercializationDetail.notFoundTitle') }}</h2>
          <p class="text-gray-600 mb-5">{{ t('commercializationDetail.notFoundDesc') }}</p>
          <button @click="router.push('/commercialization')" class="px-5 py-2.5 rounded-lg bg-[#197b9b] text-white font-semibold">{{ t('commercializationDetail.back') }}</button>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div class="bg-white rounded-xl border border-gray-200 p-5 md:p-6">
            <div class="relative rounded-lg overflow-hidden bg-gray-100 mb-6">
              <img :src="currentImage" :alt="currentItem.title" class="w-full h-[420px] object-cover" @error="$event.target.src='https://placehold.co/1000x700/e5e7eb/475569?text=Topilmadi'" />
              <button @click="previousImage" class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white">‹</button>
              <button @click="nextImage" class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white">›</button>
            </div>

            <h2 class="text-2xl md:text-3xl font-bold mb-4">{{ currentItem.title }}</h2>
            <p class="text-[#53627f] leading-relaxed whitespace-pre-line">
              {{ currentItem.fullDescription || currentItem.shortDescription }}
            </p>
          </div>

          <aside class="space-y-5">
            <div class="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <div class="bg-[#138000] text-white px-4 py-3 text-2xl font-bold">{{ currentItem.featuresTitle || t('commercializationPage.features') }}:</div>
              <ul class="p-4 space-y-2 text-[15px] text-[#1a2744]">
                <li v-for="(feature, fIndex) in currentItem.features || []" :key="fIndex" class="flex gap-2">
                  <span class="text-[#138000]">›</span>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>

            <div class="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <div class="bg-[#138000] text-white px-4 py-3 text-2xl font-bold">{{ currentItem.usageTitle || t('commercializationPage.usage') }}:</div>
              <ul class="p-4 space-y-2 text-[15px] text-[#1a2744]">
                <li v-for="(usage, uIndex) in currentItem.usages || []" :key="uIndex" class="flex gap-2">
                  <span class="text-[#138000]">›</span>
                  <span>{{ usage }}</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>

    <FooterSection :footer="content.footer" />
  </div>
</template>
