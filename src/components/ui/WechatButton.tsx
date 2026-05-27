'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, QrCode } from 'lucide-react'
import Image from 'next/image'

interface Props {
  variant?: 'link' | 'card-item'
}

const WechatIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8.7 10.6c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm4.8 0c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zM12 2C6.5 2 2 6 2 11c0 2.8 1.3 5.4 3.4 7.1L4.5 21l3.1-1.6c1.3.5 2.8.8 4.3.8 5.5 0 10-4 10-9S17.5 2 12 2zm0 16c-1.4 0-2.7-.3-3.9-.8l-.3-.1-2 1 .5-1.8-.2-.3C4.5 14.8 3.5 13 3.5 11c0-4.1 3.8-7.5 8.5-7.5s8.5 3.4 8.5 7.5-3.8 7.5-8.5 7.5z"/>
  </svg>
)

export default function WechatButton({ variant = 'link' }: Props) {
  const [open, setOpen] = useState(false)

  // 页面加载时后台预加载二维码图片，点击时秒开
  useEffect(() => {
    const img = new window.Image()
    img.src = '/images/weixinjietu.png'
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  return (
    <>
      {variant === 'card-item' ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-4 p-4 rounded-2xl w-full text-left
            bg-[var(--color-bg-surface)] border border-[var(--border)]
            hover:border-[rgba(var(--accent-rgb),0.3)] transition-colors"
        >
          <div
            className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl"
            style={{ background: 'var(--accent-light)' }}
          >
            <QrCode size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)] mb-0.5">微信</p>
            <p className="font-medium text-[var(--color-text-primary)]">扫码添加</p>
          </div>
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 text-[var(--color-text-secondary)] hover:text-[var(--accent)] transition-colors"
        >
          <span style={{ color: 'var(--accent)' }}><WechatIcon /></span>
          微信（扫码）
        </button>
      )}

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="wechat-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />
            <div className="fixed left-1/2 top-1/2 z-[101] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                key="wechat-card"
                role="dialog"
                aria-modal="true"
                aria-label="微信二维码"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-72 rounded-2xl border border-[var(--border)] bg-[var(--color-bg-surface)] p-6 shadow-2xl"
              >
                {/* 关闭按钮 */}
                <button
                  onClick={() => setOpen(false)}
                  aria-label="关闭"
                  className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-[var(--color-bg-subtle)]"
                >
                  <X size={14} style={{ color: 'var(--color-text-muted)' }} />
                </button>

                {/* 标题 */}
                <div className="mb-4 flex items-center gap-2">
                  <span style={{ color: '#07C160' }}><WechatIcon /></span>
                  <span className="font-semibold text-[var(--color-text-primary)]">微信</span>
                </div>

                {/* 二维码 */}
                <div className="mb-4 overflow-hidden rounded-xl bg-white p-3">
                  <Image
                    src="/images/weixinjietu.png"
                    alt="小青天的微信二维码"
                    width={240}
                    height={240}
                    className="h-auto w-full"
                  />
                </div>

                {/* 说明 */}
                <p className="text-center text-sm text-[var(--color-text-secondary)]">
                  扫码添加微信
                </p>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
