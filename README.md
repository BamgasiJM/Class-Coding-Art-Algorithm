# Coding Art with BamgasiJM

제너레이티브 아트 포트폴리오 사이트입니다.
**React 19 + Vite 8** 기반으로, 히어로 섹션의 3D 파티클 배경(R3F)과 알고리즘 소개 카드, 그리고 각 알고리즘의 상세 페이지(p5.js 시각화)로 구성됩니다.

목표는 기술 과시가 아니라 **알고리즘 논리 자체를 보여주는 것**입니다. 그래서 p5.js 커뮤니티·CodePen 수준에서 로직 지향으로 구현 가능한 알고리즘만 다룹니다.

---

## 기술 스택

| 역할 | 라이브러리 |
|---|---|
| 번들러 / 개발 서버 | Vite 8 |
| UI 프레임워크 | React 19 (JSX) |
| 라우팅 | React Router DOM 6 (클라이언트 사이드) |
| 3D 파티클 배경 | React Three Fiber + Three.js |
| 2D 제너레이티브 아트 | p5.js (instance mode) |
| 애니메이션 | GSAP 3 (ScrollTrigger) |
| 폰트 | Bebas Neue, DM Mono, IBM Plex Sans KR (Google Fonts) |

---

## 디렉토리 구조

```
src/
├── components/
│   ├── canvas/
│   │   └── ParticleBackground.jsx   # R3F: Flow Field 파티클 배경 (5,000개)
│   ├── CustomCursor.jsx             # GSAP 커스텀 커서 (App에서 전역 마운트)
│   ├── HeroSection.jsx              # 히어로 섹션 (타이틀 + 파티클 배경)
│   ├── IntroductionSection.jsx      # 소개 섹션
│   └── AlgorithmSection.jsx         # 알고리즘 소개 카드 그리드
├── pages/
│   ├── HomePage.jsx                 # / — Hero + Introduction + Algorithm
│   └── AlgorithmDetailPage.jsx      # /algorithm/:slug — 알고리즘 상세
├── algorithms/                      # 알고리즘 모듈 (카탈로그 + 상세 + 스케치)
│   ├── catalog.js                   # ALGORITHMS 목록 + slugify + findAlgorithmBySlug
│   ├── details.js                   # 각 <slug>/index.js 집계 → ALGORITHM_DETAILS
│   ├── P5Canvas.jsx                 # p5 스케치 마운트용 공용 래퍼 (StrictMode-safe)
│   └── flow-field/                  # 알고리즘별 폴더 (폴더명 = slug)
│       ├── index.js                 # 상세: { longDescription {ko,en}, sketch, related }
│       └── sketch.js                # p5 instance-mode 스케치 (p, size) => void
├── App.jsx                          # 라우트 정의 + 전역 커서 + 랜덤 액센트 컬러
├── main.jsx                         # 엔트리 (<BrowserRouter>로 <App /> 래핑)
└── index.css                        # 전역 스타일 / CSS 변수 / 커서
```

---

## 설치 및 실행

```bash
npm install     # 의존성 설치
npm run dev     # 개발 서버 (http://localhost:5173)
npm run build   # 프로덕션 빌드
npm run preview # 빌드 결과 미리보기
```

---

## 라우팅

| 경로 | 페이지 | 설명 |
|---|---|---|
| `/` | HomePage | HeroSection + IntroductionSection + AlgorithmSection |
| `/algorithm/:slug` | AlgorithmDetailPage | 알고리즘별 상세 (설명 + p5 시각화) |

`slug`는 알고리즘 이름에서 `slugify()`로 자동 생성됩니다 (예: `'Flow Field'` → `flow-field`). 카드 클릭 시 `<Link>`로 상세 페이지로 이동합니다.

---

## 주요 구성

### HeroSection
- **R3F Canvas**: Flow Field 알고리즘 기반 5,000개 파티클이 배경에서 실시간으로 움직입니다.
- **GSAP 타임라인**: 태그라인 → 구분선 → 타이틀 문자 단위 등장 순서로 시퀀싱됩니다.
- **스크롤 페이드아웃**: ScrollTrigger로 스크롤 시 히어로 콘텐츠가 부드럽게 사라집니다.

