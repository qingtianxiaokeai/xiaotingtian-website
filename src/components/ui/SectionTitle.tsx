import { cn } from '@/lib/utils'

interface Props {
  title: string
  subtitle?: string
  className?: string
  align?: 'left' | 'center'
}

export default function SectionTitle({ title, subtitle, className, align = 'center' }: Props) {
  return (
    <div className={cn('mb-12', align === 'center' ? 'text-center' : 'text-left', className)}>
      <h2 className="text-3xl font-bold md:text-4xl">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-3 text-[var(--color-text-secondary)] md:text-lg">{subtitle}</p>
      )}
    </div>
  )
}
