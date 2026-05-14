import type { Metadata } from 'next'
import './globals.css'
import { cn } from '@/lib/utils'
import AuthProvider from '@/provider/AuthProvider'

export const metadata: Metadata = {
  title: 'Books and Shack',
  description: 'Discover millions of books from trusted local bookstores.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn('h-full antialiased', 'font-sans')}>
      <body className="min-h-full flex flex-col">
        {' '}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
