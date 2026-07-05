# 알고리즘 상세 페이지 생성 프롬프트

새 알고리즘을 만들 때 이 파일을 열어 프롬프트를 복사하고, 맨 끝 "작성 대상"만 바꿔 무료 LLM에 요청하면 됩니다. 돌려받은 3개(sketch.js / index.js / details.js 두 줄)를 넣으면 상세 페이지가 자동으로 붙습니다.

무료 LLM(ChatGPT 무료 / Gemini / DeepSeek 등)에 붙여넣어 알고리즘 상세 페이지 파일
(`sketch.js` + `index.js` + `details.js` 등록 한 줄)을 생성하기 위한 자기완결형 프롬프트다.

## 사용법
1. 아래 "붙여넣을 프롬프트" 코드블록 전체를 복사한다.
2. 맨 끝 **작성 대상** 항목의 이름/slug/아이디어를 만들고 싶은 알고리즘 하나로 바꾼다.
3. LLM이 돌려준 3개를 프로젝트에 반영한다:
   - `src/algorithms/<slug>/sketch.js`
   - `src/algorithms/<slug>/index.js`
   - `src/algorithms/details.js`에 import 한 줄 + `ALGORITHM_DETAILS` 항목 한 줄 추가
4. 한 번에 하나씩 요청하는 것을 권장한다(정확도↑). 라우팅 변경은 필요 없다.

## 붙여넣기 전 체크 (무료 LLM 흔한 실수)
- `p.` 프리픽스가 모든 p5 함수에 붙어 있는가 (`p.random`, `p.noise` …)
- `p.createCanvas(size, size)` 로 고정 정사각형인가
- `windowResized` / `resizeCanvas` / `ResizeObserver` 등 리사이즈 코드가 **없는가**
- slug(폴더명)가 아래 목록의 괄호 값과 정확히 일치하는가 (`ifs--fractal`처럼 더블 대시 주의)

---

## 붙여넣을 프롬프트

````text
너는 p5.js 제너레이티브 아트 코드를 작성하는 도우미다. 아래 규칙과 예시를 그대로 따라
지정된 알고리즘 하나의 상세 페이지 파일들을 만들어라.

## 프로젝트 컨텍스트
- React 19 + Vite 프로젝트의 제너레이티브 아트 포트폴리오다.
- 각 알고리즘은 src/algorithms/<slug>/ 폴더 안에 sketch.js(p5 스케치)와 index.js(상세 텍스트)로 구성된다.
- 시각화는 p5.js "instance mode"로 작성하며, 공용 래퍼(P5Canvas)가 (p, size)를 넘겨준다.
- 목표는 기술 과시가 아니라 "알고리즘 논리"를 보여주는 것이다. p5.js 커뮤니티/CodePen 수준으로,
  외부 라이브러리 없이 순수 p5.js만으로 구현하라.

## 반드시 지킬 규칙 (매우 중요)
1. sketch.js는 `export default function <이름>Sketch(p, size) { ... }` 형태의 instance-mode 함수다.
2. 캔버스는 반드시 `p.createCanvas(size, size)` 로 만든다. 고정 정사각형이며,
   `windowResized`, `resizeCanvas`, `ResizeObserver`, container.clientWidth 등 리사이즈/DOM 크기 조회를 절대 쓰지 마라.
3. 크기가 필요하면 인자 `size` 또는 `p.width`/`p.height`를 써라. DOM을 조회하지 마라.
4. 액센트 색은 setup에서 다음처럼 읽어라(이 값이 곧 강조색이다):
   getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
5. 배경은 어두운 톤(예: p.background(8, 8, 16))으로 하고, 필요하면 알파를 줘서 트레일 효과를 낸다.
6. "disposed" 가드나 조기 return으로 setup/draw를 막지 마라.
7. 파티클/요소 개수는 300개 내외로 가볍게 유지해 60fps가 나오게 하라.
8. p5 전역 함수 대신 반드시 `p.` 프리픽스를 써라 (p.random, p.noise, p.stroke ...).
9. 코드에 한국어 주석을 적절히 달아 로직을 설명하라.

## index.js 규칙
- `./sketch`를 import하고 아래 형태의 객체를 default export 한다.
- longDescription.ko(한국어)와 longDescription.en(영어) 둘 다 3~5문장으로, 알고리즘의 원리와
  시각적 결과를 설명한다. 한국어를 먼저 작성하고 영어는 그 번역/대응이면 된다.
