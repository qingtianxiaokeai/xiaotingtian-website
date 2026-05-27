import type { MetadataRoute } from 'next'

// 静态导出（GitHub Pages）兼容
export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '小青天 | 个人网站',
    short_name: '小青天',
    description: '小青天的个人网站 — 前端开发 · UI/UX 设计 · 创意内容',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#F2EFE9',
    theme_color: '#0AA9DB',
    lang: 'zh-CN',
    icons: [
      { src: '/icons/icon-72x72.png',   sizes: '72x72',   type: 'image/png' },
      { src: '/icons/icon-96x96.png',   sizes: '96x96',   type: 'image/png' },
      { src: '/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
      { src: '/icons/icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { src: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
      { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/icons/maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: '博客',
        short_name: '博客',
        description: '查看最新文章',
        url: '/blog',
        icons: [{ src: '/icons/icon-96x96.png', sizes: '96x96' }],
      },
      {
        name: '作品集',
        short_name: '作品集',
        description: '查看作品展示',
        url: '/portfolio',
        icons: [{ src: '/icons/icon-96x96.png', sizes: '96x96' }],
      },
    ],
  }
}
