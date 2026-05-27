'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * 全屏视频加载画面。
 * 逻辑：
 *   - 视频播完 + 页面已加载 → 淡出消失
 *   - 视频播完但页面未加载 → 循环播放，等页面就绪后消失
 *   - 页面加载完但视频未播完 → 等视频自然结束再消失
 *   - 视频加载失败 / 超过 10 秒 → 强制消失（防止永久黑屏）
 * 声音：默认静音（移动端 autoplay 要求），右下角按钮可切换
 */
export default function SplashScreen() {
  const [fading, setFading]       = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [muted, setMuted]         = useState(true)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const pageLoaded = useRef(false)
  const didDismiss = useRef(false)

  useEffect(() => {
    // 监听页面加载完成
    if (document.readyState === 'complete') {
      pageLoaded.current = true
    } else {
      const onLoad = () => { pageLoaded.current = true }
      window.addEventListener('load', onLoad)
    }

    // 最多 10 秒兜底，防止视频加载失败导致永久黑屏
    const timer = setTimeout(() => dismiss(), 10_000)
    return () => clearTimeout(timer)
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
      // 页面还没加载好，循环播放
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
        muted        // 初始静音，保证移动端自动播放
        playsInline  // iOS 不强制全屏
        onEnded={handleVideoEnded}
        onError={dismiss}   // 视频加载失败立即消失
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
