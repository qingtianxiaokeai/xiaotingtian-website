'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * 全屏视频加载画面。
 * 关键：视频元素必须带着 src 一起被创建，浏览器才能在渲染时决定自动播放。
 * 用 state 控制 src，useEffect 检测设备后赋值 → React 带 src 渲染视频元素 → autoPlay 生效。
 */
export default function SplashScreen() {
  const [fading, setFading]     = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [muted, setMuted]       = useState(true)
  // src 从空字符串开始，避免 SSR/hydration 不匹配；useEffect 检测设备后设置
  const [videoSrc, setVideoSrc] = useState('')
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

    // 统一用原画质，触发 re-render 后视频元素带 src 创建，autoPlay 可正常生效
    setVideoSrc('/videos/intro.mp4')

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      document.body.style.overflow = ''
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // videoSrc 确定后（视频元素刚创建），修复 React muted prop bug
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
    document.body.style.overflow = ''  // 解锁滚动
    setFading(true)
    setTimeout(() => setDismissed(true), 400)
  }

  /** 视频开始播放 → 取消兜底计时器 */
  function handlePlay() {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  /** 视频有数据可播 → 兜底 play()（防止 autoPlay 不触发）*/
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
      {/* videoSrc 设置后才渲染视频元素，确保元素创建时就带 src */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
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
      <button onClick={toggleMute} className="splash-mute-btn"
        aria-label={muted ? '开启声音' : '关闭声音'}>
        {muted ? '🔇' : '🔊'}
      </button>
      <button onClick={dismiss} className="splash-skip-btn" aria-label="跳过">
        跳过
      </button>
    </div>
  )
}
