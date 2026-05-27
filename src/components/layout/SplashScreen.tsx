'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * 全屏视频加载画面。
 * - 缓冲时：显示品牌背景 + 站名 + 加载动画，不再是纯黑屏
 * - 视频就绪后：淡入播放
 * - 播完 + 页面已加载 → 消失；否则循环等待
 * - 超时 8s / 加载失败 → 强制消失
 */
export default function SplashScreen() {
  const [fading, setFading]         = useState(false)
  const [dismissed, setDismissed]   = useState(false)
  const [videoStarted, setVideoStarted] = useState(false)
  const [muted, setMuted]           = useState(true)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const pageLoaded = useRef(false)
  const didDismiss = useRef(false)

  useEffect(() => {
    // 超时兜底：必须最先设，不受任何条件影响（5s = 视频时长）
    const timer = setTimeout(() => dismiss(), 5_000)

    // 监听页面加载完成
    if (document.readyState === 'complete') {
      pageLoaded.current = true
    } else {
      const onLoad = () => { pageLoaded.current = true }
      window.addEventListener('load', onLoad)
    }

    // 修复 React muted prop bug：直接操作 DOM
    const v = videoRef.current
    if (v) {
      v.muted = true
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

      {/* 缓冲占位：视频播放前显示，播放后淡出 */}
      <div
        className="splash-loader"
        style={{ opacity: videoStarted ? 0 : 1, pointerEvents: videoStarted ? 'none' : 'auto' }}
      >
        <p className="splash-title">小青天</p>
        <div className="splash-dots">
          <span /><span /><span />
        </div>
      </div>

      {/* 视频：缓冲时透明，播放时淡入 */}
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        preload="auto"
        playsInline
        onPlay={() => setVideoStarted(true)}
        onEnded={handleVideoEnded}
        onError={dismiss}
        className="splash-video"
        style={{ opacity: videoStarted ? 1 : 0 }}
      />

      {/* 静音切换 */}
      <button onClick={toggleMute} className="splash-mute-btn"
        aria-label={muted ? '开启声音' : '关闭声音'}>
        {muted ? '🔇' : '🔊'}
      </button>

      {/* 跳过按钮 */}
      <button onClick={dismiss} className="splash-skip-btn" aria-label="跳过">
        跳过
      </button>
    </div>
  )
}
