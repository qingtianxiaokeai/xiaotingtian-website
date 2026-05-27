'use client'
import { useEffect, useRef } from 'react'

/**
 * 追踪鼠标位置。
 * 原版使用 framer-motion useMotionValue，现改为原生 useRef，
 * 不引入任何第三方库。CursorGlow 已改用直接的 mousemove 监听，
 * 此 hook 保留供未来使用。
 */
export function useMousePosition() {
  const x = useRef(0)
  const y = useRef(0)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.current = e.clientX
      y.current = e.clientY
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return { x, y }
}

// 别名，兼容旧代码
export { useMousePosition as useMouseMotionValue }
