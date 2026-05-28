'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/ui/ThemeToggle'
import MusicToggle from '@/components/ui/MusicToggle'
import DownloadButton from '@/components/pwa/DownloadButton'

const links = [
  { href: '/', label: '首页' },
  { href: '/about', label: '关于我' },
  { href: '/portfolio', label: '作品集' },
  { href: '/blog', label: '博客' },
  { href: '/contact', label: '联系' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-3 left-1/2 z-50 -translate-x-1/2 transition-all duration-300',
        scrolled
          ? 'w-[calc(100%-2rem)] max-w-4xl rounded-2xl border border-[var(--border)] bg-[rgba(var(--bg-rgb),0.85)] backdrop-blur-[12px] shadow-sm'
          : 'w-full max-w-5xl'
      )}
    >
      <nav className="flex items-center justify-between px-5 py-3">
        <Link
          href="/"
          className="text-lg font-bold text-[var(--color-text-primary)] tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          小青天
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0.5">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'relative px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === href
                    ? 'text-[var(--accent)] bg-[var(--accent-light)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[rgba(var(--text-rgb),0.05)]'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <MusicToggle />
          <ThemeToggle />
          <button
            className="flex md:hidden items-center justify-center h-9 w-9 rounded-lg hover:bg-[var(--color-bg-subtle)] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="菜单"
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col gap-1 px-3 pb-3">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  pathname === href
                    ? 'bg-[var(--accent-light)] text-[var(--accent)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)]'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
          {/* 下载 App 入口：列表最下方，仅手机端可见 */}
          <li className="mt-1 pt-1 border-t border-[var(--border)]">
            <DownloadButton onClose={() => setMenuOpen(false)} />
          </li>
        </ul>
      )}
    </header>
  )
}