### CustomCursor
- GSAP으로 마우스를 추적하는 액센트 컬러 커서입니다. `App.jsx`에서 `<Routes>` 바깥에 **전역 마운트**되어 홈·상세 페이지 모두에서 표시됩니다.

### AlgorithmSection
- 제너레이티브 아트 알고리즘 카드 그리드입니다. 개수는 고정이 아니며 자유롭게 추가됩니다.
- **자동 그리드**: `repeat(auto-fill, minmax(260px, 1fr))`로 뷰포트에 따라 자동 줄바꿈됩니다.
- **균일 카드 높이**: flexbox + 설명 영역 `flex: 1`로 텍스트 길이와 무관하게 동일 높이를 유지합니다.
- **등장 애니메이션**: `IntersectionObserver` + GSAP로 뷰포트 진입 시 카드가 아래에서 올라옵니다.
- **호버 효과**: 카드 border와 제목이 액센트 컬러로 전환됩니다.
- **체크박스**: 발표 중 다룬 알고리즘을 표시하는 용도. 클릭 시 액센트 컬러로 채워지며, 카드 링크 이동은 막습니다.

### AlgorithmDetailPage
- `findAlgorithmBySlug(slug)`로 메타데이터를, `getAlgorithmDetail(slug)`로 확장 내용을 조회합니다.
- **최상단 스크롤**: 진입 시 `window.scrollTo({ top: 0, left: 0, behavior: 'instant' })`로 즉시 이동합니다. `behavior: 'instant'`가 핵심인데, 전역 `scroll-behavior: smooth`(`index.css`) 때문에 기본값으로 호출하면 애니메이션 스크롤이 되어 (모바일에서 캔버스 마운트로 인한 레이아웃 변화 등에) 중간에 멈춰버리는 문제가 있었습니다.
- **개요**: 한국어(`longDescription.ko`)를 먼저 강조 표시, 영어(`longDescription.en`)를 뒤에 보조 표시.
- **시각화**: `<P5Canvas sketch={detail.sketch} size={canvasSize} />`로 p5 캔버스를 렌더링합니다. 상세 폴더가 아직 없는 알고리즘은 동일 크기의 "준비 중" 폴백을 보여줍니다.
- **모바일 대응 캔버스 크기**: `canvasSize`는 마운트 시 1회 `Math.min(560, window.innerWidth * 0.85)`로 계산됩니다(리사이즈 추적 없음 — P5Canvas 규칙 참고). 고정 560px 캔버스 + 콘텐츠 그리드의 400px 최소폭이 겹치면 모바일 레이아웃 뷰포트가 화면 너비보다 넓어져 텍스트가 잘리고 확대된 것처럼 보이는 문제가 있었습니다. 콘텐츠 그리드도 `minmax(400px, 1fr)` → `minmax(min(400px, 100%), 1fr)`로 바꿔 같은 문제를 해결했습니다.
- **관련 알고리즘**: `related` 배열 기반 미니 카드로 서로 연결됩니다.

---

## 액센트 컬러

액센트 컬러는 고정값이 아니라 **페이지 로드 때마다 랜덤 hue**로 생성됩니다. `App.jsx`가 마운트 시 `document.documentElement`에 `--accent` / `--accent-rgb` / `--accent-hue`를 설정하고, 커서·호버·체크박스·p5 파티클 등 모든 액센트 UI가 이 CSS 변수를 참조합니다. p5 스케치는 `getComputedStyle(...).getPropertyValue('--accent')`로 읽어옵니다.

---

## 알고리즘 카드 추가

`src/algorithms/catalog.js`의 `ALGORITHMS` 배열에 객체를 추가합니다.

```js
{
  no: '25',                          // 표시 번호 (두 자리 문자열)
  name: 'Algorithm Name',            // 카드 제목 (URL slug의 근거)
  desc: '알고리즘에 대한 설명...',    // 본문 설명
  tags: ['tag1', 'tag2', 'tag3'],    // 하단 태그 (3~4개 권장)
},
```

