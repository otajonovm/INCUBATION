<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import HeaderSection from '../components/sections/HeaderSection.vue'
import FooterSection from '../components/sections/FooterSection.vue'
import { supabase } from '../supabase'
import { useHomepageContent } from '../composables/useHomepageContent'
import { useLocalizedContent } from '../composables/useLocalizedContent'

const { t } = useI18n()
const { content } = useHomepageContent()
const { locale, getLocalizedValue } = useLocalizedContent()

const defaultJournals = [
  {
    title: 'Bulletin of TUIT: Management and Communication Technologies',
    image: 'https://picsum.photos/seed/tuit-journal-1/700/900',
    issueLabel: 'III',
    requirementsTitle: 'JURNAL NIZOMI VA TALABNOMASI',
    applicationText: 'JURNAL TALABNOMASI',
    applicationLink: '#'
  },
  {
    title: 'Muhammad al-Xorazmiy avlodlari',
    image: 'https://picsum.photos/seed/tuit-journal-2/700/900',
    issueLabel: 'III',
    requirementsTitle: 'JURNAL NIZOMI VA TALABNOMASI',
    applicationText: 'JURNAL TALABNOMASI',
    applicationLink: '#'
  },
  {
    title: 'TATU xabarlari',
    image: 'https://picsum.photos/seed/tuit-journal-3/700/900',
    issueLabel: 'III',
    requirementsTitle: 'JURNAL NIZOMI VA TALABNOMASI',
    applicationText: 'JURNAL TALABNOMASI',
    applicationLink: '#'
  }
]

const journals = ref([...defaultJournals])
const articleForm = ref({
  fullName: '',
  email: '',
  phone: '',
  journalTitle: '',
  file: null,
})
const articleFileName = ref(t('journalsPage.fileNotSelected'))

const journalOptions = computed(() => journals.value.map(journal => journal.title).filter(Boolean))

const handleArticleFileChange = (event) => {
  const selectedFile = event.target.files?.[0] || null
  articleForm.value.file = selectedFile
  articleFileName.value = selectedFile ? selectedFile.name : t('journalsPage.fileNotSelected')
}

const submitArticle = () => {
  if (!articleForm.value.fullName || !articleForm.value.email || !articleForm.value.phone || !articleForm.value.journalTitle || !articleForm.value.file) {
    alert(t('journalsPage.requiredError'))
    return
  }

  alert(t('journalsPage.success'))
  articleForm.value = { fullName: '', email: '', phone: '', journalTitle: '', file: null }
  articleFileName.value = t('journalsPage.fileNotSelected')
}

const loadJournals = async () => {
  const localized = await getLocalizedValue(supabase, 'site_journals', defaultJournals)
  journals.value = Array.isArray(localized) && localized.length > 0 ? localized : [...defaultJournals]
  if (journalOptions.value.length > 0) {
    articleForm.value.journalTitle = journalOptions.value[0]
  }
}

onMounted(async () => {
  window.scrollTo(0, 0)
  await loadJournals()
})

