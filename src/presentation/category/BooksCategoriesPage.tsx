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
      {/* Header with Dropdown */}
      <div className="border-b border-[#d9e7f2] bg-[#edf5fb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between py-4">
            <div className="flex-1" />
            <div className="relative" ref={dropdownRef}>
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

              {isDropdownOpen && (
                <div
                  id="categories-dropdown"
                  className="absolute right-0 top-full z-10 mt-2 w-48 overflow-hidden rounded border border-[#d6dbe3] bg-white shadow-md"
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
                          className="flex cursor-pointer items-center justify-between px-3 py-3 text-[15px] text-[#111827] hover:bg-[#f5f5f5]"
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
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-10 lg:py-18">
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

          {/* Title Section */}
          <div className="mx-auto max-w-[720px] text-center">
            <h1 className="font-display text-4xl leading-[1.2] text-[#111111] sm:text-6xl">
              Books Categories
            </h1>
            <p className="mx-auto mt-4 text-[24px] leading-[1.45] text-[#111111]">
              Discover unique collections from our Top Categories
            </p>
          </div>

          {/* Products Grid - Centered Container */}
          <div className="mt-12 mx-auto max-w-7xl">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {bookstoreProducts.map(product => (
                <BookProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
