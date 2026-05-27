'use client'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
  className?: string
}

const initialTransform: Record<string, string> = {
  up:    'translateY(22px)',
  left:  'translateX(-30px)',
  right: 'translateX(30px)',
}

/**
 * 滚动入场动画——用 IntersectionObserver + CSS transition 替代 framer-motion whileInView。
 * 全程不依赖任何第三方库。
 */
export default function ScrollReveal({ children, delay = 0, direction = 'up', className }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.opacity = '0'
    el.style.transform = initialTransform[direction]
    el.style.transition = `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translate(0,0)'
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, direction])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
