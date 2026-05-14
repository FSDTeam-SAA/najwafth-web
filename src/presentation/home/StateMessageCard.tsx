import type { LucideIcon } from 'lucide-react'

type StateMessageCardProps = {
  title: string
  description: string
  icon: LucideIcon
  tone?: 'error' | 'neutral'
}

export function StateMessageCard({
  title,
  description,
  icon: Icon,
  tone = 'neutral',
}: StateMessageCardProps) {
  const isError = tone === 'error'

  return (
    <div
      className={`rounded-2xl border px-4 py-4 sm:px-5 sm:py-5 ${
        isError
          ? 'border-red-200 bg-[linear-gradient(180deg,#fff6f6_0%,#fff1f1_100%)]'
          : 'border-[#dce3ea] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]'
      }`}
    >
      <div className="mx-auto flex max-w-[560px] flex-col items-center text-center">
        <div
          className={`inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${
            isError ? 'bg-red-100 text-red-600' : 'bg-[#e8f2fc] text-[#459AE4]'
          }`}
        >
          <Icon className="h-8 w-8" />
        </div>

        <div className="mt-4">
          <p
            className={`text-[26px] leading-tight font-semibold ${
              isError ? 'text-red-700' : 'text-[#1f2937]'
            }`}
          >
            {title}
          </p>
          <p
            className={`mt-2 text-[17px] leading-7 ${
              isError ? 'text-red-600' : 'text-[#475569]'
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
