'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle2 } from 'lucide-react'
import type { ContactFormData } from '@/types'

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

  const inputClass = 'w-full rounded-xl bg-[var(--color-bg-subtle)] border border-[var(--color-bg-subtle)] px-4 py-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[#FF6B6B]/50 transition-colors text-sm'
  const errorClass = 'mt-1 text-xs text-[#FF6B6B]'

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle2 size={48} className="text-[#4ECDC4]" />
        <h3 className="text-xl font-bold text-[var(--color-text-primary)]">消息已发送！</h3>
        <p className="text-[var(--color-text-secondary)]">我会尽快回复你，通常在 24 小时内。</p>
        <button onClick={() => setStatus('idle')} className="mt-2 text-sm text-[#FF6B6B] underline underline-offset-2">再发一条</button>
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
        <textarea {...register('message')} placeholder="告诉我你的想法和需求..." rows={5} className={inputClass} />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {status === 'error' && (
        <p className="text-sm text-[#FF6B6B] bg-[#FF6B6B]/10 px-4 py-3 rounded-xl">发送失败，请稍后重试或直接发邮件联系我。</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] px-8 py-3.5 font-medium text-white shadow-lg hover:opacity-90 disabled:opacity-60 transition-all active:scale-95"
      >
        <Send size={16} />
        {status === 'loading' ? '发送中...' : '发送消息'}
      </button>
    </form>
  )
}
