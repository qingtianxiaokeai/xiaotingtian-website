/**
 * Service Worker — 小青天个人网站 PWA
 * 策略：有网络时始终拉取最新内容；无网络时回退到缓存
 */

const CACHE_NAME = 'xiaotingtian-v7'

// 安装时预缓存首页，确保离线时有内容可显示
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(['/']))
  )
  // 新 SW 立即激活，不等旧 SW 关闭
  self.skipWaiting()
})

// 激活时清理旧版本缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  )
  // 立即接管所有已打开的页面
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // 只处理同源请求，忽略 API、外部资源等
  if (url.origin !== location.origin) return
  if (url.pathname.startsWith('/api/')) return

  // ★ 视频文件不走 SW 缓存：
  //   视频依赖 HTTP Range 分段请求，SW 的 cache.match 无法匹配 Range 请求，
  //   拦截后会破坏移动端视频流式加载，导致黑屏/无法播放。
  if (request.destination === 'video') return

  if (request.mode === 'navigate') {
    // ── 页面导航：NetworkFirst ──
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
          return response
        })
        .catch(() => caches.match('/'))
    )
  } else if (['style', 'script', 'image', 'font'].includes(request.destination)) {
    // ── 静态资源：StaleWhileRevalidate ──
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(request).then(cached => {
          const fetchPromise = fetch(request).then(response => {
            cache.put(request, response.clone())
            return response
          })
          return cached ?? fetchPromise
        })
      )
    )
  }
})
