import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-bg-subtle)] bg-[var(--color-bg-surface)] mt-24">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-xl font-bold gradient-text mb-2">小青天</p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              用创意和代码，把想法变成现实。
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">快速导航</p>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              {[['/', '首页'], ['/about', '关于我'], ['/portfolio', '作品集'], ['/blog', '博客'], ['/contact', '联系']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-[#FF6B6B] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">联系我</p>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li className="flex items-center gap-2">
                <Phone size={14} />
                <a href="tel:17705993212" className="hover:text-[#FF6B6B] transition-colors">177 0599 3212</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} />
                <a href="mailto:2716757063@qq.com" className="hover:text-[#FF6B6B] transition-colors">2716757063@qq.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--color-bg-subtle)] pt-6 text-center text-xs text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} 小青天. 用 Next.js 和 ❤️ 构建
        </div>
      </div>
    </footer>
  )
}
