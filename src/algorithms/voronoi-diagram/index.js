import sketch from "./sketch";

export default {
  longDescription: {
    en: String.raw`
Voronoi Diagram is a fundamental geometric partition of a plane into regions based on proximity to specific seed points. Each region (Voronoi cell) contains all locations closer to its seed than to any other seed. The boundaries are the perpendicular bisectors of seed pairs. Voronoi Diagrams model natural spatial distribution: giraffe spots, dragonfly wing cells, dried mud cracks, foam structures, and even galactic superclusters exhibit Voronoi-like patterns. This implementation animates moving seeds, creating a dynamic, flowing geometric cellular mesh that reveals how local proximity rules govern global structure.
    `,
    ko: String.raw`
**Voronoi Diagram(보로노이 다이어그램)**은 **평면 또는 고차원 공간을 특정 점(Seed Point)**들과의 **근접성(Proximity)**을 기반으로 분할하는 **기본적인 기하학 알고리즘**입니다. 각 **보로노이 셀(Voronoi Cell)**은 **다른 어떤 핵점보다 자신의 핵점에 더 가까운 모든 좌표들의 집합**입니다. **경계(Boundary)**는 인접한 핵점 쌍의 **수직이등분선(Perpendicular Bisector)**으로 구성됩니다. 이 단순한 근접성 규칙으로부터 **기린의 반점, 잠자리 날개의 육각형 셀, 가뭄으로 갈라진 논, 비눗방울 거품, 은하 초대(Superclusters)** 등 자연 현상의 **공간 분할 패턴**이 창발적으로 형성됩니다. 이는 **국소 규칙이 전역 구조를 어떻게 지배하는지**를 보여주는 강력한 예제입니다.

### 1. 핵심 수학적 원리
1. **보로노이 셀 정의:**
   - 핵점 $p_i \in \mathbb{R}^2$에 대한 Voronoi 셀:
   - $V_i = \{x : \|x - p_i\| < \|x - p_j\|, \forall j \neq i\}$
   - 경계: $\|x - p_i\| = \|x - p_j\|$ (수직이등분선)

2. **쌍대성(Duality) - Delaunay 삼각분할:**
   - Voronoi는 Delaunay 삼각분할의 쌍대 그래프
   - Delaunay의 삼각형 꼭짓점 → Voronoi의 셀
   - Delaunay의 모서리 ↔ Voronoi의 경계

3. **거리 함수 계산:**
   - 유클리드 거리: $d(x, p) = \sqrt{(x-p_x)^2 + (y-p_y)^2}$
   - 각 픽셀: 가장 가까운 핵점 찾기 $\arg\min_i d(x, p_i)$
   - 그리드 기반: 모든 픽셀 순회, $O(n \times m \times k)$ (n×m = 해상도, k = 핵점 수)

4. **거리 장(Distance Field):**
   - 각 픽셀의 가장 가까운 거리: $d_{\min}(x) = \min_i \|x - p_i\|$
   - 경계 강조: $d_{\min}$ 값이 임계값 근처일 때 선 그리기

### 2. 주요 특징 및 장점
- **자연성:** 점의 근접성만으로 자연스러운 공간 분할 달성.
- **쌍대성:** Delaunay와의 수학적 관계로 다양한 응용 가능.
- **계산 안정성:** 명시적 거리 계산으로 수치적으로 안정적.
- **시각적 우아함:** 기하학적 순수함, 세포 구조의 자연스러움.

### 3. 구현 시 고려 사항
- **거리 계산 최적화:** Jump Flooding Algorithm (JFA)로 $O(m \log m)$ 달성 (m = 픽셀 수).
- **경계 표현:** 경계선 두께, 색상, 투명도로 시각적 강조.
- **핵점 애니메이션:** 핵점을 시간에 따라 이동시키면 동적 Voronoi 생성.
- **다중 핵점 분포:** 균일 vs. 클러스터링 vs. Poisson 디스크; 각기 다른 시각 효과.

### 4. 활용 분야
- **게임 개발:** 영토 분할, 자원 채집점 배치, 지역 선점.
- **지리정보(GIS):** 주민 할당, 서비스 지역 분석, 건물 배치 계획.
- **과학 시뮬레이션:** 입자 경계 정의, 메시 생성, 거품 거품 구조.
- **Generative Art:** 셀룰러 아트, 음악 시각화, 추상 지형.
- **로보틱스:** 영역 분할 기반 경로 계획, 센서 배치 최적화.
    `,
  },
  sketch,
  params: [
    { key: 'numSeeds', label: 'Seed 개수', min: 10, max: 150, step: 5, default: 50, restart: true },
    { key: 'edgeThreshold', label: '경계선 감지 기준', min: 0.5, max: 3, step: 0.1, default: 1.2 },
    { key: 'baseBrightnessMin', label: '최소 밝기', min: 0.1, max: 0.8, step: 0.1, default: 0.4 },
    { key: 'baseBrightnessFactor', label: '밝기 변조', min: 0.2, max: 1.0, step: 0.1, default: 0.6 },
    { key: 'distFadeMax', label: '거리 그라디언트 최대', min: 0.8, max: 2.0, step: 0.1, default: 1.2 },
    { key: 'distFadeMin', label: '거리 그라디언트 최소', min: 0.2, max: 1.0, step: 0.1, default: 0.5 },
    { key: 'seedPointSize', label: 'Seed 포인트 크기', min: 2, max: 12, step: 1, default: 4, unit: 'px' },
  ],
  related: ["Delaunay Triangulation", "Cellular Automata", "Circle Packing"],
};
