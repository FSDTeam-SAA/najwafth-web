'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Search, ShoppingCart } from 'lucide-react'

import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/categories', label: 'Categories' },
  { href: '/order', label: 'Order' },
  { href: '/contact', label: 'Contact' },
  { href: '/about-us', label: 'About Us' },
]

// Routes that belong to the Home section (so Home link stays active)
const HOME_SECTION_ROUTES = ['/', '/popular-books', '/featured-bookstores']

function isLinkActive(linkHref: string, pathname: string): boolean {
  if (linkHref === '/') {
    return HOME_SECTION_ROUTES.includes(pathname)
  }
  return pathname === linkHref || pathname.startsWith(linkHref + '/')
}

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-black/6 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full container items-center justify-between gap-6 px-4 py-2 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="relative flex shrink-0 items-center justify-center"
        >
          <Image
            src="/images/logo.png"
            alt="Books and shack logo"
            width={90}
            height={55}
            className="object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-9 text-[18px] font-normal text-[#111827] lg:flex">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href, pathname)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? 'text-[#459AE4]'
                    : 'transition-colors hover:text-[#459AE4]'
                }
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Link href="/signin">
            <Button className="rounded-xl px-5 text-[15px]">Sign in</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
