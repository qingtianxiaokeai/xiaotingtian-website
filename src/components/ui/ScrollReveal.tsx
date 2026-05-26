'use client'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
  className?: string
}

const directionMap = {
  up: { y: 30, x: 0 },
  left: { y: 0, x: -30 },
  right: { y: 0, x: 30 },
}

export default function ScrollReveal({ children, delay = 0, direction = 'up', className }: Props) {
  const initial = { opacity: 0, ...directionMap[direction] }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
