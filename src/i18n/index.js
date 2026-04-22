import { createI18n } from 'vue-i18n'
import uz from './locales/uz.json'
import ru from './locales/ru.json'
import en from './locales/en.json'

export const SUPPORTED_LOCALES = ['uz', 'ru', 'en']
export const DEFAULT_LOCALE = 'uz'
const STORAGE_KEY = 'site_locale'

const detectLocale = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && SUPPORTED_LOCALES.includes(saved)) return saved

  const browser = navigator.language?.toLowerCase() || ''
  if (browser.startsWith('ru')) return 'ru'
  if (browser.startsWith('en')) return 'en'
  return DEFAULT_LOCALE
}

const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'en',
  globalInjection: true,
  messages: { uz, ru, en },
})

export const setLocale = (locale) => {
  if (!SUPPORTED_LOCALES.includes(locale)) return
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.lang = locale
}

document.documentElement.lang = i18n.global.locale.value

export default i18n
