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

          {/* 右侧：3D 头像 */}
          <div className="w-full flex justify-center md:w-[46%] md:justify-end">
            <div
              style={{
                animation: 'heroFloat 6s ease-in-out infinite',
                filter: 'drop-shadow(0 24px 48px rgba(var(--accent-rgb), 0.2))',
              }}
            >
              <Image
                src="/images/avatar-3d.png"
                alt="小青天 3D 形象"
                width={480}
                height={580}
                priority
                className="w-52 h-auto md:w-full md:max-w-[420px]"
              />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
      `}</style>
    </section>
  )
}
