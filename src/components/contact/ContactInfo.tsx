import { Mail, Phone, MessageCircle } from 'lucide-react'

const contacts = [
  {
    icon: Phone,
    label: '电话 / 微信',
    value: '177 0599 3212',
    href: 'tel:17705993212',
    color: '#4ECDC4',
  },
  {
    icon: Mail,
    label: '邮箱',
    value: '2716757063@qq.com',
    href: 'mailto:2716757063@qq.com',
    color: '#FF6B6B',
  },
  {
    icon: MessageCircle,
    label: '工作时间',
    value: '周一至周五 09:00 - 18:00',
    href: undefined,
    color: '#A855F7',
  },
]

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold gradient-text mb-2">期待与你合作</h2>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          无论是网站开发、UI 设计还是内容创作，都欢迎联系我。<br />
          通常会在 24 小时内回复。
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {contacts.map(({ icon: Icon, label, value, href, color }) => (
          <div key={label} className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-bg-subtle)] hover:border-[#FF6B6B]/30 transition-colors">
            <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl" style={{ background: `${color}20` }}>
              <Icon size={20} style={{ color }} />
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] mb-0.5">{label}</p>
              {href ? (
                <a href={href} className="font-medium text-[var(--color-text-primary)] hover:text-[#FF6B6B] transition-colors">
                  {value}
                </a>
              ) : (
                <p className="font-medium text-[var(--color-text-primary)]">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
