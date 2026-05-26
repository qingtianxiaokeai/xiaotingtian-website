import Image from 'next/image'
import HeroText from './HeroText'
import HeroCanvas from './HeroCanvas'

export default function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex items-center px-6 py-20 overflow-hidden">
      <HeroCanvas />

      <div className="mx-auto w-full max-w-5xl relative z-10">
        <div className="flex flex-col-reverse items-center gap-10 md:flex-row md:items-center">

          {/* 左侧：文字 */}
          <div className="flex-1 w-full">
            <HeroText />
          </div>

          {/* 右侧：头像 */}
          <div className="w-full flex justify-center md:w-[46%] md:justify-end">
            <Image
              src="/images/zhuyei.png"
              alt="小青天形象"
              width={480}
              height={580}
              priority
              className="w-52 h-auto md:w-full md:max-w-[420px]"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
