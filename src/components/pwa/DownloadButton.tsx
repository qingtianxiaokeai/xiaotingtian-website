'use client'
import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type State = 'idle' | 'ready' | 'ios' | 'installed'

interface Props {
  /** 点击（安装或关闭引导）后回调，用于关闭导航菜单 */
  onClose?: () => void
}

export default function DownloadButton({ onClose }: Props) {
  const [state, setState] = useState<State>('idle')
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    // 已以 standalone 模式运行 = 已安装
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setState('installed')
      return
    }
    // iOS 设备不支持 beforeinstallprompt，需要手动引导
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    if (isIOS) {
      setState('ios')
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
      setState('ready')
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function handleClick() {
    if (state === 'ready' && prompt) {
      await prompt.prompt()
      const { outcome } = await prompt.userChoice
      if (outcome === 'accepted') {
        setState('installed')
        onClose?.()
      }
    } else if (state === 'ios') {
      alert('在 Safari 中打开网站 → 点击底部分享按钮（□↑）→ 选择「添加到主屏幕」')
      onClose?.()
    } else {
      // idle：Android Chrome 尚未触发 beforeinstallprompt（需要满足访问条件）
      alert('请用 Chrome 浏览器打开网站，然后点击浏览器菜单（⋮）→「添加到主屏幕」')
      onClose?.()
    }
  }

  // 已安装则不在菜单中显示
  if (state === 'installed') return null

  return (
    <button
      onClick={handleClick}
      className="flex w-full items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
      style={{ color: 'var(--accent)', background: 'var(--accent-light)' }}
      aria-label="下载小青天 App"
    >
      <Download size={15} />
      下载 App
    </button>
  )
}
