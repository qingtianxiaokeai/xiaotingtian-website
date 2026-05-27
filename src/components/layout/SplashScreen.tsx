'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * 全屏视频加载画面，手机/电脑同一套逻辑。
 * - 视频正常播完 + 页面已加载 → 消失
 * - 视频播完但页面还在加载 → 循环，等页面就绪
 * - 10 秒兜底：视频未能加载时强制消失
 */
export default function SplashScreen() {
  const [fading, setFading]   = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [muted, setMuted]     = useState(true)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const pageLoaded = useRef(false)
  const didDismiss = useRef(false)

  useEffect(() => {
    // 10 秒兜底（最先设，不受其他逻辑影响）
    const timer = setTimeout(() => dismiss(), 10_000)

    // 监听页面加载完成
    if (document.readyState === 'complete') {
      pageLoaded.current = true
    } else {
      const onLoad = () => { pageLoaded.current = true }
      window.addEventListener('load', onLoad)
    }

    // 修复 React muted prop bug：必须直接写 DOM
    const v = videoRef.current
    if (v) {
      v.muted = true
      v.setAttribute('webkit-playsinline', '')
      v.play().catch(() => {})   // 静默忽略，由 10s timer 兜底
    }

    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function dismiss() {
    if (didDismiss.current) return
    didDismiss.current = true
    setFading(true)
    setTimeout(() => setDismissed(true), 600)
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
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        preload="auto"
        playsInline
        onEnded={handleVideoEnded}
        onError={dismiss}
        className="splash-video"
      />
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
