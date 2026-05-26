import HeroSection from '@/components/home/HeroSection'
import MarqueeBanner from '@/components/home/MarqueeBanner'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import LatestPosts from '@/components/home/LatestPosts'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeBanner />
      <FeaturedProjects />
      <LatestPosts />
    </>
  )
}
