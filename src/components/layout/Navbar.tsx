'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/ui/ThemeToggle'

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
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-3 left-1/2 z-50 -translate-x-1/2 transition-all duration-300',
        scrolled
          ? 'w-[calc(100%-2rem)] max-w-4xl rounded-2xl bg-[var(--color-bg-surface)]/80 backdrop-blur-md shadow-lg border border-[var(--color-bg-subtle)]'
          : 'w-full max-w-5xl'
      )}
    >
      <nav className="flex items-center justify-between px-6 py-3">
        <Link href="/" className="text-xl font-bold gradient-text">
          小青天
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'relative px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  pathname === href
                    ? 'text-[#FF6B6B] bg-[#FF6B6B]/10'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                )}
              >
                {label}
                {pathname === href && (
                  <span className="absolute inset-x-4 bottom-1 h-0.5 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#A855F7]" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="flex md:hidden items-center justify-center h-9 w-9 rounded-full hover:bg-[var(--color-bg-subtle)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="菜单"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col gap-1 px-4 pb-4">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  pathname === href
                    ? 'bg-[#FF6B6B]/10 text-[#FF6B6B]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)]'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
