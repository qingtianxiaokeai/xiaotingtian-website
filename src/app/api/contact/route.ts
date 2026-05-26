import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  type: z.string().min(1),
  message: z.string().min(10),
})

const typeLabels: Record<string, string> = {
  web: '网站开发',
  design: 'UI/UX 设计',
  consult: '技术咨询',
  other: '其他',
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: '数据验证失败', details: result.error.flatten() }, { status: 400 })
  }

  const { name, email, type, message } = result.data

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: '邮件服务未配置' }, { status: 500 })
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: '2716757063@qq.com',
      subject: `[小青天官网] 新联系消息 — ${typeLabels[type] ?? type}`,
      html: `
        <h2>你收到了一条新消息</h2>
        <p><strong>姓名：</strong>${name}</p>
        <p><strong>邮箱：</strong>${email}</p>
        <p><strong>合作类型：</strong>${typeLabels[type] ?? type}</p>
        <p><strong>消息内容：</strong></p>
        <blockquote>${message.replace(/\n/g, '<br>')}</blockquote>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: '邮件发送失败' }, { status: 500 })
  }
}
