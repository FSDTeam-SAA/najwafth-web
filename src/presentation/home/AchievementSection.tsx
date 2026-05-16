'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useHomeAchievementsQuery } from './useHomeQueries'

export function AchievementSection() {
  const achievementsQuery = useHomeAchievementsQuery()
  const { t } = useTranslation()

  const achievements = useMemo(() => {
    const data = achievementsQuery.data

    return [
      { value: `${Number(data?.totalBooks || 0)}+`, label: t('home.sellsBooks') },
      { value: `${Number(data?.totalUsers || 0)}+`, label: t('home.customers') },
      { value: `${Number(data?.totalReviews || 0)}+`, label: t('home.reviews') },
    ]
  }, [achievementsQuery.data, t])

  return (
    <section className="bg-[#edf5fb] py-14 sm:py-16">
      <div className="container mx-auto grid w-full gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_repeat(3,0.8fr)] lg:px-10">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="relative h-[122px] w-[193px] overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="Books and shack logo"
              fill
              className="scale-[1.55] object-contain object-center"
            />
          </div>
          <h2 className="mt-3 text-[28px] leading-tight text-[#111111] sm:text-[44px]">
            {t('home.achievementTitle')}
          </h2>
        </div>

        {achievements.map(item => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left"
          >
            <span className="text-[40px] font-semibold leading-none text-[#459AE4] sm:text-[52px]">
              {item.value}
            </span>
            <span className="mt-2 text-[24px] leading-tight text-[#1f2937]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
