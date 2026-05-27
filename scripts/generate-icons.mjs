/**
 * 生成 PWA 所需的各尺寸 App 图标
 * 使用方法：node scripts/generate-icons.mjs
 * 依赖：sharp（已随 next 安装，无需额外安装）
 */

import sharp from 'sharp'
import { mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC = join(ROOT, 'public', 'images', 'APPtubiao.png')
const DEST = join(ROOT, 'public', 'icons')

// PWA 标准尺寸（Android 全覆盖）
const sizes = [72, 96, 128, 144, 152, 192, 384, 512]

async function main() {
  await mkdir(DEST, { recursive: true })

  console.log('📦 正在生成 App 图标...')

  // 1. 标准尺寸图标
  for (const size of sizes) {
    await sharp(SRC)
      .resize(size, size, { fit: 'cover', position: 'centre' })
      .png()
      .toFile(join(DEST, `icon-${size}x${size}.png`))
    console.log(`  ✓ icon-${size}x${size}.png`)
  }

  // 2. apple-touch-icon：180×180，iOS 主屏幕专用
  await sharp(SRC)
    .resize(180, 180, { fit: 'cover', position: 'centre' })
    .png()
    .toFile(join(DEST, 'apple-touch-icon.png'))
  console.log('  ✓ apple-touch-icon.png (180×180, iOS)')

  // 3. maskable 图标：512×512，中心内容缩至 80%，四周留白
  //    确保 Android 自适应裁剪（圆形、方形等）时不会裁掉主体
  await sharp(SRC)
    .resize(410, 410, { fit: 'cover', position: 'centre' })
    .extend({ top: 51, bottom: 51, left: 51, right: 51, background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(join(DEST, 'maskable-icon-512x512.png'))
  console.log('  ✓ maskable-icon-512x512.png (Android 自适应)')

  console.log(`\n✅ 全部完成！图标已生成到 public/icons/（共 ${sizes.length + 2} 个文件）`)
}

main().catch(err => {
  console.error('❌ 生成失败：', err.message)
  process.exit(1)
})
