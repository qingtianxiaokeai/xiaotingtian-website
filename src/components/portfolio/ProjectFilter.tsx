'use client'

interface Props {
  active: string
  onChange: (tag: string) => void
}

const tags = ['全部', '前端', '设计', '游戏', '其他']

export default function ProjectFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => onChange(tag)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            active === tag
              ? 'bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] text-white shadow-md'
              : 'bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] hover:bg-[#FF6B6B]/10 hover:text-[#FF6B6B]'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
