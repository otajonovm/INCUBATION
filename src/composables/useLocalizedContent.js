import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLocalizedContent = () => {
  const { locale } = useI18n()

  const localizedKey = (baseKey, lang = locale.value) => `${baseKey}_${lang}`

  const getLocalizedValue = async (supabase, baseKey, fallbackValue) => {
    const lang = locale.value

    const localizedResponse = await supabase
      .from('site_content')
      .select('value')
      .eq('key', localizedKey(baseKey, lang))
      .maybeSingle()

    if (!localizedResponse.error && localizedResponse.data?.value) {
      return localizedResponse.data.value
    }

    const fallbackLangResponse = await supabase
      .from('site_content')
      .select('value')
      .eq('key', localizedKey(baseKey, 'uz'))
      .maybeSingle()

    if (!fallbackLangResponse.error && fallbackLangResponse.data?.value) {
      return fallbackLangResponse.data.value
    }

    const legacyResponse = await supabase
      .from('site_content')
      .select('value')
      .eq('key', baseKey)
      .maybeSingle()

    if (!legacyResponse.error && legacyResponse.data?.value) {
      return legacyResponse.data.value
    }

    return fallbackValue
  }

  return {
    locale: computed(() => locale.value),
    localizedKey,
    getLocalizedValue,
  }
}
