import sketch from './sketch'

export default {
  longDescription: {
    ko: String.raw`
**TSP Art**는 이미지의 밝기를 **스티플 점(Stipple Points)** 의 분포로 정의한 뒤, **외판원 문제(Traveling Salesman Problem, TSP)** 의 근사 해결을 통해 **단 하나의 연속선**이 모든 점을 **효율적으로 순회하는 기법**입니다. **최근접 이웃 휴리스틱**(Nearest-Neighbor Heuristic)으로 초기 경로를 빠르게 구성한 뒤, **2-opt 지역 탐색**(Local Search)으로 교차하는 구간을 제거하여 경로를 점진적으로 단축합니다.

### 1. 핵심 수학적 원리
1. **점 분포 생성(Stipple Placement):**
   - 이미지 밝기 $L(x, y) \in [0, 1]$에 따라 확률 기반 샘플링
   - 어두운 곳은 높은 확률로 점 배치, 밝은 곳은 희박하게 배치
   - 결과: $N$개의 점 집합 $P = \{p_1, p_2, ..., p_N\}$

2. **거리 행렬:**
   - 점 $p_i$와 $p_j$ 사이의 유클리드 거리: $d_{ij} = \|p_i - p_j\|$
   - 완전 그래프 $G = (P, E)$ 구성 (모든 점 쌍이 연결)

3. **최근접 이웃 휴리스틱(Nearest-Neighbor):**
   - 시작점 $p_1$ 선택
   - 반복: 현재 점에서 방문하지 않은 가장 가까운 점으로 이동
   - 경로 길이: $\text{tour\_length} = \sum_{i=1}^{N-1} d_{\pi(i), \pi(i+1)} + d_{\pi(N), \pi(1)}$
   - 시간 복잡도: $O(N^2)$

4. **2-Opt 개선(Local Search):**
   - 현재 경로에서 두 엣지를 선택: $(p_i, p_{i+1})$과 $(p_j, p_{j+1})$ (단, $i < j$)
   - 교차 확인: 두 엣지가 평면상에서 교차하는지 판정
   - 교차하면 순서 역전: $p_i \to p_j$ 방향으로 변경 ($p_{i+1}...p_j$ 구간 역순)
   - 개선 확인: $d_{ij} + d_{i+1,j+1} < d_{i,i+1} + d_{j,j+1}$ 이면 경로 단축
   - 반복: 더 이상 개선 없을 때까지 반복

5. **경로 길이 최소화:**
   - 최근접 이웃: 빠르지만 최적이 아님 (보통 최적의 120~130%)
   - 2-opt: 지역 최솟값(Local Minimum)에 수렴; 충분히 반복하면 꽤 좋은 해 도출

### 2. 주요 특징 및 장점
- **극도의 우아함:** 한 줄의 선이 이미지 전체를 정의하며, 선 자체가 예술이 됨.
- **계산 최적화와 미학의 교차:** NP-완전 문제의 실제 해를 예술로 표현하는 드문 사례.
- **점의 분포가 이미지 정보:** 밝기 분포만으로도 사진의 주요 특징 포착.
- **선의 연속성:** 단 하나의 끊기지 않는 선이 모든 점을 잇는 특별함.

### 3. 구현 시 고려 사항
- **초기 경로 선택:** 최근접 이웃의 시작점을 여러 개 시도하여 가장 좋은 경로 선택.
- **2-Opt 패스 수:** 너무 적으면 개선 미흡, 너무 많으면 계산 오버헤드. 보통 3~5회.
- **교차 판정:** 선분 교차를 빠르게 계산하기 위해 CCW(Counter-Clockwise) 방법 또는 벡터 외적 활용.
- **렌더링 순서:** 경로를 단계적으로 그려가는 애니메이션 효과로 시각적 흥미 증대.

### 4. 활용 분야
- **Generative Art:** 최적화 문제를 예술적으로 해석하는 혁신적 표현.
- **초상화 & 이미지 변환:** 사진을 한 줄 드로잉으로 변환하는 독특한 스타일.
- **전시 & 인스톨레이션:** 수학적 미학을 현대 미술로 승화.
- **교육:** TSP, 그리디 알고리즘, 지역 탐색의 개념을 시각적으로 이해.
- **인터랙티브 도구:** 매개변수 조정으로 다양한 TSP Art 변형 생성.
    `,
    en: String.raw`
TSP Art distributes stipple points based on image brightness, then solves an approximation of the Traveling Salesman Problem to connect them all with a single continuous line. A nearest-neighbor heuristic quickly builds an initial tour, then 2-opt local search iteratively eliminates crossing segments to shorten the path. The result is a profound synthesis of algorithmic optimization and visual art: a single line that captures the entire image, each stroke carrying both mathematical precision and aesthetic grace.
    `,
  },
  sketch,
  params: [
    { key: 'numPoints', label: '스티플 점 개수', min: 50, max: 500, step: 25, default: 200, restart: true },
    { key: 'noiseLowScale', label: '저주파 노이즈 스케일', min: 0.001, max: 0.01, step: 0.001, default: 0.004, restart: true },
    { key: 'noiseHighScale', label: '고주파 노이즈 스케일', min: 0.005, max: 0.03, step: 0.001, default: 0.012, restart: true },
    { key: 'noiseLowWeight', label: '저주파 가중치', min: 0, max: 1, step: 0.05, default: 0.65 },
    { key: 'noiseHighWeight', label: '고주파 가중치', min: 0, max: 1, step: 0.05, default: 0.35 },
    { key: 'twoOptPasses', label: '경로 최적화 패스', min: 1, max: 5, step: 1, default: 2, restart: true },
    { key: 'lineAlpha', label: '선 투명도', min: 50, max: 255, step: 10, default: 190 },
    { key: 'dotSize', label: '점 크기', min: 1, max: 8, step: 0.5, default: 3, unit: 'px' },
    { key: 'lineWeight', label: '선 두께', min: 0.5, max: 3, step: 0.1, default: 1.0, unit: 'px' },
    { key: 'renderSpeed', label: '렌더링 속도', min: 30, max: 300, step: 10, default: 120 },
  ],
  related: ['Poisson Disk Sampling', 'Space Colonization', 'Differential Growth'],
}