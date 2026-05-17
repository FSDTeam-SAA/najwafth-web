'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { resources } from './resources'
import type { AppLanguage } from './resources'

const fallbackLanguage: AppLanguage = 'en-GB'
const availableLanguages = Object.keys(resources) as AppLanguage[]

const getInitialLanguage = (): AppLanguage => {
  if (typeof window === 'undefined') return fallbackLanguage

  try {
    const storedLanguage = JSON.parse(
      window.localStorage.getItem('app-language') || '{}',
    )?.state?.language

    return availableLanguages.includes(storedLanguage)
      ? storedLanguage
      : fallbackLanguage
  } catch {
    return fallbackLanguage
  }
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: fallbackLanguage,
    interpolation: {
      escapeValue: false,
    },
  })
}

export default i18n
