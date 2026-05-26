# DESIGN.md

> 深海军底色，单一天蓝主色，工程师的克制与技术人的精准并存。

## 1. Visual Theme & Atmosphere

**Style**: 专业科技（Professional Tech）
**Keywords**: 克制、精准、双模、天蓝、工程感、留白、层次、信任
**Tone**: 专业可信、有温度的技术感 — NOT 彩虹、混乱、装饰过度
**Feel**: 一份用 Figma 精心排版的工程师简历，打开即是秘密武器

**Interaction Tier**: L2 流畅交互
**Dependencies**: CSS only + IntersectionObserver（无需 GSAP）

---

## 2. Color Palette & Roles

```css
/* ===== 浅色模式 ===== */
:root {
  /* Backgrounds */
  --bg: #F2EFE9;                          /* 暖奶油页面背景 */
  --surface: #FFFFFF;                      /* 卡片/容器 */
  --surface-alt: #F8F6F2;                  /* 交替 section 背景 */
  --surface-hover: #EEEAE3;               /* 悬停态表面 */

  /* Borders */
  --border: rgba(11, 25, 38, 0.12);       /* 默认边框 */
  --border-hover: rgba(10, 169, 219, 0.4); /* 主色边框 hover */

  /* Text */
  --text: #0B1926;                         /* 标题、重要文字 */
  --text-secondary: rgba(11, 25, 38, 0.56); /* 正文、描述 */
  --text-tertiary: rgba(11, 25, 38, 0.32); /* 标签、辅助信息 */

  /* Accent */
  --accent: #0AA9DB;                       /* CTA、链接、活跃态 */
  --accent-hover: #0891C2;                 /* 强调色 hover（略深） */
  --accent-light: rgba(10, 169, 219, 0.1); /* 强调色浅底 */

  /* RGB variants for rgba() */
  --bg-rgb: 242, 239, 233;
  --accent-rgb: 10, 169, 219;
  --text-rgb: 11, 25, 38;

  /* Semantic */
  --success: #1FB4A2;
  --error: #DE3030;
  --warning: #FFAA1A;

  /* Radius */
  --radius-sm: 8px;
  --radius: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
}

/* ===== 深色模式 ===== */
[data-theme="dark"] {
  /* Backgrounds */
  --bg: #0B1926;                           /* 深海军页面背景 */
  --surface: rgba(255, 255, 255, 0.05);    /* 卡片/容器（5% white） */
  --surface-alt: rgba(255, 255, 255, 0.03);/* 交替 section */
  --surface-hover: rgba(255, 255, 255, 0.08);/* 悬停态 */

  /* Borders */
  --border: rgba(255, 255, 255, 0.08);    /* 默认边框 */
  --border-hover: rgba(40, 194, 240, 0.4); /* 主色边框 hover */

  /* Text */
  --text: rgba(255, 255, 255, 0.88);      /* 主文字 */
  --text-secondary: rgba(255, 255, 255, 0.56); /* 次文字 */
  --text-tertiary: rgba(255, 255, 255, 0.32);  /* 三级文字 */

  /* Accent */
  --accent: #28C2F0;                       /* 深色模式主色（更亮） */
  --accent-hover: #3DCEF8;
  --accent-light: rgba(40, 194, 240, 0.1);

  /* RGB variants */
  --bg-rgb: 11, 25, 38;
  --accent-rgb: 40, 194, 240;
  --text-rgb: 255, 255, 255;

  /* Semantic */
  --success: #3DC799;
  --error: #FF5D52;
  --warning: #FBAD3B;
}
```

**Color Rules:**
- 所有颜色通过 CSS 变量引用，**零硬编码 hex**
- 每个 section 只用一个强调色（`--accent`），禁止多色并列
- 功能色（success/error/warning）仅用于状态反馈，不用于装饰
- `--accent` 在同一视觉区域内不超过两处（主 CTA + 一个强调元素）

---

## 3. Typography Rules

**Font Stack:**
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Hero H1 | Space Grotesk | 56–72px | 700 | 1.1 | -0.02em |
| Section H2 | Space Grotesk | 32–40px | 700 | 1.2 | -0.01em |
| H3 | Space Grotesk | 20–24px | 600 | 1.3 | — |
| Body | Noto Sans SC / Space Grotesk | 15–16px | 400 | 1.75 | 0.01em |
| Label / Eyebrow | Space Grotesk | 11–12px | 500 | 1.4 | 0.08em |
| Mono / Code | JetBrains Mono | 13–14px | 400 | 1.6 | — |

