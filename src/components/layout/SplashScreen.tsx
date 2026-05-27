'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * 全屏视频加载画面，手机/电脑同一套逻辑。
 * - 视频真正开始播放 → 取消超时，视频播完再消失
 * - 视频播完但页面还在加载 → 循环，等页面就绪
 * - 20 秒兜底：视频始终无法加载时强制消失（手机慢网容忍）
 */
export default function SplashScreen() {
  const [fading, setFading]       = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [muted, setMuted]         = useState(true)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pageLoaded = useRef(false)
  const didDismiss = useRef(false)

  useEffect(() => {
    // 兜底计时器（最先设，不受其他逻辑影响）
    // 手机慢网给 20s 机会；视频一旦开始播放，此计时器会被取消
    timerRef.current = setTimeout(() => dismiss(), 20_000)

    // 监听页面加载完成
    if (document.readyState === 'complete') {
      pageLoaded.current = true
    } else {
      const onLoad = () => { pageLoaded.current = true }
      window.addEventListener('load', onLoad)
    }

    // 修复 React muted prop bug + 补全 HTML attribute（安卓 Chrome 自动播放策略需要）
    const v = videoRef.current
    if (v) {
      v.muted = true
      v.setAttribute('muted', '')
      v.setAttribute('webkit-playsinline', '')
      v.play().catch(() => {})   // 静默忽略；autoPlay 属性会在数据就绪后自动触发
    }

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function dismiss() {
    if (didDismiss.current) return
    didDismiss.current = true
    setFading(true)
    setTimeout(() => setDismissed(true), 600)
  }

  /** 视频真正开始播放 → 取消兜底计时器，让视频正常播完 */
  function handlePlay() {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
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
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        autoPlay
        muted
        preload="auto"
        playsInline
        onPlay={handlePlay}
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
