export const ALGORITHMS = [
  // ── Part I. Foundations ──────────────────────────────
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

export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

export function findAlgorithmBySlug(slug) {
  return ALGORITHMS.find(algo => slugify(algo.name) === slug)
}
