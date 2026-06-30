'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const footerSections = {
  quickLinks: [
    { key: 'nav.home', href: '/' },
    { key: 'footer.browseBooks', href: '/all-books' },
    { key: 'nav.categories', href: '/categories' },
    { key: 'nav.order', href: '/order' },
  ],
  menu: [
    { key: 'nav.aboutUs', href: '/about-us' },
    { key: 'account.privacyPolicy', href: '/privacy-policy' },
    { key: 'account.terms', href: '/t&c' },
    { key: 'account.chooseLanguage', href: '/account' },
  ],
  support: [{ key: 'footer.contactUs', href: '/contact' }],
}

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useTranslation()

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
            <div className="relative h-[122px] w-[193px] overflow-hidden">
              <Image
                src="/images/footer-logo.png"
                alt="Books and shack logo"
                fill
                className="scale-[1.55] object-contain object-center opacity-90 brightness-[2.5]"
              />
            </div>
            <p className="mt-4 max-w-[24ch] text-[13px] leading-5 text-white/80">
              {t('footer.aboutText')}
            </p>

            <div className="mt-6 space-y-3 text-[13px] text-white/85">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Dijon, France</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                <span>booksonwheels21000@gmail.com</span>
              </div>
              {/* <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                <span>07.60.16.72.24</span>
              </div> */}
            </div>
          </div>

          <FooterColumn title={t('footer.quickLinks')} items={footerSections.quickLinks} />
          <FooterColumn title={t('footer.menu')} items={footerSections.menu} />
          <div className="flex flex-col justify-between">
            <FooterColumn title={t('footer.support')} items={footerSections.support} />
            <div className="pt-8 text-left text-[13px] text-white/85 lg:pt-10 lg:text-right">
              © {currentYear} {t('footer.rights')}
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
  items: { key: string; href: string }[]
}) {
  const { t } = useTranslation()

  return (
    <div>
      <h3 className="text-[18px] font-medium text-white">{title}</h3>
      <div className="mt-5 space-y-3 text-[14px] text-white/80">
        {items.map(item => (
          <Link
            key={item.key}
            href={item.href}
            className="block transition-colors hover:text-white"
          >
            {t(item.key)}
          </Link>
        ))}
      </div>
    </div>
  )
}
