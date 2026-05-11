import Image from 'next/image'

import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
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
          <div className="mb-8 inline-flex w-fit rounded-full border border-[#459AE4]/20 bg-white/80 px-4 py-2 text-sm text-[#5F83A2] shadow-sm">
            Curated books from trusted local sellers
          </div>

          <h1 className="font-display  max-w-[16ch] text-5xl leading-[1.12] tracking-normal text-[#111111] sm:text-6xl">
            Discover Your Next Great Read
          </h1>

          <p className="mt-6  text-xl leading-[1.55] font-light text-[#232323] sm:text-[22px]">
            Discover millions of books from local sellers worldwide. <br /> Same
            great reads, better impact.
          </p>

          <div className="mt-10">
            <Button className="h-14 min-w-[284px] rounded-2xl bg-[linear-gradient(90deg,#5F83A2_0%,#5E92C0_100%)] text-xl font-semibold shadow-[0_20px_45px_rgba(94,146,192,0.24)] hover:opacity-95">
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

        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-[560px]">
            <div className="absolute inset-4 rounded-[36px] bg-white/50 blur-3xl" />
            <Image
              src="/images/hero-banner.png"
              alt="Featured book collection"
              width={1367}
              height={1151}
              priority
              className="relative z-10 h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
