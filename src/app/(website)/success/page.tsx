import SuccessPage from '@/presentation/cart/SuccessPage'
import { Suspense } from 'react'

function SuccessRoute() {
  return (
    <Suspense fallback={<div className="min-h-[50vh] bg-[#f7fafc]" />}>
      <SuccessPage />
    </Suspense>
  )
}

export default SuccessRoute
