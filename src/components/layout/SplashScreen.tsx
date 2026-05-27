'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * 全屏视频加载画面，手机/电脑自动选择不同清晰度。
 * - 手机（≤768px 或移动 UA）→ intro-mobile.mp4（219 KB，快速加载）
 * - 电脑 → intro.mp4（3.3 MB，原画质）
 * - 视频真正开始播放 → 取消超时，让视频正常播完
 * - 视频播完但页面还在加载 → 循环，等页面就绪
 * - 20 秒兜底：视频始终无法加载时强制消失
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
    timerRef.current = setTimeout(() => dismiss(), 20_000)

    // 监听页面加载完成
    if (document.readyState === 'complete') {
      pageLoaded.current = true
    } else {
      const onLoad = () => { pageLoaded.current = true }
      window.addEventListener('load', onLoad)
    }

    const v = videoRef.current
    if (v) {
      // 手机检测：屏幕宽度 ≤768px 或移动端 UA
      const isMobile =
        window.innerWidth <= 768 ||
        /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)

      // 手机用压缩版（219 KB），电脑用原版（3.3 MB）
      v.src = isMobile ? '/videos/intro-mobile.mp4' : '/videos/intro.mp4'

      // 修复 React muted prop bug + 安卓 Chrome 自动播放策略
      v.muted = true
      v.setAttribute('muted', '')
      v.setAttribute('webkit-playsinline', '')
      v.load()                  // src 变更后需要重新 load
      v.play().catch(() => {})  // 静默忽略；autoPlay 属性会在数据就绪后触发
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
      {/* src 由 useEffect 根据设备动态写入，此处留空避免预加载错误文件 */}
      <video
        ref={videoRef}
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
