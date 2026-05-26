'use client'
import { useEffect, useRef, useCallback } from 'react'

const W = 480
const H = 520
const GRAVITY = 0.35
const FRUIT_TYPES = ['🍎','🍊','🍋','🍇','🍓']
const FRUIT_COLORS = ['#FF6B6B','#F97316','#FFE66D','#A855F7','#EC4899']
const TRAIL_LEN = 12

interface FruitObj {
  id: number
  x: number; y: number
  vx: number; vy: number
  r: number
  emoji: string
  color: string
  sliced: boolean
  halfA?: { x: number; y: number; vx: number; vy: number; angle: number }
  halfB?: { x: number; y: number; vx: number; vy: number; angle: number }
  isBomb: boolean
  missed: boolean
}

let _id = 0

function newFruit(bomb = false): FruitObj {
  const i = Math.floor(Math.random() * FRUIT_TYPES.length)
  const x = 60 + Math.random() * (W - 120)
  return {
    id: _id++,
    x, y: H + 30,
    vx: (Math.random() - 0.5) * 4,
    vy: -(9 + Math.random() * 4),
    r: 28,
    emoji: bomb ? '💣' : FRUIT_TYPES[i],
    color: bomb ? '#555' : FRUIT_COLORS[i],
    sliced: false,
    isBomb: bomb,
    missed: false,
  }
}

