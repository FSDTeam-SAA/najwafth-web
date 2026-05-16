import Image from 'next/image'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

import { testimonials } from './homeData'

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-18 sm:py-22">
      <Image
        src="/images/leaf-icon.png"
        alt=""
        width={230}
        height={230}
        aria-hidden="true"
        className="pointer-events-none absolute left-[5%] top-0 h-auto w-[210px] opacity-45"
      />
      <Image
        src="/images/leaf-icon.png"
        alt=""
        width={230}
        height={230}
        aria-hidden="true"
        className="pointer-events-none absolute right-[2%] top-10 h-auto w-[210px] opacity-45"
      />

      <div className="container mx-auto w-full px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="font-display text-3xl leading-[1.2] text-[#111111] sm:text-5xl">
            What Clients Say
          </h2>
          <p className="mt-4 text-base text-[#333333] sm:text-lg">
            Hear what our clients say about working with us
          </p>
        </div>

        <div className="mt-12 flex items-center gap-4">
          <button
            type="button"
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#e7edf2] bg-white text-[#7a7a7a] shadow-[0_12px_24px_rgba(15,23,42,0.08)] md:inline-flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="grid flex-1 gap-5 lg:grid-cols-3">
            {testimonials.map(item => (
              <Card
                key={item.id}
                className="rounded-[14px] border border-[#e7edf2] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
              >
                <CardContent className="flex h-full flex-col justify-between p-8">
                  <p className="max-w-[24ch] text-[16px] leading-7 text-[#3f3f46]">
                    {item.review}
                  </p>

                  <div className="mt-10 flex items-end justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#dff3ff]">
                        <Image
                          src="/images/book1.jpg"
                          alt={item.name}
                          fill
                          sizes="48px"
                          className="object-cover object-[42%_28%]"
                        />
                      </div>
                      <div>
                        <p className="text-[15px] font-medium text-[#111827]">
                          {item.name}
                        </p>
                        <p className="mt-1 text-[14px] text-[#6b7280]">
                          {item.role}
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[#f5b301]">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className="h-3.5 w-3.5 fill-current"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <Quote className="h-12 w-12 text-[#e9e5fb]" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <button
            type="button"
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#b4d9fb] text-white shadow-[0_12px_24px_rgba(69,154,228,0.18)] md:inline-flex"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
