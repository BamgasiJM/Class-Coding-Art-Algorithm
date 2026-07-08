import sketch from "./sketch";

export default {
  longDescription: {
    ko: String.raw`
**2D Ray Casting**은 특정 시점에서 쏜 광선(Ray)이 장면 내의 기하학적 구조물과 충돌하는 경로를 추적하여 시각적 정보를 생성하는 알고리즘입니다. 평면상의 점과 선분 사이의 **교차 판정**을 기반으로 하며, 시야각 제한이나 장애물 유무에 따른 가시 영역을 계산하는 데 탁월한 성능을 발휘합니다.

### 1. 핵심 수학적 원리
Ray Casting의 기본 단위는 시점 $P$에서 임의의 방향 $\vec{d}$로 뻗어나가는 **반직선(Ray)**입니다. 이 광선과 장애물인 선분 $AB$ 사이의 충돌을 찾기 위해 다음과 같은 방정식을 활용합니다.

- **광선의 방정식:** $R(t) = P + t\vec{d} \quad (t \ge 0)$
- **선분의 방정식:** $S(u) = A + u(B - A) \quad (0 \le u \le 1)$

두 식을 연립하여 $R(t) = S(u)$를 만족하는 $t$와 $u$를 구합니다. 이때 $t > 0$ 이면서 $0 \le u \le 1$인 최소의 $t$값을 찾는 것이 핵심입니다. 이는 두 벡터의 **외적(Cross Product)** 성질을 이용하여 선형 연립 방정식의 해를 구하는 방식으로 구현됩니다.

### 2. 주요 특징 및 장점
- **가시성 계산 (Visibility):** 장애물에 의해 가려지는 영역을 명확하게 구분할 수 있어, 2D Top-down 뷰의 시야 시스템 구현에 최적화되어 있습니다.
- **효율적인 경계 추출:** 광선이 충돌하는 지점들을 연결함으로써 복잡한 다각형 형태의 **가시 영역(Visibility Polygon)**을 매우 빠르게 생성할 수 있습니다.
- **동적 환경 대응:** 장애물의 위치나 시점의 이동에 따라 실시간으로 충돌 지점을 재계산하므로 반응성이 뛰어난 인터랙티브 아트를 구현하기 유리합니다.

### 3. 구현 시 고려 사항
- **공간 분할 (Spatial Partitioning):** 장애물의 개수가 많아질 경우 모든 선분과 광선을 일일이 대조하면 연산량이 급증합니다. 이를 방지하기 위해 **Grid**나 **Quadtree**를 사용하여 검사 범위를 최적화해야 합니다.
- **수치적 안정성:** 매우 작은 $t$값이나 평행한 선분 사이의 연산에서 발생할 수 있는 **Floating Point Error**를 방지하기 위해 $\epsilon$ (Epsilon) 값을 활용한 보정이 필요합니다.

### 4. 활용 분야
- **2D 게임 엔진:** 캐릭터의 시야(Field of View) 구현 및 조명 효과(2D Lighting) 생성.
- **제너레이티브 아트:** 빛의 산란이나 그림자 패턴을 이용한 기하학적 추상화 작업.
- **로보틱스 시뮬레이션:** 2D LiDAR 센서의 스캔 데이터를 모사하는 물리 시뮬레이션.
`,
    en: String.raw`
 **2D Ray Casting** is a fundamental algorithm used to determine the visibility of objects by tracing paths from a specific point in a 2D plane.It calculates intersections between rays and geometric segments to define visible areas.This technique is widely utilized in generating dynamic lighting, visibility polygons, and simulating sensor data in interactive generative art and 2D game environments.    
`,
  },
  sketch,
  related: ["Voronoi Diagram", "Delaunay Triangulation", "SDF & Metaballs"],
};
