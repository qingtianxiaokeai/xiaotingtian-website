import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { posts } from '@/lib/data/posts'
import Badge from '@/components/ui/Badge'
import { Clock, ArrowLeft, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find(p => p.slug === slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = posts.find(p => p.slug === slug)
  if (!post) notFound()

  const postIndex = posts.findIndex(p => p.slug === slug)
  const prev = posts[postIndex + 1]
  const next = posts[postIndex - 1]

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[#FF6B6B] transition-colors mb-8">
        <ArrowLeft size={16} /> 返回博客
      </Link>

      {/* 文章头部 */}
      <header className="mb-10">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map(tag => <Badge key={tag} label={tag} />)}
        </div>
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4 leading-tight md:text-4xl">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1.5"><Calendar size={14} />{formatDate(post.date)}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} />{post.readingTime} 分钟阅读</span>
        </div>
      </header>

      {/* 文章内容（简单渲染预设内容） */}
      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <div className="space-y-6 text-[var(--color-text-secondary)] leading-relaxed">
          {post.content.split('\n\n').map((para, i) => {
            if (para.startsWith('## ')) {
              return <h2 key={i} className="text-xl font-bold text-[var(--color-text-primary)] mt-8 mb-3 pl-4 border-l-4 border-[#FF6B6B]">{para.slice(3)}</h2>
            }
            if (para.startsWith('```')) {
              const code = para.replace(/^```\w*\n?/, '').replace(/```$/, '')
              return <pre key={i} className="bg-[var(--color-bg-subtle)] rounded-xl p-4 overflow-x-auto text-sm font-mono">{code}</pre>
            }
            if (para.startsWith('- ')) {
              const items = para.split('\n').filter(l => l.startsWith('- '))
              return <ul key={i} className="list-disc pl-5 space-y-1">{items.map((item, j) => <li key={j}>{item.slice(2)}</li>)}</ul>
            }
            if (para.startsWith('1. ')) {
              const items = para.split('\n').filter(l => /^\d+\./.test(l))
              return <ol key={i} className="list-decimal pl-5 space-y-1">{items.map((item, j) => <li key={j}>{item.replace(/^\d+\.\s/, '')}</li>)}</ol>
            }
            return para.trim() ? <p key={i}>{para}</p> : null
          })}
        </div>
      </article>

      {/* 上下篇导航 */}
      <div className="mt-16 flex flex-col gap-4 border-t border-[var(--color-bg-subtle)] pt-8 sm:flex-row sm:justify-between">
        {prev && (
          <Link href={`/blog/${prev.slug}`} className="group flex flex-col gap-1">
            <span className="text-xs text-[var(--color-text-muted)]">← 上一篇</span>
            <span className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[#FF6B6B] transition-colors line-clamp-1">{prev.title}</span>
          </Link>
        )}
        {next && (
          <Link href={`/blog/${next.slug}`} className="group flex flex-col gap-1 text-right">
            <span className="text-xs text-[var(--color-text-muted)]">下一篇 →</span>
            <span className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[#FF6B6B] transition-colors line-clamp-1">{next.title}</span>
          </Link>
        )}
      </div>
    </div>
  )
}
