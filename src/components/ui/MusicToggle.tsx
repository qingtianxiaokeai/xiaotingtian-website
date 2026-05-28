'use client'
import { Music2, VolumeX } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMusic } from '@/context/MusicContext'

export default function MusicToggle({ className }: { className?: string }) {
  const { playing, toggle } = useMusic()

  return (
    <button
      onClick={toggle}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
        'hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]',
        className
      )}
      aria-label={playing ? '关闭背景音乐' : '开启背景音乐'}
      title={playing ? '关闭背景音乐' : '开启背景音乐'}
    >
      {playing ? <Music2 size={18} /> : <VolumeX size={18} />}
    </button>
  )
}
