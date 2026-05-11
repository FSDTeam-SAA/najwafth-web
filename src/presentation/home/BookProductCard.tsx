import Image from 'next/image'
import { MapPin, ShoppingCart, Star } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import type { ProductItem } from './homeData'

export function BookProductCard({ product }: { product: ProductItem }) {
  return (
    <Card className="overflow-hidden rounded-[12px]">
      <div className="px-3 pt-3">
        <div className="relative h-[192px] overflow-hidden rounded-[10px] bg-[#f4f1eb]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className={`object-cover ${product.imagePosition}`}
          />
        </div>
      </div>

      <CardContent className="px-4 pb-4 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-[18px] leading-tight text-[#202020]">
              {product.title}
            </h3>
            <p className="mt-1 text-[14px] leading-5 text-[#6b7280]">
              {product.author}
            </p>
          </div>
          <div className="flex items-center gap-1 pt-1 text-[14px] text-[#374151]">
            <Star className="h-4 w-4 fill-[#F5B301] text-[#F5B301]" />
            <span>{product.rating}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-[14px] text-[#7b7b7b]">
          <MapPin className="h-4 w-4 text-[#459AE4]" />
          <span>{product.location}</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[32px] font-semibold leading-none text-[#459AE4]">
            {product.price}
          </span>
          <Button
            size="icon"
            className="h-9 w-9 rounded-full bg-[#459AE4] shadow-none"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
