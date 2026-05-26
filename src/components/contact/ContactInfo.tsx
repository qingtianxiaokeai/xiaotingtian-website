import { Mail, Clock } from 'lucide-react'
import WechatButton from '@/components/ui/WechatButton'

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2
          className="text-2xl font-bold mb-2 text-[var(--color-text-primary)]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          期待与你合作
        </h2>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          无论是网站开发、UI 设计还是内容创作，都欢迎联系我。<br />
          通常会在 24 小时内回复。
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {/* 微信 */}
        <WechatButton variant="card-item" />

        {/* 邮箱 */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--border)] hover:border-[rgba(var(--accent-rgb),0.3)] transition-colors">
          <div
            className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl"
            style={{ background: 'var(--accent-light)' }}
          >
            <Mail size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)] mb-0.5">邮箱</p>
            <a
              href="mailto:2716757063@qq.com"
              className="font-medium text-[var(--color-text-primary)] hover:text-[var(--accent)] transition-colors"
            >
              2716757063@qq.com
            </a>
          </div>
        </div>

        {/* 工作时间 */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--border)]">
          <div
            className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl"
            style={{ background: 'var(--accent-light)' }}
          >
            <Clock size={20} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)] mb-0.5">工作时间</p>
            <p className="font-medium text-[var(--color-text-primary)]">周一至周五 09:00 - 18:00</p>
          </div>
        </div>
      </div>
    </div>
  )
}