```css
:root {
  --font-heading: 'Space Grotesk', 'Noto Sans SC', system-ui, sans-serif;
  --font-body: 'Noto Sans SC', 'Space Grotesk', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

**Typography Rules:**
- 中文字体 Noto Sans SC 作为 body 首选，确保汉字显示质量
- 中文正文行高 ≥ 1.75，字距 `letter-spacing: 0.01em`
- Heading weight ≥ 600，正文 400–500
- **NEVER use**: 系统回退宋体（SimSun）、Comic Sans、任何 display 类特效字体在正文

**Text Decoration:**
- Hero H1（深色模式）：渐变文字 `#28C2F0 → #0AA9DB`，加 subtle glow `text-shadow: 0 0 40px rgba(40,194,240,0.35)`
- Hero H1（浅色模式）：纯色 `var(--text)`，不加渐变
- Section H2：无渐变，无投影，仅靠字重和大小建立层次
- Eyebrow label：`var(--accent)` 纯色 + 大 letter-spacing

---

## 4. Component Stylings

### Buttons

```css
/* Primary CTA */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 24px;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  text-decoration: none;
}
.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(var(--accent-rgb), 0.3);
}
.btn-primary:active {
  transform: translateY(0) scale(0.97);
  box-shadow: none;
}
.btn-primary:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
.btn-primary:disabled {
  opacity: 0.4;
  pointer-events: none;
}

/* Ghost / Secondary */
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 11px 23px;
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
  text-decoration: none;
}
.btn-ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-light);
}
.btn-ghost:active { transform: scale(0.97); }
.btn-ghost:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
.btn-ghost:disabled { opacity: 0.4; pointer-events: none; }
```

### Cards

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  position: relative;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
  overflow: hidden;
}
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.25s ease;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(var(--accent-rgb), 0.06),
    transparent 50%
  );
}
.card:hover {
  border-color: var(--border-hover);
  box-shadow: 0 0 0 1px rgba(var(--accent-rgb), 0.15),
              0 8px 32px rgba(var(--accent-rgb), 0.08);
  transform: translateY(-2px);
}
.card:hover::before { opacity: 1; }
.card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

### Navigation

```css
.nav {
  position: fixed;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  width: calc(100% - 32px);
  max-width: 960px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  border-radius: var(--radius-xl);
  background: transparent;
  border: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.nav.scrolled {
  background: rgba(var(--bg-rgb), 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-color: var(--border);
  box-shadow: 0 4px 24px rgba(var(--text-rgb), 0.06);
}
.nav-link {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 8px;
  transition: color 0.2s ease, background 0.2s ease;
}
.nav-link:hover {
  color: var(--text);
  background: rgba(var(--text-rgb), 0.05);
}
.nav-link.active {
  color: var(--accent);
  background: var(--accent-light);
}
```

### Links

```css
.link-underline {
  position: relative;
  color: var(--accent);
  text-decoration: none;
}
.link-underline::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent);
  transition: width 0.25s ease;
}
.link-underline:hover::after { width: 100%; }
```

### Tags / Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  font-family: var(--font-heading);
  letter-spacing: 0.04em;
  background: var(--accent-light);
  color: var(--accent);
  border: 1px solid rgba(var(--accent-rgb), 0.2);
  white-space: nowrap;
}
```

### Spotlight Card（项目卡 hover 追光）

```css
/* JS 注入 --mouse-x / --mouse-y 到每张卡片 */
.spotlight-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
}
.spotlight-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(var(--accent-rgb), 0.08),
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.spotlight-card:hover::after { opacity: 1; }
```

---

## 5. Layout Principles

**Container:**
- Max width: `1024px`（作品集、项目列表）
- Padding: `0 24px`（desktop），`0 16px`（mobile）
- Narrow variant（文字密集页）: `720px`

**Spacing Scale:**
- Section padding: `80px 0`（desktop），`56px 0`（mobile）
- Component gap: `24px`（卡片间距）
- Card internal padding: `24px`（desktop），`20px`（mobile）

**Grid:**
```css
/* 3列项目网格 */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Bento 不等大布局（首页精选项目） */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto;
  gap: 16px;
}
.bento-item--wide  { grid-column: span 4; }
.bento-item--tall  { grid-row: span 2; }
.bento-item--small { grid-column: span 2; }

