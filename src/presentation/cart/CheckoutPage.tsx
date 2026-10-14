'use client'

import { useEffect, useRef } from 'react'
import { Loader2, LockKeyhole } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

type CartItem = {
  _id: string
  quantity: number
  product?: { _id: string }
}

type CartResponse = {
  data?: { items?: CartItem[] }
}

type CreatedOrder = {
  _id: string
}

async function readJson(response: Response) {
  return response.json().catch(() => null)
}

export default function CheckoutPage() {
  const { data: session, status } = useSession()
  const token = session?.user?.accessToken
  const startedRef = useRef(false)
  const orderRef = useRef<CreatedOrder | null>(null)

  const cartQuery = useQuery<CartResponse>({
    queryKey: ['cart', token],
    queryFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + '/cart',
        { headers: { Authorization: 'Bearer ' + token } },
      )
      const payload = await readJson(response)
      if (!response.ok) throw new Error(payload?.message || 'Unable to load your cart')
      return payload
    },
    enabled: Boolean(token),
  })

  const cartItems = cartQuery.data?.data?.items || []

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      if (!token) throw new Error('Please sign in to continue')
      if (!cartItems.length) throw new Error('Your cart is empty')

      let order = orderRef.current
      if (!order) {
        const orderResponse = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API_URL + '/order/create',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
              items: cartItems.map(item => ({
                product: item.product?._id,
                quantity: item.quantity || 1,
              })),
            }),
          },
        )
        const orderPayload = await readJson(orderResponse)
        if (!orderResponse.ok || !orderPayload?.data?._id) {
          throw new Error(orderPayload?.message || 'Unable to create your order')
        }
        order = orderPayload.data as CreatedOrder
        orderRef.current = order
      }

      const paymentResponse = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + '/payment/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            orderId: order._id,
            type: 'order',
            flow: 'hosted',
          }),
        },
      )
      const paymentPayload = await readJson(paymentResponse)
      if (!paymentResponse.ok || !paymentPayload?.checkoutUrl) {
        throw new Error(
          paymentPayload?.error ||
            paymentPayload?.message ||
            'Unable to open Stripe Checkout',
        )
      }
      return paymentPayload.checkoutUrl as string
    },
    onSuccess: checkoutUrl => {
      window.location.assign(checkoutUrl)
    },
  })

  useEffect(() => {
    if (
      token &&
      cartItems.length > 0 &&
      !startedRef.current &&
      checkoutMutation.isIdle
    ) {
      startedRef.current = true
      checkoutMutation.mutate()
    }
  }, [token, cartItems.length, checkoutMutation])

  if (status === 'loading' || cartQuery.isLoading || checkoutMutation.isPending) {
    return <PaymentLoading />
  }
  if (!token) {
    return <PaymentMessage title="Sign in to checkout" description="Please sign in before paying for your order." />
  }
  if (cartQuery.error) {
    return <PaymentMessage title="Unable to load your cart" description={cartQuery.error.message} />
  }
  if (!cartItems.length) {
    return <PaymentMessage title="Your cart is empty" description="Add a book to your cart before checking out." />
  }
  if (checkoutMutation.error) {
    return <PaymentMessage title="Unable to open secure payment" description={checkoutMutation.error.message} />
  }

  return <PaymentLoading />
}

function PaymentLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7fafc] px-4">
      <div className="max-w-md rounded-2xl border border-[#dce8f2] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eaf5ff] text-[#287dc2]">
          <LockKeyhole className="h-7 w-7" />
        </div>
        <Loader2 className="mx-auto mt-5 h-8 w-8 animate-spin text-[#459AE4]" />
        <h1 className="mt-4 font-display text-3xl text-[#1f2937]">
          Opening Stripe Checkout
        </h1>
        <p className="mt-3 text-[#64748b]">
          Please wait while we securely redirect you to payment.
        </p>
      </div>
    </main>
  )
}

function PaymentMessage({ title, description }: { title: string; description: string }) {
  return (
    <main className="min-h-screen bg-[#f7fafc] px-4 py-16">
      <div className="mx-auto max-w-lg rounded-2xl border border-[#dce8f2] bg-white p-8 text-center shadow-sm">
        <h1 className="font-display text-3xl text-[#1f2937]">{title}</h1>
        <p className="mt-3 text-[#64748b]">{description}</p>
      </div>
    </main>
  )
}
