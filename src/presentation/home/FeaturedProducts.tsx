import { ProductListingSection } from './ProductListingSection'
import type { ProductItem } from './homeData'

export function FeaturedProducts({
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
      title="Featured Bookstores"
      description="Discover unique collections from our top-rated local sellers."
      products={products.slice(0, 8)}
      isLoading={isLoading}
      error={error}
      viewAllHref="/all-books"
      topLeafClassName="pointer-events-none absolute right-[16%] top-16 h-auto w-[210px] opacity-55 max-lg:right-[4%] max-lg:top-10"
      bottomLeafClassName="pointer-events-none absolute bottom-[-2.5rem] left-[-1.5rem] h-auto w-[280px] opacity-55 max-lg:bottom-[-3rem] max-lg:left-[-3rem]"
    />
  )
}
