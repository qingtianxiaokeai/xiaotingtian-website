import Link from 'next/link'
import { Clock } from 'lucide-react'
import type { Post } from '@/types'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

const gradients = [
  'from-[#FF6B6B]/20 to-[#FFE66D]/20',
  'from-[#A855F7]/20 to-[#4ECDC4]/20',
  'from-[#4ECDC4]/20 to-[#3B82F6]/20',
]

interface Props {
  post: Post
  index: number
}

export default function PostCard({ post, index }: Props) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-bg-subtle)] overflow-hidden hover:border-[#FF6B6B]/30 hover:shadow-lg transition-all card-hover">
        {/* 封面色块 */}
        <div className={`h-44 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center text-5xl`}>
          {index === 0 ? '🎨' : index === 1 ? '✨' : '⚡'}
        </div>
        <div className="p-5">
          <h3 className="font-bold text-[var(--color-text-primary)] mb-2 line-clamp-2 group-hover:text-[#FF6B6B] transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-muted)]">
            <span>{formatDate(post.date)}</span>
            <span className="flex items-center gap-1"><Clock size={11} />{post.readingTime} 分钟</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.tags.slice(0, 3).map(tag => <Badge key={tag} label={tag} />)}
          </div>
        </div>
      </div>
    </Link>
  )
}
