'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AlertTriangle, Shapes } from 'lucide-react'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { getAllCategories } from '@/lib/home-api'
import { StateMessageCard } from '@/presentation/home/StateMessageCard'
import type { HomeCategoryItem } from '@/types/home/types'

const EMPTY_CATEGORIES: HomeCategoryItem[] = []

export function BooksCategoriesPage() {
  const categoriesQuery = useQuery({
    queryKey: ['all-categories'],
    queryFn: getAllCategories,
  })

  useEffect(() => {
    if (categoriesQuery.error) toast.error('Unable to load categories.')
  }, [categoriesQuery.error])

  const categories = categoriesQuery.data?.items ?? EMPTY_CATEGORIES

  return (
    <section className="bg-[#FAFAFA]">
      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-10 lg:py-18">
        <div className="relative overflow-hidden">
          <Image
            src="/images/leaf-icon.png"
            alt=""
            width={120}
            height={120}
            aria-hidden="true"
            className="pointer-events-none absolute right-[12%] top-7 h-auto w-[96px] opacity-45"
          />
          <Image
            src="/images/leaf-icon.png"
            alt=""
            width={180}
            height={180}
            aria-hidden="true"
            className="pointer-events-none absolute left-[-3.5rem] top-[18rem] h-auto w-[150px] opacity-40"
          />

          <div className="mx-auto max-w-[720px] text-center">
            <h1 className="font-display text-4xl leading-[1.2] text-[#111111] sm:text-6xl">
              Books Categories
            </h1>
            <p className="mx-auto mt-4 max-w-[558px] text-[20px] leading-[1.45] text-[#111111] sm:text-[24px]">
              Explore every category and find the books you love.
            </p>
          </div>

          <div className="mt-12">
            {categoriesQuery.isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={`category-skeleton-${index}`}
                    className="h-[105px] animate-pulse rounded-[14px] border border-[#dce3ea] bg-[#e8eef4]"
                  />
                ))}
              </div>
            ) : null}

            {!categoriesQuery.isLoading && categoriesQuery.error ? (
              <StateMessageCard
                tone="error"
                icon={AlertTriangle}
                title="Unable to load categories"
                description="Categories are temporarily unavailable. Please try again shortly."
              />
            ) : null}

            {!categoriesQuery.isLoading &&
            !categoriesQuery.error &&
            categories.length === 0 ? (
              <StateMessageCard
                icon={Shapes}
                title="No categories found"
                description="Please check back when categories have been added."
              />
            ) : null}

            {!categoriesQuery.isLoading &&
            !categoriesQuery.error &&
            categories.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categories.map(category => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryCard({ category }: { category: HomeCategoryItem }) {
  return (
    <Link
      href={`/categories/${category.id}`}
      className="group flex min-h-[105px] w-full items-center gap-4 rounded-[14px] border border-[#dce3ea] bg-white p-3 text-left shadow-[0_2px_8px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-[#459AE4] hover:shadow-[0_8px_20px_rgba(15,23,42,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#459AE4]"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[10px] bg-[#f4f1eb]">
        <Image
          src={category.image}
          alt=""
          fill
          sizes="80px"
          className={`object-cover ${category.imagePosition}`}
        />
      </div>
      <div className="min-w-0">
        {category.parentName ? (
          <p className="truncate text-xs font-medium text-[#5e92c0]">
            {category.parentName}
          </p>
        ) : null}
        <h2 className="line-clamp-2 font-display text-[22px] leading-tight text-[#202020]">
          {category.title}
        </h2>
        <p className="mt-1 text-sm text-[#6b7280]">View books</p>
      </div>
    </Link>
  )
}