카드는 자동으로 클릭 가능해지고 `/algorithm/<slug>`로 라우팅됩니다. 카테고리 주석은 느슨한 시각적 그룹일 뿐이라 아무 위치에나 넣어도 됩니다.

### 상세 페이지(p5.js 아트) 추가

1. `src/algorithms/<slug>/` 폴더 생성 (폴더명 = slug). `flow-field/`를 템플릿으로 사용.
2. `sketch.js` — `function sketch(p, size)` 기본 export (p5 instance mode). 캔버스 크기는 DOM을 조회하지 말고 `size` 인자를 사용.
3. `index.js` — `./sketch`를 import하고 `{ longDescription {ko,en}, sketch, related }` 객체를 기본 export.
4. `src/algorithms/details.js`에 import 한 줄과 `ALGORITHM_DETAILS` 항목 한 줄 추가.

> ⚠️ `P5Canvas.jsx`는 React 19 StrictMode의 이중 마운트로 인한 캔버스 중복 버그를 방지하는 로직(`requestAnimationFrame` 지연 생성 + 정리 시 `remove()`/`innerHTML=''`)을 담고 있습니다. 캔버스는 고정 정사각형이며 리사이즈 로직을 넣지 마세요. 자세한 내용은 [CLAUDE.md](CLAUDE.md)의 "p5.js Canvas Lifecycle" 참고.

---

## 알고리즘 목록

블로그 [제너레이티브 아트를 위한 개념 정리](https://velog.io/@ryoong1125/%EC%A0%9C%EB%84%88%EB%A0%88%EC%9D%B4%ED%8B%B0%EB%B8%8C-%EC%95%84%ED%8A%B8%EB%A5%BC-%EC%9C%84%ED%95%9C-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC)를 참고해 구성했습니다. 아래 분류는 느슨한 테마 그룹입니다.

| No | 알고리즘 | 테마 |
|---|---|---|
| 01 | Flow Field | Foundations |
| 02 | Trigonometric Wave | Foundations |
| 03 | Easing & Interpolation | Foundations |
| 04 | Phyllotaxis | Foundations |
| 05 | Perlin / Simplex Noise | Randomness & Noise |
| 06 | Fractal Brownian Motion | Randomness & Noise |
| 07 | Curl Noise | Randomness & Noise |
| 08 | IFS & Fractal | Fractals & Recursion |
| 09 | L-System | Fractals & Recursion |
| 10 | Cellular Automata | Growth & Grammar Systems |
| 11 | Reaction-Diffusion | Growth & Grammar Systems |
| 12 | Differential Growth | Growth & Grammar Systems |
| 13 | Space Colonization | Growth & Grammar Systems |
| 14 | Diffusion-Limited Aggregation | Growth & Grammar Systems |
| 15 | Voronoi Diagram | Spatial Structures & Tiling |
| 16 | Delaunay Triangulation | Spatial Structures & Tiling |
| 17 | Circle Packing | Spatial Structures & Tiling |
| 18 | Truchet Tiles | Spatial Structures & Tiling |
| 19 | Wave Function Collapse | Spatial Structures & Tiling |
| 20 | SDF & Metaballs | Fields & Contours |
| 21 | Particle System | Dynamics & Physics |
| 22 | Spring & Constraint | Dynamics & Physics |
| 23 | Boids / Flocking | Collective Behavior & Chaos |
| 24 | Attractor System | Collective Behavior & Chaos |

> 현재 상세 페이지(p5 시각화)가 완성된 알고리즘은 **Flow Field**이며, 나머지는 "준비 중" 폴백으로 표시됩니다.

---

## 참고 사항

**THREE.Clock deprecated 경고**
브라우저 콘솔에 `THREE.Clock: This module has been deprecated` 경고가 표시될 수 있습니다. R3F 내부에서 발생하는 경고로 코드 동작에는 영향이 없으며, R3F 업데이트 시 해결됩니다.

**GSAP SplitText**
타이틀 문자 분해 애니메이션은 GSAP SplitText(Club 플러그인) 없이 직접 구현되어 있어 별도 라이선스가 필요하지 않습니다.
