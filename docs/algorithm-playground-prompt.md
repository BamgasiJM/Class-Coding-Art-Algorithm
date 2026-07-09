# 알고리즘 Playground 파라미터 추가 프롬프트

이미 완성된 알고리즘의 `sketch.js` + `index.js`를 수정해, 상세 페이지에서 **View / Play 토글**과
**실시간 슬라이더 조작**이 붙도록 만드는 프롬프트다. (새 알고리즘을 처음부터 만드는 것은
`algorithm-detail-prompt.md`를 쓴다. 이 파일은 "이미 있는" 알고리즘에 조작 기능만 얹는 용도다.)

## 동작 원리 (배경 지식)

- 상세 페이지는 `index.js`에 **`params` 배열이 있으면** 자동으로 `Playground` 컴포넌트로 렌더링한다.
  없으면 기존처럼 정적 캔버스(`P5Canvas`)로 렌더링한다. → **`params`만 추가하면 Play 모드가 자동으로 붙는다.**
- `Playground`는 슬라이더 값을 담은 **mutable 객체**를 sketch의 3번째 인자 `params`로 넘긴다.
  이 객체는 마운트 동안 **정체성(identity)이 고정**되고 값만 변한다.
- 그래서 두 종류의 파라미터가 있다:
  - **실시간(live)**: `draw()`(및 draw에서 호출되는 함수) 안에서 매 프레임 `params.x`를 읽으면 슬라이더가 즉시 반영된다.
  - **구조(restart)**: `setup()`이나 초기화 함수에서만 읽히는 값(요소 개수, 그리드 해상도 등).
    값이 바뀌면 인스턴스를 재생성해야 반영되므로, `index.js`의 스키마에 **`restart: true`**를 붙인다.

## 사용법

1. 아래 "붙여넣을 프롬프트" 코드블록 전체를 복사한다.
2. 맨 끝 **작성 대상**에 대상 알고리즘의 slug와, **현재의 `sketch.js` 전체 코드**를 붙여넣는다.
3. LLM이 돌려준 2개를 반영한다:
   - `src/algorithms/<slug>/sketch.js` — 전체 교체
   - `src/algorithms/<slug>/index.js` — export 객체에 `params: [...]` 한 필드만 추가 (나머지 필드는 그대로)
4. **한 번에 하나씩** 요청한다. `details.js`, 라우팅, `P5Canvas`, `Playground`는 **건드리지 않는다.**

## 붙여넣기 전 체크 (흔한 실수)

- `sketch` 함수 시그니처가 `(p, size, params = {})`로 바뀌었는가 (기본값 `{}` 필수 — 하위호환).
- 슬라이더 **기본값(default)이 원래 하드코딩 상수와 정확히 같은가.** (그래야 View 모드가 기존 화면과 픽셀 단위로 동일하다.)
- 실시간 값을 setup에서 `const`로 한 번만 읽어 얼리지 않았는가 (매 프레임 읽어야 조작이 반영된다).
- 리사이즈/DOM 조회 코드가 여전히 없는가, `disposed` 가드가 없는가 (원래 규칙 유지).
- `restart` 파라미터를 남발하지 않았는가 (재생성은 화면이 리셋되므로, 정말 구조에만 쓴다).

---

## 붙여넣을 프롬프트

````text
너는 p5.js 제너레이티브 아트 코드를 다루는 도우미다. 아래 규칙에 따라, 이미 완성된 알고리즘의
sketch.js를 수정하고 index.js에 넣을 params 스키마를 만들어라. 목표는 사용자가 슬라이더로
핵심 파라미터를 조작하며 "그 값이 알고리즘에서 무슨 의미인지" 직관적으로 이해하게 하는 것이다.

## 프로젝트 컨텍스트
- React 19 + Vite 제너레이티브 아트 포트폴리오. 각 알고리즘은 src/algorithms/<slug>/ 폴더의
  sketch.js(p5 instance-mode 스케치)와 index.js(상세 텍스트)로 구성된다.
- 상세 페이지는 index.js에 params 배열이 있으면 Playground(View/Play 토글 + 슬라이더)로 렌더링한다.
- Playground는 슬라이더 값을 담은 mutable 객체를 sketch의 3번째 인자 params로 넘긴다.
  이 객체는 정체성이 고정되고 값만 변한다.

