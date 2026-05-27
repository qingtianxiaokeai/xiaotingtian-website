import type { Metadata } from 'next'
import { Noto_Sans_SC, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/layout/PageTransition'
import CursorGlow from '@/components/ui/CursorGlow'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'
import ServiceWorkerRegister from '@/components/pwa/ServiceWorkerRegister'

const noto = Noto_Sans_SC({
  variable: '--font-noto',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
})

const space = Space_Grotesk({
  variable: '--font-space',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: '小青天 | 个人网站', template: '%s | 小青天' },
  description: '小青天的个人网站 — 前端开发 · UI/UX 设计 · 创意内容',
  keywords: ['小青天', '前端开发', 'UI设计', '个人网站', 'Next.js'],
  openGraph: {
    title: '小青天 | 个人网站',
    description: '小青天的个人网站 — 前端开发 · UI/UX 设计 · 创意内容',
    locale: 'zh_CN',
    type: 'website',
  },
  // PWA
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    title: '小青天',
    statusBarStyle: 'default',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#0AA9DB',
    'msapplication-TileImage': '/icons/icon-144x144.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${noto.variable} ${space.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased bg-[var(--background)] text-[var(--foreground)]">
        {/* 在 React 加载前提前捕获 PWA 安装事件，避免时序问题 */}
        <script dangerouslySetInnerHTML={{ __html: `window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__pwaPrompt=e;});` }} />
        <ServiceWorkerRegister />
        <ScrollProgressBar />
        <CursorGlow />
        <Navbar />
        <PageTransition>
          <main className="flex-1 pt-20">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}
