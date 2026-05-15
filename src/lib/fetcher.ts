export class HttpError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'HttpError'
    this.status = status
  }
}

export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  })

  const payload = (await response.json().catch(() => ({}))) as {
    message?: string
  }

  if (!response.ok) {
    throw new HttpError(
      payload?.message || `Request failed with status ${response.status}`,
      response.status,
    )
  }

  return payload as T
}
