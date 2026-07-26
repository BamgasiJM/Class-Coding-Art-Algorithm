import sketch from './sketch';

export default {
  longDescription: {
    en: "Delaunay Triangulation is a geometric algorithm that connects a set of discrete points into a network of non-overlapping triangles, ensuring that no point falls inside the circumcircle of any triangle. This constraint maximizes the minimum angles of the triangles, avoiding thin or elongated geometries. It forms the exact dual mathematical structure of the Voronoi Diagram and is widely utilized in terrain modeling, mesh generation, and procedural network synthesis.",
    ko: String.raw`
**Delaunay Triangulation**(들로네 삼각분할)은 2D 평면에 흩어져 있는 점들을 삼각형 망으로 연결하여 빈틈없이 공간을 채우는 **기하학적 분해(Geometric Decomposition)** 알고리즘입니다. 이 방식은 **삼각형의 외접원 안에 다른 점이 들어오지 않아야 한다**는 특별한 규칙을 따르는데, 덕분에 삼각형들이 길쭉하게 찌그러지지 않고 최대한 **정삼각형에 가까운 예쁜 모양을 유지**하게 됩니다. 러시아 수학자 Boris Delaunay가 1934년 발표한 이 알고리즘은 컴퓨터 기하학, 지형 모델링, 메쉬 생성 등 광범위한 응용 분야에서 사용되며, **보로노이 다이어그램**(Voronoi Diagram)과 서로 거울을 보듯 완벽하게 연결된 구조를 가집니다.

### 1. 핵심 수학적 원리
점의 집합 $P = \{p_1, p_2, \ldots, p_n\}$에 대한 Delaunay 삼각분할은 다음을 만족합니다:

1. **외접원 제약**(Circumcircle Criterion):
   - 삼각형 $T = \{p_i, p_j, p_k\}$의 외접원 $\text{CC}(T)$ 내부에 다른 정점이 없어야 함
   - 수학적으로: $\forall p_\ell \notin \{p_i, p_j, p_k\}$에 대해 $p_\ell \notin \text{interior}(\text{CC}(T))$

2. **극대 최소 각 성질:** 이 제약은 삼각분할 내 모든 삼각형의 최소 내각들의 최솟값을 전역적으로 최대화합니다. 즉, 가능한 모든 삼각분할 중에서 가장 "균등하고 정규"인 형태를 보장

3. **보로노이 쌍대:** Delaunay 삼각분할의 각 삼각형의 외심(Circumcenter)을 연결하면 보로노이 다이어그램이 됩니다.
   - Delaunay 간선 $\leftrightarrow$ 보로노이 꼭짓점
   - Delaunay 삼각형 $\leftrightarrow$ 보로노이 정점 (Voronoi cell)

4. **삼각분할 구성 알고리즘(Bowyer-Watson):**
   - 점들을 하나씩 추가하면서 점을 포함하는 삼각형을 찾음
   - 외접원 제약을 위반하는 이웃 삼각형들을 제거(Flip)
   - 빈 공간을 새 삼각형으로 채움

### 2. 주요 특징 및 장점
- **수치적 안정성:** 가늘고 길게 찢어진(Sliver) 삼각형을 피하므로, 유한요소 분석(FEA), 수치 시뮬레이션에서 계산 오차를 최소화합니다.
- **최적성 보장:** 이론적으로 모든 가능한 삼각분할 중 최고의 형태를 보장하며, 이는 다른 삼각분할 방식이 따라올 수 없는 강점입니다.
- **효율적 계산:** Bowyer-Watson 알고리즘은 $O(n \log n)$ 평균 시간복잡도를 가지며, 병렬화도 가능합니다.
- **보로노이와의 통합:** 한 번의 계산으로 두 가지 쌍대 구조를 동시에 얻을 수 있어, 공간 분석 문제에 강력합니다.

### 3. 구현 시 고려 사항
- **초기 슈퍼 삼각형:** 모든 입력 점을 포함하는 충분히 큰 삼각형에서 시작하여, 점 추가 후 제거하는 방식이 로직을 단순화합니다.
- **외접원 계산:** 부동소수점 연산의 수치 오차를 고려하여, 외접원 제약 검사 시 작은 오차 범위($\epsilon$)를 설정합니다.
- **플립(Flip) 연쇄:** 한 점 추가로 여러 삼각형이 제거되고 새로 추가될 수 있으므로, 반복적 플립 로직을 정확하게 구현해야 합니다.
- **경계 처리:** 경계 간선을 특수 처리하여, Delaunay 성질 적용을 제한할 수도 있습니다 (Constrained Delaunay).

### 4. 활용 분야
- **지형 모델링:** 표고점(Elevation Points)을 Delaunay로 삼각분할하여 3D Digital Elevation Model 생성.
- **메쉬 생성:** 유한요소 분석(FEA), 유한차분법(FDM)의 입력 메쉬로 자동 생성.
- **공간 분석:** 지리정보, 생태 데이터 분석에서 인접 관계 파악.
- **절차적 생성:** 게임의 지형, 건물, 도로 네트워크의 자동 설계.
- **Generative Art:** 점들의 배치를 기반으로 기하학적인 추상 미술 생성, 데이터 비주얼라이제이션.
    `,
  },
  sketch,
  params: [
    {
      key: 'numPoints',
      label: '포인트 개수',
      min: 50,
      max: 300,
      step: 10,
      default: 120,
      restart: true
    },
    {
      key: 'baseAlpha',
      label: '삼각형 기본 투명도',
      min: 10,
      max: 150,
      step: 5,
      default: 40,
      restart: false
    },
    {
      key: 'jitterSpeed',
      label: '정점 애니메이션 속도',
      min: 0,
      max: 0.05,
      step: 0.001,
      default: 0.005,
      restart: false
    }
  ],
  related: ["Voronoi Diagram", "Circle Packing", "Cellular Automata"],
};