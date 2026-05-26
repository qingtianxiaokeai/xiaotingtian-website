'use client'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = stored ? stored === 'dark' : prefersDark
    setDark(isDark)
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
        'hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]',
        className
      )}
      aria-label="切换主题"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