## 파라미터 두 종류 (핵심 개념)
- 실시간(live): draw() 및 draw에서 호출되는 함수 안에서 매 프레임 params.x를 읽는 값.
  슬라이더를 움직이면 즉시 화면에 반영된다. (예: 속도, 노이즈 스케일, 감쇠, 반경, 각도, 밝기)
- 구조(restart): setup()이나 초기화 함수(요소 배열 생성 등)에서만 읽히는 값. 값이 바뀌면
  인스턴스를 재생성해야 반영되므로 index.js 스키마에 restart: true를 붙인다.
  (예: 요소/입자 개수, 그리드 셀 크기·해상도, 격자 분할 수, 시드 개수)

## 반드시 지킬 규칙 (매우 중요)
1. sketch 함수 시그니처를 `export default function <이름>Sketch(p, size, params = {})`로 바꾼다.
   기본값 {}는 필수다(하위호환).
2. 원래 하드코딩되어 있던 상수 중 "알고리즘의 논리를 드러내는" 값 4~6개를 골라 params로 노출한다.
   각 값은 사용 지점에서 `params.키 ?? 원래값` 형태로 읽는다.
   - 실시간 값: draw()/draw에서 부르는 함수 안에서 매 프레임 읽는다. setup에서 const로 한 번만
     읽어 얼리지 마라(그러면 조작이 반영되지 않는다).
   - 구조 값: setup()/초기화 함수 안에서 읽는다.
   권장 패턴 — 함수 상단에 접근자 객체를 만들어 두면 깔끔하다:
     const P = {
       count: () => params.count ?? 300,     // 구조 → initXxx()에서 P.count() 호출
       speed: () => params.speed ?? 2,        // 실시간 → draw()에서 P.speed() 호출
     }
3. 슬라이더 기본값(default)은 반드시 "원래 하드코딩 상수와 정확히 같은 값"으로 둔다.
   그래야 조작 전 화면이 기존과 완전히 동일하다.
4. 원래 코드의 나머지 로직/구조/색상/주석/마우스 인터랙션은 그대로 유지한다. 파라미터화 외의
   리팩터링을 하지 마라.
5. 캔버스 규칙 유지: `p.createCanvas(size, size)` 고정 정사각형. windowResized / resizeCanvas /
   ResizeObserver / container.clientWidth 등 리사이즈·DOM 크기 조회 금지. disposed 가드나
   조기 return으로 setup/draw를 막지 마라.
6. accent 색은 기존처럼 setup에서 읽는다:
   getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
7. p5 전역 함수 대신 반드시 p. 프리픽스를 쓴다 (p.random, p.noise ...).
8. restart 파라미터는 꼭 필요한 구조 값에만 붙인다(재생성 시 화면이 리셋되므로 남발 금지).

## index.js params 스키마 규칙
- index.js의 default export 객체에 `params: [...]` 필드 하나만 추가한다. longDescription, sketch,
  related 등 나머지 필드는 절대 바꾸지 마라.
- 각 항목 형태:
  { key: 'count', label: '파티클 수', min: 50, max: 800, step: 10, default: 300, restart: true }
  - key: sketch에서 params.<key>로 읽는 이름 (영문 camelCase)
  - label: 슬라이더에 표시할 한국어 이름
  - min / max / step: 슬라이더 범위와 간격 (소수 값은 step도 소수로)
  - default: 원래 하드코딩 상수와 동일한 값
  - unit(선택): 값 뒤에 붙일 단위 문자열 (예: 'px', '°')
  - restart(선택): 구조 파라미터면 true, 실시간이면 생략

## 예시 (Flow Field) — 이 변환 방식을 그대로 따라라

변환 전 sketch.js는 scl=25, 파티클 300개, time+=0.005, 속도 *2, 댐핑 0.9 등이 하드코딩되어 있었다.
변환 후:

