# Coding Art with BamgasiJM

제너레이티브 아트 포트폴리오 메인 페이지입니다.  
React 19 + Vite 7 기반으로 구축되었으며, R3F(React Three Fiber)와 GSAP을 사용해 히어로 섹션과 알고리즘 소개 카드를 구성합니다.

---

## 기술 스택

| 역할 | 라이브러리 |
|---|---|
| 번들러 | Vite 5 |
| UI 프레임워크 | React 18 (JSX) |
| 3D 파티클 배경 | React Three Fiber + Three.js |
| 애니메이션 | GSAP 3 (ScrollTrigger) |
| 폰트 | Bebas Neue, DM Mono, Gothic A1 (Google Fonts) |

---

## 디렉토리 구조

```
bamgasi-portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── canvas/
│   │   │   └── ParticleBackground.jsx   # R3F: Flow Field 파티클 배경
│   │   ├── HeroSection.jsx              # 히어로 섹션 (타이틀 + 파티클 배경)
│   │   └── AlgorithmSection.jsx         # 알고리즘 소개 카드 그리드
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

---

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

패키지가 없는 경우 직접 설치합니다.

```bash
npm install three @react-three/fiber @react-three/drei gsap
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속.

### 3. 프로덕션 빌드

```bash
npm run build
npm run preview
```

---

## 주요 구성

### HeroSection

- **R3F Canvas**: Flow Field 알고리즘 기반 5,000개 파티클이 배경에서 실시간으로 움직입니다.
- **GSAP 타임라인**: 태그라인 → 구분선 → 타이틀 문자 단위 등장 순서로 시퀀싱됩니다.
- **스크롤 페이드아웃**: ScrollTrigger의 scrub 옵션으로 스크롤 시 히어로 콘텐츠가 부드럽게 사라집니다.
- **커스텀 커서**: GSAP으로 마우스 위치를 추적하는 액센트 컬러 커서입니다.

### AlgorithmSection

- 총 20개의 알고리즘 카드로 구성되어 있습니다.
- **균일 카드 높이**: 카드 내부를 flexbox로 구성하고 설명 영역에 `flex: 1`을 적용해 텍스트 길이와 무관하게 동일 높이를 유지합니다.
- **등장 애니메이션**: `IntersectionObserver` + GSAP `to()`로 뷰포트 진입 시 카드가 아래에서 올라옵니다.
- **호버 효과**: 카드 border와 제목이 액센트 컬러(`#ff4d1c`)로 전환됩니다.
- **체크박스**: 수업 중 해당 알고리즘을 설명할 때 클릭해서 표시하는 용도입니다. 클릭 시 액센트 컬러로 채워집니다.

---

## 알고리즘 카드 추가 방법

`src/components/AlgorithmSection.jsx` 파일의 `ALGORITHMS` 배열에 객체를 추가합니다.

```js
{
  no: '21',                          // 표시 번호 (두 자리 문자열)
  name: 'Algorithm Name',            // 카드 제목
  desc: '알고리즘에 대한 설명...',    // 본문 설명
  tags: ['tag1', 'tag2', 'tag3'],    // 하단 태그 (3~4개 권장)
},
```

그리드는 `repeat(auto-fill, minmax(260px, 1fr))`로 설정되어 있어 카드 수가 늘어나도 자동으로 줄바꿈됩니다.

---

## 알고리즘 목록

블로그 [제너레이티브 아트를 위한 개념 정리](https://velog.io/@ryoong1125/%EC%A0%9C%EB%84%88%EB%A0%88%EC%9D%B4%ED%8B%B0%EB%B8%8C-%EC%95%84%ED%8A%B8%EB%A5%BC-%EC%9C%84%ED%95%9C-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC)를 기반으로 구성했습니다.

| No | 알고리즘 | 분류 |
|---|---|---|
| 01 | Flow Field | Foundations |
| 02 | Trigonometric Wave | Foundations |
| 03 | Easing & Interpolation | Foundations |
| 04 | Perlin / Simplex Noise | Randomness & Noise |
| 05 | Fractal Brownian Motion | Randomness & Noise |
| 06 | Curl Noise | Randomness & Noise |
| 07 | Fractal & IFS | Randomness & Noise |
| 08 | L-System | Grammar Systems |
| 09 | Cellular Automata | Grammar Systems |
| 10 | Reaction-Diffusion | Grammar Systems |
| 11 | Voronoi Diagram | Spatial Structures |
| 12 | Delaunay Triangulation | Spatial Structures |
| 13 | SDF | Spatial Structures |
| 14 | Particle System | Dynamics & Physics |
| 15 | GPU Instancing | Dynamics & Physics |
| 16 | Spring & Constraint | Dynamics & Physics |
| 17 | Boids / Flocking | Collective Behavior |
| 18 | Attractor System | Collective Behavior |
| 19 | Ray Marching | Shaders & GPU |
| 20 | Mesh Volume Fill | Data & ML |

---

## 참고 사항

**THREE.Clock deprecated 경고**  
브라우저 콘솔에 `THREE.Clock: This module has been deprecated` 경고가 표시될 수 있습니다. R3F 내부에서 발생하는 경고로, 코드 동작에는 영향이 없습니다. R3F 업데이트 시 해결됩니다.

**GSAP SplitText**  
타이틀 문자 분해 애니메이션은 GSAP SplitText(Club 플러그인) 없이 직접 구현되어 있습니다. 별도 라이선스가 필요하지 않습니다.
