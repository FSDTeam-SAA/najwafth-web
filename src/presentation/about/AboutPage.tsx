import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { AchievementSection } from '@/presentation/home/AchievementSection'
import { TestimonialsSection } from '@/presentation/home/TestimonialsSection'

import { WhyChooseUsSection } from './WhyChooseUsSection'

export function AboutPage() {
  return (
    <div className="bg-[#FAFAFA]">
      <section className="relative overflow-hidden border-b border-black/6">
        <Image
          src="/images/about-bg-second.png"
          alt=""
          fill
          aria-hidden="true"
          className="pointer-events-none object-cover object-center lg:hidden"
          priority
        />
        <Image
          src="/images/about-bg.png"
          alt=""
          fill
          aria-hidden="true"
          className="pointer-events-none hidden object-cover object-center lg:block"
          priority
        />

        <div className="relative flex min-h-[420px] w-full items-center py-0 sm:min-h-[520px] md:min-h-[500px] lg:min-h-[620px]">
          <div className="max-w-[540px] px-6 py-6 sm:px-4 md:max-w-[480px] md:px-5 lg:ml-[12vw] lg:max-w-[540px] lg:px-0">
            <div className="mb-5 text-sm text-[#8A8A8A]">About Us</div>

            <h1 className="font-display max-w-[12ch] text-[42px] leading-[0.98] tracking-[-0.03em] text-[#111111] sm:text-[52px] md:text-[44px] lg:text-[64px]">
              Discover Your Next Great Read
            </h1>

            <p className="mt-5 max-w-[30ch] text-[18px] leading-[1.5] text-[#2A2A2A] sm:text-[20px] md:max-w-[26ch] md:text-[18px] lg:max-w-[30ch] lg:text-[20px]">
              Discover millions of books from local sellers worldwide. Same
              great reads, better impact.
            </p>

            <div className="mt-8">
              <Link href="/categories">
                <Button className="h-12 min-w-[224px] rounded-md bg-[#6B95BF] px-8 text-[18px] font-medium text-white shadow-none hover:bg-[#5b86b0]">
                  Browser Books
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#5AA2E8] bg-white">
                <span className="h-3 w-3 rounded-full bg-[#5AA2E8]" />
              </span>
              {[1, 2, 3].map(dot => (
                <span
                  key={dot}
                  className="h-2.5 w-2.5 rounded-full border border-[#5AA2E8]/60 bg-[#B9D9F7]"
                />
              ))}
            </div>
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
