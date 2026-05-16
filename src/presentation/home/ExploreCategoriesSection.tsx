import Image from 'next/image'
import Link from 'next/link'
import { AlertTriangle, Shapes } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { HomeCategoryItem } from '@/types/home/types'

import { StateMessageCard } from './StateMessageCard'

type Category = HomeCategoryItem

export function ExploreCategoriesSection({
  categories,
  isLoading,
  error,
}: {
  categories: Category[]
  isLoading: boolean
  error?: string
}) {
  const { t } = useTranslation()
  const effectiveCategories = categories
  const [romance, fiction, classic, fantasy, adventure, mystery] =
    effectiveCategories

  return (
    <section className="relative overflow-hidden pb-18 pt-8 sm:pb-24">
      <Image
        src="/images/leaf-icon.png"
        alt=""
        width={230}
        height={230}
        aria-hidden="true"
        className="pointer-events-none absolute left-[4%] top-0 h-auto w-[210px] opacity-45"
      />

      <div className="container mx-auto w-full px-4 sm:px-6 lg:px-10">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`category-skeleton-${index}`}
                className="rounded-[18px] border border-[#dce3ea] bg-[#EEF3F6] p-3"
              >
                <div className="h-[190px] animate-pulse rounded-[12px] bg-[#e1e8ef]" />
                <div className="mx-auto mt-4 h-8 w-2/3 animate-pulse rounded bg-[#e1e8ef]" />
              </div>
            ))}
          </div>
        ) : null}

        {!isLoading && error ? (
          <div>
            <StateMessageCard
              tone="error"
              icon={AlertTriangle}
              title={t("home.categoriesLoadError")}
              description={error}
            />
          </div>
        ) : null}

        {!isLoading && !error && effectiveCategories.length === 0 ? (
          <div>
            <StateMessageCard
              icon={Shapes}
              title={t("home.noCategories")}
              description={t("home.noCategoriesDesc")}
            />
          </div>
        ) : null}

        {!isLoading && !error && effectiveCategories.length > 0 ? (
          <>
            <div className="grid gap-8 lg:grid-cols-[1fr_1.42fr_1fr] lg:items-stretch">
              <CategoryTile
                category={romance}
                href={
                  romance ? `/categories?category=${romance.id}` : undefined
                }
                className="lg:mt-3"
              />
              <Card className="flex min-h-[286px] flex-col items-center justify-center rounded-[18px] border border-[#dce3ea] bg-[#EEF3F6] px-8 text-center shadow-[0_1px_2px_-1px_rgba(0,0,0,0.10),0_1px_3px_0_rgba(0,0,0,0.10)]">
                <h2 className="font-display max-w-[20ch] text-4xl leading-[1.25] text-[#264d73] sm:text-[48px]">
                  {t("home.exploreTopCategories")}
                </h2>
                <Link href="/categories" className="mt-10">
                  <Button className="h-[58px] cursor-pointer min-w-[224px] rounded-xl bg-[linear-gradient(90deg,#5F83A2_0%,#5E92C0_100%)] text-[18px] font-semibold shadow-none hover:opacity-95">
                    {t("home.exploreAll")}
                  </Button>
                </Link>
              </Card>
              <CategoryTile
                category={fiction}
                href={
                  fiction ? `/categories?category=${fiction.id}` : undefined
                }
                className="lg:mt-3"
              />
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
              <CategoryTile
                category={classic}
                href={
                  classic ? `/categories?category=${classic.id}` : undefined
                }
                compact
              />
              <CategoryTile
                category={fantasy}
                href={
                  fantasy ? `/categories?category=${fantasy.id}` : undefined
                }
                compact
              />
              <CategoryTile
                category={adventure}
                href={
                  adventure ? `/categories?category=${adventure.id}` : undefined
                }
                compact
              />
              <CategoryTile
                category={mystery}
                href={
                  mystery ? `/categories?category=${mystery.id}` : undefined
                }
                compact
              />
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}

function CategoryTile({
  category,
  href,
  compact = false,
  className = '',
}: {
  category?: Category
  href?: string
  compact?: boolean
  className?: string
}) {
  if (!category) return null

  const tile = (
    <Card
      className={`rounded-[18px] border border-[#dce3ea] bg-[#EEF3F6] p-3 shadow-[0_1px_2px_-1px_rgba(0,0,0,0.10),0_1px_3px_0_rgba(0,0,0,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.10)] ${className}`}
    >
      <div
        className={`relative overflow-hidden rounded-[12px] ${compact ? 'h-[172px]' : 'h-[220px]'}`}
      >
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className={`object-cover ${category.imagePosition}`}
        />
      </div>
      <div className="py-3 text-center">
        <h3 className="font-display text-[32px] leading-none text-[#374151]">
          {category.title}
        </h3>
      </div>
    </Card>
  )

  if (!href) return tile
  return <Link href={href}>{tile}</Link>
}
