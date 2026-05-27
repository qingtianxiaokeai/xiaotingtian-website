'use client'
import { useEffect, useState } from 'react'

// 扩展 Event 类型以包含 PWA 安装 prompt API
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // 如果已经以 standalone 模式运行（已安装），不再显示
    if (window.matchMedia('(display-mode: standalone)').matches) return

    const handler = (e: Event) => {
      e.preventDefault() // 阻止浏览器默认迷你提示栏
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function handleInstall() {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setVisible(false)
    setDeferredPrompt(null)
  }

  if (!visible) return null

  return (
    <div
      role="banner"
      className="fixed bottom-5 left-4 right-4 z-50 flex items-center gap-3 rounded-2xl p-4 shadow-xl"
      style={{
        background: 'var(--background)',
        border: '1px solid var(--border)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
      }}
    >
      {/* App 图标 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icons/icon-96x96.png"
        alt="小青天 App 图标"
        width={48}
        height={48}
        className="rounded-xl flex-shrink-0"
      />

      {/* 文字 */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
          安装小青天 App
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
          添加到主屏幕，随时访问
        </p>
      </div>

      {/* 按钮 */}
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={() => setVisible(false)}
          className="text-xs px-3 py-1.5 rounded-lg"
          style={{ color: 'var(--color-text-secondary)' }}
          aria-label="稍后安装"
        >
          以后再说
        </button>
        <button
          onClick={handleInstall}
          className="text-xs px-4 py-1.5 rounded-lg font-semibold text-white"
          style={{ background: 'var(--accent)' }}
          aria-label="立即安装 App"
        >
          安装
        </button>
      </div>
    </div>
  )
}
