'use client'

import { useEffect } from 'react'

import '@/lib/i18n/init'
import i18n from '@/lib/i18n/init'
import { useLanguageStore } from '@/lib/i18n/store'

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const language = useLanguageStore(state => state.language)

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language)
    }
  }, [language])

  return <>{children}</>
}
