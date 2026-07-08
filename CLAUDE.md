# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a generative art portfolio website built with **React 19 + Vite**, featuring interactive 3D graphics and algorithm demonstrations. The site showcases a growing collection of generative art algorithms, loosely grouped into themes like Foundations, Randomness & Noise, Growth & Grammar Systems, Spatial Structures, Fields & Contours, Dynamics & Physics, and Collective Behavior. The count is not fixed — cards are added freely and need not belong to any group.

**Key Technologies:**
- **Bundler & Dev Server:** Vite 8
- **UI Framework:** React 19 (JSX)
- **Routing:** React Router DOM 6 (client-side routing)
- **3D Graphics:** Three.js + React Three Fiber (R3F) — used in HeroSection background
- **2D Generative Art:** p5.js (instance mode) — used in algorithm detail pages
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
- **src/main.jsx** — Entry point; wraps `<App />` in `<BrowserRouter>`
- **src/App.jsx** — Mounts the global `<CustomCursor />` and defines routes via `<Routes>`. Also sets a random accent color (`--accent`) on `document.documentElement` on mount.
- **src/index.css** — Global styles (fonts, resets, layout, custom cursor)

### Routing
Two routes defined in `src/App.jsx`:
- `/` → **HomePage** (`src/pages/HomePage.jsx`) — composes HeroSection + IntroductionSection + AlgorithmSection
- `/algorithm/:slug` → **AlgorithmDetailPage** (`src/pages/AlgorithmDetailPage.jsx`) — per-algorithm detail view

Navigation between algorithm cards and detail pages uses `<Link>`. The slug is derived from the algorithm name via `slugify()` (no manual slug field needed).

### Algorithms Module (`src/algorithms/`)
All algorithm-related code lives under `src/algorithms/`, colocating each algorithm's detail text and p5 sketch in its own folder:

```
src/algorithms/
  P5Canvas.jsx        # shared p5 wrapper (see "p5.js Canvas Lifecycle")
  catalog.js          # ALGORITHMS list (many items) + slugify + findAlgorithmBySlug
  details.js          # aggregates each <slug>/index.js → ALGORITHM_DETAILS + getAlgorithmDetail
  flow-field/         # one folder per fleshed-out algorithm (folder name = slug)
    index.js          # detail entry: { longDescription {ko,en}, sketch, related }
    sketch.js         # the p5 instance-mode sketch (p, size) => void
```

- **src/algorithms/catalog.js** — The `ALGORITHMS` array (single source of truth, a growing list) plus helpers:
  - `slugify(name)` — converts a name to a URL-safe slug (e.g. `'Flow Field'` → `'flow-field'`)
  - `findAlgorithmBySlug(slug)` — looks up an algorithm by slug
