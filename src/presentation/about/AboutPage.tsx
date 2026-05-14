'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { AchievementSection } from '@/presentation/home/AchievementSection'
import { TestimonialsSection } from '@/presentation/home/TestimonialsSection'

import { WhyChooseUsSection } from './WhyChooseUsSection'

export function AboutPage() {
  const slides = [
    {
      image: '/images/hero-banner.png',
      title: 'Discover Your Next Great Read',
      description:
        'Discover millions of books from local sellers worldwide. Same great reads, better impact.',
    },
    {
      image: '/images/banner-2.png',
      title: 'Explore Endless Reading Possibilities',
      description:
        'Browse handpicked books with seamless shopping and fast delivery.',
    },
    {
      image: '/images/banner-3.png',
      title: 'Your Personal Library Starts Here',
      description:
        'Shop bestselling books, timeless classics, and new arrivals in one place.',
    },
    {
      image: '/images/banner-4.png',
      title: 'Books That Inspire Every Journey',
      description:
        "From timeless classics to trending favourites discover books you'll love.",
    },
  ]
  const [activeSlide, setActiveSlide] = useState(slides.length - 1)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide(prev => (prev - 1 + slides.length) % slides.length)
    }, 4000)

    return () => window.clearInterval(timer)
  }, [slides.length])

  return (
    <div className="bg-[#FAFAFA]">
      <section className="relative overflow-hidden border-b border-black/6">
        <div className="hero-haze pointer-events-none absolute inset-0" />
        <Image
          src="/images/hero-bg.png"
          alt=""
          width={1470}
          height={687}
          className="pointer-events-none absolute left-0 top-0 h-full w-full object-cover opacity-40"
        />

        <div className="relative mx-auto grid w-full container gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="mb-5 text-sm text-[#8A8A8A]">About Us</div>

            <div key={`about-copy-${activeSlide}`} className="animate-in fade-in duration-500">
              <h1 className="h-[116px] w-[651px] font-['Prata'] text-[48px] leading-[120%] font-normal tracking-[0%] text-[#111111]">
                {slides[activeSlide].title}
              </h1>

              <p className="mt-5 h-[72px] w-[651px] font-['Poppins'] text-[24px] leading-[130%] font-light tracking-[0%] text-[#2A2A2A]">
                {slides[activeSlide].description}
              </p>
            </div>

            <div className="mt-8">
              <Link href="/featured-bookstores">
                <Button className="h-12 min-w-[224px] cursor-pointer rounded-md bg-[#6B95BF] px-8 text-[18px] font-medium text-white shadow-none hover:bg-[#5b86b0]">
                  Browse Books
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-4">
              {slides.map((_, index) => {
                const isActive = index === activeSlide
                return isActive ? (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#5AA2E8] bg-white"
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <span className="h-3 w-3 rounded-full bg-[#5AA2E8]" />
                  </button>
                ) : (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className="h-2.5 w-2.5 cursor-pointer rounded-full border border-[#5AA2E8]/60 bg-[#B9D9F7]"
                    aria-label={`Go to slide ${index + 1}`}
                  />
                )
              })}
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[560px]">
              <div className="absolute inset-4 rounded-[36px] bg-white/50 blur-3xl" />
              <div className="relative z-10 h-[420px] w-full overflow-hidden rounded-[26px] bg-white/45">
                {slides.map((slide, index) => (
                  <Image
                    key={slide.image}
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className={`object-cover transition-opacity duration-700 ease-in-out ${
                      index === activeSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
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
