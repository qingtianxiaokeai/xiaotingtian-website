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
          <SectionTitle
            eyebrow="近期输出"
            title="最新文章"
            subtitle="分享我的思考与实践"
          />
        </ScrollReveal>

        <div className="flex flex-col gap-3">
          {latestPosts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.08}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex gap-5 items-start rounded-2xl bg-[var(--color-bg-surface)] p-5 border border-[var(--border)] glow-card transition-all">
                  {/* 左侧主色竖线 */}
                  <div
                    className="w-[3px] self-stretch rounded-full flex-shrink-0"
                    style={{ background: 'var(--accent)', opacity: 0.6 }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-semibold text-[var(--color-text-primary)] mb-1.5 group-hover:text-[var(--accent)] transition-colors line-clamp-1"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-muted)]">
                      <span>{formatDate(post.date)}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />{post.readingTime} 分钟阅读
                      </span>
                      <div className="flex gap-1.5">
                        {post.tags.slice(0, 2).map(tag => <Badge key={tag} label={tag} />)}
                      </div>
                    </div>
                  </div>
                  <ArrowRight
                    size={15}
                    className="flex-shrink-0 mt-1 transition-all"
                    style={{ color: 'var(--color-text-muted)' }}
                  />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.25}>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:gap-3 transition-all"
            >
              阅读更多文章 <ArrowRight size={13} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
