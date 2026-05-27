'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * 全屏加载画面。
 * 设计：品牌文字「小青天」始终可见（视频播时变为半透明叠加），
 * 不依赖视频是否成功播放，确保手机端不再出现纯黑屏。
 */
export default function SplashScreen() {
  const [fading, setFading]           = useState(false)
  const [dismissed, setDismissed]     = useState(false)
  const [videoStarted, setVideoStarted] = useState(false)
  const [muted, setMuted]             = useState(true)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const pageLoaded = useRef(false)
  const didDismiss = useRef(false)

  useEffect(() => {
    // 超时兜底：5 秒内必然消失
    const timer = setTimeout(() => dismiss(), 5_000)

    // 监听页面加载完成
    if (document.readyState === 'complete') {
      pageLoaded.current = true
    } else {
      const onLoad = () => { pageLoaded.current = true }
      window.addEventListener('load', onLoad)
    }

    // 视频：修复 React muted bug，手动设置
    const v = videoRef.current
    if (v) {
      v.muted = true
      v.setAttribute('webkit-playsinline', '')
      v.play().catch(() => {})   // 播放失败交给 timer 兜底
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

      {/* 视频层：就绪后淡入（位于底层） */}
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        preload="auto"
        playsInline
        onPlay={() => setVideoStarted(true)}
        onEnded={handleVideoEnded}
        onError={() => {}}
        className="splash-video"
        style={{ opacity: videoStarted ? 1 : 0 }}
      />

      {/* 品牌层：始终显示在视频之上
          视频播放时半透明（让视频透出），未播时全显（防黑屏） */}
      <div
        className="splash-loader"
        style={{ opacity: videoStarted ? 0.18 : 1 }}
      >
        <p className="splash-title">小青天</p>
        <div className="splash-dots">
          <span /><span /><span />
        </div>
      </div>

      {/* 声音按钮：仅视频播放时显示 */}
      {videoStarted && (
        <button onClick={toggleMute} className="splash-mute-btn"
          aria-label={muted ? '开启声音' : '关闭声音'}>
          {muted ? '🔇' : '🔊'}
        </button>
      )}

      {/* 跳过：任何情况下的出口 */}
      <button onClick={dismiss} className="splash-skip-btn" aria-label="跳过">
        跳过
      </button>
    </div>
  )
}
