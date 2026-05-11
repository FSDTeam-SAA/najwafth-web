import Image from 'next/image'
import Link from 'next/link'

import { BookProductCard } from './BookProductCard'
import type { ProductItem } from './homeData'

type ProductListingSectionProps = {
  title: string
  description: string
  products: ProductItem[]
  viewAllHref?: string
  topLeafClassName?: string
  bottomLeafClassName?: string
}

export function ProductListingSection({
  title,
  description,
  products,
  viewAllHref,
  topLeafClassName,
  bottomLeafClassName,
}: ProductListingSectionProps) {
  return (
    <section className="relative overflow-hidden py-18 sm:py-22">
      {topLeafClassName ? (
        <Image
          src="/images/leaf-icon.png"
          alt=""
          width={230}
          height={230}
          aria-hidden="true"
          className={topLeafClassName}
        />
      ) : null}
      {bottomLeafClassName ? (
        <Image
          src="/images/leaf-icon.png"
          alt=""
          width={280}
          height={280}
          aria-hidden="true"
          className={bottomLeafClassName}
        />
      ) : null}

      <div className="container mx-auto w-full px-4 sm:px-6 lg:px-10">
        <div className="mx-auto text-center">
          <h2 className="font-display text-4xl leading-[1.2] text-[#111111] sm:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-[28ch] text-[24px] leading-[1.45] text-[#111111]">
            {description}
          </p>
        </div>

        {viewAllHref ? (
          <div className="mt-10 flex justify-end">
            <Link
              href={viewAllHref}
              className="text-[18px] font-medium text-[#459AE4] transition-opacity hover:opacity-75"
            >
              View all
            </Link>
          </div>
        ) : null}

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.map(product => (
            <BookProductCard key={`${title}-${product.id}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
