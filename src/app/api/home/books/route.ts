import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5001/api/v1'

type BackendBook = {
  _id?: string
  title?: string
  author?: string
  price?: number
  coverImage?: string
  category?: {
    _id?: string
    name?: string
  }
  shopId?: {
    name?: string
  }
}

type BackendBooksPayload = {
  data?: {
    books?: BackendBook[]
    meta?: {
      page?: number
      limit?: number
      total?: number
      totalPage?: number
    }
  }
  message?: string
}

function mapBook(item: BackendBook, index: number) {
  return {
    id: item?._id || String(index + 1),
    categoryId: item?.category?._id || '',
    title: item?.title || 'Untitled',
    author: item?.author || 'Unknown Author',
    location: item?.shopId?.name || 'Bookstore',
    price: `£ ${Number(item?.price || 0).toFixed(2)}`,
    rating: '4.8',
    image: item?.coverImage || '/images/book1.jpg',
    imagePosition: 'object-center',
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    const token = session?.user?.accessToken

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized: No valid session' },
        { status: 401 },
      )
    }

    const { searchParams } = new URL(request.url)

    const kind = searchParams.get('kind') || 'featured'
    const page = Number(searchParams.get('page') || '1')
    const limit = Number(searchParams.get('limit') || '8')
    const category = searchParams.get('category')
    const selectedCategories = category
      ? category
          .split(',')
          .map(value => value.trim())
          .filter(Boolean)
      : []

    const sortBy = kind === 'popular' ? 'createdAt' : 'createdAt'
    const sortOrder = 'desc'

    const backendQuery = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      sortBy,
      sortOrder,
    })

    const fetchBooks = async (categoryId?: string) => {
      const query = new URLSearchParams(backendQuery)
      if (categoryId) {
        query.set('category', categoryId)
      }
      const res = await fetch(`${BACKEND_BASE_URL}/books?${query.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      })
      const data = (await res
        .json()
        .catch(() => null)) as BackendBooksPayload | null
      return { res, data }
    }

    if (selectedCategories.length > 1) {
      const multiFetchLimit = 50
      const multiQuery = new URLSearchParams({
        page: '1',
        limit: String(multiFetchLimit),
        sortBy,
        sortOrder,
      })

      const results = await Promise.all(
        selectedCategories.map(async categoryId => {
          const query = new URLSearchParams(multiQuery)
          query.set('category', categoryId)
          const res = await fetch(
            `${BACKEND_BASE_URL}/books?${query.toString()}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              cache: 'no-store',
            },
          )
          const data = (await res
            .json()
            .catch(() => null)) as BackendBooksPayload | null
          return { res, data }
        }),
      )

      const failed = results.find(item => !item.res.ok)
      if (failed) {
        return NextResponse.json(
          {
            message:
              failed.data?.message || 'Failed to fetch books from backend',
          },
          { status: failed.res.status },
        )
      }

      const merged = results.flatMap(item =>
        Array.isArray(item.data?.data?.books) ? item.data!.data!.books! : [],
      )
      const deduped = Array.from(
        new Map(merged.map(item => [item._id || Math.random(), item])).values(),
      )

      const start = (page - 1) * limit
      const paginated = deduped.slice(start, start + limit)
      const total = deduped.length
      const totalPage = Math.max(1, Math.ceil(total / limit))

      return NextResponse.json({
        items: paginated.map(mapBook),
        meta: {
          page,
          limit,
          total,
          totalPage,
        },
      })
    }

    const { res: response, data: payload } = await fetchBooks(
      selectedCategories[0],
    )

    if (!response.ok) {
      return NextResponse.json(
        { message: payload?.message || 'Failed to fetch books from backend' },
        { status: response.status },
      )
    }

    const books = Array.isArray(payload?.data?.books) ? payload.data.books : []
    const meta = payload?.data?.meta

    return NextResponse.json({
      items: books.map(mapBook),
      meta: {
        page: Number(meta?.page || page),
        limit: Number(meta?.limit || limit),
        total: Number(meta?.total || books.length),
        totalPage: Number(meta?.totalPage || 1),
      },
    })
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong while fetching books' },
      { status: 500 },
    )
  }
}
