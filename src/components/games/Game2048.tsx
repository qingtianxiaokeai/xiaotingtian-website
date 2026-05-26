'use client'
import { useReducer, useEffect, useCallback, useRef } from 'react'

type Grid = number[][]
type Status = 'idle' | 'playing' | 'won' | 'over'

interface State {
  grid: Grid
  score: number
  best: number
  prev: Grid | null
  prevScore: number
  status: Status
  wonAck: boolean
}

function emptyGrid(): Grid {
  return Array.from({ length: 4 }, () => Array(4).fill(0))
}

function addTile(grid: Grid): Grid {
  const empties: [number, number][] = []
  grid.forEach((row, r) => row.forEach((v, c) => { if (!v) empties.push([r, c]) }))
  if (!empties.length) return grid
  const [r, c] = empties[Math.floor(Math.random() * empties.length)]
  const next = grid.map(row => [...row])
  next[r][c] = Math.random() < 0.9 ? 2 : 4
  return next
}

function initGrid(): Grid {
  return addTile(addTile(emptyGrid()))
}

function slideRow(row: number[]): { row: number[]; score: number } {
  const filtered = row.filter(v => v)
  const merged: number[] = []
  let score = 0
  let i = 0
  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const val = filtered[i] * 2
      merged.push(val)
      score += val
      i += 2
    } else {
      merged.push(filtered[i])
      i++
    }
  }
  while (merged.length < 4) merged.push(0)
  return { row: merged, score }
}

function move(grid: Grid, dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'): { grid: Grid; score: number; moved: boolean } {
  let g = grid.map(r => [...r])
  let totalScore = 0
  let moved = false

  const transpose = (m: Grid): Grid => m[0].map((_, c) => m.map(row => row[c]))
  const reverse = (m: Grid): Grid => m.map(row => [...row].reverse())

  if (dir === 'UP') g = transpose(g)
  if (dir === 'DOWN') g = reverse(transpose(g))
  if (dir === 'RIGHT') g = reverse(g)

  const next: Grid = g.map(row => {
    const { row: newRow, score } = slideRow(row)
    totalScore += score
    if (newRow.some((v, i) => v !== row[i])) moved = true
    return newRow
  })

  let result = next
  if (dir === 'RIGHT') result = reverse(next)
  if (dir === 'UP') result = transpose(next)
  if (dir === 'DOWN') result = transpose(reverse(next))

  return { grid: result, score: totalScore, moved }
}

function hasWon(grid: Grid) { return grid.some(row => row.some(v => v >= 2048)) }
function isOver(grid: Grid) {
  for (const d of ['UP','DOWN','LEFT','RIGHT'] as const) {
    if (move(grid, d).moved) return false
  }
  return true
}

