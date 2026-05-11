'use client'

import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { BookProductCard } from '@/presentation/home/BookProductCard'
import { bookstoreProducts } from '@/presentation/home/homeData'

const categoryOptions = [
  'Classic',
  'Romance',
  'Fantasy',
  'Adventure',
  'Mystery',
]

export function BooksCategoriesPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Classic',
  ])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  function toggleCategory(category: string) {
    setSelectedCategories(current =>
      current.includes(category)
        ? current.filter(item => item !== category)
        : [...current, category],
    )
  }

  return (
    <section className="bg-[#FAFAFA]">
      <div className="border-b border-[#d9e7f2] bg-[#edf5fb]">
        <div className="container mx-auto flex h-12 items-center justify-end px-4 sm:px-6 lg:px-10">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(current => !current)}
            className="inline-flex items-center gap-2 text-[16px] font-medium text-[#111827]"
            aria-expanded={isDropdownOpen}
            aria-controls="categories-dropdown"
          >
            <span>Select Categories</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-14 sm:px-6 lg:px-10 lg:py-18">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_192px] xl:items-start">
          <div className="relative overflow-hidden">
            <Image
              src="/images/leaf-icon.png"
              alt=""
              width={120}
              height={120}
              aria-hidden="true"
              className="pointer-events-none absolute right-[25%] top-7 h-auto w-[96px] opacity-45"
            />
            <Image
              src="/images/leaf-icon.png"
              alt=""
              width={180}
              height={180}
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2 left-[-3.5rem] h-auto w-[150px] opacity-40"
            />

            <div className="mx-auto max-w-[720px] text-center">
              <h1 className="font-display text-4xl leading-[1.2] text-[#111111] sm:text-6xl">
                Books Categories
              </h1>
              <p className="mx-auto mt-4  text-[24px] leading-[1.45] text-[#111111]">
                Discover unique collections from our Top Categories
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {bookstoreProducts.map(product => (
                <BookProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <aside className="relative xl:sticky xl:top-24">
            <div ref={dropdownRef} className="relative xl:min-h-[56px]">
              {isDropdownOpen ? (
                <div
                  id="categories-dropdown"
                  className="right-0 top-0 overflow-hidden rounded-none border border-[#d6dbe3] bg-white shadow-sm xl:absolute xl:w-[192px]"
                >
                  <div className="bg-[linear-gradient(90deg,#5F83A2_0%,#5E92C0_100%)] px-3 py-3 text-[15px] font-semibold text-white">
                    Select Categories
                  </div>

                  <div className="divide-y divide-[#e7edf2]">
                    {categoryOptions.map(category => {
                      const checked = selectedCategories.includes(category)

                      return (
                        <label
                          key={category}
                          className="flex cursor-pointer items-center justify-between px-3 py-3 text-[15px] text-[#111827]"
                        >
                          <span>{category}</span>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleCategory(category)}
                            className="h-3.5 w-3.5 rounded-[2px] border border-[#459AE4] text-[#459AE4] focus:ring-[#459AE4]"
                          />
                        </label>
                      )
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
