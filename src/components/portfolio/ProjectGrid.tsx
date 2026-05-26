'use client'
import { useState } from 'react'
import { projects } from '@/lib/data/projects'
import ProjectCard from './ProjectCard'
import ProjectFilter from './ProjectFilter'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function ProjectGrid() {
  const [activeTag, setActiveTag] = useState('全部')
  const filtered = activeTag === '全部' ? projects : projects.filter(p => p.tags.includes(activeTag))

  return (
    <div>
      <ProjectFilter active={activeTag} onChange={setActiveTag} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <ScrollReveal key={project.slug} delay={i * 0.08}>
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-[var(--color-text-muted)] py-20">暂无该分类的作品</p>
      )}
    </div>
  )
}
