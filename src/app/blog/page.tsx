import type { Metadata } from 'next'
import PostList from '@/components/blog/PostList'
import SectionTitle from '@/components/ui/SectionTitle'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: '博客',
  description: '小青天的技术博客 — 分享前端开发、UI 设计和创意思考',
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <ScrollReveal>
        <SectionTitle title="博客" subtitle="记录思考，分享实践" />
      </ScrollReveal>
      <PostList />
    </div>
  )
}
