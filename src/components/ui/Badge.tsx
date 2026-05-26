import { cn } from '@/lib/utils'

const colorMap: Record<string, string> = {
  '前端': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  '设计': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  '其他': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  '游戏': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  '性能': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'React': 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  'CSS': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  '动画': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  'Next.js': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
}

interface Props {
  label: string
  className?: string
}

export default function Badge({ label, className }: Props) {
  const color = colorMap[label] ?? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
  return (
    <span className={cn('inline-block rounded-full px-3 py-1 text-xs font-medium', color, className)}>
      {label}
    </span>
  )
}
