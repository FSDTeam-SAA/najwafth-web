import { Suspense } from 'react'
import { BooksCategoriesPage } from '@/presentation/category/BooksCategoriesPage'

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] bg-[#FAFAFA]" />}>
      <BooksCategoriesPage />
    </Suspense>
  )
}
