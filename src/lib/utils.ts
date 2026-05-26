import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string) {
  return format(new Date(dateStr), 'yyyy年M月d日', { locale: zhCN })
}

export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 300
  const wordCount = content.length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}
