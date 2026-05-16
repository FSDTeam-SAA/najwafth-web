'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { getBooks } from '@/lib/home-api'
import { ProductListingSection } from '@/presentation/home/ProductListingSection'

const LIMIT = 8

export default function AllBooksPage() {
  const [page, setPage] = useState(1)

  const query = useQuery({
    queryKey: ['all-books-page', page],
    queryFn: () => getBooks({ kind: 'popular', page, limit: LIMIT }),
  })

  useEffect(() => {
    if (query.error) {
      toast.error('Unable to load books.')
    }
  }, [query.error])

  return (
    <div className="bg-[#FAFAFA]">
      <ProductListingSection
        title="All Books"
        description="Explore our full catalog of books from independent bookstores."
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
