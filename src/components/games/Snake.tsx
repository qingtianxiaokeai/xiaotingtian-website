'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

const COLS = 20
const ROWS = 20
const SPEED = 140

type Pos = { x: number; y: number }
type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
type Status = 'idle' | 'playing' | 'over'

function randomFood(snake: Pos[]): Pos {
  let pos: Pos
  do {
    pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
  } while (snake.some(s => s.x === pos.x && s.y === pos.y))
  return pos
}

const INIT_SNAKE: Pos[] = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]
const INIT_DIR: Dir = 'RIGHT'

export default function Snake({ autoStart }: { autoStart?: boolean }) {
  const [snake, setSnake] = useState<Pos[]>(INIT_SNAKE)
  const [food, setFood] = useState<Pos>({ x: 15, y: 10 })
  const [dir, setDir] = useState<Dir>(INIT_DIR)
  const [status, setStatus] = useState<Status>('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)

  const dirRef = useRef<Dir>(INIT_DIR)
  const pendingRef = useRef<Dir | null>(null)
  const snakeRef = useRef(snake)
  const foodRef = useRef(food)
  const statusRef = useRef(status)

  useEffect(() => { snakeRef.current = snake }, [snake])
  useEffect(() => { foodRef.current = food }, [food])
  useEffect(() => { statusRef.current = status }, [status])
  useEffect(() => { dirRef.current = dir }, [dir])

  useEffect(() => {
    const saved = localStorage.getItem('snake-best')
    if (saved) setBest(parseInt(saved))
  }, [])

  const reset = useCallback(() => {
    const s = [...INIT_SNAKE]
    const f = randomFood(s)
    setSnake(s)
    setFood(f)
    setDir(INIT_DIR)
    dirRef.current = INIT_DIR
    pendingRef.current = null
    setScore(0)
    setStatus('playing')
  }, [])

  useEffect(() => {
    if (autoStart) reset()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
        KeyW: 'UP', KeyS: 'DOWN', KeyA: 'LEFT', KeyD: 'RIGHT',
      }
      const newDir = map[e.code]
      if (!newDir) return
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)) e.preventDefault()
      const opp: Record<Dir, Dir> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' }
      if (newDir !== opp[dirRef.current]) pendingRef.current = newDir
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (status !== 'playing') return
    const id = setInterval(() => {
      if (pendingRef.current) {
        dirRef.current = pendingRef.current
        setDir(pendingRef.current)
        pendingRef.current = null
      }
      const head = snakeRef.current[0]
      const d = dirRef.current
      const next: Pos = {
        x: (head.x + (d === 'RIGHT' ? 1 : d === 'LEFT' ? -1 : 0) + COLS) % COLS,
        y: (head.y + (d === 'DOWN' ? 1 : d === 'UP' ? -1 : 0) + ROWS) % ROWS,
      }
      if (snakeRef.current.slice(1).some(s => s.x === next.x && s.y === next.y)) {
        const finalScore = snakeRef.current.length - INIT_SNAKE.length
        setStatus('over')
        setBest(b => {
          const nb = Math.max(b, finalScore)
          localStorage.setItem('snake-best', String(nb))
          return nb
        })
        return
      }
      const ate = next.x === foodRef.current.x && next.y === foodRef.current.y
      const newSnake = [next, ...snakeRef.current.slice(0, ate ? undefined : -1)]
      if (ate) {
        setFood(randomFood(newSnake))
        setScore(s => s + 10)
      }
      setSnake(newSnake)
    }, SPEED)
    return () => clearInterval(id)
  }, [status])

  const snakeSet = new Set(snake.map(s => `${s.x},${s.y}`))

  return (
    <div className="flex flex-col items-center gap-6 select-none">
      <h1 className="text-3xl font-bold gradient-text">贪吃蛇</h1>

      <div className="flex gap-4 items-center text-sm">
        <span className="text-[var(--color-text-secondary)]">得分 <strong className="text-[var(--color-text-primary)] text-lg">{score}</strong></span>
        <span className="text-[var(--color-text-muted)]">|</span>
        <span className="text-[var(--color-text-secondary)]">最高 <strong className="text-[var(--color-text-primary)]">{best}</strong></span>
      </div>

      <div className="relative">
        <div
          className="grid border-2 border-[var(--color-bg-subtle)] rounded-lg overflow-hidden"
          style={{ gridTemplateColumns: `repeat(${COLS}, 24px)`, gridTemplateRows: `repeat(${ROWS}, 24px)` }}
        >
          {Array.from({ length: ROWS }, (_, r) =>
            Array.from({ length: COLS }, (_, c) => {
              const key = `${c},${r}`
              const isHead = snake[0]?.x === c && snake[0]?.y === r
              const isSnake = snakeSet.has(key)
              const isFood = food.x === c && food.y === r
              return (
                <div
                  key={key}
                  className="w-6 h-6"
                  style={{
                    backgroundColor: isHead
                      ? '#FF6B6B'
                      : isSnake
                      ? '#A855F7'
                      : isFood
                      ? '#FFE66D'
                      : 'var(--color-bg-surface)',
                    borderRadius: isHead ? '6px' : isFood ? '50%' : '2px',
                    boxShadow: isFood ? '0 0 8px #FFE66D88' : isHead ? '0 0 6px #FF6B6B88' : undefined,
                    transition: 'background-color 0.05s',
                  }}
                />
              )
            })
          )}
        </div>

        {(status === 'idle' || status === 'over') && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-lg gap-4">
            {status === 'over' && <p className="text-2xl font-bold text-[#FF6B6B]">游戏结束</p>}
            {status === 'over' && <p className="text-white">得分：{score}</p>}
            <button
              onClick={reset}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] text-white font-medium hover:opacity-90 transition-opacity"
            >
              {status === 'idle' ? '开始游戏' : '重新开始'}
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-[var(--color-text-muted)]">← → ↑ ↓ 或 WASD 控制方向 &nbsp;·&nbsp; 穿墙模式</p>
    </div>
  )
}
