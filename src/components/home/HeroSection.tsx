import HeroText from './HeroText'
import HeroCanvas from './HeroCanvas'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center px-6 py-20">
      <HeroCanvas />
      <div className="mx-auto w-full max-w-5xl">
        <HeroText />
      </div>
    </section>
  )
}
