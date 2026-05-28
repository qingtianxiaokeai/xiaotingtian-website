'use client'
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

interface MusicContextValue {
  playing: boolean
  toggle: () => void
}

const MusicContext = createContext<MusicContextValue>({
  playing: false,
  toggle: () => {},
})

export function MusicProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  // 记录用户意图：希望播放但还未获得 autoplay 许可
  const pendingPlay = useRef(false)

  useEffect(() => {
    const audio = new Audio('/videos/intro.mp4')
    audio.loop = true
    audio.volume = 0.35
    audio.preload = 'none'
    audioRef.current = audio

    // 读取持久化状态（默认关闭）
    const stored = localStorage.getItem('bgm-playing')
    if (stored === '1') {
      setPlaying(true)
      audio.play().catch(() => {
        // autoplay 被拒（浏览器策略），记录意图等待用户交互
        setPlaying(false)
        pendingPlay.current = true
      })
    }

    // 首次用户交互时，若有 pending 意图则自动恢复播放
    const onInteraction = () => {
      if (pendingPlay.current && audioRef.current) {
        pendingPlay.current = false
        audioRef.current.play()
          .then(() => setPlaying(true))
          .catch(() => {})
      }
    }
    const events = ['click', 'keydown', 'touchstart'] as const
    events.forEach(e =>
      document.addEventListener(e, onInteraction, { once: true, passive: true })
    )

    return () => {
      events.forEach(e => document.removeEventListener(e, onInteraction))
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
      localStorage.setItem('bgm-playing', '0')
      pendingPlay.current = false
    } else {
      audio.play()
        .then(() => {
          setPlaying(true)
          localStorage.setItem('bgm-playing', '1')
        })
        .catch(() => {})
    }
  }, [playing])

  return (
    <MusicContext.Provider value={{ playing, toggle }}>
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  return useContext(MusicContext)
}
