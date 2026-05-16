import Image from 'next/image'
import Link from 'next/link'
import { AlertTriangle, BookX, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { BookProductCard } from './BookProductCard'
import { StateMessageCard } from './StateMessageCard'
import type { ProductItem } from './homeData'

type ProductListingSectionProps = {
  title: string
  description: string
  products: ProductItem[]
  isLoading?: boolean
  error?: string
  viewAllHref?: string
  topLeafClassName?: string
  bottomLeafClassName?: string
  pagination?: {
    page: number
    totalPage: number
    onPageChange: (page: number) => void
  }
}

export function ProductListingSection({
  title,
  description,
  products,
  isLoading,
  error,
  viewAllHref,
  topLeafClassName,
  bottomLeafClassName,
  pagination,
}: ProductListingSectionProps) {
  const { t } = useTranslation()
  const canGoPrev = Boolean(pagination && pagination.page > 1)
  const canGoNext = Boolean(pagination && pagination.page < pagination.totalPage)

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      {topLeafClassName ? (
        <Image
          src="/images/leaf-icon.png"
          alt=""
          width={230}
          height={230}
          aria-hidden="true"
          className={topLeafClassName}
        />
      ) : null}
      {bottomLeafClassName ? (
        <Image
          src="/images/leaf-icon.png"
          alt=""
          width={280}
          height={280}
          aria-hidden="true"
          className={bottomLeafClassName}
        />
      ) : null}

      <div className="container mx-auto w-full px-4 sm:px-6 lg:px-10">
        <div className="mx-auto text-center">
          <h2 className="font-display text-4xl leading-[1.2] text-[#111111] sm:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-[558px] text-[24px] leading-[1.45] text-[#111111]">
            {description}
          </p>
        </div>

        {viewAllHref ? (
          <div className="mt-10 flex justify-end">
            <Link
              href={viewAllHref}
              className="text-[18px] font-medium text-[#459AE4] no-underline decoration-2 underline-offset-4 transition hover:!underline"
            >
              {t('home.viewAll')}
            </Link>
          </div>
        ) : null}

        {isLoading ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={`${title}-skeleton-${index}`}
                className="overflow-hidden rounded-[12px] border border-[#dce3ea] bg-white"
              >
                <div className="px-3 pt-3">
                  <div className="h-[192px] animate-pulse rounded-[10px] bg-[#e8eef4]" />
                </div>
                <div className="space-y-3 px-4 pb-4 pt-3">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-[#e8eef4]" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-[#e8eef4]" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-[#e8eef4]" />
                  <div className="mt-4 flex items-center justify-between">
                    <div className="h-8 w-20 animate-pulse rounded bg-[#e8eef4]" />
                    <div className="h-9 w-9 animate-pulse rounded-full bg-[#e8eef4]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {!isLoading && error ? (
          <div className="mt-6">
            <StateMessageCard
              tone="error"
              icon={AlertTriangle}
              title={t('home.somethingWrong')}
              description={error}
            />
          </div>
        ) : null}

        {!isLoading && !error && products.length === 0 ? (
          <div className="mt-6">
            <StateMessageCard
              icon={BookX}
              title={t('home.noBooksFound')}
              description={t('home.noBooksDesc')}
            />
          </div>
        ) : null}

        {!isLoading && !error && products.length > 0 ? (
          <>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {products.map(product => (
                <BookProductCard
                  key={`${title}-${product.id}`}
                  product={product}
                />
              ))}
            </div>

            {pagination && pagination.totalPage > 1 ? (
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => pagination.onPageChange(pagination.page - 1)}
                  disabled={!canGoPrev}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#d3deea] bg-white px-3 py-2 text-sm text-[#1f2937] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  {t('home.previous')}
                </button>

                <span className="rounded-lg bg-[#eef4fa] px-3 py-2 text-sm font-medium text-[#1f2937]">
                  {t('home.pageOf', {
                    page: pagination.page,
                    total: pagination.totalPage,
                  })}
                </span>

                <button
                  type="button"
                  onClick={() => pagination.onPageChange(pagination.page + 1)}
                  disabled={!canGoNext}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#d3deea] bg-white px-3 py-2 text-sm text-[#1f2937] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t('home.next')}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  )
}