@media (max-width: 768px) {
  .grid-3, .bento-grid { grid-template-columns: 1fr; }
  .bento-item--wide,
  .bento-item--tall,
  .bento-item--small { grid-column: span 1; grid-row: span 1; }
}
```

---

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | 无阴影，仅 border | 默认卡片、输入框 |
| Subtle | `0 2px 8px rgba(var(--text-rgb), 0.06)` | hover 前状态 |
| Elevated | `0 8px 32px rgba(var(--accent-rgb), 0.08)` | hover 后、弹层 |
| Glow（暗色专用）| `0 0 0 1px rgba(var(--accent-rgb), 0.2), 0 0 24px rgba(var(--accent-rgb), 0.12)` | 深色模式重点卡片 |
| Modal | `0 24px 64px rgba(0,0,0,0.4)` | 弹窗、下拉菜单 |

---

## 7. Animation & Interaction

**Motion Philosophy**: 每个动效服务于内容层次，transition 只用 opacity 和 transform，不做 filter blur 运动
**Tier**: L2

### Dependencies
```html
<!-- 无额外 CDN，全部 CSS + IntersectionObserver -->
```

### Entrance Animation（fadeInUp + stagger）

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0);    }
}

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.in-view {
  opacity: 1;
  transform: translateY(0);
}

/* Hero 专属：更快 */
.reveal-hero {
  animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.reveal-hero:nth-child(2) { animation-delay: 0.1s; }
.reveal-hero:nth-child(3) { animation-delay: 0.2s; }
.reveal-hero:nth-child(4) { animation-delay: 0.32s; }
```

```js
// IntersectionObserver 触发 reveal
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (!e.isIntersecting) return;
      const delay = e.target.dataset.delay || 0;
      setTimeout(() => e.target.classList.add('in-view'), delay * 1000);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
```

### Scroll Behavior

```js
// 导航滚动变化
function initNavScroll() {
  const nav = document.querySelector('.nav');
  const handler = () => nav?.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', handler, { passive: true });
}

// SpotlightCard 追光
function initSpotlight(selector = '.spotlight-card') {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });
}

// 滚动进度条
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    bar.style.transform = `scaleX(${pct})`;
  }, { passive: true });
}
```

### Text Animations（L2 必须）

```tsx
// Hero H1：SplitText 逐字入场（framer-motion 已安装，可直接用）
// Section H2：ScrollFloat — 随滚动上浮并保持
// Body/Label：ScrollReveal — 逐词滑入

// Hero H1 framer-motion 实现
const heroVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
}
const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}
// 将 Hero H1 文字按字拆分 → 每字包在 <motion.span> 中

// Section H2 ScrollFloat（滚动触发淡入上浮）
const sectionH2Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}
```

### Hover & Focus States

```css
/* 所有可交互元素 */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}

/* 卡片 hover：border 发光 */
.card:hover {
  border-color: rgba(var(--accent-rgb), 0.3);
  box-shadow: 0 0 0 1px rgba(var(--accent-rgb), 0.12),
              0 8px 32px rgba(var(--accent-rgb), 0.08);
}

/* 按钮 hover：上浮 + 阴影 */
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(var(--accent-rgb), 0.3);
}

/* 链接 hover：下划线滑入 */
.link-underline:hover::after { width: 100%; }
```

### Special Effects

