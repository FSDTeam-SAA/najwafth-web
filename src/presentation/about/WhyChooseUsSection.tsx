import { Box, Search, ShoppingCart, Truck } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

const reasons = [
  {
    title: 'Discover Books',
    description:
      'Browse curated collections and personalized recommendations from expert booksellers.',
    icon: Search,
    accent: 'bg-[#eef2ff] text-[#3461ff]',
  },
  {
    title: 'Easy Ordering',
    description:
      'Seamless checkout with multiple payment options and flexible delivery methods.',
    icon: ShoppingCart,
    accent: 'bg-[#e8f8ee] text-[#22c55e]',
  },
  {
    title: 'Fast & Reliable',
    description:
      'Quick processing and delivery with excellent customer service.',
    icon: Truck,
    accent: 'bg-[#eaf4ff] text-[#60a5fa]',
  },
  {
    title: 'Secure Shopping',
    description:
      'Protected transactions and data privacy you can trust.',
    icon: Box,
    accent: 'bg-[#f3e8ff] text-[#9333ea]',
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="bg-[#edf5fb] py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="font-display text-4xl leading-[1.2] text-[#111111] sm:text-6xl">
            Why Choose Us
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map(item => {
            const Icon = item.icon

            return (
              <Card
                key={item.title}
                className="rounded-[18px] border border-[#dfebf5] shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
              >
                <CardContent className="p-6">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.accent}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-[24px] leading-tight text-[#111827]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-6 text-[#6b7280]">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
