'use client'
import { useState } from 'react'
import { posts } from '@/lib/data/posts'
import PostCard from './PostCard'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { Search } from 'lucide-react'

const allTags = Array.from(new Set(posts.flatMap(p => p.tags)))

export default function PostList() {
  const [query, setQuery] = useState('')
  const [activeTags, setActiveTags] = useState<string[]>([])

  const toggleTag = (tag: string) => {
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  const filtered = posts.filter(p => {
    const matchesQuery = !query || p.title.includes(query) || p.excerpt.includes(query)
    const matchesTags = activeTags.length === 0 || activeTags.some(t => p.tags.includes(t))
    return matchesQuery && matchesTags
  })

  return (
    <div>
      {/* 搜索框 */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <input
          type="text"
          placeholder="搜索文章..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-bg-subtle)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[#FF6B6B]/50 transition-colors"
        />
      </div>

      {/* 标签筛选 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeTags.includes(tag)
                ? 'bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] text-white'
                : 'bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] hover:bg-[#FF6B6B]/10'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 文章网格 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.08}>
            <PostCard post={post} index={i} />
          </ScrollReveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[var(--color-text-muted)] py-20">没有找到相关文章</p>
      )}
    </div>
  )
}