type Action =
  | { type: 'START' }
  | { type: 'MOVE'; dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' }
  | { type: 'UNDO' }
  | { type: 'ACK_WIN' }

function reducer(state: State, action: Action): State {
  if (action.type === 'START') {
    const grid = initGrid()
    return { ...state, grid, score: 0, prev: null, prevScore: 0, status: 'playing', wonAck: false }
  }
  if (action.type === 'ACK_WIN') return { ...state, wonAck: true }
  if (action.type === 'UNDO') {
    if (!state.prev) return state
    return { ...state, grid: state.prev, score: state.prevScore, prev: null }
  }
  if (action.type === 'MOVE') {
    if (state.status !== 'playing' && !(state.status === 'won' && state.wonAck)) return state
    const { grid: moved, score: add, moved: changed } = move(state.grid, action.dir)
    if (!changed) return state
    const newGrid = addTile(moved)
    const newScore = state.score + add
    const newBest = Math.max(state.best, newScore)
    if (typeof window !== 'undefined') localStorage.setItem('2048-best', String(newBest))
    const won = hasWon(newGrid) && !state.wonAck
    const over = !won && isOver(newGrid)
    return {
      ...state,
      grid: newGrid,
      score: newScore,
      best: newBest,
      prev: state.grid,
      prevScore: state.score,
      status: won ? 'won' : over ? 'over' : 'playing',
    }
  }
  return state
}

function initState(): State {
  let best = 0
  if (typeof window !== 'undefined') {
    const s = localStorage.getItem('2048-best')
    if (s) best = parseInt(s)
  }
  return { grid: emptyGrid(), score: 0, best, prev: null, prevScore: 0, status: 'idle', wonAck: false }
}

const TILE_COLORS: Record<number, string> = {
  0:    'bg-[var(--color-bg-subtle)]',
  2:    'bg-[#EEE4DA] text-[#776E65]',
  4:    'bg-[#EDE0C8] text-[#776E65]',
  8:    'bg-[#F2B179] text-white',
  16:   'bg-[#F59563] text-white',
  32:   'bg-[#F67C5F] text-white',
  64:   'bg-[#F65E3B] text-white',
  128:  'bg-[#EDCF72] text-white',
  256:  'bg-[#EDCC61] text-white',
  512:  'bg-[#EDC850] text-white',
  1024: 'bg-[#EDC53F] text-white',
  2048: 'bg-gradient-to-br from-[#FF6B6B] to-[#A855F7] text-white',
}

export default function Game2048() {
  const [state, dispatch] = useReducer(reducer, undefined, initState)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const handleKey = useCallback((e: KeyboardEvent) => {
    const map: Record<string, 'UP'|'DOWN'|'LEFT'|'RIGHT'> = {
      ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
      KeyW: 'UP', KeyS: 'DOWN', KeyA: 'LEFT', KeyD: 'RIGHT',
    }
    const dir = map[e.code]
    if (!dir) return
    if (e.code.startsWith('Arrow')) e.preventDefault()
    dispatch({ type: 'MOVE', dir })
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  return (
    <div className="flex flex-col items-center gap-6 select-none">
      <h1 className="text-3xl font-bold gradient-text">2048</h1>

      <div className="flex gap-4 items-center">
        {[['得分', state.score], ['最高', state.best]].map(([label, val]) => (
          <div key={label as string} className="bg-[var(--color-bg-surface)] border border-[var(--color-bg-subtle)] rounded-xl px-5 py-2 text-center min-w-[80px]">
            <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
            <p className="text-xl font-bold text-[var(--color-text-primary)]">{val}</p>
          </div>
        ))}
        <button
          onClick={() => dispatch({ type: 'START' })}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >新游戏</button>
        <button
          disabled={!state.prev}
          onClick={() => dispatch({ type: 'UNDO' })}
          className="px-4 py-2 rounded-full border border-[var(--color-bg-subtle)] text-sm text-[var(--color-text-secondary)] hover:border-[#FF6B6B]/50 disabled:opacity-30 transition-all"
        >撤销</button>
      </div>

      <div className="relative">
        <div
          className="grid gap-3 p-3 rounded-2xl bg-[#BBADA0]"
          style={{ gridTemplateColumns: 'repeat(4, 96px)', gridTemplateRows: 'repeat(4, 96px)' }}
          onTouchStart={e => { const t = e.touches[0]; touchStart.current = { x: t.clientX, y: t.clientY } }}
          onTouchEnd={e => {
            if (!touchStart.current) return
            const dx = e.changedTouches[0].clientX - touchStart.current.x
            const dy = e.changedTouches[0].clientY - touchStart.current.y
            touchStart.current = null
            if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return
            if (Math.abs(dx) > Math.abs(dy)) dispatch({ type: 'MOVE', dir: dx > 0 ? 'RIGHT' : 'LEFT' })
            else dispatch({ type: 'MOVE', dir: dy > 0 ? 'DOWN' : 'UP' })
          }}
        >
          {state.grid.map((row, r) =>
            row.map((val, c) => {
              const cls = TILE_COLORS[val] ?? 'bg-[#EDC53F] text-white'
              const fontSize = val >= 1024 ? 'text-xl' : val >= 128 ? 'text-2xl' : 'text-3xl'
              return (
                <div
                  key={`${r}-${c}`}
                  className={`w-24 h-24 rounded-xl flex items-center justify-center font-bold ${cls} ${fontSize} transition-all duration-100`}
                >
                  {val > 0 ? val : ''}
                </div>
              )
            })
          )}
        </div>

        {(state.status === 'idle' || state.status === 'over') && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-2xl gap-4">
            {state.status === 'over' && <p className="text-2xl font-bold text-[#FF6B6B]">游戏结束</p>}
            <button
              onClick={() => dispatch({ type: 'START' })}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] text-white font-medium hover:opacity-90 transition-opacity"
            >{state.status === 'idle' ? '开始游戏' : '重新开始'}</button>
          </div>
        )}

        {state.status === 'won' && !state.wonAck && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-2xl gap-4">
            <p className="text-3xl font-bold text-[#FFE66D]">达到 2048！</p>
            <div className="flex gap-3">
              <button onClick={() => dispatch({ type: 'ACK_WIN' })}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] text-white font-medium hover:opacity-90 transition-opacity">
                继续挑战
              </button>
              <button onClick={() => dispatch({ type: 'START' })}
                className="px-5 py-2 rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors">
                新游戏
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-[var(--color-text-muted)]">← → ↑ ↓ 移动 &nbsp;·&nbsp; 移动端支持滑动</p>
    </div>
  )
}
