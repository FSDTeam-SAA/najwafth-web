import { ProductListingSection } from '@/presentation/home/ProductListingSection'
import { featuredBookstoresCatalog } from '@/presentation/home/homeData'

export default function FeaturedBookstoresPage() {
  return (
    <div className="bg-[#FAFAFA]">
      <ProductListingSection
        title="Featured Bookstores"
        description="Discover unique collections from our top-rated local sellers."
        products={featuredBookstoresCatalog}
        bottomLeafClassName="pointer-events-none absolute bottom-6 left-[-2.5rem] h-auto w-[240px] opacity-45"
      />
    </div>
  )
}
