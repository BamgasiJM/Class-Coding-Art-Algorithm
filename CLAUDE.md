# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a generative art portfolio website built with **React 19 + Vite**, featuring interactive 3D graphics and algorithm demonstrations. The site showcases 20 generative art algorithms across categories like Foundations, Randomness & Noise, Grammar Systems, Spatial Structures, Dynamics & Physics, Collective Behavior, Shaders & GPU, and Data & ML.

**Key Technologies:**
- **Bundler & Dev Server:** Vite 8
- **UI Framework:** React 19 (JSX)
- **3D Graphics:** Three.js + React Three Fiber (R3F)
- **Animations:** GSAP 3 (with ScrollTrigger)
- **Fonts:** Bebas Neue, DM Mono, IBM Plex Sans KR (Google Fonts)

---

## Development Commands

```bash
npm install              # Install dependencies
npm run dev             # Start dev server (http://localhost:5173)
npm run build           # Production build
npm run preview         # Preview production build locally
```

---

## Architecture & Code Structure

### Top-Level Layout
- **src/App.jsx** — Main component that composes HeroSection and AlgorithmSection
- **src/main.jsx** — Entry point (React root render)
- **src/index.css** — Global styles (fonts, resets, layout)

### Core Components

#### HeroSection (src/components/HeroSection.jsx)
The landing section with animated hero content and 3D particle background:
- **R3F Canvas**: Renders 5,000 particles using Flow Field algorithm in real-time
- **GSAP Timeline**: Sequences the tagline → divider → character-by-character title animation
- **ScrollTrigger**: Hero content fades out smoothly as user scrolls down
- **Custom Cursor**: GSAP-driven animated cursor with accent color tracking mouse position
- **Particle Background**: Handled by separate ParticleBackground component

#### ParticleBackground (src/components/canvas/ParticleBackground.jsx)
R3F component implementing a Flow Field-based particle system:
- 5,000 particles rendered as instanced geometries
- Particles move based on Perlin noise-influenced velocity fields
- Uses Three.js shaders for GPU-accelerated updates
- Imported and rendered as `<Canvas>` within HeroSection

#### AlgorithmSection (src/components/AlgorithmSection.jsx)
Grid-based card display of 20 generative art algorithms:
- **Data Structure**: `ALGORITHMS` array of objects with fields:
  ```js
  { no: '01', name: '...', desc: '...', tags: ['tag1', 'tag2', ...] }
  ```
- **Grid Layout**: CSS Grid with `repeat(auto-fill, minmax(260px, 1fr))` — auto-wraps as viewport changes
- **Uniform Card Heights**: Flexbox layout with `flex: 1` on description area ensures all cards match height regardless of text length
- **Scroll-Triggered Animations**: IntersectionObserver detects card entry into viewport, GSAP animates cards sliding up from below
- **Interactive Hover**: Border and title text color shift to accent color (`#ff4d1c`)
- **Checkbox Toggle**: Each card has a clickable checkbox (styled as SVG square); toggles accent fill to mark algorithms discussed in presentations

---

## Key Implementation Details

### Adding Algorithm Cards
Edit the `ALGORITHMS` array in `src/components/AlgorithmSection.jsx`:
```js
{
  no: '21',                        // Two-digit string for display numbering
  name: 'Algorithm Name',          // Card title
  desc: 'Description of the...',   // Body text explaining the algorithm
  tags: ['tag1', 'tag2', 'tag3'],  // 3–4 category tags
}
```
Grid automatically reflows; no layout tweaks needed.

### Animation Approach
- **GSAP Timeline**: For sequenced, orchestrated animations (HeroSection title reveal)
- **ScrollTrigger**: For scroll-linked fades and parallax (hero fade-out on scroll)
- **IntersectionObserver + GSAP**: For scroll-triggered card reveals (AlgorithmSection cards)
- **Inline Hover & Click**: Pure CSS or React state for instant feedback (checkbox, hover effects)

### Style Organization
Global styles in `src/index.css`:
- Font imports from Google Fonts
- CSS variables for colors (accent: `#ff4d1c`, text colors, backgrounds)
- Reusable utility classes for spacing and alignment
- Component-scoped styles are defined inline or in style objects within JSX files (no separate CSS modules currently)

---

## Performance Notes

- **THREE.Clock Deprecation Warning**: Browser console may show `THREE.Clock: This module has been deprecated` — this is from R3F internals and does not affect functionality; will resolve with R3F updates.
- **Particle Rendering**: 5,000 particles are GPU-accelerated via Three.js instancing; no performance issues on modern hardware.
- **ScrollTrigger & GSAP**: Animations are GPU-optimized (transform/opacity); minimal reflow/repaint.

---

## Known Constraints & Design Decisions

- **No SplitText Plugin**: Character-by-character title animations in HeroSection are custom-implemented (no GSAP Club SplitText dependency).
- **Responsive Grid**: Algorithms grid uses CSS auto-fill for mobile responsiveness; tested on common breakpoints.
- **Accent Color**: Primary interactive color is `#ff4d1c`; used for hover states, checkboxes, and custom cursor.

---

## Reference

- **Algorithm List Source**: [제너레이티브 아트를 위한 개념 정리](https://velog.io/@ryoong1125/%EC%A0%9C%EB%84%88%EB%A0%88%EC%9D%B4%ED%8B%B0%EB%B8%8C-%EC%95%84%ED%8A%B8%EB%A5%BC-%EC%9C%84%ED%95%9C-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC) (Korean blog post on generative art concepts)
- **Vite Config**: Optimizes bundling for Three.js, R3F, and drei; no custom aliases or paths.
