import { fetchJson } from '@/lib/fetcher'
import type {
  HomeAchievementsApiResponse,
  HomeBooksApiResponse,
  HomeCategoriesApiResponse,
  HomeReviewsApiResponse,
} from '@/types/home/types'

type BooksParams = {
  kind: 'featured' | 'popular'
  page?: number
  limit?: number
  category?: string
  search?: string
}

export function getBooks({
  kind,
  page = 1,
  limit = 8,
  category,
  search,
}: BooksParams) {
  const query = new URLSearchParams({
    kind,
    page: String(page),
    limit: String(limit),
  })

  if (category) {
    query.set('category', category)
  }
  if (search?.trim()) {
    query.set('search', search.trim())
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

export function getHomeReviews() {
  return fetchJson<HomeReviewsApiResponse>('/api/home/reviews')
}

export function getHomeAchievements() {
  return fetchJson<HomeAchievementsApiResponse>('/api/home/achievements')
}
