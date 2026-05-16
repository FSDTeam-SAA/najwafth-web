import type { ProductItem } from '@/presentation/home/homeData'

export type PaginationMeta = {
  page: number
  limit: number
  total: number
  totalPage: number
}

export type HomeBooksApiResponse = {
  items: ProductItem[]
  meta: PaginationMeta
}

export type HomeCategoryItem = {
  id: string
  title: string
  image: string
  imagePosition: string
}

export type HomeCategoriesApiResponse = {
  items: HomeCategoryItem[]
}

export type HomeReviewItem = {
  id: string
  name: string
  role: string
  review: string
  rating: number
}

export type HomeReviewsApiResponse = {
  items: HomeReviewItem[]
}

export type HomeAchievementsApiResponse = {
  totalBooks: number
  totalUsers: number
  totalReviews: number
}
