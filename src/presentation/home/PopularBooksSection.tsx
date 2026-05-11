import { ProductListingSection } from './ProductListingSection'
import { popularBooks } from './homeData'

export function PopularBooksSection() {
  return (
    <ProductListingSection
      title="Popular Books"
      description="Bestsellers and trending reads across all our stores."
      products={popularBooks}
      viewAllHref="/popular-books"
      topLeafClassName="pointer-events-none absolute right-[10%] top-20 h-auto w-[210px] opacity-45"
    />
  )
}
