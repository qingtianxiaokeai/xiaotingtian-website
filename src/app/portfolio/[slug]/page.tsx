import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { projects } from '@/lib/data/projects'
import Badge from '@/components/ui/Badge'
import { ExternalLink, GitBranch, ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  if (slug === 'creative-games') return { title: '创意游戏合集', description: '4 款纯 React 实现的小游戏' }
  const project = projects.find(p => p.slug === slug)
  if (!project) return {}
  return { title: project.title, description: project.description }
}

const emojiMap: Record<string, string> = {
  'portfolio-website': '🌐',
}

const GAMES = [
  { id: 'snake',       href: '/games/snake',       emoji: '🐍', title: '贪吃蛇',     desc: '键盘/WASD 控制，支持穿墙，历史最高分记录' },
  { id: 'tetris',      href: '/games/tetris',      emoji: '🟦', title: '俄罗斯方块', desc: '等级递进加速，硬降落，下一块预览' },
  { id: '2048',        href: '/games/2048',        emoji: '🔢', title: '2048',        desc: '合并方块，支持一步撤销，滑动操控' },
  { id: 'fruit-ninja', href: '/games/fruit-ninja', emoji: '🍎', title: '水果忍者',   desc: '划过切水果，躲避炸弹，3 条命挑战高分' },
]

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params

  if (slug === 'creative-games') {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[#FF6B6B] transition-colors mb-8">
          <ArrowLeft size={16} /> 返回作品集
        </Link>

        <div className="h-48 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/20 via-[#A855F7]/10 to-[#4ECDC4]/20 flex flex-col items-center justify-center gap-2 mb-8">
          <span className="text-6xl">🎮</span>
          <h1 className="text-2xl font-bold gradient-text">创意游戏合集</h1>
        </div>

        <p className="text-[var(--color-text-secondary)] mb-10 text-center">
          选择一款游戏，点击即刻开始
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {GAMES.map(game => (
            <Link key={game.id} href={game.href} className="group block rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-bg-subtle)] overflow-hidden hover:border-[#FF6B6B]/30 hover:shadow-xl transition-all duration-300">
              <div className="relative h-40 bg-gradient-to-br from-[#FF6B6B]/20 via-[#A855F7]/10 to-[#4ECDC4]/20 flex items-center justify-center text-5xl">
                {game.emoji}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium">
                    开始游戏
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[#FF6B6B] transition-colors">
                  {game.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {game.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const project = projects.find(p => p.slug === slug)
  if (!project) notFound()

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[#FF6B6B] transition-colors mb-8">
        <ArrowLeft size={16} /> 返回作品集
      </Link>

      {/* 封面 */}
      <div className="h-64 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/20 via-[#A855F7]/10 to-[#4ECDC4]/20 flex items-center justify-center text-8xl mb-8">
        {emojiMap[project.slug] ?? project.cover}
      </div>

      {/* 标题和标签 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold gradient-text mb-3">{project.title}</h1>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => <Badge key={tag} label={tag} />)}
        </div>
      </div>

      {/* 描述 */}
      <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8">
        {project.longDescription || project.description}
      </p>

      {/* 技术栈 */}
      <div className="mb-8">
        <h2 className="font-semibold text-[var(--color-text-primary)] mb-3">技术栈</h2>
        <div className="flex flex-wrap gap-2">
          {project.tech.map(tech => (
            <span key={tech} className="px-3 py-1 rounded-full text-sm bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-bg-subtle)]">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 链接 */}
      <div className="flex flex-wrap gap-4">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] text-white text-sm font-medium hover:opacity-90 transition-opacity">
            <ExternalLink size={15} /> 在线预览
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[var(--color-text-secondary)] text-[var(--color-text-secondary)] text-sm font-medium hover:border-[#FF6B6B] hover:text-[#FF6B6B] transition-colors">
            <GitBranch size={15} /> GitHub
          </a>
        )}
      </div>
    </div>
  )
}