- **src/algorithms/details.js** — Imports each fleshed-out algorithm's `<slug>/index.js` and assembles the `ALGORITHM_DETAILS` map keyed by slug. Each entry holds extended per-algorithm content (bilingual `longDescription`, `sketch`, `related`). Only algorithms with a folder appear here; others fall back to a "준비 중" (coming soon) state. `getAlgorithmDetail(slug)` returns the entry or `null`.
- **src/algorithms/&lt;slug&gt;/** — Per-algorithm folder. `index.js` holds the detail text (`longDescription`, `related`) and imports its `sketch.js` (the p5 code) to export the combined detail object.

### Core Components

#### CustomCursor (src/components/CustomCursor.jsx)
GSAP-driven animated cursor (accent-colored dot) that tracks the mouse. **Mounted globally in `App.jsx`, outside `<Routes>`**, so it appears on every page (home AND detail pages). Do NOT move this back into HeroSection — that was the original bug where the cursor disappeared on the detail page. The `.cursor` style lives in `src/index.css` (`body { cursor: none }` hides the native cursor site-wide).

#### HeroSection (src/components/HeroSection.jsx)
The landing section with animated hero content and 3D particle background:
- **R3F Canvas**: Renders 5,000 particles using Flow Field algorithm in real-time
- **GSAP Timeline**: Sequences the tagline → divider → character-by-character title animation
- **ScrollTrigger**: Hero content fades out on scroll (fade completes at `80% top` — intentionally late)
- **Particle Background**: Handled by separate ParticleBackground component

#### ParticleBackground (src/components/canvas/ParticleBackground.jsx)
R3F component implementing a Flow Field-based particle system:
- 5,000 particles rendered as instanced geometries
- Particles move based on Perlin noise-influenced velocity fields
- Uses Three.js shaders for GPU-accelerated updates
- Imported and rendered as `<Canvas>` within HeroSection

#### AlgorithmSection (src/components/AlgorithmSection.jsx)
Grid-based card display of the generative art algorithms:
- **Data Structure**: `ALGORITHMS` array of objects with fields:
  ```js
  { no: '01', name: '...', desc: '...', tags: ['tag1', 'tag2', ...] }
  ```
- **Grid Layout**: CSS Grid with `repeat(auto-fill, minmax(260px, 1fr))` — auto-wraps as viewport changes
- **Uniform Card Heights**: Flexbox layout with `flex: 1` on description area ensures all cards match height regardless of text length
- **Scroll-Triggered Animations**: IntersectionObserver detects card entry into viewport, GSAP animates cards sliding up from below
- **Interactive Hover**: Border and title text color shift to accent color
- **Checkbox Toggle**: Each card has a clickable checkbox; toggles accent fill to mark algorithms discussed in presentations. The checkbox's `onClick` calls `e.preventDefault()` + `e.stopPropagation()` so clicking it does NOT trigger the card's `<Link>` navigation.
- **Clickable Cards**: Each card root is a `<Link to={`/algorithm/${slugify(algo.name)}`}>` (with `textDecoration: none; color: inherit`). The `<section>` has `id="algorithms"` so the detail page's back button can scroll here (see below).

#### AlgorithmDetailPage (src/pages/AlgorithmDetailPage.jsx)
Detail view at `/algorithm/:slug`:
- Looks up algorithm metadata via `findAlgorithmBySlug(slug)` and extended content via `getAlgorithmDetail(slug)`.
- **Scroll to top on mount**: `useEffect(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), [slug])`. The `behavior: 'instant'` is required — `html { scroll-behavior: smooth }` is set globally in `index.css`, so a bare `window.scrollTo(0, 0)` becomes an animated scroll that can be interrupted mid-flight (e.g. by layout shifting as the deferred p5 canvas mounts), landing mid-page instead of at the top. This was most visible on mobile.
- **Header**: number, name, tags.
- **Overview**: bilingual description. Korean (`longDescription.ko`) is shown FIRST in `--fg` (prominent); English (`longDescription.en`) SECOND in `--muted`.
- **Content grid**: the Overview/Visualization two-column layout uses `gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))'`. The `min(400px, 100%)` matters — a bare `minmax(400px, 1fr)` forces a 400px-minimum track regardless of container width, which overflowed narrow mobile viewports (see canvas sizing below).
- **Visualization**: renders `<P5Canvas sketch={detail.sketch} size={canvasSize} />` (see P5Canvas). Falls back to a same-sized placeholder box if no sketch.
- **Mobile-safe canvas size**: `canvasSize` is computed ONCE via a lazy `useState(() => Math.min(560, window.innerWidth * 0.85))` initializer at first mount — not tracked on resize. Without this, the fixed 560px canvas (plus the 400px grid column minimum above) forced the mobile layout viewport wider than the device width, clipping text at the edge and making the page look "zoomed in" even though `scrollY` was correctly `0`.
- **Related Algorithms**: mini-cards linking to related algorithms, driven by the `related` array (names) in the detail entry. Grid uses `repeat(auto-fit, minmax(220px, 1fr))` — **must be `auto-fit`, not `auto-fill`**, otherwise empty grid tracks on wide screens show the container's `--border` background as gray gaps.
- **Back button**: `navigate('/', { state: { scrollTo: 'algorithms' } })`. HomePage reads `location.state.scrollTo` and scrolls to `#algorithms`, so returning lands on the algorithm grid instead of the top hero.

#### P5Canvas (src/algorithms/P5Canvas.jsx)
Generic wrapper that mounts a p5.js instance-mode sketch. **This component contains critical bug-prevention logic — read "p5.js Canvas Lifecycle" below before modifying it.**
- Props: `sketch` (a `(p, size) => void` function) and `size` (canvas edge in px, default 560).
- Renders a **fixed square** (`size × size`) container; the sketch calls `p.createCanvas(size, size)`. Canvas dimensions are decided once at mount — there is NO responsive resizing, ResizeObserver, or `windowResized`. This is intentional (see below).

#### Sketches (src/algorithms/&lt;slug&gt;/sketch.js)
One `sketch.js` per algorithm folder, exported as a default `(p, size) => void` function (instance mode). Example: `flow-field/sketch.js`.
- Signature is `function sketch(p, size)` — `size` is passed in by P5Canvas; the sketch must NOT query the DOM for its container size.
- Reads the accent color at setup via `getComputedStyle(document.documentElement).getPropertyValue('--accent')`.
- `flow-field/sketch.js`: ~300 particles following a Perlin-noise vector field, with a semi-transparent background each frame for trail effect.

---

## Key Implementation Details

### Adding Algorithm Cards
Edit the `ALGORITHMS` array in `src/algorithms/catalog.js`:
```js
{
  no: '21',                        // Two-digit string for display numbering
  name: 'Algorithm Name',          // Card title (also drives the URL slug)
  desc: 'Description of the...',   // Body text explaining the algorithm
  tags: ['tag1', 'tag2', 'tag3'],  // 3–4 category tags
}
```
Grid automatically reflows; no layout tweaks needed. The card becomes clickable and routes to `/algorithm/<slug>` automatically.

### Adding an Algorithm Detail Page (with p5.js art)
To flesh out a card's detail page (currently only Flow Field is complete; the other 19 show a "coming soon" fallback):

1. **Create the folder**: `src/algorithms/<slug>/` (folder name = the slug, e.g. `trigonometric-wave`). Use `flow-field/` as the template.
2. **Add the sketch**: `src/algorithms/<slug>/sketch.js`, default-exporting `function sketch(p, size)` (p5 instance mode). Use the `size` argument for canvas dimensions — never query the DOM.
3. **Add the detail**: `src/algorithms/<slug>/index.js`, importing `./sketch` and default-exporting the detail object:
   ```js
   import sketch from './sketch'

   export default {
     longDescription: { ko: '...', en: '...' },          // ko shown first/prominent, en second/muted
     sketch,
     related: ['Flow Field', 'Perlin / Simplex Noise'],  // exact names from ALGORITHMS
   }
   ```
4. **Register it**: add one line to `src/algorithms/details.js` — `import <name> from './<slug>'` and a `'<slug>': <name>,` entry in `ALGORITHM_DETAILS`.

That's it — AlgorithmDetailPage picks it up by slug. No routing changes needed.

### ⚠️ p5.js Canvas Lifecycle — DO NOT REGRESS

**Symptom to watch for:** the p5 artwork appears offset/misaligned inside its box, often with a gray strip at the top, and/or looks like two copies of the artwork stacked vertically. It may look fine after a hard refresh or a window resize, which makes it easy to dismiss — but it is a real bug.

**Root cause:** React 19 **StrictMode** (enabled in `main.jsx`) intentionally runs every effect twice in development: `mount → cleanup → mount`. If `new p5(...)` is called synchronously inside `useEffect`, the FIRST (throwaway) instance immediately creates a real `<canvas>` before its cleanup runs. That canvas is not always fully removed, so it stacks on top of the second (real) canvas → two canvases in one container.

**The fix (already implemented in `P5Canvas.jsx`) — keep it this way:**
- Defer `new p5(...)` by one frame with `requestAnimationFrame`. StrictMode's throwaway instance is cancelled (via `cancelAnimationFrame` in cleanup) BEFORE the rAF fires, so it never creates a canvas at all.
- On cleanup: call `p5Instance.remove()` AND `container.innerHTML = ''` (belt-and-suspenders, since the p5 `<canvas>` is DOM that React does not track).

**Rules to avoid re-introducing this bug:**
1. **Never** wrap p5's `setup`/`draw` in a "disposed" guard that early-returns. A previous attempt did this; it prevented `createCanvas(size, size)` from running, so p5 silently fell back to a default **100×100** canvas that stacked on top. If you must gate anything, gate the *creation* of the instance (the rAF approach), not the sketch's lifecycle methods.
2. **Keep the canvas a fixed square** with no resize logic. A responsive canvas (reading `container.clientWidth`/`ResizeObserver`/`windowResized`) reintroduces measurement-timing races that caused the original misalignment. Size is passed in as a prop and fixed at mount. (Computing that fixed value from `window.innerWidth` ONCE at mount — as `AlgorithmDetailPage` does for mobile — is fine; it's a *live* resize listener that's forbidden.)
3. If you ever change `P5Canvas.jsx`, **verify there is exactly one `<canvas>`** in the detail page DOM afterward (e.g. `document.querySelectorAll('canvas').length === 1`), including after navigating back-and-forth between the home page and a detail page several times.

### Animation Approach
- **GSAP Timeline**: For sequenced, orchestrated animations (HeroSection title reveal)
- **ScrollTrigger**: For scroll-linked fades and parallax (hero fade-out on scroll)
- **IntersectionObserver + GSAP**: For scroll-triggered card reveals (AlgorithmSection cards)
- **Inline Hover & Click**: Pure CSS or React state for instant feedback (checkbox, hover effects)

### Style Organization
Global styles in `src/index.css`:
- Font imports from Google Fonts
- CSS variables for colors (`--fg`, `--muted`, `--bg`, `--card-bg`, `--border`, and `--accent`)
- `--accent` is NOT fixed — `App.jsx` generates a **random hue** on every mount and sets `--accent` / `--accent-rgb` / `--accent-hue` on `document.documentElement`. All accent-colored UI (cursor, hovers, checkboxes, p5 particles) picks this up via the CSS variable. Sketches read it with `getComputedStyle(...).getPropertyValue('--accent')`.
- Site-wide `user-select: none` is set in the global reset to prevent text drag-selection.
- Component-scoped styles are defined inline or in style objects within JSX files (no separate CSS modules currently)

---

## Performance Notes

- **THREE.Clock Deprecation Warning**: Browser console may show `THREE.Clock: This module has been deprecated` — this is from R3F internals and does not affect functionality; will resolve with R3F updates.
- **Particle Rendering**: 5,000 particles are GPU-accelerated via Three.js instancing; no performance issues on modern hardware.
- **ScrollTrigger & GSAP**: Animations are GPU-optimized (transform/opacity); minimal reflow/repaint.

---

## Known Constraints & Design Decisions

- **No SplitText Plugin**: Character-by-character title animations in HeroSection are custom-implemented (no GSAP Club SplitText dependency).
- **Responsive Grids**: The AlgorithmSection card grid uses `auto-fill`; the AlgorithmDetailPage "Related Algorithms" grid uses `auto-fit` (deliberately different — `auto-fit` avoids gray empty tracks with a small, fixed number of related items).
- **Accent Color**: Randomized per page load (see Style Organization). Used for hover states, checkboxes, custom cursor, and p5 particle color.
- **p5 Canvas**: Fixed square, StrictMode-safe (see "⚠️ p5.js Canvas Lifecycle"). On `AlgorithmDetailPage`, the fixed size itself is computed once at mount from viewport width (capped at 560px) so it fits mobile screens — see the "Mobile-safe canvas size" note above.

---

## Reference

- **Algorithm List Source**: [제너레이티브 아트를 위한 개념 정리](https://velog.io/@ryoong1125/%EC%A0%9C%EB%84%88%EB%A0%88%EC%9D%B4%ED%8B%B0%EB%B8%8C-%EC%95%84%ED%8A%B8%EB%A5%BC-%EC%9C%84%ED%95%9C-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC) (Korean blog post on generative art concepts)
- **Vite Config**: Optimizes bundling for Three.js, R3F, and drei; no custom aliases or paths.
