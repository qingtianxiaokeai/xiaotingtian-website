export default function HeroCanvas() {
  const blobs = [
    { color: '#FF6B6B', size: 380, top: '10%', left: '60%' },
    { color: '#A855F7', size: 300, top: '50%', left: '75%' },
    { color: '#4ECDC4', size: 260, top: '20%', left: '80%' },
    { color: '#FFE66D', size: 200, top: '65%', left: '55%' },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-15 blur-2xl"
          style={{
            width: b.size,
            height: b.size,
            backgroundColor: b.color,
            top: b.top,
            left: b.left,
          }}
        />
      ))}
    </div>
  )
}
