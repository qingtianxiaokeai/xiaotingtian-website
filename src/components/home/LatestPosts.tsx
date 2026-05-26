import Link from 'next/link'
import { latestPosts } from '@/lib/data/posts'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import Badge from '@/components/ui/Badge'
import { ArrowRight, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function LatestPosts() {
  return (
    <section className="px-6 py-20 bg-[var(--color-bg-subtle)]">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <SectionTitle title="最新文章" subtitle="分享我的思考与实践" />
        </ScrollReveal>

        <div className="flex flex-col gap-4">
          {latestPosts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex gap-6 items-start rounded-2xl bg-[var(--color-bg-surface)] p-6 border border-[var(--color-bg-subtle)] hover:border-[#FF6B6B]/30 hover:shadow-md transition-all">
                  <div className="w-1 self-stretch rounded-full flex-shrink-0"
                    style={{ background: `hsl(${i * 80 + 0}, 80%, 60%)` }} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[#FF6B6B] transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-muted)]">
                      <span>{formatDate(post.date)}</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{post.readingTime} 分钟阅读</span>
                      <div className="flex gap-1.5">
                        {post.tags.slice(0, 2).map(tag => <Badge key={tag} label={tag} />)}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={16} className="flex-shrink-0 text-[var(--color-text-muted)] group-hover:text-[#FF6B6B] group-hover:translate-x-1 transition-all mt-1" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#FF6B6B] font-medium hover:gap-3 transition-all"
            >
              阅读更多文章 <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
