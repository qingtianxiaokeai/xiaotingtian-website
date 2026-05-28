'use client'
import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

/**
 * 全屏视频加载画面。
 * 核心技巧：
 * 1. poster 封面图 → 视频加载时立刻显示静态画面，无黑屏等待
 * 2. state 控制 src → 视频元素带 src 创建，浏览器 autoPlay 决策正确
 * 3. 手机用 1280p 压缩版（590 KB），电脑用原画质
 */
export default function SplashScreen() {
  const [fading, setFading]       = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [muted, setMuted]         = useState(true)
  const [videoSrc, setVideoSrc]   = useState('')
  const videoRef   = useRef<HTMLVideoElement>(null)
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pageLoaded = useRef(false)
  const didDismiss = useRef(false)

  useEffect(() => {
    // 兜底计时器（最先设）
    timerRef.current = setTimeout(() => dismiss(), 20_000)

    // 锁定 body 滚动，防止用户滑动看到背后的页面
    document.body.style.overflow = 'hidden'

    // 监听页面加载完成
    if (document.readyState === 'complete') {
      pageLoaded.current = true
    } else {
      const onLoad = () => { pageLoaded.current = true }
      window.addEventListener('load', onLoad)
    }

    // 手机用 590 KB 压缩版，电脑用原画质
    const isMobile =
      window.innerWidth <= 768 ||
      /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
    setVideoSrc(isMobile ? '/videos/intro-mobile-hd.mp4' : '/videos/intro.mp4')

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      document.body.style.overflow = ''
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // videoSrc 确定后，修复 React muted prop bug
  useEffect(() => {
    if (!videoSrc) return
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.setAttribute('muted', '')
    v.setAttribute('webkit-playsinline', '')
  }, [videoSrc])

  function dismiss() {
    if (didDismiss.current) return
    didDismiss.current = true
    document.body.style.overflow = ''
    setFading(true)
    setTimeout(() => setDismissed(true), 400)
  }

  function handlePlay() {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  function handleCanPlay() {
    const v = videoRef.current
    if (v && v.paused) {
      v.muted = true
      v.play().catch(() => {})
    }
  }

  function handleVideoEnded() {
    if (pageLoaded.current) {
      dismiss()
    } else {
      const v = videoRef.current
      if (v) { v.currentTime = 0; void v.play() }
    }
  }

  function toggleMute() {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  if (dismissed) return null

  return (
    <div className={`splash-overlay${fading ? ' splash-fade-out' : ''}`}>
      {/* 无条件渲染，SSR 直接输出到 HTML，浏览器收到页面即开始加载 poster */}
      <img
        src="/videos/intro-poster.jpg"
        alt=""
        aria-hidden="true"
        className="splash-video"
        fetchPriority="high"
      />
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster="/videos/intro-poster.jpg"
          autoPlay
          muted
          preload="auto"
          playsInline
          onPlay={handlePlay}
          onCanPlay={handleCanPlay}
          onEnded={handleVideoEnded}
          onError={dismiss}
          className="splash-video"
        />
      )}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]"
        aria-label={muted ? '开启声音' : '关闭声音'}
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
      <button onClick={dismiss} className="splash-skip-btn" aria-label="跳过">
        跳过
      </button>
    </div>
  )
}
