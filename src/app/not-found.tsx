'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const router = useRouter()

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    const timer = window.setTimeout(() => setIsLoaded(true), 100)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#fafafa] px-4 py-14 text-[#1f2c3a]">
      <div className="pointer-events-none absolute inset-0 hero-haze" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="absolute rounded-full border border-[#dce3ea]/90"
            style={{
              width: `${(index + 1) * 120}px`,
              height: `${(index + 1) * 120}px`,
              left: `calc(50% - ${(index + 1) * 60}px)`,
              top: `calc(50% - ${(index + 1) * 60}px)`,
              opacity: 0.4 - index * 0.06,
              transform: `translate(${mousePosition.x * (index + 1) * 8}px, ${mousePosition.y * (index + 1) * 8}px)`,
              transition: 'transform 0.3s ease-out',
              animation: `ring-pulse ${9 + index * 1.8}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      <section
        className={`relative z-10 w-full max-w-2xl rounded-[22px] border border-[#dce3ea] bg-white/90 px-6 py-10 text-center shadow-[0_10px_40px_rgba(44,88,124,0.08)] backdrop-blur-sm transition-all duration-700 sm:px-10 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#5f83a2]">
          Lost in the stacks?
        </p>

        <div
          className="relative mb-3"
          style={{
            transform: `translate(${mousePosition.x * 12}px, ${mousePosition.y * 12}px)`,
            transition: 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          <h1 className="font-display text-[6.6rem] leading-none text-[#264d73] sm:text-[8.4rem]">
            404
          </h1>
          <span
            className="mx-auto mt-2 block h-[3px] rounded-full bg-[linear-gradient(90deg,#5F83A2_0%,#5E92C0_100%)]"
            style={{ width: isLoaded ? '170px' : '0px', transition: 'width 0.7s ease' }}
          />
        </div>

        <h2 className="font-display text-3xl text-[#2f3f50] sm:text-4xl">Page not found</h2>
        <p className="mx-auto mt-4 max-w-[42ch] text-sm leading-relaxed text-[#5e6772] sm:text-base">
          The page you are looking for may have been moved, renamed, or no longer exists.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            asChild
            className="h-12 min-w-[180px] rounded-xl bg-[linear-gradient(90deg,#5F83A2_0%,#5E92C0_100%)] px-6 text-base font-semibold text-white shadow-none hover:opacity-95"
            style={{
              transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`,
              transition: 'transform 0.3s ease-out, opacity 0.3s ease',
            }}
          >
            <Link href="/">Back to home</Link>
          </Button>

          <Button
            variant="outline"
            onClick={() => router.back()}
            className="h-12 min-w-[180px] rounded-xl border-[#b8c9d8] px-6 text-base font-semibold text-[#355373] hover:border-[#8ba9c3] hover:text-[#264d73]"
            style={{
              transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`,
              transition: 'transform 0.3s ease-out, border-color 0.3s ease, color 0.3s ease',
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go back
          </Button>
        </div>
      </section>

      <style jsx global>{`
        @keyframes ring-pulse {
          0% {
            transform: scale(1) rotate(0deg);
          }
          100% {
            transform: scale(1.06) rotate(4deg);
          }
        }
      `}</style>
    </main>
  )
}