watch(locale, async () => {
  await loadJournals()
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
              <span>{{ t('journalsPage.title') }}</span>
            </div>
            <h1 class="text-4xl md:text-6xl lg:text-[72px] font-black text-white leading-tight mb-6">
              {{ t('journalsPage.title') }}
            </h1>
            <p class="text-lg md:text-2xl text-white/90 font-medium max-w-3xl leading-relaxed">
              {{ t('journalsPage.subtitle') }}
            </p>
          </div>
        </div>
      </section>

      <section class="mx-auto w-full max-w-[1200px] px-4 md:px-6 py-12 md:py-20">
        <h2 class="text-3xl md:text-4xl font-extrabold text-[#1a2744] mb-8 text-center">{{ t('journalsPage.title') }}</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="(journal, index) in journals"
            :key="index"
            class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
          >
            <div class="p-5">
              <div class="w-full h-[360px] bg-gray-100 rounded-lg overflow-hidden mb-5">
                <img
                  v-if="journal.image"
                  :src="journal.image"
                  :alt="journal.title"
                  class="w-full h-full object-cover"
                  @error="$event.target.src='https://placehold.co/800x1000/e5e7eb/475569?text=Topilmadi'"
                />
              </div>

              <h3 v-if="journal.issueLabel" class="text-[#10213d] text-[32px] font-bold leading-none tracking-tight mb-3">{{ journal.issueLabel }}</h3>
              <p class="text-[22px] leading-tight font-black tracking-tight text-[#10213d] mb-6 uppercase min-h-[56px]">
                {{ journal.requirementsTitle || t('journalsPage.requirementsTitle') }}
              </p>

              <p class="text-[#1a2744] font-medium text-[18px] leading-snug min-h-[56px] mb-6">
                {{ journal.title }}
              </p>
            </div>

            <div class="grid grid-cols-[1fr_52px] border-t border-gray-200">
              <a
                :href="journal.applicationLink || '#'"
                target="_blank"
                rel="noopener noreferrer"
                class="px-5 py-4 text-[15px] tracking-wide uppercase text-[#223a5f] font-medium hover:bg-gray-50 transition-colors"
              >
                {{ journal.applicationText || t('journalsPage.applicationText') }}
              </a>
              <a
                :href="journal.applicationLink || '#'"
                target="_blank"
                rel="noopener noreferrer"
                class="border-l border-gray-200 flex items-center justify-center text-[#223a5f] hover:bg-gray-50 transition-colors text-2xl"
                :aria-label="t('journalsPage.openJournal')"
              >
                →
              </a>
            </div>
          </article>
        </div>

        <div v-if="journals.length === 0" class="text-center py-10 text-gray-500 bg-white border border-gray-200 rounded-xl mt-6">
          {{ t('journalsPage.empty') }}
        </div>
      </section>

      <section class="mx-auto w-full max-w-[1200px] px-4 md:px-6 pb-16 md:pb-24">
        <div class="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-6">
          <div class="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
            <h3 class="text-4xl md:text-5xl font-black text-[#0f172a] mb-8">{{ t('journalsPage.articleTitle') }}</h3>

            <form @submit.prevent="submitArticle" class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-[#334155] mb-2">{{ t('journalsPage.fullName') }}</label>
                  <input v-model="articleForm.fullName" type="text" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e]/20" />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-[#334155] mb-2">{{ t('journalsPage.email') }}</label>
                  <input v-model="articleForm.email" type="email" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e]/20" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-[#334155] mb-2">{{ t('journalsPage.phone') }}</label>
                <input v-model="articleForm.phone" type="text" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e]/20" />
              </div>

              <div>
                <label class="block text-sm font-semibold text-[#334155] mb-2">{{ t('journalsPage.journalType') }}</label>
                <select v-model="articleForm.journalTitle" class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e]/20">
                  <option v-for="(journalTitle, optionIndex) in journalOptions" :key="optionIndex" :value="journalTitle">{{ journalTitle }}</option>
                  <option v-if="journalOptions.length === 0" value="">{{ t('journalsPage.noJournal') }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-semibold text-[#334155] mb-2">{{ t('journalsPage.articleUpload') }}</label>
                <label class="inline-flex items-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <span class="text-sm font-medium text-[#0f172a]">{{ t('journalsPage.chooseFile') }}</span>
                  <input type="file" class="hidden" @change="handleArticleFileChange" accept=".pdf,.doc,.docx" />
                  <span class="text-sm text-[#475569]">{{ articleFileName }}</span>
                </label>
              </div>

              <button type="submit" class="bg-[#0f766e] hover:bg-[#0d5f59] text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                {{ t('journalsPage.send') }}
              </button>
            </form>
          </div>

          <aside class="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
            <h3 class="text-4xl md:text-5xl font-black text-[#0f172a] mb-4">{{ t('journalsPage.contactTitle') }}</h3>
            <p class="text-[#334155] mb-8 text-lg">{{ t('journalsPage.contactSubtitle') }}</p>

            <div class="space-y-6 text-[#0f172a]">
              <div>
                <p class="text-sm text-[#64748b] mb-2">{{ t('journalsPage.contactHours') }}</p>
                <p class="font-semibold">71 238 65 15</p>
                <p class="font-semibold">91 123 67 89</p>
              </div>

              <div>
                <p class="text-sm text-[#64748b] mb-2">{{ t('journalsPage.emailLabel') }}</p>
                <p class="font-semibold">info@tuit.uz</p>
                <p class="font-semibold">info@yourwebsite.com</p>
              </div>

              <div>
                <p class="text-sm text-[#64748b] mb-2">{{ t('journalsPage.addressLabel') }}</p>
                <p class="font-semibold">Toshkent 100084, Amir Temur shox ko'chasi 108 uy</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>

    <FooterSection :footer="content.footer" />
  </div>
</template>
