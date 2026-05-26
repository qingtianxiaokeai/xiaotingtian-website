'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { skills } from '@/lib/data/skills'
import ScrollReveal from '@/components/ui/ScrollReveal'

const categories = ['全部', 'AI 数据训练', '电气工程', '嵌入式 & 单片机', '创意内容']

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
            <div className="group relative overflow-hidden rounded-2xl h-32 cursor-pointer bg-[var(--color-bg-surface)] border border-[var(--color-bg-subtle)] hover:border-[#FF6B6B]/30 transition-colors">
              {/* 默认显示 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 transition-opacity duration-300 group-hover:opacity-0">
                <span className="text-3xl">{skill.icon}</span>
                <span className="text-sm font-medium text-[var(--color-text-primary)]">{skill.name}</span>
                <div className="w-16 h-1.5 rounded-full bg-[var(--color-bg-subtle)] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#A855F7]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.6, delay: i * 0.03 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
              {/* hover 显示 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#FF6B6B]/10 to-[#A855F7]/10 rounded-2xl p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-xs font-medium text-[#FF6B6B]">熟练度 {skill.level}%</span>
                <p className="text-xs text-center text-[var(--color-text-secondary)] leading-relaxed">{skill.description}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
