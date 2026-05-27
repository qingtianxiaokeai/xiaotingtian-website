'use client'
import { useState } from 'react'
import Image from 'next/image'
import HeroText from './HeroText'
import HeroCanvas from './HeroCanvas'

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

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
            {/* 占位骨架：图片未加载时撑开空间，避免布局抖动 */}
            <div className="relative w-52 md:w-full md:max-w-[420px]">
              {!loaded && (
                <div
                  className="w-full animate-pulse rounded-3xl"
                  style={{
                    aspectRatio: '480 / 580',
                    background: 'var(--accent-light)',
                  }}
                />
              )}
              <Image
                src="/images/zhuyei.png"
                alt="小青天形象"
                width={480}
                height={580}
                priority
                onLoad={() => setLoaded(true)}
                className={`w-full h-auto transition-opacity duration-500 ${
                  loaded ? 'opacity-100' : 'absolute inset-0 opacity-0'
                }`}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
