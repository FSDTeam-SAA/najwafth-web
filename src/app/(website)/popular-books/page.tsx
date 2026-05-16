import PopularBooksPageClient from './PopularBooksPageClient'

type PopularBooksPageProps = {
  searchParams?: Promise<{
    search?: string
  }>
}

export default async function PopularBooksPage({
  searchParams,
}: PopularBooksPageProps) {
  const params = (await searchParams) || {}
  const search = (params.search || '').trim()

  return <PopularBooksPageClient key={search || 'default'} search={search} />
}
