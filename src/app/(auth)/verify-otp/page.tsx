import VerifyOtpForm from '@/presentation/auth/VerifyOtpForm'
import React, { Suspense } from 'react'

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpForm />
    </Suspense>
  )
}

export default page
 