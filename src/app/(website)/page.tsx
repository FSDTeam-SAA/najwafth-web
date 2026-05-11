import { AchievementSection } from '@/presentation/home/AchievementSection'
import { ExploreCategoriesSection } from '@/presentation/home/ExploreCategoriesSection'
import { FeaturedProducts } from '@/presentation/home/FeaturedProducts'
import { HeroSection } from '@/presentation/home/HeroSection'
import { PopularBooksSection } from '@/presentation/home/PopularBooksSection'
import { TestimonialsSection } from '@/presentation/home/TestimonialsSection'

export default function WebsiteHomePage() {
  return (
    <div className="bg-[#FAFAFA]">
      <HeroSection />
      <FeaturedProducts />
      <PopularBooksSection />
      <ExploreCategoriesSection />
      <AchievementSection />
      <TestimonialsSection />
    </div>
  )
}
