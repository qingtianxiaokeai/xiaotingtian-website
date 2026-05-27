'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * 全屏视频加载画面。
 * 逻辑：
 *   - 视频播完 + 页面已加载 → 淡出消失
 *   - 视频播完但页面未加载 → 循环播放，等页面就绪后消失
 *   - 页面加载完但视频未播完 → 等视频自然结束再消失
 * 声音：默认静音（移动端 autoplay 要求），右下角按钮可切换
 */
export default function SplashScreen() {
  const [fading, setFading]       = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [muted, setMuted]         = useState(true)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const pageLoaded = useRef(false)

  useEffect(() => {
    if (document.readyState === 'complete') {
      pageLoaded.current = true
    } else {
      const onLoad = () => { pageLoaded.current = true }
      window.addEventListener('load', onLoad)
      return () => window.removeEventListener('load', onLoad)
    }
  }, [])

  function dismiss() {
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
