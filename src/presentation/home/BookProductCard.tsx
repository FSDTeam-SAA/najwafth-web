"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MapPin, ShoppingCart, Star } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import type { ProductItem } from './homeData'

type CartResponse = {
  data?: {
    items?: {
      product?: {
        _id?: string
      }
    }[]
  }
}

export function BookProductCard({ product }: { product: ProductItem }) {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const router = useRouter()
  const token = session?.user?.accessToken

  const { data: cartResponse } = useQuery<CartResponse>({
    queryKey: ['cart', token],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error('Failed to fetch cart')
      }

      return res.json()
    },
    enabled: !!token,
  })

  const isAlreadyInCart =
    cartResponse?.data?.items?.some(
      item => item.product?._id === String(product.id),
    ) || false

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      if (!token) {
        throw new Error('Please login to add this book to cart')
      }

      if (isAlreadyInCart) {
        throw new Error('This book is already added to cart')
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cart/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product: product.id,
            quantity: 1,
          }),
        },
      )

      const result = await res.json().catch(() => null)

      if (!res.ok) {
        throw new Error(result?.message || 'Failed to add book to cart')
      }

      return result
    },
    onSuccess: () => {
      toast.success('Book added to cart')
      queryClient.invalidateQueries({ queryKey: ['cart', token] })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Something went wrong')
    },
  })

  return (
    <Card
      className="cursor-pointer overflow-hidden rounded-[12px]"
      onClick={() => router.push(`/product-details/${product.id}`)}
    >
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
            className="aspect-square h-9 w-9 !rounded-full bg-[#459AE4] p-0 shadow-none"
            disabled={addToCartMutation.isPending || isAlreadyInCart}
            onClick={event => {
              event.stopPropagation()
              addToCartMutation.mutate()
            }}
            title={isAlreadyInCart ? 'Already added to cart' : 'Add to cart'}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">
              {isAlreadyInCart ? 'Already added to cart' : 'Add to cart'}
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
