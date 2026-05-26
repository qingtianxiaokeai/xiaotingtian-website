import type { Skill, TimelineItem } from '@/types'

export const skills: Skill[] = [
  { name: 'React / Next.js', icon: '⚛️', category: '前端开发', level: 90, description: '熟练使用 React 生态，有多个生产级项目经验' },
  { name: 'TypeScript', icon: '🔷', category: '前端开发', level: 85, description: '强类型编程，编写可维护的大型应用' },
  { name: 'Tailwind CSS', icon: '🎨', category: '前端开发', level: 92, description: '原子化 CSS，快速构建美观界面' },
  { name: 'Framer Motion', icon: '✨', category: '前端开发', level: 80, description: '声明式动画，打造流畅的用户体验' },
  { name: 'Vue 3', icon: '💚', category: '前端开发', level: 78, description: '组合式 API，构建中大型 SPA' },
  { name: 'Figma', icon: '🎭', category: 'UI/UX 设计', level: 88, description: '端到端 UI 设计，从线框图到高保真原型' },
  { name: 'UI/UX 设计', icon: '🖌️', category: 'UI/UX 设计', level: 85, description: '以用户为中心的设计思维与实践' },
  { name: 'Motion Design', icon: '🎬', category: 'UI/UX 设计', level: 72, description: '界面动效设计与交互原型' },
  { name: 'Node.js', icon: '🟢', category: '后端 & 工具', level: 70, description: '构建 API 接口与服务端逻辑' },
  { name: 'Git', icon: '🔗', category: '后端 & 工具', level: 88, description: '版本管理与团队协作工作流' },
  { name: 'Vercel / CI/CD', icon: '🚀', category: '后端 & 工具', level: 82, description: '自动化部署与持续集成' },
]

export const timeline: TimelineItem[] = [
  {
    year: '2024 - 至今',
    title: '独立创作者 & 自由职业者',
    organization: '自由职业',
    description: '承接品牌网站、落地页和 UI 设计项目，累计服务 20+ 客户。',
  },
  {
    year: '2022 - 2024',
    title: '前端开发工程师',
    organization: '某互联网公司',
    description: '负责公司核心产品前端架构设计与开发，主导组件库建设。',
  },
  {
    year: '2021 - 2022',
    title: '界面设计师',
    organization: '某设计工作室',
    description: '参与移动端 App 和 Web 产品的 UI/UX 设计工作。',
  },
  {
    year: '2017 - 2021',
    title: '计算机科学与技术 本科',
    organization: '某高等院校',
    description: '系统学习计算机基础，辅修视觉传达设计。',
  },
]
