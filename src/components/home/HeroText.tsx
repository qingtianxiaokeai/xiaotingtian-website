'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const roles = ['AI 数据训练师', '电气工程师', '单片机发烧友', '创意内容创造者']
const nameChars = ['小', '青', '天']

/**
 * 首屏文字区域。
 * 原来用 framer-motion initial:opacity0 → animate，JS 未加载时内容不可见。
 * 现改为纯 CSS @keyframes，CSS 加载完立刻播，不依赖 JS 执行。
 * 角色切换保留 JS state，但用 key= 触发 CSS 动画重播，效果相同。
 */
export default function HeroText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % roles.length), 3200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex flex-col items-start gap-5">

      {/* Eyebrow */}
      <p
        className="hero-fadeup text-xs font-semibold tracking-[0.1em] uppercase text-[var(--accent)]"
        style={{ animationDelay: '0s' }}
      >
        你好，我是
      </p>

      {/* Hero H1：逐字入场 */}
      <h1
        className="flex gap-0 text-[clamp(52px,9vw,80px)] font-bold leading-none tracking-tight hero-gradient-text text-[var(--color-text-primary)]"
        style={{ fontFamily: 'var(--font-heading)' }}
        aria-label="小青天"
      >
        {nameChars.map((char, i) => (
          <span
            key={char}
            className="hero-fadeup"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </h1>

      {/* 角色切换：key 变化触发 CSS 动画重播，替代 AnimatePresence */}
      <div
        className="hero-fadeup flex items-center gap-2.5 text-lg md:text-xl font-medium"
        style={{ animationDelay: '0.38s' }}
      >
        <span className="text-[var(--color-text-secondary)]">我是一名</span>
        <span
          key={index}
          className="hero-role-switch font-semibold text-[var(--accent)]"
        >
          {roles[index]}
        </span>
      </div>

      {/* 简介 */}
      <p
        className="hero-fadeup max-w-md text-[var(--color-text-secondary)] leading-[1.8] text-[15px]"
        style={{ animationDelay: '0.5s' }}
      >
        横跨 AI 数据工程、电气系统与嵌入式硬件，兼具创意内容输出能力。热衷于将技术与创造力融合，探索人机交互的无限可能。
      </p>

      {/* CTA 按钮 */}
      <div
        className="hero-fadeup flex flex-wrap gap-3 pt-1"
        style={{ animationDelay: '0.62s' }}
      >
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all"
          style={{
            background: 'var(--accent)',
            boxShadow: '0 4px 16px rgba(var(--accent-rgb), 0.25)',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'var(--accent-hover)'
            el.style.transform = 'translateY(-1px)'
            el.style.boxShadow = '0 6px 20px rgba(var(--accent-rgb), 0.35)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'var(--accent)'
            el.style.transform = ''
            el.style.boxShadow = '0 4px 16px rgba(var(--accent-rgb), 0.25)'
          }}
        >
          看看我的作品 →
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition-all"
          style={{ borderColor: 'var(--border-hover)', color: 'var(--accent)' }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'var(--accent-light)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = ''
          }}
        >
          联系我
        </Link>
      </div>

    </div>
  )
}
