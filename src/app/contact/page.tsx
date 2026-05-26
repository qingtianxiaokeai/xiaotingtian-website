import type { Metadata } from 'next'
import ContactInfo from '@/components/contact/ContactInfo'
import ContactForm from '@/components/contact/ContactForm'
import SectionTitle from '@/components/ui/SectionTitle'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: '联系我',
  description: '与小青天取得联系 — 合作咨询、项目洽谈',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <ScrollReveal>
        <SectionTitle title="联系我" subtitle="有好想法？让我们聊聊吧" />
      </ScrollReveal>

      <div className="grid gap-12 md:grid-cols-2">
        <ScrollReveal direction="left">
          <ContactInfo />
        </ScrollReveal>
        <ScrollReveal direction="right">
          <ContactForm />
        </ScrollReveal>
      </div>
    </div>
  )
}
