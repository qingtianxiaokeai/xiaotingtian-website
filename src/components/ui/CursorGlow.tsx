'use client'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'

export default function CursorGlow() {
  const { x, y } = useMousePosition()
  const springConfig = { stiffness: 150, damping: 20 }
  const springX = useSpring(useTransform(x, v => v - 60), springConfig)
  const springY = useSpring(useTransform(y, v => v - 60), springConfig)

  return (
    <motion.div
      className="pointer-events-none fixed z-50 h-32 w-32 rounded-full opacity-0 md:opacity-100"
      style={{
        x: springX,
        y: springY,
        background: 'radial-gradient(circle, rgba(255,107,107,0.15) 0%, rgba(168,85,247,0.08) 50%, transparent 70%)',
      }}
    />
  )
}
