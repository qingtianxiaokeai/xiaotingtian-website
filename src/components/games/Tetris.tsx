'use client'
import { useReducer, useEffect, useCallback, useRef } from 'react'

const COLS = 10
const ROWS = 20
const TICK_BASE = 800

const PIECES = [
  { shape: [[1,1,1,1]],                         color: '#4ECDC4' }, // I
  { shape: [[1,1],[1,1]],                        color: '#FFE66D' }, // O
  { shape: [[0,1,0],[1,1,1]],                    color: '#A855F7' }, // T
  { shape: [[1,0,0],[1,1,1]],                    color: '#3B82F6' }, // J
  { shape: [[0,0,1],[1,1,1]],                    color: '#FF6B6B' }, // L
  { shape: [[0,1,1],[1,1,0]],                    color: '#F97316' }, // S
  { shape: [[1,1,0],[0,1,1]],                    color: '#10B981' }, // Z
]

type Board = (string | null)[][]
type Piece = { x: number; y: number; shape: number[][]; color: string }

interface State {
  board: Board
  current: Piece
  next: Piece
  score: number
  level: number
  lines: number
  status: 'idle' | 'playing' | 'paused' | 'over'
}

function emptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null))
}

function randomPiece(): Piece {
  const p = PIECES[Math.floor(Math.random() * PIECES.length)]
  return { x: Math.floor(COLS / 2) - Math.floor(p.shape[0].length / 2), y: 0, shape: p.shape, color: p.color }
}

function rotate(shape: number[][]): number[][] {
  return shape[0].map((_, i) => shape.map(row => row[i]).reverse())
}

function fits(board: Board, piece: Piece, dx = 0, dy = 0, shape = piece.shape): boolean {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue
      const nx = piece.x + c + dx
      const ny = piece.y + r + dy
      if (nx < 0 || nx >= COLS || ny >= ROWS) return false
      if (ny >= 0 && board[ny][nx]) return false
    }
  }
  return true
}

function lock(board: Board, piece: Piece): { board: Board; cleared: number } {
  const next = board.map(row => [...row])
  for (let r = 0; r < piece.shape.length; r++) {
    for (let c = 0; c < piece.shape[r].length; c++) {
      if (!piece.shape[r][c]) continue
      const ny = piece.y + r
      if (ny >= 0) next[ny][piece.x + c] = piece.color
    }
  }
  const kept = next.filter(row => row.some(cell => !cell))
  const cleared = ROWS - kept.length
  const newBoard = [...Array.from({ length: cleared }, () => Array(COLS).fill(null)), ...kept]
  return { board: newBoard, cleared }
}

function calcScore(lines: number, level: number) {
  return [0, 100, 300, 500, 800][lines] * (level + 1)
}

type Action =
  | { type: 'START' }
  | { type: 'TICK' }
  | { type: 'MOVE'; dx: number }
  | { type: 'ROTATE' }
  | { type: 'SOFT_DROP' }
  | { type: 'HARD_DROP' }
  | { type: 'PAUSE' }

function initState(): State {
  return {
    board: emptyBoard(),
    current: randomPiece(),
    next: randomPiece(),
    score: 0, level: 0, lines: 0,
    status: 'idle',
  }
}

function reducer(state: State, action: Action): State {
  if (action.type === 'START') return { ...initState(), status: 'playing' }
  if (action.type === 'PAUSE') {
    if (state.status !== 'playing' && state.status !== 'paused') return state
    return { ...state, status: state.status === 'playing' ? 'paused' : 'playing' }
  }
  if (state.status !== 'playing') return state

  if (action.type === 'MOVE') {
    if (!fits(state.board, state.current, action.dx)) return state
    return { ...state, current: { ...state.current, x: state.current.x + action.dx } }
  }

  if (action.type === 'ROTATE') {
    const rotated = rotate(state.current.shape)
    if (!fits(state.board, state.current, 0, 0, rotated)) return state
    return { ...state, current: { ...state.current, shape: rotated } }
  }

  if (action.type === 'SOFT_DROP' || action.type === 'TICK') {
    if (fits(state.board, state.current, 0, 1)) {
      const add = action.type === 'SOFT_DROP' ? 1 : 0
      return { ...state, current: { ...state.current, y: state.current.y + 1 }, score: state.score + add }
    }
    // lock
    const { board, cleared } = lock(state.board, state.current)
    const newLines = state.lines + cleared
    const newLevel = Math.floor(newLines / 10)
    const newScore = state.score + calcScore(cleared, state.level)
    const next = state.next
    const newCurrent = { ...next, x: Math.floor(COLS / 2) - Math.floor(next.shape[0].length / 2), y: 0 }
    if (!fits(board, newCurrent)) {
      return { ...state, board, score: newScore, lines: newLines, level: newLevel, status: 'over' }
    }
    return { ...state, board, current: newCurrent, next: randomPiece(), score: newScore, lines: newLines, level: newLevel }
  }

  if (action.type === 'HARD_DROP') {
    let dropped = state.current
    let count = 0
    while (fits(state.board, dropped, 0, 1)) {
      dropped = { ...dropped, y: dropped.y + 1 }
      count++
    }
    const { board, cleared } = lock(state.board, dropped)
    const newLines = state.lines + cleared
    const newLevel = Math.floor(newLines / 10)
    const newScore = state.score + count * 2 + calcScore(cleared, state.level)
    const next = state.next
    const newCurrent = { ...next, x: Math.floor(COLS / 2) - Math.floor(next.shape[0].length / 2), y: 0 }
    if (!fits(board, newCurrent)) {
      return { ...state, board, score: newScore, lines: newLines, level: newLevel, status: 'over' }
    }
    return { ...state, board, current: newCurrent, next: randomPiece(), score: newScore, lines: newLines, level: newLevel }
  }

  return state
}

