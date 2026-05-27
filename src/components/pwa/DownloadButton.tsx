'use client'
import { useEffect, useState } from 'react'
import { Download, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type InstallState = 'idle' | 'ready' | 'ios' | 'installed'

interface Props {
  onClose?: () => void
}

/** 页面内 Toast 提示（替代 alert，不阻断 UI） */
function Toast({ msg, onDismiss }: { msg: string; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 6000)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <div
      className="fixed bottom-24 left-4 right-4 z-[200] flex items-start gap-3 rounded-2xl p-4 shadow-xl"
      style={{ background: 'var(--background)', border: '1px solid var(--border)' }}
      role="alert"
    >
      <p className="flex-1 text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
        {msg}
      </p>
      <button onClick={onDismiss} aria-label="关闭提示">
        <X size={14} style={{ color: 'var(--color-text-muted)' }} />
      </button>
    </div>
  )
}

export default function DownloadButton({ onClose }: Props) {
  const [state, setState] = useState<InstallState>('idle')
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    // 已安装（standalone 模式）
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setState('installed')
      return
    }

    // iOS 不支持 beforeinstallprompt，需手动引导
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    if (isIOS) {
      setState('ios')
      return
    }

    // 读取 layout 里提前捕获的事件（解决时序问题）
    const existing = (window as any).__pwaPrompt as BeforeInstallPromptEvent | undefined
    if (existing) {
      setPrompt(existing)
      setState('ready')
      return
    }

    // 正常监听（首次加载时 Chrome 可能还没触发）
    const handler = (e: Event) => {
      e.preventDefault()
      const pe = e as BeforeInstallPromptEvent
      setPrompt(pe)
      setState('ready')
      ;(window as any).__pwaPrompt = pe
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function handleClick() {
    if (state === 'ready' && prompt) {
      // Chrome 已准备好：直接弹系统安装对话框
      await prompt.prompt()
      const { outcome } = await prompt.userChoice
      if (outcome === 'accepted') {
        setState('installed')
        onClose?.()
      }
    } else if (state === 'ios') {
      setToast('在 Safari 中打开 → 点击底部分享按钮（□↑）→「添加到主屏幕」')
      onClose?.()
    } else {
      // idle：Chrome 尚未准备好（访问次数不够），引导手动安装
      setToast('点击浏览器右上角 ⋮ 菜单 → 选择「安装应用」或「添加到主屏幕」')
      onClose?.()
    }
  }

  // 已安装则不显示
  if (state === 'installed') return null

  return (
    <>
      <button
        onClick={handleClick}
        className="flex w-full items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        style={{ color: 'var(--accent)', background: 'var(--accent-light)' }}
        aria-label="下载小青天 App"
      >
        <Download size={15} />
        下载 App
        {/* 就绪时显示小绿点，让用户知道可以直接安装 */}
        {state === 'ready' && (
          <span
            className="ml-auto h-2 w-2 rounded-full"
            style={{ background: '#22c55e' }}
            title="可以直接安装"
          />
        )}
      </button>

      {toast && (
        <Toast msg={toast} onDismiss={() => setToast(null)} />
      )}
    </>
  )
}
