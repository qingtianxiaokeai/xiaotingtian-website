'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle2, Mail } from 'lucide-react'
import type { ContactFormData } from '@/types'
import WechatButton from '@/components/ui/WechatButton'

const schema = z.object({
  name: z.string().min(2, '请输入至少 2 个字的姓名'),
  email: z.string().email('请输入有效的邮箱地址'),
  type: z.string().min(1, '请选择合作类型'),
  message: z.string().min(10, '留言至少需要 10 个字'),
})

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
      if (typeof window !== 'undefined') {
        const confetti = (await import('canvas-confetti')).default
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } })
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass = [
    'w-full rounded-xl px-4 py-3 text-sm',
    'bg-[var(--color-bg-subtle)] border border-[var(--border)]',
    'text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]',
    'focus:outline-none focus:border-[rgba(var(--accent-rgb),0.5)] transition-colors',
  ].join(' ')

  const errorClass = 'mt-1 text-xs text-[var(--error)]'

  // GitHub Pages 静态构建：API 路由不可用，改为联系卡片
  if (process.env.NEXT_PUBLIC_BUILD_TARGET === 'github') {
    return <StaticContactCard />
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle2 size={48} style={{ color: 'var(--success)' }} />
        <h3 className="text-xl font-bold text-[var(--color-text-primary)]">消息已发送！</h3>
        <p className="text-[var(--color-text-secondary)]">我会尽快回复你，通常在 24 小时内。</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 text-sm text-[var(--accent)] underline underline-offset-2"
        >
          再发一条
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <input {...register('name')} placeholder="你的姓名" className={inputClass} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <input {...register('email')} placeholder="你的邮箱" type="email" className={inputClass} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <select {...register('type')} className={inputClass}>
          <option value="">选择合作类型</option>
          <option value="web">网站开发</option>
          <option value="design">UI/UX 设计</option>
          <option value="consult">技术咨询</option>
          <option value="other">其他</option>
        </select>
        {errors.type && <p className={errorClass}>{errors.type.message}</p>}
      </div>

      <div>
        <textarea
          {...register('message')}
          placeholder="告诉我你的想法和需求..."
          rows={5}
          className={inputClass}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {status === 'error' && (
        <p
          className="text-sm px-4 py-3 rounded-xl"
          style={{ color: 'var(--error)', background: 'rgba(var(--error), 0.08)' }}
        >
          发送失败，请稍后重试或直接发邮件联系我。
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 font-semibold text-white shadow-lg transition-all active:scale-95 disabled:opacity-60"
        style={{
          background: 'var(--accent)',
          boxShadow: '0 4px 16px rgba(var(--accent-rgb), 0.25)',
        }}
        onMouseEnter={e => {
          if (status !== 'loading') (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.background = 'var(--accent)'
        }}
      >
        <Send size={16} />
        {status === 'loading' ? '发送中...' : '发送消息'}
      </button>
    </form>
  )
}

// 静态构建（GitHub Pages）使用的联系卡片
function StaticContactCard() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
        通过以下方式联系我，期待我们的合作 ✨
      </p>

      <a
        href="mailto:2716757063@qq.com"
        className="flex items-center gap-4 p-4 rounded-2xl w-full
          bg-[var(--color-bg-surface)] border border-[var(--border)]
          hover:border-[rgba(var(--accent-rgb),0.3)] transition-colors"
      >
        <div
          className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl"
          style={{ background: 'var(--accent-light)' }}
        >
          <Mail size={20} style={{ color: 'var(--accent)' }} />
        </div>
        <div>
          <p className="text-xs text-[var(--color-text-muted)] mb-0.5">邮件</p>
          <p className="font-medium text-[var(--color-text-primary)]">2716757063@qq.com</p>
        </div>
      </a>

      <WechatButton variant="card-item" />
    </div>
  )
}
