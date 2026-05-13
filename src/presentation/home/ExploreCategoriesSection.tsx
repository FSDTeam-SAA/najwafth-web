import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { topCategories } from './homeData'

export function ExploreCategoriesSection() {
  const [romance, fiction, classic, fantasy, adventure, mystery] = topCategories

  return (
    <section className="relative overflow-hidden pb-18 pt-8 sm:pb-24">
      <Image
        src="/images/leaf-icon.png"
        alt=""
        width={230}
        height={230}
        aria-hidden="true"
        className="pointer-events-none absolute left-[4%] top-0 h-auto w-[210px] opacity-45"
      />

      <div className="container mx-auto w-full px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.42fr_1fr] lg:items-stretch">
          <CategoryTile category={romance} className="lg:mt-3" />
          <Card className="flex min-h-[286px] flex-col items-center justify-center rounded-[18px] border border-[#dce3ea] bg-[#EEF3F6] px-8 text-center shadow-[0_1px_2px_-1px_rgba(0,0,0,0.10),0_1px_3px_0_rgba(0,0,0,0.10)]">
            <h2 className="font-display max-w-[20ch]  text-4xl leading-[1.25] text-[#264d73] sm:text-[48px]">
              Explore our Top Categories
            </h2>
            <Link href="/categories" className="mt-10">
              <Button className="h-[58px] min-w-[224px] rounded-xl bg-[linear-gradient(90deg,#5F83A2_0%,#5E92C0_100%)] text-[18px] font-semibold shadow-none hover:opacity-95">
                Explore all
              </Button>
            </Link>
          </Card>
          <CategoryTile category={fiction} className="lg:mt-3" />
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          <CategoryTile category={classic} compact />
          <CategoryTile category={fantasy} compact />
          <CategoryTile category={adventure} compact />
          <CategoryTile category={mystery} compact />
        </div>
      </div>
    </section>
  )
}

type Category = (typeof topCategories)[number]

function CategoryTile({
  category,
  compact = false,
  className = '',
}: {
  category: Category
  compact?: boolean
  className?: string
}) {
  return (
    <Card
      className={`rounded-[18px] border border-[#dce3ea] bg-[#EEF3F6] p-3 shadow-[0_1px_2px_-1px_rgba(0,0,0,0.10),0_1px_3px_0_rgba(0,0,0,0.10)] ${className}`}
    >
      <div
        className={`relative overflow-hidden rounded-[12px] ${compact ? 'h-[172px]' : 'h-[220px]'}`}
      >
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className={`object-cover ${category.imagePosition}`}
        />
      </div>
      <div className="py-3 text-center">
        <h3 className="font-display text-[32px] leading-none text-[#374151]">
          {category.title}
        </h3>
      </div>
    </Card>
  )
}
