import { ProductListingSection } from './ProductListingSection'
import type { ProductItem } from './homeData'

export function PopularBooksSection({
  products,
  isLoading,
  error,
}: {
  products: ProductItem[]
  isLoading: boolean
  error?: string
}) {
  return (
    <ProductListingSection
      title="Popular Books"
      description="Bestsellers and trending reads across all our stores."
      products={products.slice(0, 8)}
      isLoading={isLoading}
      error={error}
      viewAllHref="/all-books"
      topLeafClassName="pointer-events-none absolute right-[10%] top-20 h-auto w-[210px] opacity-45"
    />
  )
}
