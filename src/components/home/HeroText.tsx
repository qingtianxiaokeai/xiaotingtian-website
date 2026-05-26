'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const roles = ['AI 数据训练师', '电气工程师', '单片机发烧友', '创意内容创造者']

const nameChars = ['小', '青', '天']

const charVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

export default function HeroText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % roles.length), 3200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex flex-col items-start gap-5">

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold tracking-[0.1em] uppercase text-[var(--accent)]"
      >
        你好，我是
      </motion.p>

      {/* Hero H1：逐字入场 */}
      <motion.h1
        initial="hidden"
        animate="visible"
        className="flex gap-0 text-[clamp(52px,9vw,80px)] font-bold leading-none tracking-tight hero-gradient-text text-[var(--color-text-primary)]"
        style={{ fontFamily: 'var(--font-heading)' }}
        aria-label="小青天"
      >
        {nameChars.map((char, i) => (
          <motion.span key={char} variants={charVariants} custom={i}>
            {char}
          </motion.span>
        ))}
      </motion.h1>

      {/* 角色切换 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.38 }}
        className="flex items-center gap-2.5 text-lg md:text-xl font-medium"
      >
        <span className="text-[var(--color-text-secondary)]">我是一名</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="font-semibold text-[var(--accent)]"
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* 简介 */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="max-w-md text-[var(--color-text-secondary)] leading-[1.8] text-[15px]"
      >
        横跨 AI 数据工程、电气系统与嵌入式硬件，兼具创意内容输出能力。热衷于将技术与创造力融合，探索人机交互的无限可能。
      </motion.p>

      {/* CTA 按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.62 }}
        className="flex flex-wrap gap-3 pt-1"
      >
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all"
          style={{
            background: 'var(--accent)',
            boxShadow: '0 4px 16px rgba(var(--accent-rgb), 0.25)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(var(--accent-rgb), 0.35)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'var(--accent)'
            ;(e.currentTarget as HTMLElement).style.transform = ''
            ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(var(--accent-rgb), 0.25)'
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
      </motion.div>

    </div>
  )
}
