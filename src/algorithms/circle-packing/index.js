import sketch from "./sketch";

export default {
  longDescription: {
    en: "Circle Packing is a geometric packing algorithm that populates a defined space with non-overlapping circles. New circles are randomly spawned at minimal sizes and organically grow until they contact the boundary of an adjacent circle or the edge of the canvas. This constrained scaling models natural saturation and growth phenomena, resulting in intricate visual hierarchies and structures reminiscent of biological cells and stone arrangements.",
    ko: String.raw`
**Circle Packing**(원 채우기)은 정해진 공간 내에 서로 겹치지 않으면서 가능한 많은 원들을 배치하는 **기하학적 최적화 문제**로, 각 원이 성장 제약 조건 속에서 커지는 과정을 통해 자연계의 **공간 점유(Space Occupancy)** 현상을 모델링합니다. 세포, 거품 구조, 자갈밭, 꽃 씨앗 배치 등 자연에서 볼 수 있는 최적화된 배치 패턴을 수학적으로 재현하는 방법입니다. 이런 조건 기반의 성장을 통해 복잡하지만 질서 있는 아트워크가 자동으로 생성 됩니다.

### 1. 핵심 수학적 원리
각 원의 위치와 크기는 다음의 제약 조건을 만족해야 합니다:

1. **원의 표현:** 원 $C_i = (\mathbf{p}_i, r_i)$ (중심 $\mathbf{p}_i$, 반지름 $r_i$)

2. **비겹침 제약(Non-Overlapping Constraint):**
   - 임의의 두 원 $C_i, C_j$에 대해: $\|\mathbf{p}_i - \mathbf{p}_j\| \geq r_i + r_j + \epsilon$ (여기서 $\epsilon$는 최소 갭)

3. **경계 제약(Boundary Constraint):**
   - 모든 원이 캔버스 내부에 포함: $\|\mathbf{p}_i\| + r_i \leq R_{canvas}$

4. **성장 과정:** 새 원이 추가될 때:
   - 초기 반지름: $r_{min}$
   - 각 프레임에서 반지름 증가: $r_i \leftarrow r_i + \Delta r$ (growth rate)
   - 성장 중단 조건: 다른 원이나 경계와 충돌

5. **충돌 검사:** 각 원에 대해, 주변의 모든 기존 원과의 거리를 확인:
   - $d_{ij} = \|\mathbf{p}_i - \mathbf{p}_j\|$
   - $d_{ij} < r_i + r_j + \epsilon$이면 성장 중단

### 2. 주요 특징 및 장점
- **자연 모방(Biomimicry):** 세포 분열, 유기체 조직화, 거품 형성 등 자연의 공간 점유 패턴을 정확히 재현합니다.
- **생성의 아름다움:** 단순한 성장 규칙만으로도 복잡하고 조화로운 배치가 자동으로 형성되며, 각 원의 크기 분포는 특별한 시각적 패턴을 만듭니다.
- **공간 활용도:** 탐욕적(Greedy) 접근으로도 상당한 수준의 공간 채우기를 달성하며, 이는 NP-완전 문제인 원 패킹 문제의 실용적 근사 해법입니다.
- **실시간 변화:** 실시간으로 성장이 진행되어, 마치 살아있는 유기체가 자라는 듯한 변화를 관찰할 수 있습니다.

### 3. 구현 시 고려 사항
- **공간 분할 최적화:** 모든 원과의 거리를 매번 확인하면 $O(n^2)$이 되므로, 공간 분할 구조(Grid, Quadtree)를 사용하여 인접한 원만 검사합니다.
- **프레임당 시도 횟수:** 각 프레임에서 여러 위치에 새 원 생성을 시도하되, 설정한 최대 개수를 초과하지 않도록 관리합니다.
- **초기 반지름과 성장 속도의 균형:** 초기 반지름이 크면 원이 많이 들어가지 않고, 성장 속도가 느리면 렌더링이 오래 걸립니다.
- **시각적 표현:** 원의 크기, 위치를 바탕으로 선 굵기를 동적으로 조정하여 시각적 계층감을 강화합니다.

### 4. 활용 분야
- **Generative Art & 데이터 시각화:** 통계 데이터를 원의 크기로 인코딩하는 bubble chart, 추상 예술 작품 생성.
- **레이아웃 설계:** UI 요소 배치, 포스터/전시회 디자인에서 자동 배치 알고리즘으로 활용.
- **생물학 시뮬레이션:** 세포 조직, 미생물 군집, 조직 성장 모델링.
- **게임 월드 생성:** 식물 배치, 보물 숨김, NPC 스폰 위치의 자연스러운 배치.
- **재료 과학:** 다공성 재료, 거품 구조, 입자 패킹의 구조적 특성 분석.
    `,
  },
  sketch,
  params: [
    { key: 'maxCircles', label: '최대 원 개수', min: 30, max: 300, step: 10, default: 150, restart: true },
    { key: 'attemptsPerFrame', label: '프레임당 시도 횟수', min: 1, max: 15, step: 1, default: 5, restart: true },
    { key: 'growthRate', label: '성장 속도', min: 0.1, max: 1.5, step: 0.1, default: 0.5 },
    { key: 'initialRadius', label: '초기 반지름', min: 0.5, max: 3, step: 0.5, default: 1, unit: 'px', restart: true },
    { key: 'minDistance', label: '최소 간격', min: 1, max: 8, step: 1, default: 2, unit: 'px' },
    { key: 'maxRadiusForWeight', label: '선 굵기 기준 최대 반지름', min: 15, max: 60, step: 5, default: 30, unit: 'px' },
    { key: 'lineWeightMax', label: '최대 선 굵기', min: 2, max: 10, step: 0.5, default: 5.5, unit: 'px' },
  ],
  related: [
    "Voronoi Diagram",
    "Delaunay Triangulation",
    "Diffusion-Limited Aggregation",
  ],
};
