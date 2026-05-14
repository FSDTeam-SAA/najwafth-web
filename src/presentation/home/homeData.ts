export type ProductItem = {
  id: number | string
  categoryId?: string
  title: string
  author: string
  location: string
  price: string
  rating: string
  image: string
  imagePosition: string
}

export const bookstoreProducts: ProductItem[] = Array.from(
  { length: 8 },
  (_, index) => ({
    id: index + 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    location: '123 Library, Book City',
    price: '$ 12.99',
    rating: '4.8',
    image: '/images/book1.jpg',
    imagePosition:
      index % 4 === 0
        ? 'object-[50%_18%]'
        : index % 4 === 1
          ? 'object-[50%_35%]'
          : index % 4 === 2
            ? 'object-[50%_55%]'
            : 'object-[50%_72%]',
  }),
)

export const popularBooks: ProductItem[] = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  location: '123 Library, Book City',
  price: '$ 12.99',
  rating: '4.8',
  image: '/images/book1.jpg',
  imagePosition:
    index % 4 === 0
      ? 'object-[35%_24%]'
      : index % 4 === 1
        ? 'object-[56%_36%]'
        : index % 4 === 2
          ? 'object-[50%_58%]'
          : 'object-[62%_72%]',
}))

export const featuredBookstoresCatalog: ProductItem[] = Array.from(
  { length: 16 },
  (_, index) => ({
    ...bookstoreProducts[index % bookstoreProducts.length],
    id: index + 1,
  }),
)

export const popularBooksCatalog: ProductItem[] = Array.from(
  { length: 16 },
  (_, index) => ({
    ...popularBooks[index % popularBooks.length],
    id: index + 1,
  }),
)

export const topCategories = [
  {
    id: 1,
    title: 'Romance',
    image: '/images/book1.jpg',
    imagePosition: 'object-[35%_34%]',
  },
  {
    id: 2,
    title: 'Fiction',
    image: '/images/book1.jpg',
    imagePosition: 'object-[82%_50%]',
  },
  {
    id: 3,
    title: 'Classic',
    image: '/images/book1.jpg',
    imagePosition: 'object-[72%_68%]',
  },
  {
    id: 4,
    title: 'Fantasy',
    image: '/images/book1.jpg',
    imagePosition: 'object-[52%_54%]',
  },
  {
    id: 5,
    title: 'Adventure',
    image: '/images/book1.jpg',
    imagePosition: 'object-[38%_20%]',
  },
  {
    id: 6,
    title: 'Mystery',
    image: '/images/book1.jpg',
    imagePosition: 'object-[82%_44%]',
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Anna M',
    role: 'Property Owner',
    review:
      'Found my dream Books in just 3 days! The virtual tour saved me hours, and the agent handled all the paperwork. Truly stress-free!',
  },
  {
    id: 2,
    name: 'Anna M',
    role: 'Property Owner',
    review:
      'Found my dream Books in just 3 days! The virtual tour saved me hours, and the agent handled all the paperwork. Truly stress-free!',
  },
  {
    id: 3,
    name: 'Anna M',
    role: 'Property Owner',
    review:
      'Found my dream Books in just 3 days! The virtual tour saved me hours, and the agent handled all the paperwork. Truly stress-free!',
  },
]

export const footerColumns = {
  quickLinks: ['Home', 'Browse Books', 'Categories', 'Order'],
  menu: ['About us', 'Privacy Policy', 'Terms & Conditions', 'Choose Language'],
  support: ['Contact Us'],
}
