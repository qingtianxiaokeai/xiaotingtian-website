import Image from 'next/image'
import HeroText from './HeroText'
import HeroCanvas from './HeroCanvas'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center px-6 py-20 overflow-hidden">
      <HeroCanvas />

      <div className="mx-auto w-full max-w-5xl relative z-10">
        {/* 手机：flex-col-reverse 让头像在上、文字在下；桌面：左文字右头像 */}
        <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:items-center">

          {/* 左侧：文字（桌面）/ 下方（手机） */}
          <div className="flex-1 w-full">
            <HeroText />
          </div>

          {/* 右侧：3D 头像（桌面）/ 上方（手机） */}
          <div className="w-full flex justify-center md:w-[48%] md:justify-end">
            <div className="animate-float" style={{ animationDuration: '5s' }}>
              <Image
                src="/images/avatar-3d.png"
                alt="小青天 3D 形象"
                width={480}
                height={580}
                priority
                className="w-56 h-auto md:w-full md:max-w-[480px] drop-shadow-2xl mix-blend-multiply"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 右下角小型装饰圆（原 320px 缩至 1/3 ≈ 107px），仅桌面显示 */}
      <div className="absolute bottom-6 right-6 hidden md:block"
        style={{ width: 107, height: 107 }}
      >
        <div
          className="absolute inset-0 rounded-full animate-spin-slow"
          style={{
            background: 'conic-gradient(from 0deg, #FF6B6B, #A855F7, #4ECDC4, #FFE66D, #FF6B6B)',
            padding: 2,
          }}
        >
          <div className="w-full h-full rounded-full bg-[var(--color-bg-base)]" />
        </div>
        <div className="absolute inset-2 rounded-full flex items-center justify-center text-lg animate-float">
          ✨
        </div>
      </div>

    </section>
  )
}
