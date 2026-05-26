export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* 左上 Aurora 光晕 */}
      <div
        className="absolute rounded-full"
        style={{
          width: 560,
          height: 480,
          top: '-12%',
          left: '-8%',
          background: 'radial-gradient(ellipse, rgba(var(--accent-rgb), 0.13) 0%, transparent 65%)',
          animation: 'auroraShift 14s ease-in-out infinite alternate',
        }}
      />
      {/* 右侧 Aurora 光晕 */}
      <div
        className="absolute rounded-full"
        style={{
          width: 440,
          height: 400,
          top: '20%',
          right: '-6%',
          background: 'radial-gradient(ellipse, rgba(var(--accent-rgb), 0.08) 0%, transparent 60%)',
          animation: 'auroraShift 18s ease-in-out infinite alternate-reverse',
        }}
      />
      <style>{`
        @keyframes auroraShift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(36px, 28px) scale(1.1); }
        }
      `}</style>
    </div>
  )
}
