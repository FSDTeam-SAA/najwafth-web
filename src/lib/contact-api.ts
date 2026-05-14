import { fetchJson } from '@/lib/fetcher'

export type ContactFormInput = {
  name: string
  email: string
  phone: string
  reason: string
  description: string
}

export function submitContactForm(payload: ContactFormInput) {
  return fetchJson<{ message: string }>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
