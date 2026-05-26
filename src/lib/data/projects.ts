import type { Project } from '@/types'

export const projects: Project[] = [
  {
    slug: 'portfolio-website',
    title: '个人作品集网站',
    description: '一个活泼创意风格的个人网站，展示我的作品、技能和博客文章。',
    longDescription: '使用 Next.js 15 + Tailwind CSS v4 + Framer Motion 构建的个人网站，包含完整的作品展示、博客系统和联系功能。采用霓虹糖果配色，打造活泼创意的视觉体验。',
    cover: '/images/projects/portfolio.png',
    tags: ['前端', '设计'],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://xiaotingtian.vercel.app',
    featured: true,
  },
  {
    slug: 'creative-games',
    title: '创意游戏合集',
    description: '4 款纯 React 实现的小游戏：贪吃蛇、俄罗斯方块、2048、水果忍者。',
    cover: '🎮',
    tags: ['游戏'],
    tech: ['React', 'TypeScript', 'Canvas API', 'CSS Grid'],
    featured: false,
  },
]

export const featuredProjects = projects.filter(p => p.featured)
