'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * 全屏视频加载画面。
 * 逻辑：
 *   - 视频播完 + 页面已加载 → 淡出消失
 *   - 视频播完但页面未加载 → 循环播放，等页面就绪后消失
 *   - 页面加载完但视频未播完 → 等视频自然结束再消失
 *   - autoplay 被拦截 / 加载失败 / 超过 10 秒 → 强制消失
 *
 * 注意：React 有已知 bug：JSX 的 muted/autoPlay 不能可靠写入 DOM，
 *       必须在 useEffect 里通过 ref 手动设置，再调 video.play()。
 */
export default function SplashScreen() {
  const [fading, setFading]       = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [muted, setMuted]         = useState(true)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const pageLoaded = useRef(false)
  const didDismiss = useRef(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    // ★ 修复 React muted bug：直接写 DOM 属性，JSX prop 不可靠
    v.muted = true

    // 手动触发播放，catch 处理 autoplay 被拦截的情况
    v.play().catch(() => dismiss())

    // 监听页面加载完成
    if (document.readyState === 'complete') {
      pageLoaded.current = true
    } else {
      const onLoad = () => { pageLoaded.current = true }
      window.addEventListener('load', onLoad)
    }

    // 最多 10 秒兜底
    const timer = setTimeout(() => dismiss(), 10_000)
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
      {/* autoPlay/muted 不写 JSX prop，全由 useEffect 通过 ref 控制 */}
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        playsInline
        onEnded={handleVideoEnded}
        onError={dismiss}
        className="splash-video"
      />
      <button
        onClick={toggleMute}
        className="splash-mute-btn"
        aria-label={muted ? '开启声音' : '关闭声音'}
      >
        {muted ? '🔇' : '🔊'}
      </button>
    </div>
  )
}