export default function FruitNinja({ autoStart }: { autoStart?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    fruits: [] as FruitObj[],
    score: 0,
    lives: 3,
    status: 'idle' as 'idle' | 'playing' | 'over',
    trail: [] as { x: number; y: number }[],
    spawnTimer: 0,
    frameId: 0,
    overlayAlpha: 0,
  })
  const mouseRef = useRef({ down: false, x: 0, y: 0 })

  const drawHeart = (ctx: CanvasRenderingContext2D, x: number, full: boolean) => {
    ctx.font = '20px serif'
    ctx.fillText(full ? '❤️' : '🖤', x, 30)
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const s = stateRef.current

    ctx.clearRect(0, 0, W, H)

    // background
    ctx.fillStyle = 'var(--color-bg-base, #1C1B2E)'
    ctx.fillRect(0, 0, W, H)

    // trail
    if (s.trail.length > 1) {
      ctx.beginPath()
      ctx.moveTo(s.trail[0].x, s.trail[0].y)
      for (let i = 1; i < s.trail.length; i++) ctx.lineTo(s.trail[i].x, s.trail[i].y)
      ctx.strokeStyle = 'rgba(255,255,255,0.8)'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()
    }

    // fruits
    for (const f of s.fruits) {
      if (f.sliced) {
        // draw halves
        for (const half of [f.halfA, f.halfB]) {
          if (!half) continue
          ctx.save()
          ctx.translate(half.x, half.y)
          ctx.rotate(half.angle)
          ctx.font = `${f.r * 1.2}px serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.globalAlpha = 0.7
          ctx.fillText(f.emoji, 0, 0)
          ctx.restore()
        }
      } else {
        ctx.save()
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fillStyle = f.color + '88'
        ctx.fill()
        ctx.strokeStyle = f.color
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.font = `${f.r * 1.2}px serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(f.emoji, f.x, f.y)
        ctx.restore()
      }
    }

    // HUD
    ctx.font = 'bold 22px system-ui'
    ctx.fillStyle = '#F0EEFF'
    ctx.textAlign = 'left'
    ctx.fillText(`${s.score}`, 16, 32)
    for (let i = 0; i < 3; i++) drawHeart(ctx, W - 80 + i * 26, i < s.lives)

    // overlay
    if (s.status === 'idle' || s.status === 'over') {
      ctx.fillStyle = 'rgba(0,0,0,0.65)'
      ctx.fillRect(0, 0, W, H)
      ctx.textAlign = 'center'
      if (s.status === 'over') {
        ctx.font = 'bold 36px system-ui'
        ctx.fillStyle = '#FF6B6B'
        ctx.fillText('游戏结束', W / 2, H / 2 - 50)
        ctx.font = '22px system-ui'
        ctx.fillStyle = '#F0EEFF'
        ctx.fillText(`得分：${s.score}`, W / 2, H / 2 - 8)
      }
      ctx.font = '22px system-ui'
      ctx.fillStyle = '#F0EEFF'
      ctx.fillText(s.status === 'idle' ? '点击开始' : '点击重新开始', W / 2, H / 2 + 42)
    }
  }, [])

  const checkSlice = useCallback((ax: number, ay: number, bx: number, by: number) => {
    const s = stateRef.current
    for (const f of s.fruits) {
      if (f.sliced || f.missed) continue
      // line segment vs circle
      const dx = bx - ax, dy = by - ay
      const len2 = dx * dx + dy * dy
      if (len2 === 0) continue
      const t = Math.max(0, Math.min(1, ((f.x - ax) * dx + (f.y - ay) * dy) / len2))
      const nx = ax + t * dx - f.x
      const ny = ay + t * dy - f.y
      if (nx * nx + ny * ny < f.r * f.r) {
        f.sliced = true
        if (f.isBomb) {
          s.lives = 0
          s.status = 'over'
          return
        }
        s.score += 10
        const speed = 2.5
        f.halfA = { x: f.x, y: f.y, vx: f.vx - speed, vy: f.vy * 0.5, angle: 0 }
        f.halfB = { x: f.x, y: f.y, vx: f.vx + speed, vy: f.vy * 0.5, angle: 0 }
      }
    }
  }, [])

  const loop = useCallback(() => {
    const s = stateRef.current
    if (s.status !== 'playing') { draw(); return }

    s.spawnTimer++
    if (s.spawnTimer >= 80) {
      s.spawnTimer = 0
      const bomb = Math.random() < 0.12
      s.fruits.push(newFruit(bomb))
      if (Math.random() < 0.3) s.fruits.push(newFruit(false))
    }

    for (const f of s.fruits) {
      if (f.sliced) {
        if (f.halfA) { f.halfA.x += f.halfA.vx; f.halfA.y += f.halfA.vy; f.halfA.vy += GRAVITY * 0.5; f.halfA.angle += 0.08 }
        if (f.halfB) { f.halfB.x += f.halfB.vx; f.halfB.y += f.halfB.vy; f.halfB.vy += GRAVITY * 0.5; f.halfB.angle -= 0.08 }
      } else {
        f.x += f.vx; f.y += f.vy; f.vy += GRAVITY
        if (!f.missed && !f.isBomb && f.y > H + 40) {
          f.missed = true
          s.lives = Math.max(0, s.lives - 1)
          if (s.lives === 0) s.status = 'over'
        }
      }
    }

    s.fruits = s.fruits.filter(f => {
      if (f.sliced) return (f.halfA?.y ?? 9999) < H + 80
      return f.y < H + 80
    })

    draw()
    s.frameId = requestAnimationFrame(loop)
  }, [draw])

  const start = useCallback(() => {
    const s = stateRef.current
    s.fruits = []; s.score = 0; s.lives = 3; s.status = 'playing'
    s.trail = []; s.spawnTimer = 0
    if (s.frameId) cancelAnimationFrame(s.frameId)
    s.frameId = requestAnimationFrame(loop)
  }, [loop])

  useEffect(() => {
    const s = stateRef.current
    s.frameId = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(s.frameId) }
  }, [loop])

  useEffect(() => {
    if (autoStart) start()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = W / rect.width
    const scaleY = H / rect.height
    const src = 'touches' in e ? e.touches[0] ?? e.changedTouches[0] : e
    return { x: (src.clientX - rect.left) * scaleX, y: (src.clientY - rect.top) * scaleY }
  }

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    const s = stateRef.current
    if (s.status !== 'playing') { start(); return }
    mouseRef.current.down = true
    const p = getPos(e, canvasRef.current!)
    mouseRef.current.x = p.x; mouseRef.current.y = p.y
    stateRef.current.trail = [p]
  }

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!mouseRef.current.down) return
    const p = getPos(e, canvasRef.current!)
    const prev = mouseRef.current
    checkSlice(prev.x, prev.y, p.x, p.y)
    prev.x = p.x; prev.y = p.y
    const trail = stateRef.current.trail
    trail.push(p)
    if (trail.length > TRAIL_LEN) trail.shift()
  }

  const handleEnd = () => {
    mouseRef.current.down = false
    stateRef.current.trail = []
  }

  return (
    <div className="flex flex-col items-center gap-6 select-none">
      <h1 className="text-3xl font-bold gradient-text">水果忍者</h1>
      <canvas
        ref={canvasRef}
        width={W} height={H}
        className="rounded-2xl border-2 border-[var(--color-bg-subtle)] cursor-crosshair touch-none"
        style={{ maxWidth: '100%' }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      />
      <p className="text-xs text-[var(--color-text-muted)]">鼠标滑过切水果 &nbsp;·&nbsp; 避开炸弹 &nbsp;·&nbsp; 漏掉水果扣血</p>
    </div>
  )
}
