import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

// ─────────────────────────────────────────────
// 알고리즘 카드 데이터
//
// 새 알고리즘을 추가하려면 아래 배열 끝에 객체를 하나 추가합니다.
//
// 형식:
// {
//   no:   '21',                  ← 표시 번호 (문자열, 두 자리로 맞춤)
//   name: 'Algorithm Name',      ← 카드 제목
//   desc: '설명...',              ← 본문 설명 (길이와 무관하게 카드 높이 동일)
//   tags: ['tag1', 'tag2'],      ← 하단 태그 (3~4개 권장)
// }
//
// 예시:
// {
//   no: '21', name: 'L-System',
//   desc: '문자열 치환 규칙으로 프랙탈 식물 구조를 재귀적으로 생성합니다.',
//   tags: ['fractal', 'recursive', 'grammar'],
// },
// ─────────────────────────────────────────────
const ALGORITHMS = [

  // ── Part I. Foundations ──────────────────────────────────
  {
    no: '01', name: 'Flow Field',
    desc: 'Perlin noise로 벡터 필드를 구성하고, 수천 개의 파티클이 그 흐름을 따라 궤적을 그립니다.',
    tags: ['noise', 'particle', 'vector'],
  },
  {
    no: '02', name: 'Trigonometric Wave',
    desc: 'sin·cos 함수로 오실레이션과 파형을 생성합니다. 리사주 패턴, 나선형 등 주기적인 시각 패턴의 기반입니다.',
    tags: ['sin', 'cos', 'oscillation', 'wave'],
  },
  {
    no: '03', name: 'Easing & Interpolation',
    desc: '시간 값을 비선형 함수로 변환해 자연스러운 움직임을 만듭니다. lerp, smoothstep, cubic bezier easing이 대표적입니다.',
    tags: ['lerp', 'easing', 'motion', 'time'],
  },

  // ── Part II. Randomness & Noise ──────────────────────────
  {
    no: '04', name: 'Perlin / Simplex Noise',
    desc: '연속적이고 부드러운 의사 난수 노이즈입니다. 지형, 구름, 유기적 텍스처 생성에 광범위하게 사용됩니다.',
    tags: ['noise', 'random', 'texture', 'organic'],
  },
  {
    no: '05', name: 'Fractal Brownian Motion',
    desc: 'Perlin noise를 여러 옥타브로 중첩(fBm)해 자연물의 자기 유사 복잡성을 모방합니다.',
    tags: ['fBm', 'fractal', 'octave', 'noise'],
  },
  {
    no: '06', name: 'Curl Noise',
    desc: '노이즈 필드의 컬(curl) 연산으로 발산 없는 벡터 필드를 만듭니다. 연기, 유체 흐름 시뮬레이션에 적합합니다.',
    tags: ['curl', 'fluid', 'vector', 'divergence-free'],
  },
  {
    no: '07', name: 'Fractal & IFS',
    desc: 'Mandelbrot, Julia set, IFS(반복 함수 시스템)로 무한 자기 유사 구조를 생성합니다.',
    tags: ['mandelbrot', 'julia', 'IFS', 'self-similarity'],
  },

  // ── Part III. Grammar Systems ────────────────────────────
  {
    no: '08', name: 'L-System',
    desc: '문자열 치환 규칙을 반복 적용해 식물·나무·산호 등 자연 분기 구조를 절차적으로 생성합니다.',
    tags: ['grammar', 'recursive', 'branching', 'turtle'],
  },
  {
    no: '09', name: 'Cellular Automata',
    desc: '격자 위 셀이 이웃 상태에 따른 규칙으로 갱신되는 시스템입니다. Game of Life가 대표 사례입니다.',
    tags: ['grid', 'rule', 'emergence', 'life'],
  },
  {
    no: '10', name: 'Reaction-Diffusion',
    desc: '두 화학 물질의 확산·반응 방정식을 시뮬레이션해 줄무늬, 반점 등 자연 표면 패턴을 생성합니다.',
    tags: ['diffusion', 'Turing', 'pattern', 'chemistry'],
  },

  // ── Part IV. Spatial Structures ──────────────────────────
  {
    no: '11', name: 'Voronoi Diagram',
    desc: '평면을 가장 가까운 씨앗 점 기준으로 분할합니다. 세포 구조, 균열 패턴, 공간 분할에 활용됩니다.',
    tags: ['voronoi', 'spatial', 'cell', 'partition'],
  },
  {
    no: '12', name: 'Delaunay Triangulation',
    desc: 'Voronoi의 쌍대 그래프로, 점 집합을 가장 균등한 삼각형 메시로 연결합니다.',
    tags: ['triangulation', 'mesh', 'dual', 'geometry'],
  },
  {
    no: '13', name: 'SDF (Signed Distance Field)',
    desc: '임의 형태까지의 부호 있는 거리를 함수로 정의합니다. 레이 마칭과 결합해 복잡한 3D 형태를 렌더링합니다.',
    tags: ['SDF', 'ray marching', 'implicit', 'shader'],
  },

  // ── Part V. Dynamics & Physics ───────────────────────────
  {
    no: '14', name: 'Particle System',
    desc: '이미터에서 방출된 파티클에 속도·중력·감쇠를 적용해 불꽃, 연기, 비 등 자연 현상을 시뮬레이션합니다.',
    tags: ['emitter', 'lifespan', 'force', 'integration'],
  },
  {
    no: '15', name: 'GPU Instancing',
    desc: 'DrawMeshInstanced와 Compute Shader로 수만 개의 인스턴스를 GPU 위에서 병렬 구동합니다.',
    tags: ['GPU', 'HLSL', 'instancing', 'performance'],
  },
  {
    no: '16', name: 'Spring & Constraint',
    desc: '스프링 힘과 XPBD 제약으로 천, 로프, 연성 물체의 물리적 움직임을 시뮬레이션합니다.',
    tags: ['spring', 'XPBD', 'constraint', 'cloth'],
  },

  // ── Part VI. Collective Behavior ─────────────────────────
  {
    no: '17', name: 'Boids / Flocking',
    desc: '분리(Separation)·정렬(Alignment)·응집(Cohesion) 세 규칙만으로 새떼·물고기떼의 군집 행동을 재현합니다.',
    tags: ['boids', 'swarm', 'agent', 'emergence'],
  },
  {
    no: '18', name: 'Attractor System',
    desc: 'Lorenz·Thomas attractor 방정식을 실시간으로 적분해 카오스적인 궤도를 시각화합니다.',
    tags: ['chaos', 'ODE', 'trail', 'lorenz'],
  },

  // ── Part VII. Shaders & GPU ──────────────────────────────
  {
    no: '19', name: 'Ray Marching',
    desc: 'SDF를 따라 광선을 단계적으로 전진시켜 복잡한 암시적 형태를 Fragment Shader만으로 렌더링합니다.',
    tags: ['GLSL', 'SDF', 'shader', 'ray'],
  },

  // ── Part IX. Data & ML ───────────────────────────────────
  {
    no: '20', name: 'Mesh Volume Fill',
    desc: 'Möller–Trumbore 교차 검사와 rejection sampling으로 임의 메시 내부를 파티클로 채웁니다.',
    tags: ['raycast', 'sampling', 'mesh', 'volume'],
  },
]