```css
/* 首屏背景：深色模式下的 Aurora 光晕（纯 CSS，无性能代价） */
.hero-aurora {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}
.hero-aurora::before {
  content: '';
  position: absolute;
  top: -30%;
  left: -10%;
  width: 60%;
  height: 80%;
  background: radial-gradient(ellipse,
    rgba(var(--accent-rgb), 0.12) 0%,
    transparent 65%);
  animation: auroraShift 12s ease-in-out infinite alternate;
}
.hero-aurora::after {
  content: '';
  position: absolute;
  top: 10%;
  right: -10%;
  width: 50%;
  height: 60%;
  background: radial-gradient(ellipse,
    rgba(40, 194, 240, 0.07) 0%,
    transparent 60%);
  animation: auroraShift 16s ease-in-out infinite alternate-reverse;
}
@keyframes auroraShift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(40px, 30px) scale(1.1); }
}

/* 宣言横滚带（Marquee）— 首次滑动钩子 */
.marquee-track {
  display: flex;
  gap: 48px;
  animation: marqueeScroll 20s linear infinite;
  width: max-content;
}
@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-wrap {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
}

/* 滚动进度条 */
.scroll-progress {
  position: fixed;
  top: 0; left: 0;
  height: 2px;
  width: 100%;
  background: var(--accent);
  transform-origin: left;
  transform: scaleX(0);
  z-index: 200;
  transition: none;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal { opacity: 1; transform: none; }
  .hero-aurora::before,
  .hero-aurora::after { animation: none; }
  .marquee-track { animation: none; }
}
```

---

## 8. Do's and Don'ts

### Do
- 每个页面用且仅用 `--accent`（天蓝）作为唯一强调色
- 卡片默认状态 border 用 `var(--border)`，hover 才亮蓝
- 深色模式里用 Aurora 光晕营造层次，浅色模式用纯净白底
- Hero 区域的 H1 在深色模式下用渐变 + glow，浅色模式不渐变
- 入场动画必须在滚动到视口时触发（IntersectionObserver），不在页面加载时立刻全跑完
- 文字层次靠字号 + 字重 + `--text-secondary` 颜色差异建立，不靠装饰
- 中文正文行高 ≥ 1.75

### Don't
- ❌ 不再同时使用珊瑚红/紫/青绿/黄/蓝 5 色——只保留天蓝 `--accent`
- ❌ 不在正式 UI 中使用 Emoji 作为装饰（👋 ✨ 🌐 🎨 禁止出现在卡片和 section）
- ❌ 不对运动中的元素加 `filter: blur()`（性能杀手）
- ❌ `backdrop-filter: blur()` 值不超过 14px，不覆盖大面积滚动区
- ❌ 不在同一 section 同时出现 2 个以上渐变文字
- ❌ 项目卡片不使用纯色渐变占位图，必须有真实内容或合理占位（icon + 项目名）
- ❌ 不使用 CSS `float` 或 `translateY` 超过 -6px 的卡片浮起 hover（用 glow border 替代）
- ❌ 不在 body 正文 `p` 标签上加任何 text-shadow 或渐变
- ❌ 不全局替换鼠标光标（这是产品/工具类站点才用的）
- ❌ 渐变滚动条 thumb 的多色设计改为纯 `var(--accent)` 单色
- ❌ 旋转装饰圆（.animate-spin-slow）直接删除，与专业风格不符

---

## 9. Responsive Behavior

**Breakpoints:**
| Name | Width | Key Changes |
|------|-------|-------------|
| Desktop | > 1024px | 3列网格，Hero 左右布局，Bento 6列 |
| Tablet | 768px–1024px | 2列网格，间距缩小 |
| Mobile | < 768px | 1列，Hero 纵向（头像在上），nav 折叠为汉堡菜单 |

**Touch Targets:** 最小 44×44px
**Collapsing Strategy:** 桌面 3列 → 平板 2列 → 手机 1列；Hero 左右 → 上下（头像在上）

```css
/* 容器 */
.container {
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Section 间距 */
section { padding: 80px 0; }

@media (max-width: 768px) {
  section { padding: 56px 0; }
  .container { padding: 0 16px; }

  .grid-3 {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  /* Hero 手机：头像上，文字下 */
  .hero-layout {
    flex-direction: column-reverse;
    gap: 24px;
  }
  .hero-h1 { font-size: clamp(36px, 10vw, 56px); }

  /* 导航折叠 */
  .nav {
    top: 8px;
    width: calc(100% - 16px);
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
}

/* 流体字号 */
.hero-h1 {
  font-size: clamp(40px, 6vw, 72px);
}
.section-h2 {
  font-size: clamp(24px, 3.5vw, 40px);
}
```

---

*Motion effects guidelines reference [vue-bits](https://github.com/DavidHDev/vue-bits) by DavidHDev (MIT)*
