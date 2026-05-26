import Link from 'next/link'
import { featuredProjects } from '@/lib/data/projects'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import Badge from '@/components/ui/Badge'
import { ArrowRight } from 'lucide-react'

export default function FeaturedProjects() {
  return (
    <section className="px-6 py-20 mx-auto max-w-5xl">
      <ScrollReveal>
        <SectionTitle title="精选作品" subtitle="一些我引以为豪的项目" />
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <ScrollReveal key={project.slug} delay={i * 0.1}>
            <Link href={`/portfolio/${project.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-bg-subtle)] p-6 h-full card-hover">
                {/* 顶部色块 */}
                <div className="mb-4 h-36 rounded-xl bg-gradient-to-br from-[#FF6B6B]/20 via-[#A855F7]/20 to-[#4ECDC4]/20 flex items-center justify-center text-4xl">
                  {i === 0 ? '🌐' : i === 1 ? '🎨' : '📊'}
                </div>
                <h3 className="font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[#FF6B6B] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map(tag => <Badge key={tag} label={tag} />)}
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.3}>
        <div className="mt-10 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[#FF6B6B] font-medium hover:gap-3 transition-all"
          >
            查看全部作品 <ArrowRight size={16} />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  )
}
