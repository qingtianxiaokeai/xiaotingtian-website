import { cn } from '@/lib/utils'

interface Props {
  title: string
  subtitle?: string
  eyebrow?: string
  className?: string
  align?: 'left' | 'center'
}

export default function SectionTitle({ title, subtitle, eyebrow, className, align = 'center' }: Props) {
  return (
    <div className={cn('mb-12', align === 'center' ? 'text-center' : 'text-left', className)}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold tracking-[0.1em] uppercase text-[var(--accent)]">
          {eyebrow}
        </p>
      )}
      <h2
        className="font-bold leading-tight text-[var(--color-text-primary)]"
        style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3.5vw, 40px)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[var(--color-text-secondary)] md:text-lg">{subtitle}</p>
      )}
    </div>
  )
}
