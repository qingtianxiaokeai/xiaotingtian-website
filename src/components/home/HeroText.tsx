'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const roles = [
  { label: '前端开发工程师', color: 'from-[#FF6B6B] to-[#FFE66D]' },
  { label: 'UI/UX 设计师', color: 'from-[#A855F7] to-[#4ECDC4]' },
  { label: '创意内容创作者', color: 'from-[#4ECDC4] to-[#3B82F6]' },
]

export default function HeroText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % roles.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-start gap-6">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-sm font-medium text-[var(--color-text-secondary)] tracking-widest uppercase"
      >
        👋 你好，我是
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl font-bold leading-tight md:text-7xl"
      >
        <span className="gradient-text">小青天</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center gap-3 text-xl md:text-2xl font-medium"
      >
        <span className="text-[var(--color-text-secondary)]">我是一名</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className={`bg-gradient-to-r ${roles[index].color} bg-clip-text text-transparent font-bold`}
          >
            {roles[index].label}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-md text-[var(--color-text-secondary)] leading-relaxed"
      >
        热爱创意与技术的交汇点，用代码把设计变成真实体验。专注于构建兼顾颜值与性能的 Web 产品。
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap gap-4 pt-2"
      >
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] px-7 py-3.5 font-medium text-white shadow-lg hover:opacity-90 hover:shadow-[#FF6B6B]/40 transition-all active:scale-95"
        >
          看看我的作品 →
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border-2 border-[#FF6B6B] px-7 py-3.5 font-medium text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white transition-all active:scale-95"
        >
          联系我
        </Link>
      </motion.div>
    </div>
  )
}
