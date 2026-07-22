import sketch from './sketch'

export default {
  longDescription: {
    ko: String.raw`
**Quadtree(쿼드트리)**는 2차원 평면을 **재귀적으로 4개의 하위 영역(Quadrant)**으로 분할하는 **공간 분할 자료구조(Spatial Partitioning Data Structure)**입니다. 각 노드는 정해진 **용량(Capacity)** 만큼의 점(point)을 보관하다가, 초과하면 자동으로 4개의 자식 노드로 분할됩니다. 이를 통해 2D 공간에서 점들을 계층적으로 정렬하여, **빠른 공간 탐색(Range Query)**, **충돌 판정(Collision Detection)**, **이미지 압축** 등에서 $O(\log n)$ 이상의 효율성을 달성합니다. 게임 엔진, 그래픽 라이브러리, 과학 시뮬레이션 등 실시간 시스템에서 필수적인 최적화 기법입니다.

### 1. 핵심 수학적 원리
1. **재귀적 분할:**
   - 초기 경계 사각형: 좌상 $(x_{\min}, y_{\max})$, 우하 $(x_{\max}, y_{\min})$
   - 각 노드의 중심: $(x_c, y_c) = \left(\frac{x_{\min}+x_{\max}}{2}, \frac{y_{\min}+y_{\max}}{2}\right)$
   - 4개 자식: 좌상(NW), 우상(NE), 좌하(SW), 우하(SE)

2. **점의 분류:**
   - 새로운 점 $(x, y)$가 추가될 때:
   - $x < x_c$ 이고 $y \geq y_c$ → NW에 할당
   - $x \geq x_c$ 이고 $y \geq y_c$ → NE에 할당
   - 이런 식으로 4개 자식 중 하나에 재귀 배치

3. **용량 초과 시 분할:**
   - 노드의 점 개수 > capacity → 분할 실행
   - 기존 점들을 각 자식 노드에 재귀 분배
   - 트리의 높이: $h = O(\log_4 n)$ (최악 경우는 데이터 분포에 의존)

4. **공간 탐색 (Range Query):**
   - 범위 $[x_1, x_2] \times [y_1, y_2]$ 내의 모든 점 찾기
   - 각 노드마다 범위와 자식 영역의 교차 여부 판정
   - 교차하는 자식만 재귀 탐색 → 불필요한 영역 전수 조사 회피

### 2. 주요 특징 및 장점
- **계층적 효율성:** 점이 균등하게 분포하면 $O(\log n)$ 높이로 빠른 접근; 점이 편중되면 구조적 최적화 기회 제공.
- **동적 구조:** 점을 추가/제거하며 자동으로 트리가 재조정되므로, 움직이는 객체 관리에 유용.
- **공간적 직관성:** 4개 사각형 분할이 2D 공간을 직접 반영하므로, 시각화와 디버깅이 직관적.
- **메모리 효율:** 밀집한 영역은 세밀하게, 희박한 영역은 거칠게 분할하여 적응적 메모리 사용.

### 3. 구현 시 고려 사항
- **용량(Capacity) 선택:** 너무 작으면 트리가 깊어져 메모리 낭비; 너무 크면 각 노드당 선형 탐색 오버헤드. 보통 4~8 범위.
- **최대 깊이 제한:** 무한 재귀를 방지하기 위해 최대 깊이 설정 (보통 8~12).
- **중복 점 처리:** 같은 좌표의 점이 여러 개면 별도 리스트로 관리.
- **재균형화:** 점이 한쪽에 몰려도 특별한 재균형화 없이 작동하지만, 성능 저하 가능성 있음.

### 4. 활용 분야
- **게임 엔진:** 충돌 판정, 시야 제한(Frustum Culling), 근처 오브젝트 쿼리.
- **이미지 처리:** 이미지 압축, 특정 영역의 픽셀 집계, 빠른 흐림(Blur) 연산.
- **데이터 시각화:** 대규모 포인트 클라우드 관리, 공간 분포 분석.
- **물리 시뮬레이션:** N-Body 시뮬레이션에서 상호작용할 수 있는 객체 쌍 빠르게 찾기.
- **Generative Art:** 공간 기반 생성 규칙(위치에 따라 다른 렌더링), 계층적 세분화 시각화.
    `,
    en: String.raw`
A Quadtree is a spatial data structure that recursively subdivides 2D space into four quadrants. Each node holds up to a set capacity of points; when exceeded, it splits into four children and redistributes the points. This enables hierarchical spatial queries, collision detection, and image compression with O(log n) efficiency on average. Though sensitive to data distribution, Quadtrees are fundamental in game engines, graphics systems, and scientific simulations for fast spatial lookups and adaptive resolution rendering.
    `,
  },
  sketch,
  params: [
    { 
      key: 'particleCount', 
      label: '파티클 개수', 
      min: 50, 
      max: 1000, 
      step: 10, 
      default: 300, 
      restart: true 
    },
    { 
      key: 'capacity', 
      label: '노드 수용량', 
      min: 1, 
      max: 10, 
      step: 1, 
      default: 4, 
      restart: false 
    },
    { 
      key: 'maxDepth', 
      label: '트리 최대 깊이', 
      min: 2, 
      max: 9, 
      step: 1, 
      default: 6, 
      restart: false 
    },
    { 
      key: 'speed', 
      label: '이동 속도 배율', 
      min: 0, 
      max: 5, 
      step: 0.1, 
      default: 1, 
      restart: false 
    },
    { 
      key: 'trailAlpha', 
      label: '잔상 길이 (Alpha)', 
      min: 0, 
      max: 255, 
      step: 5, 
      default: 40, 
      restart: false 
    },
  ],
  related: ['Circle Packing', 'Voronoi Diagram', 'Boids / Flocking'],
}