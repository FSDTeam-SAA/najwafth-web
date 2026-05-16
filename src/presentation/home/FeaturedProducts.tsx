import { ProductListingSection } from './ProductListingSection'
import type { ProductItem } from './homeData'
import { useTranslation } from 'react-i18next'

export function FeaturedProducts({
  products,
  isLoading,
  error,
}: {
  products: ProductItem[]
  isLoading: boolean
  error?: string
}) {
  const { t } = useTranslation()

  return (
    <ProductListingSection
      title={t("home.featuredTitle")}
      description={t("home.featuredDesc")}
      products={products.slice(0, 8)}
      isLoading={isLoading}
      error={error}
      viewAllHref="/all-books"
      topLeafClassName="pointer-events-none absolute right-[16%] top-16 h-auto w-[210px] opacity-55 max-lg:right-[4%] max-lg:top-10"
      bottomLeafClassName="pointer-events-none absolute bottom-[-2.5rem] left-[-1.5rem] h-auto w-[280px] opacity-55 max-lg:bottom-[-3rem] max-lg:left-[-3rem]"
    />
  )
}