function Card({ algo, index }) {
  const ref               = useRef()
  const [hovered, setHovered]   = useState(false)
  const [checked, setChecked]   = useState(false)

  useEffect(() => {
    const el = ref.current

    // IntersectionObserver로 뷰포트 진입 감지 → GSAP 등장 애니메이션
    // ScrollTrigger 대신 사용 — React 렌더링 사이클과의 타이밍 충돌 없음
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, {
            y: 0, opacity: 1,
            duration: 0.75, ease: 'power3.out',
            delay: index * 0.1,
          })
          observer.unobserve(el) // 한 번만 실행
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: '100%',
        background: 'var(--card-bg)',
        border: hovered
          ? '1px solid var(--accent)'
          : '1px solid var(--border)',
        padding: '2rem 1.8rem',
        position: 'relative',
        cursor: 'default',
        opacity: 0,
        transform: 'translateY(60px)',
        // flexbox — desc가 남은 공간을 채워 tags를 항상 하단에 고정
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.25s ease',
      }}
    >
      {/* 상단 악센트 라인 */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: 1,
        background: 'linear-gradient(to right, var(--accent), transparent)',
        opacity: 0.5,
      }} />

      {/* 체크박스
          - 수업 중 해당 알고리즘 설명 시 클릭해서 표시하는 용도
          - 클릭하면 액센트 컬러로 채워짐
          - 각 카드가 독립적인 checked 상태를 가짐 */}
      <div
        onClick={() => setChecked(prev => !prev)}
        style={{
          width: 14,
          height: 14,
          border: '1.5px solid var(--accent)',
          marginBottom: '1rem',
          cursor: 'pointer',
          flexShrink: 0,
          background: checked ? 'var(--accent)' : 'transparent',
          transition: 'background 0.15s ease',
        }}
      />

      {/* 제목 — 호버 시 액센트 컬러 전환 */}
      <h3 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
        fontWeight: 400,
        letterSpacing: '0.05em',
        marginBottom: '0.8rem',
        color: hovered ? 'var(--accent)' : 'var(--fg)',
        transition: 'color 0.25s ease',
      }}>
        {algo.name}
      </h3>

      {/* 설명 — IBM Plex Sans KR 폰트, flex:1로 남은 공간 차지 */}
      <p style={{
        fontFamily: "'IBM Plex Sans KR', sans-serif",
        fontWeight: 300,
        fontSize: '0.82rem',
        lineHeight: 1.8,
        color: 'var(--muted)',
        flex: 1,
        marginBottom: '1.4rem',
      }}>
        {algo.desc}
      </p>

      {/* 태그 — 항상 카드 하단에 위치 */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        {algo.tags.map(t => (
          <span key={t} style={{
            fontSize: '0.6rem', letterSpacing: '0.12em',
            padding: '0.2rem 0.55rem',
            border: '1px solid rgba(var(--accent-rgb), 0.3)',
            color: 'var(--accent)',
            textTransform: 'uppercase',
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function AlgorithmSection() {
  const headingRef = useRef()

  useEffect(() => {
    const el = headingRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{
      padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 8vw, 7rem)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div
          ref={headingRef}
          style={{
            display: 'flex', alignItems: 'center',
            gap: '1.2rem', marginBottom: '3.5rem',
            opacity: 0,
            transform: 'translateX(-30px)',
          }}
        >
          <div style={{ width: 32, height: 1, background: 'var(--accent)' }} />
          <h2 style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.7rem', letterSpacing: '0.35em',
            textTransform: 'uppercase', color: 'var(--muted)',
          }}>
            Algorithms
          </h2>
        </div>

        {/*
          그리드 컨테이너
          - auto-fill + minmax(260px, 1fr): 카드 수가 늘어나도 자동 줄바꿈
          - alignItems: stretch (기본값): 같은 행의 모든 카드가 동일 높이
          - 카드 추가 시 ALGORITHMS 배열에 객체만 추가하면 자동으로 반영됨
        */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1px',
          background: 'var(--border)',
          alignItems: 'stretch',
        }}>
          {ALGORITHMS.map((a, i) => (
            // 래퍼 div: 1px gap을 구분선으로 활용 (background: var(--border))
            <div key={a.no} style={{ background: 'var(--bg)', height: '100%' }}>
              <Card algo={a} index={i} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
