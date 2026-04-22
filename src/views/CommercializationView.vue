<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import HeaderSection from '../components/sections/HeaderSection.vue'
import FooterSection from '../components/sections/FooterSection.vue'
import homepageContent from '../data/homepageContent'
import { normalizeContent } from '../utils/textNormalize'
import { supabase } from '../supabase'

const content = normalizeContent(homepageContent)
const router = useRouter()

const defaultCommercialization = [
  {
    title: 'Biometricheskaya Sistema Ucheta Rabochego Vremeni',
    shortDescription: 'Ministerstva visshego obrazovaniya, Yuridicheskiye litsa, Litsa, zanimayushiyesya vidom deyatelnosti.',
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

const commercializationItems = ref([...defaultCommercialization])
const selectedIndex = ref(0)
const activeGalleryIndex = ref(0)

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

const selectedItem = computed(() => commercializationItems.value[selectedIndex.value] || null)

const pickItem = (index) => {
  selectedIndex.value = index
  activeGalleryIndex.value = 0
}

const openDetail = (item) => {
  if (!item?.slug) return
  router.push(`/commercialization/${item.slug}`)
}

const prevGallery = () => {
  if (!selectedItem.value?.gallery?.length) return
  activeGalleryIndex.value =
    (activeGalleryIndex.value - 1 + selectedItem.value.gallery.length) % selectedItem.value.gallery.length
}

const nextGallery = () => {
  if (!selectedItem.value?.gallery?.length) return
  activeGalleryIndex.value = (activeGalleryIndex.value + 1) % selectedItem.value.gallery.length
}

const currentGalleryImage = computed(() => {
  if (!selectedItem.value) return ''
  if (selectedItem.value.gallery?.length) {
    return selectedItem.value.gallery[activeGalleryIndex.value]
  }
  return selectedItem.value.image || ''
})

onMounted(async () => {
  window.scrollTo(0, 0)

  const { data, error } = await supabase
    .from('site_content')
    .select('value')
    .eq('key', 'site_commercialization')
    .maybeSingle()

  if (!error && Array.isArray(data?.value) && data.value.length > 0) {
    commercializationItems.value = withSlugs(data.value)
  } else {
    commercializationItems.value = withSlugs(defaultCommercialization)
  }
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
              <span class="text-white/70">Home</span>
              <span class="w-1 h-1 rounded-full bg-white/50"></span>
              <span>Tijoratlashtirish</span>
            </div>
            <h1 class="text-4xl md:text-6xl lg:text-[72px] font-black text-white leading-tight mb-6">
              Tijoratlashtirish
            </h1>
            <p class="text-lg md:text-2xl text-white/90 font-medium max-w-3xl leading-relaxed">
              Ilmiy-tadqiqot natijalarini tijoratlashtirishga oid ma'lumotlar.
            </p>
          </div>
        </div>
      </section>

      <section class="mx-auto w-full max-w-[1200px] px-4 md:px-6 py-12 md:py-16">
        <h2 class="text-3xl md:text-4xl font-extrabold text-[#1a2744] mb-8 text-center">Tijoratlashtirish</h2>

        <div class="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <article
                v-for="(item, index) in commercializationItems"
                :key="index"
                @click="pickItem(index)"
                class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              >
                <div class="h-52 bg-gray-100 overflow-hidden">
                  <img
                    v-if="item.image"
                    :src="item.image"
                    :alt="item.title"
                    class="w-full h-full object-cover"
                    @error="$event.target.src='https://placehold.co/800x500/e5e7eb/475569?text=Topilmadi'"
                  />
                </div>

                <div class="p-5">
                  <h3 class="text-xl font-semibold text-[#1a2744] mb-3 leading-snug min-h-[56px]">{{ item.title }}</h3>
                  <p class="text-[#53627f] text-sm leading-relaxed min-h-[72px]">{{ item.shortDescription }}</p>
                  <button
                    @click.stop="openDetail(item)"
                    class="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#197b9b] hover:bg-[#156c88] text-white text-sm font-semibold"
                  >
                    {{ item.buttonText || 'Batafsil' }}
                    <span>→</span>
                  </button>
                </div>
              </article>
            </div>
          </div>

          <aside v-if="selectedItem" class="bg-white rounded-xl border border-gray-200 p-4 md:p-5 lg:sticky lg:top-28 h-fit">
            <div class="relative rounded-lg overflow-hidden bg-gray-100">
              <img
                v-if="currentGalleryImage"
                :src="currentGalleryImage"
                :alt="selectedItem.title"
                class="w-full h-56 object-cover"
                @error="$event.target.src='https://placehold.co/1000x700/e5e7eb/475569?text=Topilmadi'"
              />

              <button
                @click="prevGallery"
                class="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white"
                aria-label="Oldingi rasm"
              >
                ‹
              </button>
              <button
                @click="nextGallery"
                class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white"
                aria-label="Keyingi rasm"
              >
                ›
              </button>
            </div>

            <div class="mt-5 space-y-5">
              <div class="border border-gray-200 rounded-lg overflow-hidden">
                <div class="bg-[#138000] text-white px-4 py-3 text-2xl font-bold">{{ selectedItem.featuresTitle || 'Funksiyalari' }}:</div>
                <ul class="p-4 space-y-2 text-[15px] text-[#1a2744]">
                  <li v-for="(feature, fIndex) in selectedItem.features || []" :key="fIndex" class="flex gap-2">
                    <span class="text-[#138000]">›</span>
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <div class="border border-gray-200 rounded-lg overflow-hidden">
                <div class="bg-[#138000] text-white px-4 py-3 text-2xl font-bold">{{ selectedItem.usageTitle || "Qo'llanilish sohasi" }}:</div>
                <ul class="p-4 space-y-2 text-[15px] text-[#1a2744]">
                  <li v-for="(usage, uIndex) in selectedItem.usages || []" :key="uIndex" class="flex gap-2">
                    <span class="text-[#138000]">›</span>
                    <span>{{ usage }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>

    <FooterSection :footer="content.footer" />
  </div>
</template>
