const items = [
  'AI 数据训练',
  '电气工程',
  '嵌入式开发',
  '单片机',
  '创意内容',
  '前端开发',
  '个人项目',
  '持续学习',
]

export default function MarqueeBanner() {
  const doubled = [...items, ...items]

  return (
    <div className="py-10 border-y border-[var(--border)] overflow-hidden">
      <div className="marquee-wrap">
        <div className="marquee-track select-none">
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center gap-4 shrink-0">
              <span
                className="text-sm font-semibold tracking-[0.06em] uppercase whitespace-nowrap"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {item}
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: 'var(--accent)', opacity: 0.5 }}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
