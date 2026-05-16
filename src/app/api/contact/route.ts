import { NextResponse } from 'next/server'

type ContactPayload = {
  name?: string
  email?: string
  phone?: string
  reason?: string
  description?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5001/api/v1'

function validate(payload: ContactPayload) {
  if (!payload.name?.trim()) return 'Name is required.'
  if (!payload.email?.trim() || !EMAIL_REGEX.test(payload.email)) {
    return 'Please enter a valid email address.'
  }
  if (!payload.reason?.trim()) return 'Reason for contact is required.'
  if (!payload.description?.trim() || payload.description.trim().length < 10) {
    return 'Please enter at least 10 characters in your message.'
  }
  return null
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as ContactPayload
    const error = validate(body)

    if (error) {
      return NextResponse.json({ message: error }, { status: 400 })
    }

    const response = await fetch(`${BACKEND_BASE_URL}/user/contact-us`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: body.name?.trim(),
        email: body.email?.trim(),
        phone: body.phone?.trim(),
        message: `Reason: ${body.reason?.trim()}\n\n${body.description?.trim()}`,
      }),
      cache: 'no-store',
    })

    const payload = await response.json().catch(() => null)

    if (!response.ok) {
      return NextResponse.json(
        { message: payload?.message || 'Failed to submit your message.' },
        { status: response.status },
      )
    }

    return NextResponse.json({
      message: payload?.message || 'Your message has been submitted successfully.',
    })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong while submitting your message.' },
      { status: 500 },
    )
  }
}
