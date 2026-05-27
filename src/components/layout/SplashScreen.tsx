'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * 全屏视频加载画面。
 * 逻辑：视频播完 + 页面已加载 → 消失；页面未加载 → 循环等待。
 * 兜底：超时 8s 强制消失，视频加载失败立即消失，"跳过"按钮随时可退。
 */
export default function SplashScreen() {
  const [fading, setFading]       = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [muted, setMuted]         = useState(true)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const pageLoaded = useRef(false)
  const didDismiss = useRef(false)

  useEffect(() => {
    // ★ 超时兜底必须第一个设，不受 videoRef 是否可用影响
    const timer = setTimeout(() => dismiss(), 8_000)

    // 监听页面加载完成
    if (document.readyState === 'complete') {
      pageLoaded.current = true
    } else {
      const onLoad = () => { pageLoaded.current = true }
      window.addEventListener('load', onLoad)
    }

    // 视频播放（React muted prop bug 修复：直接写 DOM 属性）
    const v = videoRef.current
    if (v) {
      v.muted = true
      // webkit-playsinline：旧版 iOS Safari 兼容
      v.setAttribute('webkit-playsinline', '')
      v.play().catch(() => dismiss())
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
        playsInline
        onEnded={handleVideoEnded}
        onError={dismiss}
        className="splash-video"
      />
      {/* 静音切换 */}
      <button onClick={toggleMute} className="splash-mute-btn"
        aria-label={muted ? '开启声音' : '关闭声音'}>
        {muted ? '🔇' : '🔊'}
      </button>
      {/* 跳过按钮：视频无法播放时的最终出口 */}
      <button onClick={dismiss} className="splash-skip-btn" aria-label="跳过">
        跳过
      </button>
    </div>
  )
}
