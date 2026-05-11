import { ProductListingSection } from '@/presentation/home/ProductListingSection'
import { popularBooksCatalog } from '@/presentation/home/homeData'

export default function PopularBooksPage() {
  return (
    <div className="bg-[#FAFAFA]">
      <ProductListingSection
        title="Popular Books"
        description="Bestsellers and trending reads across all our stores."
        products={popularBooksCatalog}
        bottomLeafClassName="pointer-events-none absolute bottom-6 left-[-2.5rem] h-auto w-[240px] opacity-45"
      />
    </div>
  )
}
