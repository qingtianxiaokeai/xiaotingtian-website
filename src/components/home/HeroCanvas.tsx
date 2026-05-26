export default function HeroCanvas() {
  const blobs = [
    { color: '#FF6B6B', size: 380, top: '10%', left: '60%', delay: '0s', duration: '6s' },
    { color: '#A855F7', size: 300, top: '50%', left: '75%', delay: '2s', duration: '8s' },
    { color: '#4ECDC4', size: 260, top: '20%', left: '80%', delay: '1s', duration: '7s' },
    { color: '#FFE66D', size: 200, top: '65%', left: '55%', delay: '3s', duration: '9s' },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20 blur-3xl animate-float"
          style={{
            width: b.size,
            height: b.size,
            backgroundColor: b.color,
            top: b.top,
            left: b.left,
            animationDelay: b.delay,
            animationDuration: b.duration,
          }}
        />
      ))}
      {/* 右侧大型装饰圆 */}
      <div className="absolute right-0 top-0 hidden md:flex items-center justify-center w-[45%] h-full">
        <div className="relative w-80 h-80">
          {/* 旋转渐变外环 */}
          <div className="absolute inset-0 rounded-full animate-spin-slow"
            style={{ background: 'conic-gradient(from 0deg, #FF6B6B, #A855F7, #4ECDC4, #FFE66D, #FF6B6B)', padding: 3 }}
          >
            <div className="w-full h-full rounded-full bg-[var(--color-bg-base)]" />
          </div>
          {/* 中心内容 */}
          <div className="absolute inset-4 rounded-full flex items-center justify-center text-6xl animate-float">
            ✨
          </div>
        </div>
      </div>
    </div>
  )
}
