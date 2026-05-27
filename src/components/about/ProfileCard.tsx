import { Mail } from 'lucide-react'
import Image from 'next/image'
import WechatButton from '@/components/ui/WechatButton'

export default function ProfileCard() {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left gap-5">
      {/* 头像：单色 accent 光晕环 + 实际头像 */}
      <div className="relative w-36 h-36">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, var(--accent), rgba(var(--accent-rgb),0.3), var(--accent))',
            padding: 3,
          }}
        >
          <div className="w-full h-full rounded-full bg-[var(--color-bg-base)]" />
        </div>
        <div className="absolute inset-[5px] rounded-full overflow-hidden">
          <Image
            src="/images/zhuyei.webp"
            alt="小青天头像"
            width={120}
            height={120}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div>
        <h1
          className="text-3xl font-bold mb-1 text-[var(--color-text-primary)]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          小青天
        </h1>
        <p className="text-[var(--color-text-secondary)]">AI 数据训练 · 电气工程 · 嵌入式开发</p>
      </div>

      <p className="max-w-sm text-[var(--color-text-secondary)] leading-relaxed">
        热爱在创意与技术的交汇处探索可能性。相信好的产品应该既好用，又好看。<br />
        目前专注于 AI 数据工程和嵌入式硬件开发，欢迎各类合作机会。
      </p>

      <div className="flex flex-col gap-2 text-sm text-[var(--color-text-secondary)]">
        <WechatButton variant="link" />
        <a
          href="mailto:2716757063@qq.com"
          className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
        >
          <Mail size={14} style={{ color: 'var(--accent)' }} />
          2716757063@qq.com
        </a>
      </div>
    </div>
  )
}
