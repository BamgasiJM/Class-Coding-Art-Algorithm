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
    no: '19', name: 'Wang Tiles',
    desc: '변(edge)의 색을 맞춰야 하는 제약으로 타일을 배치해, 반복되지 않는 비주기 패턴을 만듭니다.',
    tags: ['tile', 'edge-matching', 'aperiodic', 'constraint'],
  },
  {
    no: '20', name: 'Poisson Disk Sampling',
    desc: '서로 최소 간격을 유지하도록 점을 뿌려, 뭉침 없이 고르고 자연스러운 분포를 만듭니다(Bridson 알고리즘).',
    tags: ['sampling', 'blue-noise', 'distribution', 'spatial'],
  },

  // ── Fields & Contours ────────────────────────────────────
  {
    no: '21', name: 'SDF & Metaballs',
    desc: '부호 있는 거리 함수(SDF)로 2D 형태를 정의하고, marching squares로 등고선·메타볼을 추출해 부드럽게 융합되는 형태를 그립니다.',
    tags: ['SDF', 'metaball', 'marching-squares', 'implicit'],
  },

  // ── Dynamics & Physics ───────────────────────────────────
  {
    no: '22', name: 'Particle System',
    desc: '이미터에서 방출된 파티클에 속도·중력·감쇠를 적용해 불꽃, 연기, 비 등 자연 현상을 시뮬레이션합니다.',
    tags: ['emitter', 'lifespan', 'force', 'integration'],
  },
  {
    no: '23', name: 'Spring & Constraint',
    desc: '스프링 힘(Hooke)과 Verlet 적분·거리 제약으로 천, 로프, 연성 물체의 물리적 움직임을 시뮬레이션합니다.',
    tags: ['spring', 'verlet', 'constraint', 'cloth'],
  },
  {
    no: '24', name: 'N-Body Gravity',
    desc: '모든 입자가 서로 만유인력으로 끌어당기며 궤도를 이룹니다. 거리 제곱에 반비례하는 상호 인력을 적분합니다.',
    tags: ['gravity', 'n-body', 'orbit', 'force'],
  },
  {
    no: '25', name: 'Double Pendulum',
    desc: '두 관절의 각도·각속도를 적분해 이중 진자의 운동을 시뮬레이션합니다. 초기값의 미세한 차이가 전혀 다른 궤적으로 발산하는 카오스의 대표 예입니다.',
    tags: ['angular-velocity', 'chaos', 'gravity', 'pendulum'],
  },
  {
    no: '26', name: 'Elastic Collision',
    desc: '원-원 거리로 충돌을 판정하고 운동량·에너지 보존으로 반발 속도를 계산합니다. 당구공 같은 탄성 충돌을 재현합니다.',
    tags: ['collision', 'momentum', 'restitution', 'physics'],
  },
  {
    no: '27', name: 'Harmonograph',
    desc: '감쇠(damping)되는 여러 사인 진동을 합성해 그리는 곡선입니다. 서서히 잦아드는 진자 운동이 정교한 리사주 궤적을 남깁니다.',
    tags: ['damping', 'oscillation', 'lissajous', 'curve'],
  },

  // ── Collective Behavior & Chaos ──────────────────────────
  {
    no: '28', name: 'Boids / Flocking',
    desc: '분리(Separation)·정렬(Alignment)·응집(Cohesion) 세 규칙만으로 새떼·물고기떼의 군집 행동을 재현합니다.',
    tags: ['boids', 'swarm', 'agent', 'emergence'],
  },
  {
    no: '29', name: 'Attractor System',
    desc: 'Lorenz·Thomas attractor 방정식을 실시간으로 적분해 카오스적인 궤도를 시각화합니다.',
    tags: ['chaos', 'ODE', 'trail', 'lorenz'],
  },

  // ── 추가 알고리즘 ──────────────────────────────────────────
  {
    no: '30', name: 'Penrose Tiling',
    desc: '두 종류의 마름모(P2·P3)로 비주기적으로 평면을 채우는 타일링 알고리즘입니다. 자연에서 발견되지 않는 수학적 아름다움을 표현합니다.',
    tags: ['tiling', 'aperiodic', 'geometry', 'pattern'],
  },
  {
    no: '31', name: 'TSP Art',
    desc: '수천의 점들을 단 하나의 연속 선으로 연결하는 최단 경로 문제(TSP)와 클리스틱 알고리즘을 활용해 점 아트를 한 줄로 표현합니다.',
    tags: ['pathfinding', 'optimization', 'single-line', 'stippling'],
  },
  {
    no: '32', name: 'Maze Generation',
    desc: '깊이 우선 탐색(DFS) 기반 백트래킹으로 격자의 벽을 허물며 미로를 생성합니다. 무작위성과 경로 탐색 로직이 절차적 미로 구조를 만듭니다.',
    tags: ['maze', 'DFS', 'backtracking', 'procedural'],
  },
  {
    no: '33', name: 'Escape-Time Fractal',
    desc: '복소평면의 점을 반복적으로 변환하여 발산 여부로 색상을 매핑합니다. 만델브로트 같은 무한 복잡한 구조의 자기 유사 경계를 시각화합니다.',
    tags: ['fractal', 'complex-number', 'iteration', 'mandelbrot'],
  },
  {
    no: '34', name: 'Physarum (Slime Mold)',
    desc: '원형 에이전트들이 궤적(Trail)을 남기고 주변 흔적의 농도를 감지해 방향을 결정합니다. 자연에서 발견되는 유기적 네트워크 형성을 시뮬레이션합니다.',
    tags: ['agent', 'trail', 'emergent', 'network'],
  },
  {
    no: '35', name: 'Quadtree',
    desc: '조건에 따라 2차원 공간을 재귀적으로 4분할합니다. 빠른 공간 탐색, 충돌 판정, 이미지 압축 등에 활용됩니다.',
    tags: ['quadtree', 'recursive', 'spatial', 'subdivision'],
  },
  {
    no: '36', name: 'Abelian Sandpile',
    desc: '격자의 셀에 쌓인 모래가 높이를 넘으면 주변으로 무너져 내려지는(Avalanche) 과정을 반복해, 복잡하고 대칭적인 프랙탈 패턴을 창발합니다.',
    tags: ['grid', 'avalanche', 'fractal', 'emergence'],
  },
  {
    no: '37', name: 'Marching Squares',
    desc: '격자의 스칼라 필드에서 등고선(iso-line)을 추출하는 알고리즘입니다. 16가지 경우로 모든 윤곽 패턴을 커버하며 필드 시각화에 활용됩니다.',
    tags: ['contour', 'isoline', 'grid', 'scalar-field'],
  },
  {
    no: '38', name: 'Shape Morphing',
    desc: '두 개의 서로 다른 도형 사이를 보간하며 부드럽게 변형되는 과정을 시각화합니다. 최적 운송이나 극좌표 재배열을 통해 자연스러운 중간 형태를 생성합니다.',
    tags: ['interpolation', 'blend', 'transition', 'animation'],
  },
  {
    no: '39', name: 'Stippling',
    desc: '점의 배포로 이미지를 렌더링하는 표현 기법입니다. Lloyd 알고리즘으로 점들을 반복 최적화해 자연스러운 스티플 초상화를 만듭니다.',
    tags: ['stippling', 'voronoi', 'lloyd', 'halftone'],
  },
  {
    no: '40', name: '2D Ray Casting',
    desc: '관찰점에서 여러 방향으로 광선을 발사해 벽과 장애물과의 교차점을 계산하고, 보이는 영역(visibility polygon)을 그립니다. 조명, 그림자, 시야 판정에 활용됩니다.',
    tags: ['raycast', 'visibility', 'shadow', 'intersection'],
  },
  {
    no: '41', name: 'Strange Attractor',
    desc: '단순한 2D 반복 맵(sin/cos 기반)을 수천 번 반복하며 점을 누적해, 복잡하고 우아한 카오스 패턴을 창발합니다. Lorenz보다 감각적이고 직관적입니다.',
    tags: ['chaos', 'iteration', 'strange-attractor', 'fractal'],
  },
  {
    no: '42', name: 'Wave Function Collapse',
    desc: '타일 같은 제약(어떤 패턴이 인접할 수 있는지)을 정의하고, 엔트로피가 낮은 부분부터 결정해나가 전체 패턴을 생성하는 제약 충족 알고리즘입니다. 게임 맵, 픽셀 아트 생성에 활용됩니다.',
    tags: ['constraint', 'tile', 'generative', 'procedural'],
  },
  {
    no: '43', name: 'Flow Map Visualization',
    desc: '2D 벡터 필드(블로우, 수장 함수 등)를 시각화하는 기법입니다. 선형 보간 컨볼루션(LIC)이나 스트림라인으로 흐름의 방향과 세기를 표현합니다.',
    tags: ['vector-field', 'streamline', 'LIC', 'visualization'],
  },
  {
    no: '44', name: 'Random Walk',
    desc: '점이 매 단계마다 무작위 방향으로 이동하며 궤적을 그립니다. 브라우니 운동, 도시 구조, 산책로 같은 자연 경로의 기초가 됩니다.',
    tags: ['random', 'walk', 'stochastic', 'path'],
  },
  {
    no: '45', name: 'Dithering',
    desc: '화려한 색을 적은 수의 색깔로 근사할 때, 패턴적 오류 확산으로 중간 톤을 표현합니다. Floyd–Steinberg나 Bayer 행렬이 대표적입니다.',
    tags: ['pixel', 'halftone', 'error-diffusion', 'image'],
  },
  {
    no: '46', name: 'Agent System',
    desc: '독립적인 에이전트들이 단순한 규칙을 따라 이동하고 상호작용하며, 복잡한 군집 구조와 패턴을 창발시킵니다.',
    tags: ['agent', 'behavior', 'emergence', 'swarm'],
  },
  {
    no: '47', name: 'Chladni Figures',
    desc: '2D 진동의 고유 모드(eigenmode)를 삼각함수로 합성해 공명 지진을 계산합니다. 진동이 0인 선(node line) 주위로 모래가 모여 Cymatics 현상을 시각화하고, 주파수에 따라 변하는 기하학적 패턴을 만듭니다.',
    tags: ['resonance', 'eigenmode', 'cymatics', 'wave'],
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
