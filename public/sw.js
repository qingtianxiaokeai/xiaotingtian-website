/**
 * Service Worker — 小青天个人网站 PWA
 * 策略：有网络时始终拉取最新内容；无网络时回退到缓存
 */

const CACHE_NAME = 'xiaotingtian-v1'

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

  // API 请求（联系表单）不走缓存
  if (url.pathname.startsWith('/api/')) return

  if (request.mode === 'navigate') {
    // ── 页面导航：NetworkFirst ──
    // 有网络就用最新页面，无网络返回缓存首页
    event.respondWith(
      fetch(request)
        .then(response => {
          // 顺手把新页面存入缓存
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
          return response
        })
        .catch(() => caches.match('/'))
    )
  } else if (['style', 'script', 'image', 'font'].includes(request.destination)) {
    // ── 静态资源：StaleWhileRevalidate ──
    // 立即返回缓存（快），同时后台更新缓存
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
