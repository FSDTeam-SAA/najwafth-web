import { NextResponse } from 'next/server'

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5001/api/v1'

type AchievementPayload = {
  data?: {
    totalBooks?: number
    totalUsers?: number
    totalReviews?: number
  }
  message?: string
}

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/user/achievements`, {
      cache: 'no-store',
    })

    const payload = (await response
      .json()
      .catch(() => null)) as AchievementPayload | null

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            payload?.message || 'Failed to fetch achievements from backend',
        },
        { status: response.status },
      )
    }

    return NextResponse.json({
      totalBooks: Number(payload?.data?.totalBooks || 0),
      totalUsers: Number(payload?.data?.totalUsers || 0),
      totalReviews: Number(payload?.data?.totalReviews || 0),
    })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong while fetching achievements' },
      { status: 500 },
    )
  }
}
