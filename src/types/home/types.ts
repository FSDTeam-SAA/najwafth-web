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
