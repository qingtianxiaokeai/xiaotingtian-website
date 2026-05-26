import { Mail, Phone } from 'lucide-react'

export default function ProfileCard() {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left gap-5">
      {/* 头像 */}
      <div className="relative w-36 h-36">
        <div className="absolute inset-0 rounded-full animate-spin-slow"
          style={{ background: 'conic-gradient(from 0deg, #FF6B6B, #A855F7, #4ECDC4, #FFE66D, #FF6B6B)', padding: 3 }}
        >
          <div className="w-full h-full rounded-full bg-[var(--color-bg-base)]" />
        </div>
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#FF6B6B]/30 to-[#A855F7]/30 flex items-center justify-center text-5xl">
          🧑‍💻
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold gradient-text mb-1">小青天</h1>
        <p className="text-[var(--color-text-secondary)]">前端开发 · UI/UX 设计 · 创意内容</p>
      </div>

      <p className="max-w-sm text-[var(--color-text-secondary)] leading-relaxed">
        热爱在创意与技术的交汇处探索可能性。相信好的产品应该既好用，又好看。<br />
        目前专注于 Web 前端开发和品牌视觉设计，欢迎各类合作机会。
      </p>

      <div className="flex flex-col gap-2 text-sm text-[var(--color-text-secondary)]">
        <a href="tel:17705993212" className="flex items-center gap-2 hover:text-[#FF6B6B] transition-colors">
          <Phone size={15} /> 177 0599 3212
        </a>
        <a href="mailto:2716757063@qq.com" className="flex items-center gap-2 hover:text-[#FF6B6B] transition-colors">
          <Mail size={15} /> 2716757063@qq.com
        </a>
      </div>
    </div>
  )
}
