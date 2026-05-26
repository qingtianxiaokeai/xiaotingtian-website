'use client'
import Link from 'next/link'
import { featuredProjects } from '@/lib/data/projects'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import Badge from '@/components/ui/Badge'
import { ArrowRight, Globe, Layers, BarChart2 } from 'lucide-react'
import { useRef } from 'react'

const projectIcons = [Globe, Layers, BarChart2]

function SpotlightCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card glow-card ${className}`}
    >
      {children}
    </div>
  )
}

export default function FeaturedProjects() {
  return (
    <section className="px-6 py-20 mx-auto max-w-5xl">
      <ScrollReveal>
        <SectionTitle
          eyebrow="作品精选"
          title="精选项目"
          subtitle="一些我引以为豪的实践"
        />
      </ScrollReveal>

      <div className="grid gap-5 md:grid-cols-3">
        {featuredProjects.map((project, i) => {
          const Icon = projectIcons[i] ?? Globe
          return (
            <ScrollReveal key={project.slug} delay={i * 0.1}>
              <Link href={`/portfolio/${project.slug}`} className="group block h-full">
                <SpotlightCard className="h-full rounded-2xl border border-[var(--border)] bg-[var(--color-bg-surface)] p-6 flex flex-col">

                  {/* 项目图标区 */}
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: 'var(--accent-light)' }}
                  >
                    <Icon size={22} style={{ color: 'var(--accent)' }} strokeWidth={1.5} />
                  </div>

                  {/* 标题 */}
                  <h3
                    className="font-semibold text-[var(--color-text-primary)] mb-2 transition-colors group-hover:text-[var(--accent)]"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '16px' }}
                  >
                    {project.title}
                  </h3>

                  {/* 描述 */}
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map(tag => <Badge key={tag} label={tag} />)}
                  </div>

                  {/* 底部链接 */}
                  <div className="flex items-center gap-1 text-xs font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                    查看详情 <ArrowRight size={12} />
                  </div>

                </SpotlightCard>
              </Link>
            </ScrollReveal>
          )
        })}
      </div>

      <ScrollReveal delay={0.3}>
        <div className="mt-10 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:gap-3 transition-all"
          >
            查看全部作品 <ArrowRight size={14} />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  )
}
