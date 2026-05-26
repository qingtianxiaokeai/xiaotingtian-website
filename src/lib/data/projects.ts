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
    slug: 'creative-landing',
    title: '品牌创意落地页',
    description: '为某创意品牌设计并开发的营销落地页，转化率提升 35%。',
    longDescription: '结合品牌视觉识别系统，从零开始设计并实现的高转化落地页。运用视觉层次、动效引导和信任背书等转化优化技巧，上线后转化率提升 35%。',
    cover: '/images/projects/landing.png',
    tags: ['前端', '设计'],
    tech: ['React', 'GSAP', 'CSS Modules'],
    featured: true,
  },
  {
    slug: 'dashboard-ui',
    title: '数据可视化看板',
    description: '企业级数据看板，支持实时数据更新与多维度图表展示。',
    longDescription: '为中型企业定制开发的数据可视化平台，集成多种图表类型，支持实时数据推送和自定义报表导出功能。',
    cover: '/images/projects/dashboard.png',
    tags: ['前端', '其他'],
    tech: ['Vue 3', 'ECharts', 'TypeScript', 'Element Plus'],
    githubUrl: 'https://github.com/xiaotingtian/dashboard-ui',
    featured: true,
  },
  {
    slug: 'mobile-app-design',
    title: '社交 App UI 设计',
    description: '面向 Z 世代的社交应用 UI/UX 设计，完整交互原型。',
    cover: '/images/projects/app-design.png',
    tags: ['设计'],
    tech: ['Figma', 'Principle', 'After Effects'],
    featured: false,
  },
  {
    slug: 'blog-platform',
    title: '极简博客平台',
    description: '基于 Next.js + MDX 的极简博客系统，支持代码高亮和全文搜索。',
    cover: '/images/projects/blog.png',
    tags: ['前端', '其他'],
    tech: ['Next.js', 'MDX', 'Tailwind CSS'],
    githubUrl: 'https://github.com/xiaotingtian/blog-platform',
    featured: false,
  },
]

export const featuredProjects = projects.filter(p => p.featured)
