'use client'

import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useEffect } from 'react'

import { getFeaturedBooks, getPopularBooks, getTopCategories } from '@/lib/home-api'

export function useFeaturedBooksQuery() {
  const query = useQuery({
    queryKey: ['home', 'featured-books'],
    queryFn: getFeaturedBooks,
  })

  useEffect(() => {
    if (query.error) {
      toast.error('Unable to load featured books.')
    }
  }, [query.error])

  return query
}

export function usePopularBooksQuery() {
  const query = useQuery({
    queryKey: ['home', 'popular-books'],
    queryFn: getPopularBooks,
  })

  useEffect(() => {
    if (query.error) {
      toast.error('Unable to load popular books.')
    }
  }, [query.error])

  return query
}

export function useTopCategoriesQuery() {
  const query = useQuery({
    queryKey: ['home', 'top-categories'],
    queryFn: getTopCategories,
  })

  useEffect(() => {
    if (query.error) {
      toast.error('Unable to load categories.')
    }
  }, [query.error])

  return query
}
