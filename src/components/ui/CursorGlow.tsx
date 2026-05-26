'use client'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'

export default function CursorGlow() {
  const { x, y } = useMousePosition()
  const cfg = { stiffness: 120, damping: 22 }
  const springX = useSpring(useTransform(x, v => v - 200), cfg)
  const springY = useSpring(useTransform(y, v => v - 200), cfg)

  return (
    <motion.div
      className="pointer-events-none fixed z-0 h-[400px] w-[400px] rounded-full opacity-0 md:opacity-100"
      style={{
        x: springX,
        y: springY,
        background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.06) 0%, transparent 65%)',
      }}
    />
  )
}
