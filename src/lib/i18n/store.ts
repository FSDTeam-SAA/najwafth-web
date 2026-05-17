'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { resources } from './resources'
import type { AppLanguage } from './resources'

type LanguageState = {
  language: AppLanguage
  setLanguage: (language: AppLanguage) => void
}

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

export const useLanguageStore = create<LanguageState>()(
  persist(
    set => ({
      language: getInitialLanguage(),
      setLanguage: language => set({ language }),
    }),
    {
      name: 'app-language',
    },
  ),
)