### src/algorithms/flow-field/sketch.js (변환 후)
```js
export default function flowFieldSketch(p, size, params = {}) {
  let particles = [];
  let cols, rows;
  let scl; // 그리드 셀 크기 — setup에서 params로 결정 (구조 파라미터)
  let time = 0;
  let accentColor;

  // 실시간 값은 매 프레임 params에서 직접 읽어 즉시 반영. 구조 값(scl, count)은 setup/초기화에서만 읽힘.
  const P = {
    scl: () => params.scl ?? 25,
    count: () => params.count ?? 300,
    noiseScale: () => params.noiseScale ?? 0.005,
    speed: () => params.speed ?? 2,
    damping: () => params.damping ?? 0.9,
    timeSpeed: () => params.timeSpeed ?? 0.005,
  };

  p.setup = function () {
    p.createCanvas(size, size);
    scl = P.scl();                       // 구조: setup에서 확정
    cols = p.floor(p.width / scl);
    rows = p.floor(p.height / scl);
    accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent').trim();
    initParticles();
    p.background(8, 8, 16);
  };

  function initParticles() {
    particles = [];
    const count = P.count();             // 구조: 초기화에서 확정
    for (let i = 0; i < count; i++) {
      particles.push({ x: p.random(p.width), y: p.random(p.height), vx: 0, vy: 0, life: p.random(100, 300) });
    }
  }

  function getFlowAngle(x, y) {
    const ns = P.noiseScale();           // 실시간: 매 호출 읽음
    return p.noise(x * ns, y * ns, time * 0.2) * p.TWO_PI * 2;
  }

  p.draw = function () {
    p.background(8, 8, 16, 15);
    time += P.timeSpeed();               // 실시간
    // ... 벡터 필드 시각화 (scl 사용) ...
    const speed = P.speed();             // 실시간: 매 프레임 읽어 지역 const로
    const damp = P.damping();
    for (let particle of particles) {
      let angle = getFlowAngle(particle.x, particle.y);
      let targetVx = p.cos(angle) * speed;
      let targetVy = p.sin(angle) * speed;
      particle.vx = particle.vx * damp + targetVx * (1 - damp);
      particle.vy = particle.vy * damp + targetVy * (1 - damp);
      particle.x += particle.vx; particle.y += particle.vy; particle.life -= 1;
      // ... 경계/수명 리셋, p.point(...) ...
    }
  };
}
```

### src/algorithms/flow-field/index.js 에 추가할 params (기존 필드는 유지)
```js
  params: [
    { key: 'count', label: '파티클 수', min: 50, max: 800, step: 10, default: 300, restart: true },
    { key: 'scl', label: '필드 해상도', min: 10, max: 60, step: 1, default: 25, unit: 'px', restart: true },
    { key: 'noiseScale', label: '노이즈 스케일', min: 0.001, max: 0.02, step: 0.001, default: 0.005 },
    { key: 'speed', label: '파티클 속도', min: 0.5, max: 6, step: 0.1, default: 2 },
    { key: 'damping', label: '댐핑', min: 0.5, max: 0.98, step: 0.01, default: 0.9 },
    { key: 'timeSpeed', label: '필드 변화 속도', min: 0, max: 0.03, step: 0.001, default: 0.005 },
  ],
```

## 파라미터 고르는 기준
- "이 값을 바꾸면 알고리즘이 왜 그렇게 생겼는지 이해된다"는 값을 우선한다.
  (예: 노이즈 스케일 = 흐름의 세밀함, 황금각 = 나선 배치, 반응·확산 계수 = 무늬 형태)
- 범위(min~max)는 화면이 깨지지 않으면서도 "눈에 띄게" 달라지는 폭으로 잡는다.
- 성능이 급격히 나빠지는 값(요소 개수 상한 등)은 max를 안전선에서 막는다.

## 출력 형식
아래 2개를 순서대로, 각각 코드블록으로 출력하라:
1) src/algorithms/<slug>/sketch.js 전체 코드 (변환 후)
2) src/algorithms/<slug>/index.js 에 추가할 params 배열 (어느 위치에 넣는지도 한 줄로 안내)

## 작성 대상
- slug(폴더명): phyllotaxis
- 현재 sketch.js 전체 코드는 첨부함:
<여기에 대상 알고리즘의 현재 sketch.js 전문을 붙여넣기>
````
