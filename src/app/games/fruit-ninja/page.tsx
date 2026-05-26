import type { Metadata } from 'next'
import FruitNinja from '@/components/games/FruitNinja'
import Link from 'next/link'

export const metadata: Metadata = { title: '水果忍者' }

export default function FruitNinjaPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 gap-8">
      <FruitNinja />
      <Link href="/portfolio" className="text-sm text-[var(--color-text-muted)] hover:text-[#FF6B6B] transition-colors">
        ← 返回作品集
      </Link>
    </div>
  )
}
