'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ExternalLink, GitBranch } from 'lucide-react'
import type { Project } from '@/types'
import Badge from '@/components/ui/Badge'

const emojiMap: Record<string, string> = {
  'portfolio-website': '🌐',
  'creative-landing': '🎨',
  'dashboard-ui': '📊',
  'mobile-app-design': '📱',
  'blog-platform': '📝',
}

interface Props {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 10
    setTilt({ x, y })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        perspective: '800px',
        transformStyle: 'preserve-3d',
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease',
      }}
      className="group"
    >
      <div className="rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-bg-subtle)] overflow-hidden hover:border-[#FF6B6B]/30 hover:shadow-xl transition-shadow duration-300">
        {/* 封面 */}
        <div className="relative h-48 bg-gradient-to-br from-[#FF6B6B]/20 via-[#A855F7]/10 to-[#4ECDC4]/20 flex items-center justify-center text-6xl">
          {emojiMap[project.slug] ?? project.cover}
          {/* 悬停覆盖层 */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <Link
              href={`/portfolio/${project.slug}`}
              className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-[#FF6B6B] hover:text-white transition-colors"
            >
              查看详情
            </Link>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors">
                <ExternalLink size={16} />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors">
                <GitBranch size={16} />
              </a>
            )}
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[#FF6B6B] transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => <Badge key={tag} label={tag} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