- related는 아래 "전체 알고리즘 이름 목록"에서 관련 있는 것 2~3개의 이름을 '정확히' 골라 넣는다.

## 예시 (Flow Field) — 이 구조와 스타일을 그대로 따라라

### src/algorithms/flow-field/sketch.js
```js
export default function flowFieldSketch(p, size) {
  let particles = []
  let cols, rows
  let scl = 20
  let time = 0
  let accentColor

  p.setup = function() {
    p.createCanvas(size, size)

    cols = p.floor(p.width / scl)
    rows = p.floor(p.height / scl)

    // accent 색 읽기
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim()

    // 파티클 초기화
    particles = []
    for (let i = 0; i < 300; i++) {
      particles.push({ x: p.random(p.width), y: p.random(p.height), vx: 0, vy: 0 })
    }

    p.background(8, 8, 16)
  }

  p.draw = function() {
    p.background(8, 8, 16, 25) // 트레일 효과
    time += 0.01

    for (let particle of particles) {
      const angle = p.noise(particle.x * 0.002, particle.y * 0.002, time * 0.3) * p.TWO_PI * 4
      particle.vx = p.cos(angle) * 2
      particle.vy = p.sin(angle) * 2
      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < 0) particle.x = p.width
      if (particle.x > p.width) particle.x = 0
      if (particle.y < 0) particle.y = p.height
      if (particle.y > p.height) particle.y = 0

      p.stroke(accentColor)
      p.strokeWeight(1.5)
      p.point(particle.x, particle.y)
    }
  }
}
```

### src/algorithms/flow-field/index.js
```js
import sketch from './sketch'

export default {
  longDescription: {
    en: 'Flow Field is a foundational algorithm where particles follow velocity vectors defined by a noise field...',
    ko: 'Flow Field는 파티클들이 노이즈 필드로 정의된 속도 벡터를 따르는 기본 알고리즘입니다...',
  },
  sketch,
  related: ['Perlin / Simplex Noise', 'Trigonometric Wave', 'Curl Noise'],
}
```

## 출력 형식
아래 3개를 순서대로, 각각 코드블록으로 출력하라:
1) src/algorithms/<slug>/sketch.js  전체 코드
2) src/algorithms/<slug>/index.js  전체 코드
3) src/algorithms/details.js 에 추가할 "import 한 줄" 과 "ALGORITHM_DETAILS 항목 한 줄"
   (예: `import spaceColonization from './space-colonization'`  /  `'space-colonization': spaceColonization,`)

## 전체 알고리즘 이름 목록 (related 선택 및 slug 참고용)
Flow Field(flow-field), Trigonometric Wave(trigonometric-wave), Easing & Interpolation(easing--interpolation),
Phyllotaxis(phyllotaxis), Perlin / Simplex Noise(perlin--simplex-noise), Fractal Brownian Motion(fractal-brownian-motion),
Curl Noise(curl-noise), IFS & Fractal(ifs--fractal), L-System(l-system), Cellular Automata(cellular-automata),
Reaction-Diffusion(reaction-diffusion), Differential Growth(differential-growth), Space Colonization(space-colonization),
Diffusion-Limited Aggregation(diffusion-limited-aggregation), Voronoi Diagram(voronoi-diagram),
Delaunay Triangulation(delaunay-triangulation), Circle Packing(circle-packing), Truchet Tiles(truchet-tiles),
Wang Tiles(wang-tiles), Poisson Disk Sampling(poisson-disk-sampling), SDF & Metaballs(sdf--metaballs),
Particle System(particle-system), Spring & Constraint(spring--constraint), N-Body Gravity(n-body-gravity),
Double Pendulum(double-pendulum), Elastic Collision(elastic-collision), Harmonograph(harmonograph),
Boids / Flocking(boids--flocking), Attractor System(attractor-system)

## 작성 대상 (← 여기만 바꿔서 요청)
- 알고리즘 이름: Phyllotaxis
- slug(폴더명): phyllotaxis
- 이 알고리즘으로 만들 시각화 아이디어(선택): 황금각 137.5도로 점을 회전 배치해 해바라기 씨앗 나선을 그린다
````
