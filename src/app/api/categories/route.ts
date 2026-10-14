import { NextResponse } from 'next/server'

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5001/api/v1'

type BackendCategory = {
  _id?: string
  name?: string
  level?: number
  image?: { url?: string }
  parent?: { _id?: string; name?: string } | null
}

export async function GET() {
  try {
    // No parent filter: this public backend API returns all active categories.
    const response = await fetch(`${BACKEND_BASE_URL}/category`, {
      cache: 'no-store',
    })
    const payload = await response.json().catch(() => null)

    if (!response.ok) {
      return NextResponse.json(
        { message: payload?.message || 'Failed to fetch categories from backend' },
        { status: response.status },
      )
    }

    const categories = Array.isArray(payload?.data) ? payload.data : []
    return NextResponse.json({
      items: categories.map((item: BackendCategory, index: number) => ({
        id: item?._id || String(index + 1),
        title: item?.name || 'Category',
        image: item?.image?.url || '/images/book1.jpg',
        imagePosition: 'object-center',
        level: Number(item?.level || 1),
        parentName: item?.parent?.name || null,
      })),
    })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong while fetching categories' },
      { status: 500 },
    )
  }
}
