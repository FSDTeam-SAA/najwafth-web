'use client'

import Link from 'next/link'
import { AlertTriangle, BookOpen, ChevronLeft, Shapes } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { getAllCategories, getBooks } from '@/lib/home-api'
import { BookProductCard } from '@/presentation/home/BookProductCard'
import { StateMessageCard } from '@/presentation/home/StateMessageCard'

const LIMIT = 16

export function CategoryBooksPage() {
  const params = useParams<{ id: string }>()
  const categoryId = params.id
  const [page, setPage] = useState(1)

  const categoriesQuery = useQuery({
    queryKey: ['all-categories'],
    queryFn: getAllCategories,
  })

  const category = useMemo(
    () =>
      categoriesQuery.data?.items.find(item => item.id === categoryId) ?? null,
    [categoriesQuery.data?.items, categoryId],
  )

  const booksQuery = useQuery({
    queryKey: ['category-books', categoryId, page],
    queryFn: () =>
      getBooks({
        kind: 'featured',
        page,
        limit: LIMIT,
        category: categoryId,
      }),
    enabled: Boolean(category),
  })

  useEffect(() => {
    setPage(1)
  }, [categoryId])

  useEffect(() => {
    if (categoriesQuery.error) toast.error('Unable to load category.')
  }, [categoriesQuery.error])

  useEffect(() => {
    if (booksQuery.error) toast.error('Unable to load books.')
  }, [booksQuery.error])

  return (
    <section className="bg-[#FAFAFA]">
      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-10 lg:py-18">
        <Link
          href="/categories"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#287dc2] transition hover:text-[#1e6094]"
        >
          <ChevronLeft className="h-4 w-4" />
          All categories
        </Link>

        {categoriesQuery.isLoading ? (
          <div className="mt-10">
            <div className="mx-auto h-12 w-72 animate-pulse rounded bg-[#e8eef4]" />
            <BooksSkeleton />
          </div>
        ) : null}

        {!categoriesQuery.isLoading && categoriesQuery.error ? (
          <div className="mt-10">
            <StateMessageCard
              tone="error"
              icon={AlertTriangle}
              title="Unable to load category"
              description="Please return to the categories page and try again."
            />
          </div>
        ) : null}

        {!categoriesQuery.isLoading && !categoriesQuery.error && !category ? (
          <div className="mt-10">
            <StateMessageCard
              icon={Shapes}
              title="Category not found"
              description="This category is unavailable or may have been removed."
            />
          </div>
        ) : null}

        {category ? (
          <>
            <div className="mx-auto mt-10 max-w-[720px] text-center">
              {category.parentName ? (
                <p className="text-sm font-medium text-[#5e92c0]">
                  {category.parentName}
                </p>
              ) : null}
              <h1 className="font-display text-4xl leading-[1.2] text-[#111111] sm:text-6xl">
                {category.title} Books
              </h1>
              <p className="mx-auto mt-4 max-w-[558px] text-[18px] leading-[1.45] text-[#4b5563] sm:text-[20px]">
                Browse all books available in this category.
              </p>
            </div>

            {booksQuery.isLoading ? <BooksSkeleton /> : null}

            {!booksQuery.isLoading && booksQuery.error ? (
              <div className="mt-12">
                <StateMessageCard
                  tone="error"
                  icon={AlertTriangle}
                  title="Unable to load books"
                  description={booksQuery.error.message}
                />
              </div>
            ) : null}

            {!booksQuery.isLoading &&
            !booksQuery.error &&
            (booksQuery.data?.items.length || 0) === 0 ? (
              <div className="mt-12">
                <StateMessageCard
                  icon={BookOpen}
                  title="No books found"
                  description={`There are no books in ${category.title} at the moment.`}
                />
              </div>
            ) : null}

            {!booksQuery.isLoading &&
            !booksQuery.error &&
            (booksQuery.data?.items.length || 0) > 0 ? (
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
                      onClick={() => setPage(current => Math.max(current - 1, 1))}
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
                        setPage(current =>
                          Math.min(
                            current + 1,
                            booksQuery.data?.meta.totalPage || 1,
                          ),
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
          </>
        ) : null}
      </div>
    </section>
  )
}

function BooksSkeleton() {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: LIMIT }).map((_, index) => (
        <div
          key={`category-books-skeleton-${index}`}
          className="overflow-hidden rounded-[12px] border border-[#dce3ea] bg-white"
        >
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
  )
}
