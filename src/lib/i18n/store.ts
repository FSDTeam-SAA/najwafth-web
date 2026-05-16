'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { AppLanguage } from './resources'

type LanguageState = {
  language: AppLanguage
  setLanguage: (language: AppLanguage) => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    set => ({
      language: 'en-GB',
      setLanguage: language => set({ language }),
    }),
    {
      name: 'app-language',
    },
  ),
)
