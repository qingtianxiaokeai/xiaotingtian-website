import { timeline } from '@/lib/data/skills'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function Timeline() {
  return (
    <div className="relative">
      {/* 竖线 */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF6B6B] via-[#A855F7] to-[#4ECDC4]" />

      <div className="flex flex-col gap-8">
        {timeline.map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1} direction="left">
            <div className="flex gap-6">
              {/* 节点 */}
              <div className="relative flex-shrink-0 flex items-start justify-center w-8">
                <div className="absolute top-1.5 w-3 h-3 rounded-full border-2 border-[#FF6B6B] bg-[var(--color-bg-base)]" />
              </div>
              {/* 内容 */}
              <div className="flex-1 pb-2">
                <span className="text-xs font-medium text-[#FF6B6B] mb-1 block">{item.year}</span>
                <h3 className="font-bold text-[var(--color-text-primary)] mb-0.5">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">{item.organization}</p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item.description}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
