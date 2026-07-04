// ALGORITHMS — 제너레이티브 아트 카드 덱 (single source of truth).
//
// 방향: p5.js 커뮤니티·CodePen 수준에서 "로직 지향"으로 구현 가능한 알고리즘만 모읍니다.
// 렌더링 최적화·GPU/셰이더 파이프라인(GPU Instancing, Ray Marching, Mesh Volume Fill 등)은
// 기술 지향적이라 제외합니다.
//
// 아래 `// ── … ──` 주석은 '느슨한' 시각적 그룹일 뿐, 강제 분류가 아닙니다.
// 새 카드는 아무 위치에나 추가해도 되고, 어떤 그룹에도 속하지 않아도 됩니다.
export const ALGORITHMS = [
  // ── Foundations ──────────────────────────────────────────
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
  {
    no: '04', name: 'Phyllotaxis',
    desc: '황금각(137.5°)으로 점을 회전 배치해 해바라기 씨앗 배열 같은 나선 패턴을 만듭니다. 삼각함수만으로 유기적 질서를 표현합니다.',
    tags: ['golden-angle', 'spiral', 'pattern', 'trig'],
  },

  // ── Randomness & Noise ───────────────────────────────────
  {
    no: '05', name: 'Perlin / Simplex Noise',
    desc: '연속적이고 부드러운 의사 난수 노이즈입니다. 지형, 구름, 유기적 텍스처 생성에 광범위하게 사용됩니다.',
    tags: ['noise', 'random', 'texture', 'organic'],
  },
  {
    no: '06', name: 'Fractal Brownian Motion',
    desc: 'Perlin noise를 여러 옥타브로 중첩(fBm)해 자연물의 자기 유사 복잡성을 모방합니다.',
    tags: ['fBm', 'fractal', 'octave', 'noise'],
  },
  {
    no: '07', name: 'Curl Noise',
    desc: '노이즈 필드의 컬(curl) 연산으로 발산 없는 벡터 필드를 만듭니다. 연기, 유체 흐름 시뮬레이션에 적합합니다.',
    tags: ['curl', 'fluid', 'vector', 'divergence-free'],
  },

  // ── Fractals & Recursion ─────────────────────────────────
  {
    no: '08', name: 'IFS & Fractal',
    desc: '반복 함수 시스템(IFS)과 카오스 게임으로 바른슬리 고사리, 시에르핀스키 삼각형 같은 자기 유사 프랙탈을 생성합니다.',
    tags: ['IFS', 'chaos-game', 'self-similarity', 'recursive'],
  },
  {
    no: '09', name: 'L-System',
    desc: '문자열 치환 규칙을 반복 적용해 식물·나무·산호 등 자연 분기 구조를 절차적으로 생성합니다.',
    tags: ['grammar', 'recursive', 'branching', 'turtle'],
  },

  // ── Growth & Grammar Systems ─────────────────────────────
  {
    no: '10', name: 'Cellular Automata',
    desc: '격자 위 셀이 이웃 상태에 따른 규칙으로 갱신되는 시스템입니다. Game of Life가 대표 사례입니다.',
    tags: ['grid', 'rule', 'emergence', 'life'],
  },
  {
    no: '11', name: 'Reaction-Diffusion',
    desc: '두 화학 물질의 확산·반응 방정식을 시뮬레이션해 줄무늬, 반점 등 자연 표면 패턴을 생성합니다.',
    tags: ['diffusion', 'Turing', 'pattern', 'chemistry'],
  },
  {
    no: '12', name: 'Differential Growth',
    desc: '점들이 서로 밀어내며 선을 따라 계속 삽입되어, 산호·뇌주름처럼 유기적으로 주름지는 곡선을 만듭니다.',
    tags: ['growth', 'organic', 'repulsion', 'curve'],
  },
  {
    no: '13', name: 'Space Colonization',
    desc: '성장 공간에 뿌린 유인점(attractor)을 향해 가지가 점진적으로 뻗어 나가며 잎맥·나무 구조를 생성합니다.',
    tags: ['branching', 'venation', 'growth', 'tree'],
  },
  {
    no: '14', name: 'Diffusion-Limited Aggregation',
    desc: '무작위로 떠도는 입자가 기존 구조에 닿으면 달라붙어, 나뭇가지·성에 모양의 프랙탈 응집체를 형성합니다.',
    tags: ['random-walk', 'aggregation', 'fractal', 'growth'],
  },

  // ── Spatial Structures & Tiling ──────────────────────────
  {
    no: '15', name: 'Voronoi Diagram',
    desc: '평면을 가장 가까운 씨앗 점 기준으로 분할합니다. 세포 구조, 균열 패턴, 공간 분할에 활용됩니다.',
    tags: ['voronoi', 'spatial', 'cell', 'partition'],
  },
  {
    no: '16', name: 'Delaunay Triangulation',
    desc: 'Voronoi의 쌍대 그래프로, 점 집합을 가장 균등한 삼각형 메시로 연결합니다.',
    tags: ['triangulation', 'mesh', 'dual', 'geometry'],
  },
  {
    no: '17', name: 'Circle Packing',
    desc: '충돌 없이 원을 점진적으로 키우며 빈 공간을 채웁니다. 이미지 위에 얹으면 스티플링 표현이 됩니다.',
    tags: ['packing', 'growth', 'collision', 'stippling'],
  },
  {
    no: '18', name: 'Truchet Tiles',
    desc: '방향만 다른 단일 타일을 격자에 무작위로 회전 배치해 미로·곡선 패턴을 창발시킵니다.',
    tags: ['tile', 'rotation', 'pattern', 'grid'],
  },
  {
    no: '19', name: 'Wave Function Collapse',
    desc: '인접 제약을 전파하며 타일을 하나씩 확정(collapse)해 전체적으로 일관된 패턴과 맵을 생성합니다.',
    tags: ['WFC', 'constraint', 'tiling', 'entropy'],
  },

  // ── Fields & Contours ────────────────────────────────────
  {
    no: '20', name: 'SDF & Metaballs',
    desc: '부호 있는 거리 함수(SDF)로 2D 형태를 정의하고, marching squares로 등고선·메타볼을 추출해 부드럽게 융합되는 형태를 그립니다.',
    tags: ['SDF', 'metaball', 'marching-squares', 'implicit'],
  },

  // ── Dynamics & Physics ───────────────────────────────────
  {
    no: '21', name: 'Particle System',
    desc: '이미터에서 방출된 파티클에 속도·중력·감쇠를 적용해 불꽃, 연기, 비 등 자연 현상을 시뮬레이션합니다.',
    tags: ['emitter', 'lifespan', 'force', 'integration'],
  },
  {
    no: '22', name: 'Spring & Constraint',
    desc: '스프링 힘(Hooke)과 Verlet 적분·거리 제약으로 천, 로프, 연성 물체의 물리적 움직임을 시뮬레이션합니다.',
    tags: ['spring', 'verlet', 'constraint', 'cloth'],
  },

  // ── Collective Behavior & Chaos ──────────────────────────
  {
    no: '23', name: 'Boids / Flocking',
    desc: '분리(Separation)·정렬(Alignment)·응집(Cohesion) 세 규칙만으로 새떼·물고기떼의 군집 행동을 재현합니다.',
    tags: ['boids', 'swarm', 'agent', 'emergence'],
  },
  {
    no: '24', name: 'Attractor System',
    desc: 'Lorenz·Thomas attractor 방정식을 실시간으로 적분해 카오스적인 궤도를 시각화합니다.',
    tags: ['chaos', 'ODE', 'trail', 'lorenz'],
  },
]

export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

export function findAlgorithmBySlug(slug) {
  return ALGORITHMS.find(algo => slugify(algo.name) === slug)
}
