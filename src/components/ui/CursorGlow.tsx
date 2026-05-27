'use client'
import { useEffect, useRef } from 'react'

/** 鼠标光晕——只在有鼠标的设备上启用，移动端不渲染任何内容 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 触摸屏设备直接跳过，不创建监听器
    if (!window.matchMedia('(pointer: fine)').matches) return

    const el = ref.current
    if (!el) return
    el.style.display = 'block'

    const move = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed z-0 h-[400px] w-[400px] rounded-full"
      style={{
        display: 'none',
        background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.06) 0%, transparent 65%)',
        willChange: 'transform',
        transition: 'transform 0.08s ease-out',
      }}
    />
  )
}
