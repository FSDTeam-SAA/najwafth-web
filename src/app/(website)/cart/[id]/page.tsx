import CartDetailsPage from '@/presentation/cart/CartDetailsPage'
import React from 'react'

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div>
      <CartDetailsPage cartItemId={id} />
    </div>
  )
}

export default page
