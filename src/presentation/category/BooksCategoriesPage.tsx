'use client'

import Image from 'next/image'
import { AlertTriangle, ChevronDown, Shapes } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'

import { getBooks, getTopCategories } from '@/lib/home-api'
import { BookProductCard } from '@/presentation/home/BookProductCard'
import { StateMessageCard } from '@/presentation/home/StateMessageCard'

const LIMIT = 8
const EMPTY_CATEGORIES: {
  id: string
  title: string
  image: string
  imagePosition: string
}[] = []

export function BooksCategoriesPage() {
  const searchParams = useSearchParams()
  const initialCategoryFromQuery = searchParams.get('category')
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    initialCategoryFromQuery ? [initialCategoryFromQuery] : [],
  )
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [page, setPage] = useState(1)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const categoriesQuery = useQuery({
    queryKey: ['categories-options'],
    queryFn: getTopCategories,
  })

  const categoryParam = selectedCategoryIds.join(',')

  const booksQuery = useQuery({
    queryKey: ['categories-books', categoryParam, page],
    queryFn: () =>
      getBooks({
        kind: 'featured',
        page,
        limit: LIMIT,
        category: categoryParam || undefined,
      }),
  })

  useEffect(() => {
    if (categoriesQuery.error) {
      toast.error('Unable to load category options.')
    }
  }, [categoriesQuery.error])

  useEffect(() => {
    if (booksQuery.error) {
      toast.error('Unable to load books for categories.')
    }
  }, [booksQuery.error])

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const categories = categoriesQuery.data?.items ?? EMPTY_CATEGORIES

  const selectedLabel = useMemo(() => {
    if (selectedCategoryIds.length === 0) return 'All categories'
    if (selectedCategoryIds.length === 1) {
      return (
        categories.find(item => item.id === selectedCategoryIds[0])?.title ||
        '1 selected'
      )
    }
    return `${selectedCategoryIds.length} categories selected`
  }, [categories, selectedCategoryIds])

  function toggleCategory(categoryId: string) {
    setPage(1)
    setSelectedCategoryIds(current =>
      current.includes(categoryId)
        ? current.filter(item => item !== categoryId)
        : [...current, categoryId],
    )
  }

  return (
    <section className="bg-[#FAFAFA]">
      <div className="border-b border-[#d9e7f2] bg-[#edf5fb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between py-4">
            <div className="text-sm font-medium text-[#334155]">
              Filter: {selectedLabel}
            </div>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(current => !current)}
                className="inline-flex items-center gap-2 text-[16px] font-medium text-[#111827]"
                aria-expanded={isDropdownOpen}
                aria-controls="categories-dropdown"
              >
                <span>Select Categories</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isDropdownOpen && (
                <div
                  id="categories-dropdown"
                  className="absolute right-0 top-full z-10 mt-2 w-56 overflow-hidden rounded border border-[#d6dbe3] bg-white shadow-md"
                >
                  <div className="bg-[linear-gradient(90deg,#5F83A2_0%,#5E92C0_100%)] px-3 py-3 text-[15px] font-semibold text-white">
                    Select Categories
                  </div>

                  <div className="max-h-72 overflow-auto divide-y divide-[#e7edf2]">
                    {categories.map(category => {
                      const checked = selectedCategoryIds.includes(category.id)

                      return (
                        <label
                          key={category.id}
                          className="flex cursor-pointer items-center justify-between px-3 py-3 text-[15px] text-[#111827] hover:bg-[#f5f5f5]"
                        >
                          <span>{category.title}</span>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleCategory(category.id)}
                            className="h-3.5 w-3.5 rounded-[2px] border border-[#459AE4] text-[#459AE4] focus:ring-[#459AE4]"
                          />
                        </label>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {categoriesQuery.error ? (
            <div className="pb-4">
              <StateMessageCard
                tone="error"
                icon={AlertTriangle}
                title="Unable to load categories"
                description="Category options are temporarily unavailable. You can still browse available books below."
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-10 lg:py-18">
        <div className="relative overflow-hidden">
          <Image
            src="/images/leaf-icon.png"
            alt=""
            width={120}
            height={120}
            aria-hidden="true"
            className="pointer-events-none absolute right-[25%] top-7 h-auto w-[96px] opacity-45"
          />
          <Image
            src="/images/leaf-icon.png"
            alt=""
            width={180}
            height={180}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 left-[-3.5rem] h-auto w-[150px] opacity-40"
          />

          <div className="mx-auto max-w-[720px] text-center">
            <h1 className="font-display text-4xl leading-[1.2] text-[#111111] sm:text-6xl">
              Books Categories
            </h1>
            <p className="mx-auto mt-4 max-w-[558px] text-[24px] leading-[1.45] text-[#111111]">
              Discover unique collections from our top categories
            </p>
          </div>

          {booksQuery.isLoading ? (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: LIMIT }).map((_, index) => (
                <div key={`category-books-skeleton-${index}`} className="overflow-hidden rounded-[12px] border border-[#dce3ea] bg-white">
                  <div className="px-3 pt-3">
                    <div className="h-[192px] animate-pulse rounded-[10px] bg-[#e8eef4]" />
                  </div>
                  <div className="space-y-3 px-4 pb-4 pt-3">
                    <div className="h-5 w-2/3 animate-pulse rounded bg-[#e8eef4]" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-[#e8eef4]" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-[#e8eef4]" />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {!booksQuery.isLoading && booksQuery.error ? (
            <div className="mt-12">
              <StateMessageCard
                tone="error"
                icon={AlertTriangle}
                title="Unable to load category books"
                description={booksQuery.error.message}
              />
            </div>
          ) : null}

          {!booksQuery.isLoading && !booksQuery.error && (booksQuery.data?.items.length || 0) === 0 ? (
            <div className="mt-12">
              <StateMessageCard
                icon={Shapes}
                title="No books found"
                description="There are no books in the selected categories at the moment."
              />
            </div>
          ) : null}

          {!booksQuery.isLoading && !booksQuery.error && (booksQuery.data?.items.length || 0) > 0 ? (
            <>
              <div className="mt-12 mx-auto max-w-7xl">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {booksQuery.data?.items.map(product => (
                    <BookProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>

              {(booksQuery.data?.meta.totalPage || 1) > 1 ? (
                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="rounded-lg border border-[#d3deea] bg-white px-3 py-2 text-sm text-[#1f2937] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="rounded-lg bg-[#eef4fa] px-3 py-2 text-sm font-medium text-[#1f2937]">
                    Page {page} of {booksQuery.data?.meta.totalPage || 1}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setPage(prev =>
                        Math.min(prev + 1, booksQuery.data?.meta.totalPage || 1),
                      )
                    }
                    disabled={page === (booksQuery.data?.meta.totalPage || 1)}
                    className="rounded-lg border border-[#d3deea] bg-white px-3 py-2 text-sm text-[#1f2937] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </section>
  )
}
