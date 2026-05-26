import type { Metadata } from 'next'
import Game2048 from '@/components/games/Game2048'
import Link from 'next/link'

export const metadata: Metadata = { title: '2048' }

export default function Game2048Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 gap-8">
      <Game2048 />
      <Link href="/portfolio" className="text-sm text-[var(--color-text-muted)] hover:text-[#FF6B6B] transition-colors">
        ← 返回作品集
      </Link>
    </div>
  )
}
