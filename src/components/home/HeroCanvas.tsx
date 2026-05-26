export default function HeroCanvas() {
  const blobs = [
    { color: '#FF6B6B', size: 240, top: '10%', left: '60%' },
    { color: '#A855F7', size: 200, top: '50%', left: '75%' },
    { color: '#4ECDC4', size: 180, top: '20%', left: '80%' },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20 blur-xl"
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
