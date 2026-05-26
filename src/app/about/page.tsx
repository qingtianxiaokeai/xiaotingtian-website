import type { Metadata } from 'next'
import ProfileCard from '@/components/about/ProfileCard'
import SkillGrid from '@/components/about/SkillGrid'
import Timeline from '@/components/about/Timeline'
import SectionTitle from '@/components/ui/SectionTitle'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: '关于我',
  description: '了解小青天 — 前端开发工程师 · UI/UX 设计师 · 创意内容创作者',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* 个人介绍 */}
      <section className="mb-20">
        <ScrollReveal>
          <ProfileCard />
        </ScrollReveal>
      </section>

      {/* 技能 */}
      <section className="mb-20">
        <ScrollReveal>
          <SectionTitle title="技能栈" subtitle="持续学习，不断精进" align="left" />
        </ScrollReveal>
        <SkillGrid />
      </section>

      {/* 经历 */}
      <section>
        <ScrollReveal>
          <SectionTitle title="经历" subtitle="我的成长轨迹" align="left" />
        </ScrollReveal>
        <Timeline />
      </section>
    </div>
  )
}
