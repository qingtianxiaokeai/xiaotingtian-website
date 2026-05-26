'use client'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function ScrollProgressBar() {
  const progress = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]">
      <div
        className="h-full transition-all duration-100"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(to right, #FF6B6B, #A855F7, #4ECDC4)',
        }}
      />
    </div>
  )
}
