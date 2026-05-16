import { ProductListingSection } from './ProductListingSection'
import type { ProductItem } from './homeData'
import { useTranslation } from 'react-i18next'

export function PopularBooksSection({
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
      title={t("home.popularTitle")}
      description={t("home.popularDesc")}
      products={products.slice(0, 8)}
      isLoading={isLoading}
      error={error}
      viewAllHref="/all-books"
      topLeafClassName="pointer-events-none absolute right-[10%] top-20 h-auto w-[210px] opacity-45"
    />
  )
}
