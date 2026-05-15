import { fetchJson } from '@/lib/fetcher'
import type {
  HomeBooksApiResponse,
  HomeCategoriesApiResponse,
} from '@/types/home/types'

type BooksParams = {
  kind: 'featured' | 'popular'
  page?: number
  limit?: number
  category?: string
}

export function getBooks({ kind, page = 1, limit = 8, category }: BooksParams) {
  const query = new URLSearchParams({
    kind,
    page: String(page),
    limit: String(limit),
  })

  if (category) {
    query.set('category', category)
  }

  return fetchJson<HomeBooksApiResponse>(`/api/home/books?${query.toString()}`)
}

export function getFeaturedBooks() {
  return getBooks({ kind: 'featured', page: 1, limit: 8 })
}

export function getPopularBooks() {
  return getBooks({ kind: 'popular', page: 1, limit: 8 })
}

export function getTopCategories() {
  return fetchJson<HomeCategoriesApiResponse>('/api/home/categories')
}
