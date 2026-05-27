'use client'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/**
 * 页面切换入场动画——用 CSS keyframe 替代 framer-motion AnimatePresence。
 * key={pathname} 让 React 在路由变化时重建 DOM，触发动画重播。
 * 没有退出动画（新页立刻显示），视觉上更轻快。
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div key={pathname} className="page-fade-in">
      {children}
    </div>
  )
}
