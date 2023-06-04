import AsyncStorage from '@react-native-async-storage/async-storage'
import { EnabledLanguage, isSupportedLanguage } from '../domain/types'

export const getLang = () => {
  const T = AsyncStorage.getItem('i18nextLng').then((value) => {
    return value
  })

  const lang = JSON.stringify(T)
  // check if restored lang exists and is a supported language
  if (isSupportedLanguage(lang)) {
    return lang as EnabledLanguage
  } else {
    return null
  }
}

export const setLang = (lang: EnabledLanguage) => {
  localStorage.setItem('i18nextLng', lang)
}

export const detectUserLanguage = (): EnabledLanguage => {
  return getLang() && isSupportedLanguage(getLang())
    ? (getLang() as EnabledLanguage)
    : navigator.language === 'ka_GE'
    ? ('ge' as EnabledLanguage)
    : ('en' as EnabledLanguage)
}
