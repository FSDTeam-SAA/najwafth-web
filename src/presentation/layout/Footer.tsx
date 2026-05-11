import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

import { footerColumns } from '@/presentation/home/homeData'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1f1f1f] text-white">
      <Image
        src="/images/Footer.png"
        alt=""
        fill
        aria-hidden="true"
        className="object-cover object-left-bottom opacity-75"
      />

      <div className="relative container mx-auto px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_0.9fr_0.9fr_0.8fr]">
          <div>
            <div className="relative h-[122px] w-[193px]">
              <Image
                src="/images/logo.png"
                alt="Books and shack logo"
                fill
                className="object-contain opacity-90 brightness-[2.5]"
              />
            </div>
            <p className="mt-4 max-w-[24ch] text-[13px] leading-5 text-white/80">
              Your curated marketplace for independent bookstores and
              passionate readers.
            </p>

            <div className="mt-6 space-y-3 text-[13px] text-white/85">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>LilienstraBe 120, 10115 Berlin</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                <span>bz@mail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+1234 567 889</span>
              </div>
            </div>
          </div>

          <FooterColumn title="Quick Links" items={footerColumns.quickLinks} />
          <FooterColumn title="Menu" items={footerColumns.menu} />
          <div className="flex flex-col justify-between">
            <FooterColumn title="Support" items={footerColumns.support} />
            <div className="pt-8 text-left text-[13px] text-white/85 lg:pt-10 lg:text-right">
              © 2025 All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  return (
    <div>
      <h3 className="text-[18px] font-medium text-white">{title}</h3>
      <div className="mt-5 space-y-3 text-[14px] text-white/80">
        {items.map(item => (
          <Link
            key={item}
            href="/"
            className="block transition-colors hover:text-white"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  )
}
