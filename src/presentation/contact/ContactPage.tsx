import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const contactHighlights = [
  {
    title: 'Email Us',
    value: 'info@talewash.ma',
    icon: Mail,
  },
  {
    title: 'Call Us',
    value: 'Phone (212)662730053',
    icon: Phone,
  },
  {
    title: 'Our Location',
    value: 'Linienstraße 120, 10115 Berlin',
    icon: MapPin,
  },
]

const contactDetails = [
  {
    label: 'Address',
    value: '123 Library, Book City',
    icon: MapPin,
  },
  {
    label: 'Email',
    value: 'bz@gmail.com',
    icon: Mail,
  },
  {
    label: 'Phone Number',
    value: '+1234 567 889',
    icon: Phone,
  },
]

export function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] py-14 sm:py-18">
      <Image
        src="/images/leaf-icon.png"
        alt=""
        width={120}
        height={120}
        aria-hidden="true"
        className="pointer-events-none absolute right-[31%] top-20 h-auto w-[92px] opacity-45"
      />
      <Image
        src="/images/leaf-icon.png"
        alt=""
        width={180}
        height={180}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-[-2.5rem] h-auto w-[150px] opacity-40"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[900px] text-center">
          <h1 className="font-display text-4xl leading-[1.2] text-[#111111] sm:text-[56px]">
            Contact Us
          </h1>
          <p className="mx-auto mt-4  text-[22px] leading-normal text-[#222222]">
            Have a question about books, orders, delivery, or bookstore support?
            We&apos;re here to help! Send us a message and our team will get
            back to you soon.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {contactHighlights.map(item => {
            const Icon = item.icon

            return (
              <Card
                key={item.title}
                className="rounded-[18px] shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
              >
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f2f4ff] text-[#3f3f46]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-6 text-[34px] leading-tight text-[#1f2937]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-[15px] text-[#7b7b7b]">
                    {item.value}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="mt-6 overflow-hidden rounded-[18px] border border-[#e7edf2] shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
          <div className="grid lg:grid-cols-[340px_minmax(0,1fr)]">
            <div className="border-b border-[#e7edf2] bg-white px-2 py-6 lg:border-b-0 lg:border-r lg:px-8 lg:py-8">
              <div className="flex flex-col items-center rounded-[12px] border-b border-[#e7edf2] py-3 text-center">
                <div className="relative h-[109px] w-[172px] overflow-hidden">
                  <Image
                    src="/images/logo.png"
                    alt="Books on wheels logo"
                    fill
                    className="scale-[1.6] object-contain object-center"
                  />
                </div>
                <h2 className="mt-5 text-[34px] leading-tight text-[#459AE4]">
                  Books on Wheels
                </h2>
                <p className="mt-3 text-[14px] leading-6 text-[#6b7280]">
                  Your trusted platform for discovering books from independent
                  bookstores.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-[28px] font-semibold text-[#111827]">
                  Contact Information
                </h3>
                <div className="mt-6 space-y-5">
                  {contactDetails.map(item => {
                    const Icon = item.icon

                    return (
                      <div key={item.label} className="flex items-start gap-3">
                        <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#459AE4] text-white">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="text-[16px] font-medium text-[#111827]">
                            {item.label}
                          </p>
                          <p className="mt-1 text-[14px] text-[#6b7280]">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="relative bg-white px-5 py-6 lg:px-8 lg:py-8">
              <Image
                src="/images/leaf-icon.png"
                alt=""
                width={120}
                height={120}
                aria-hidden="true"
                className="pointer-events-none absolute bottom-6 right-5 h-auto w-[78px] opacity-25"
              />

              <form className="relative grid gap-4">
                <Field label="Name" placeholder="Enter your Name" />
                <Field
                  label="Email Address"
                  placeholder="Enter your email..."
                />
                <Field label="Phone Number" placeholder="+123456" />
                <Field label="Reason for contact" placeholder="Reason..." />
                <Field
                  label="Description"
                  placeholder="Write your message here..."
                  textarea
                />

                <div className="mt-1 flex justify-end gap-3">
                  <Button
                    variant="outline"
                    className="h-8 rounded-md border-[#9ec6ee] px-3 text-[12px] text-[#5F83A2]"
                  >
                    Cancel
                  </Button>
                  <Button className="h-8 rounded-md bg-[linear-gradient(90deg,#5F83A2_0%,#5E92C0_100%)] px-4 text-[12px] shadow-none hover:opacity-95">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

function Field({
  label,
  placeholder,
  textarea = false,
}: {
  label: string
  placeholder: string
  textarea?: boolean
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[13px] font-medium text-[#459AE4]">{label}</span>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          rows={6}
          className="min-h-[160px] rounded-md border border-[#d7e0ea] px-4 py-3 text-[15px] text-[#111827] outline-none transition focus:border-[#459AE4]"
        />
      ) : (
        <input
          placeholder={placeholder}
          className="h-12 rounded-md border border-[#d7e0ea] px-4 py-2.5 text-[15px] text-[#111827] outline-none transition focus:border-[#459AE4]"
        />
      )}
    </label>
  )
}
