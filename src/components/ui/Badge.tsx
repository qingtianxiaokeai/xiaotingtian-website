import { cn } from '@/lib/utils'

interface Props {
  label: string
  className?: string
}

export default function Badge({ label, className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2.5 py-0.5 text-[11px] font-medium tracking-wide',
        'bg-[var(--accent-light)] text-[var(--accent)] border border-[rgba(var(--accent-rgb),0.2)]',
        className
      )}
    >
      {label}
    </span>
  )
}
