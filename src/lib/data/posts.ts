import type { Post } from '@/types'

export const posts: Post[] = [
  {
    slug: 'design-system-tokens',
    title: '设计 Token：让 UI 一致性不再是难题',
    date: '2026-05-10',
    tags: ['设计', 'CSS', '前端'],
    cover: '/images/posts/design-tokens.png',
    excerpt: '设计 Token 是设计系统的基石。本文深入讲解如何建立一套从设计到代码的 Token 体系，让团队协作更顺畅。',
    content: `设计 Token 是设计系统的基石。本文深入讲解如何建立一套从设计到代码的 Token 体系。

## 什么是设计 Token？

设计 Token 是将设计决策（颜色、间距、字体大小等）抽象为命名变量的方式。它们是设计系统中最细粒度的样式单元。

## 为什么需要设计 Token？

- **一致性**：整个产品使用统一的视觉语言
- **可维护性**：修改一个 Token，全局生效
- **协作效率**：设计师和开发者使用同一套语言

## 实践建议

1. 从颜色、间距、字体三大维度开始
2. 使用语义化命名（\`--color-primary\` 而非 \`--blue-500\`）
3. 分层设计：基础 Token → 语义 Token → 组件 Token`,
    readingTime: 5,
  },
  {
    slug: 'framer-motion-tips',
    title: 'Framer Motion 5 个让动效起飞的技巧',
    date: '2026-04-22',
    tags: ['前端', 'React', '动画'],
    cover: '/images/posts/framer-motion.png',
    excerpt: '动画能让界面"活"起来，但不好的动画会让用户抓狂。这 5 个 Framer Motion 技巧帮你做出恰到好处的动效。',
    content: `动画能让界面"活"起来，但不好的动画会让用户抓狂。

## 技巧一：用 spring 代替 duration

\`\`\`tsx
// 不推荐
animate={{ x: 100 }}
transition={{ duration: 0.3 }}

// 推荐 - 更自然
animate={{ x: 100 }}
transition={{ type: "spring", stiffness: 300, damping: 30 }}
\`\`\`

## 技巧二：stagger 错开时间

使用 \`staggerChildren\` 让列表项逐个出现：

\`\`\`tsx
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 }
  }
}
\`\`\`

## 技巧三：whileInView 替代 IntersectionObserver

\`\`\`tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
/>
\`\`\``,
    readingTime: 6,
  },
  {
    slug: 'nextjs-performance',
    title: 'Next.js 15 性能优化：从 90 到 100 的最后一步',
    date: '2026-03-15',
    tags: ['前端', 'Next.js', '性能'],
    cover: '/images/posts/nextjs-perf.png',
    excerpt: 'Lighthouse 分数从 90 提升到 100，这最后 10 分究竟怎么拿？本文分享我在多个项目中总结的实战技巧。',
    content: `Lighthouse 分数从 90 提升到 100，这最后 10 分究竟怎么拿？

## 图片优化

使用 \`next/image\` 并合理设置 \`priority\` 和 \`sizes\`：

\`\`\`tsx
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority  // 首屏图片
  sizes="(max-width: 768px) 100vw, 1200px"
/>
\`\`\`

## 字体优化

\`\`\`tsx
import { Noto_Sans_SC } from 'next/font/google'
const noto = Noto_Sans_SC({ subsets: ['latin'], display: 'swap' })
\`\`\`

## 减少 JS Bundle

- 使用 \`dynamic()\` 懒加载大组件
- 避免在 Server Components 中导入客户端库`,
    readingTime: 7,
  },
]

export const latestPosts = posts.slice(0, 3)
