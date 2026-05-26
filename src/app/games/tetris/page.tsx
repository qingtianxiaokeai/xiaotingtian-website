import type { Metadata } from 'next'
import Tetris from '@/components/games/Tetris'
import Link from 'next/link'

export const metadata: Metadata = { title: '俄罗斯方块' }

export default function TetrisPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 gap-8">
      <Tetris />
      <Link href="/portfolio" className="text-sm text-[var(--color-text-muted)] hover:text-[#FF6B6B] transition-colors">
        ← 返回作品集
      </Link>
    </div>
  )
}
