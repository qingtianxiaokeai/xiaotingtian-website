'use client'
import { useState } from 'react'
import { skills } from '@/lib/data/skills'
import ScrollReveal from '@/components/ui/ScrollReveal'

const categories = ['全部', 'AI 数据训练']

const colors = [
  '#EFF6FF', // 淡蓝
  '#FFF0F3', // 淡粉
  '#F0FDF4', // 淡绿
  '#F5F3FF', // 淡紫
  '#FFFBEB', // 淡黄
  '#ECFEFF', // 淡青
  '#FFF1F2', // 淡玫
  '#EEF2FF', // 淡靛
]

export default function SkillGrid() {
  const [category, setCategory] = useState('全部')
  const filtered = category === '全部' ? skills : skills.filter(s => s.category === category)

  return (
    <div>
      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              category === cat
                ? 'bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] text-white shadow'
                : 'bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] hover:bg-[#FF6B6B]/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 技能网格 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {filtered.map((skill, i) => (
          <ScrollReveal key={skill.name} delay={i * 0.04}>
            <div
              className="relative rounded-2xl p-4 min-h-[7rem] cursor-default transition-transform duration-200 hover:scale-150 hover:z-10"
              style={{ backgroundColor: colors[i % colors.length] }}
            >
              <p className="font-semibold text-sm text-[var(--color-text-primary)]">{skill.name}</p>
              <p className="text-xs mt-1 leading-relaxed text-[var(--color-text-secondary)]">{skill.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
