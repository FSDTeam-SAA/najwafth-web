'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import {
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Loader2,
  MapPin,
  PackageCheck,
} from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

type OrderDetails = {
  orderId: string
  totalAmount: number
  shippingFee?: number
  discount?: number
  paymentStatus?: string
  status?: string
  address?: string
  expectedDeliveryDate?: string
  items?: { quantity: number; product?: { title?: string } }[]
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export default function SuccessPage() {
  const { data: session, status } = useSession()
  const token = session?.user?.accessToken
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const orderId = searchParams.get('order') || ''
  const paymentIntentId = searchParams.get('payment_intent') || ''
  const checkoutSessionId = searchParams.get('checkout_session_id') || ''

  const confirmPayment = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + '/payment/confirm',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({ paymentIntentId, checkoutSessionId }),
        },
      )
      const payload = await response.json().catch(() => null)
      if (!response.ok) {
        throw new Error(
          payload?.error || payload?.message || 'Payment could not be confirmed',
        )
      }

      const clearCart = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + '/cart/clear',
        {
          method: 'DELETE',
          headers: { Authorization: 'Bearer ' + token },
        },
      )
      if (!clearCart.ok) {
        // Payment has already succeeded; an uncleared cart must not make the
        // confirmation screen look like a failed payment.
      }

      await queryClient.invalidateQueries({ queryKey: ['cart', token] })
      await queryClient.invalidateQueries({ queryKey: ['my-order', token] })
      return payload
    },
  })

  useEffect(() => {
    if (
      token &&
      (paymentIntentId || checkoutSessionId) &&
      confirmPayment.isIdle
    ) {
      confirmPayment.mutate()
    }
  }, [token, paymentIntentId, checkoutSessionId, confirmPayment])

  const orderQuery = useQuery<{ data?: OrderDetails }>({
    queryKey: ['order-details', orderId, token],
    queryFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + '/order/' + orderId,
        { headers: { Authorization: 'Bearer ' + token } },
      )
      const payload = await response.json().catch(() => null)
      if (!response.ok) throw new Error(payload?.message || 'Unable to load order')
      return payload
    },
    enabled: Boolean(token && orderId && confirmPayment.isSuccess),
  })

  if (status === 'loading') return <ConfirmationLoading />

  if (!token) {
    return (
      <ConfirmationMessage
        title="Sign in to confirm your payment"
        description="Please sign in with the account used for this order."
      />
    )
  }

  if (!orderId || (!paymentIntentId && !checkoutSessionId)) {
    return (
      <ConfirmationMessage
        title="Payment confirmation required"
        description="Open the payment confirmation link after completing card payment."
      />
    )
  }

  if (confirmPayment.isPending || orderQuery.isLoading) {
    return <ConfirmationLoading />
  }

  if (confirmPayment.error) {
    return (
      <ConfirmationMessage
        title="We could not confirm your payment"
        description={confirmPayment.error.message}
        action={
          <button
            type="button"
            onClick={() => confirmPayment.mutate()}
            className="rounded-xl bg-[#459AE4] px-5 py-3 font-semibold text-white transition hover:bg-[#287dc2]"
          >
            Try confirmation again
          </button>
        }
      />
    )
  }

  if (orderQuery.error || !orderQuery.data?.data) {
    return (
      <ConfirmationMessage
        title="Payment confirmed"
        description="Your payment was successful, but the order details are temporarily unavailable."
        action={
          <Link
            href="/order"
            className="rounded-xl bg-[#459AE4] px-5 py-3 font-semibold text-white transition hover:bg-[#287dc2]"
          >
            View my orders
          </Link>
        }
      />
    )
  }

  const order = orderQuery.data.data
  const total = Math.max(
    0,
    Number(order.totalAmount || 0) +
      Number(order.shippingFee || 0) -
      Number(order.discount || 0),
  )

  return (
    <main className="min-h-screen bg-[#f7fafc] px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#dce8f2] bg-white p-6 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e7f7ed] text-[#299159]">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#3d9568]">
          Payment confirmed
        </p>
        <h1 className="mt-2 font-display text-4xl text-[#1f2937] sm:text-5xl">
          Thank you for your order
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[#64748b]">
          Your payment was successful. We have sent your order to the bookstore
          and will keep you updated as it progresses.
        </p>

        <div className="mt-9 grid gap-4 text-left sm:grid-cols-2">
          <InfoCard icon={ClipboardList} label="Order number" value={'#' + order.orderId} />
          <InfoCard icon={CreditCard} label="Amount paid" value={formatAmount(total)} />
          <InfoCard
            icon={MapPin}
            label="Delivery address"
            value={order.address || 'Address saved with your order'}
          />
          <InfoCard
            icon={PackageCheck}
            label="Estimated delivery"
            value={
              order.expectedDeliveryDate
                ? new Date(order.expectedDeliveryDate).toLocaleDateString()
                : 'We will confirm this shortly'
            }
          />
        </div>

        {order.items?.length ? (
          <div className="mt-6 rounded-xl bg-[#f8fbfe] p-4 text-left">
            <h2 className="font-semibold text-[#334155]">Items</h2>
            <ul className="mt-3 space-y-2 text-sm text-[#64748b]">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between gap-4">
                  <span>{item.product?.title || 'Book'}</span>
                  <span>Qty {item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={'/order/' + order.orderId}
            className="rounded-xl bg-[#459AE4] px-5 py-3 font-semibold text-white transition hover:bg-[#287dc2]"
          >
            Track this order
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-[#b7cfe3] px-5 py-3 font-semibold text-[#287dc2] transition hover:bg-[#f3f9fe]"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  )
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ClipboardList
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-[#e1ebf3] bg-[#fbfdff] p-4">
      <Icon className="h-5 w-5 text-[#459AE4]" />
      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-[#64748b]">
        {label}
      </p>
      <p className="mt-1 break-words font-semibold text-[#334155]">{value}</p>
    </div>
  )
}

function ConfirmationMessage({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-[#f7fafc] px-4 py-16">
      <div className="mx-auto max-w-lg rounded-2xl border border-[#dce8f2] bg-white p-8 text-center shadow-sm">
        <h1 className="font-display text-3xl text-[#1f2937]">{title}</h1>
        <p className="mt-3 text-[#64748b]">{description}</p>
        {action ? <div className="mt-6">{action}</div> : null}
      </div>
    </main>
  )
}

function ConfirmationLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7fafc] px-4">
      <div className="max-w-md rounded-2xl border border-[#dce8f2] bg-white p-8 text-center shadow-sm">
        <Loader2 className="mx-auto h-9 w-9 animate-spin text-[#459AE4]" />
        <h1 className="mt-5 font-display text-3xl text-[#1f2937]">
          Confirming your payment
        </h1>
        <p className="mt-3 text-[#64748b]">
          Please do not close this page while we update your order.
        </p>
      </div>
    </main>
  )
}
