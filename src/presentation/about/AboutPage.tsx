import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { AchievementSection } from '@/presentation/home/AchievementSection'
import { TestimonialsSection } from '@/presentation/home/TestimonialsSection'

import { WhyChooseUsSection } from './WhyChooseUsSection'

export function AboutPage() {
  return (
    <div className="bg-[#FAFAFA]">
      {/* Hero — about-bg.png as full background, left text visible via gradient */}
      <section className="relative overflow-hidden border-b border-black/6">
        {/* Full-bleed background image */}
        <Image
          src="/images/about-bg.png"
          alt=""
          fill
          aria-hidden="true"
          className="pointer-events-none object-cover object-center"
          priority
        />
        {/* Left-side white fade so text stays readable — no dark overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />

        <div className="relative container mx-auto flex flex-col justify-center px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          {/* Badge */}
          <div className="mb-8 inline-flex w-fit rounded-full border border-[#459AE4]/20 bg-white/80 px-4 py-2 text-sm text-[#5F83A2] shadow-sm">
            About Us
          </div>

          <h1 className="font-display max-w-[14ch] text-5xl leading-[1.08] text-[#111111] sm:text-6xl">
            Discover Your Next Great Read
          </h1>

          <p className="mt-6 max-w-[36ch] text-xl leading-[1.55] font-light text-[#232323] sm:text-[22px]">
            Discover millions of books from local sellers worldwide. Same great
            reads, better impact.
          </p>

          <div className="mt-10">
            <Button className="h-14 min-w-[260px] rounded-2xl bg-[linear-gradient(90deg,#5F83A2_0%,#5E92C0_100%)] text-[18px] font-semibold shadow-none hover:opacity-95">
              Browser Books
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#459AE4] bg-white">
              <span className="h-3.5 w-3.5 rounded-full bg-[#459AE4]" />
            </span>
            {[1, 2, 3].map(dot => (
              <span
                key={dot}
                className="h-3.5 w-3.5 rounded-full border border-[#459AE4]/50 bg-[#459AE4]/35"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-18 sm:py-22">
        <Image
          src="/images/leaf-icon.png"
          alt=""
          width={200}
          height={200}
          aria-hidden="true"
          className="pointer-events-none absolute right-[22%] top-24 h-auto w-[140px] opacity-40"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[420px] text-center">
            <h2 className="font-display text-4xl leading-[1.2] text-[#111111] sm:text-6xl">
              About Us
            </h2>
            <p className="mt-3 text-[24px] text-[#1f2937]">See our story</p>
          </div>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="max-w-[480px]">
              <h3 className="font-display text-4xl leading-[1.15] text-[#111111] sm:text-5xl">
                Who We Are
              </h3>
              <div className="mt-6 space-y-6 text-[20px] leading-[1.7] text-[#555f6d]">
                <p>
                  We&apos;re a passionate team dedicated to connecting readers
                  with independent bookstores across the country. Founded in
                  2020, our platform has become the bridge between book lovers
                  and local businesses.
                </p>
                <p>
                  Every purchase you make helps keep independent bookstores
                  thriving in your community. We believe in the power of local
                  businesses and the magic of discovering your next favorite
                  book.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[18px]">
              <Image
                src="/images/book1.jpg"
                alt="Book collection"
                width={389}
                height={584}
                className="h-[420px] w-full object-cover object-[74%_58%]"
              />
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUsSection />
      <AchievementSection />
      <TestimonialsSection />
    </div>
  )
}