function getGhostY(board: Board, piece: Piece): number {
  let y = piece.y
  while (fits(board, piece, 0, y - piece.y + 1)) y++
  return y
}

export default function Tetris({ autoStart }: { autoStart?: boolean }) {
  const [state, dispatch] = useReducer(reducer, undefined, initState)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const tick = useCallback(() => dispatch({ type: 'TICK' }), [])

  useEffect(() => {
    if (autoStart) dispatch({ type: 'START' })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (state.status !== 'playing') {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    const speed = Math.max(100, TICK_BASE - state.level * 70)
    intervalRef.current = setInterval(tick, speed)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [state.status, state.level, tick])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space','KeyP'].includes(e.code)) e.preventDefault()
      if (e.code === 'ArrowLeft')  dispatch({ type: 'MOVE', dx: -1 })
      if (e.code === 'ArrowRight') dispatch({ type: 'MOVE', dx: 1 })
      if (e.code === 'ArrowUp')    dispatch({ type: 'ROTATE' })
      if (e.code === 'ArrowDown')  dispatch({ type: 'SOFT_DROP' })
      if (e.code === 'Space')      dispatch({ type: 'HARD_DROP' })
      if (e.code === 'KeyP')       dispatch({ type: 'PAUSE' })
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const ghostY = state.status === 'playing' ? getGhostY(state.board, state.current) : -1

  const renderBoard = state.board.map(row => [...row])
  if (state.status === 'playing' || state.status === 'paused') {
    // ghost
    if (ghostY !== state.current.y) {
      for (let r = 0; r < state.current.shape.length; r++)
        for (let c = 0; c < state.current.shape[r].length; c++)
          if (state.current.shape[r][c]) {
            const ny = ghostY + r; const nx = state.current.x + c
            if (ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS && !renderBoard[ny][nx])
              renderBoard[ny][nx] = 'ghost'
          }
    }
    // current
    for (let r = 0; r < state.current.shape.length; r++)
      for (let c = 0; c < state.current.shape[r].length; c++)
        if (state.current.shape[r][c]) {
          const ny = state.current.y + r; const nx = state.current.x + c
          if (ny >= 0 && ny < ROWS) renderBoard[ny][nx] = state.current.color
        }
  }

  return (
    <div className="flex flex-col items-center gap-6 select-none">
      <h1 className="text-3xl font-bold gradient-text">俄罗斯方块</h1>

      <div className="flex gap-6 items-start">
        {/* 游戏区域 */}
        <div className="relative">
          <div
            className="grid border-2 border-[var(--color-bg-subtle)] rounded-lg overflow-hidden"
            style={{ gridTemplateColumns: `repeat(${COLS}, 28px)`, gridTemplateRows: `repeat(${ROWS}, 28px)` }}
          >
            {renderBoard.map((row, r) =>
              row.map((cell, c) => (
                <div
                  key={`${r}-${c}`}
                  className="w-7 h-7 border border-[var(--color-bg-subtle)]/30"
                  style={{
                    backgroundColor: cell === 'ghost' ? 'rgba(255,255,255,0.08)' : cell ?? 'var(--color-bg-surface)',
                    boxShadow: cell && cell !== 'ghost' ? `inset 0 0 6px rgba(255,255,255,0.2)` : undefined,
                  }}
                />
              ))
            )}
          </div>

          {/* 遮罩 */}
          {(state.status === 'idle' || state.status === 'over' || state.status === 'paused') && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-lg gap-4">
              {state.status === 'over' && <p className="text-2xl font-bold text-[#FF6B6B]">游戏结束</p>}
              {state.status === 'paused' && <p className="text-2xl font-bold text-white">已暂停</p>}
              {state.status === 'over' && <p className="text-white">得分：{state.score}</p>}
              <button
                onClick={() => dispatch({ type: state.status === 'paused' ? 'PAUSE' : 'START' })}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#A855F7] text-white font-medium hover:opacity-90 transition-opacity"
              >
                {state.status === 'idle' ? '开始游戏' : state.status === 'paused' ? '继续' : '重新开始'}
              </button>
            </div>
          )}
        </div>

        {/* 右侧面板 */}
        <div className="flex flex-col gap-4 min-w-[110px]">
          {/* 下一块 */}
          <div className="bg-[var(--color-bg-surface)] border border-[var(--color-bg-subtle)] rounded-xl p-3">
            <p className="text-xs text-[var(--color-text-muted)] mb-2">下一块</p>
            <div className="flex items-center justify-center h-16">
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${state.next.shape[0].length}, 20px)` }}>
                {state.next.shape.map((row, r) =>
                  row.map((cell, c) => (
                    <div key={`n-${r}-${c}`} className="w-5 h-5"
                      style={{ backgroundColor: cell ? state.next.color : 'transparent' }} />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* 分数 */}
          {[['得分', state.score], ['等级', state.level + 1], ['行数', state.lines]].map(([label, val]) => (
            <div key={label as string} className="bg-[var(--color-bg-surface)] border border-[var(--color-bg-subtle)] rounded-xl p-3 text-center">
              <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
              <p className="text-xl font-bold text-[var(--color-text-primary)]">{val}</p>
            </div>
          ))}

          {state.status === 'playing' && (
            <button onClick={() => dispatch({ type: 'PAUSE' })}
              className="px-3 py-1.5 rounded-full text-xs border border-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] hover:border-[#FF6B6B]/50 transition-colors">
              暂停 P
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-[var(--color-text-muted)] text-center">
        ← → 移动 &nbsp;·&nbsp; ↑ 旋转 &nbsp;·&nbsp; ↓ 软降 &nbsp;·&nbsp; 空格 硬降 &nbsp;·&nbsp; P 暂停
      </p>
    </div>
  )
}
