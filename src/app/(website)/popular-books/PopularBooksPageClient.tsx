'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { getBooks } from '@/lib/home-api'
import { ProductListingSection } from '@/presentation/home/ProductListingSection'

const LIMIT = 8

export default function PopularBooksPageClient({
  search,
}: {
  search: string
}) {
  const [page, setPage] = useState(1)

  const query = useQuery({
    queryKey: ['popular-books-page', page, search],
    queryFn: () => getBooks({ kind: 'popular', page, limit: LIMIT, search }),
  })

  useEffect(() => {
    if (query.error) {
      toast.error('Unable to load popular books.')
    }
  }, [query.error])

  return (
    <div className="bg-[#FAFAFA]">
      <ProductListingSection
        title={search ? 'Search Results' : 'Popular Books'}
        description={
          search
            ? `Showing books that match "${search}".`
            : 'Bestsellers and trending reads across all our stores.'
        }
        products={query.data?.items || []}
        isLoading={query.isLoading}
        error={query.error?.message}
        pagination={{
          page,
          totalPage: query.data?.meta?.totalPage || 1,
          onPageChange: setPage,
        }}
        bottomLeafClassName="pointer-events-none absolute bottom-6 left-[-2.5rem] h-auto w-[240px] opacity-45"
      />
    </div>
  )
}
