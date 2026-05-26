export interface Project {
  slug: string
  title: string
  description: string
  cover: string
  tags: string[]
  tech: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  longDescription?: string
}

export interface Skill {
  name: string
  icon: string
  category: string
  level: number
  description: string
}

export interface Post {
  slug: string
  title: string
  date: string
  tags: string[]
  cover: string
  excerpt: string
  content: string
  readingTime: number
}

export interface TimelineItem {
  year: string
  title: string
  organization: string
  description: string
}

export interface ContactFormData {
  name: string
  email: string
  type: string
  message: string
}
