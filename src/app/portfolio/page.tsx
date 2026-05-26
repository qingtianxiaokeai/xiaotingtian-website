import type { Metadata } from 'next'
import ProjectGrid from '@/components/portfolio/ProjectGrid'
import SectionTitle from '@/components/ui/SectionTitle'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: '作品集',
  description: '小青天的作品集 — 前端开发 · UI/UX 设计项目展示',
}

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <ScrollReveal>
        <SectionTitle title="作品集" subtitle="把创意变成现实的每一次尝试" />
      </ScrollReveal>
      <ProjectGrid />
    </div>
  )
}
