import sketch from "./sketch";

export default {
  longDescription: {
    en: String.raw`
Space Colonization simulates the growth patterns of branching networks—tree limbs, leaf veins, blood vessels, neurons, root systems. The algorithm distributes attraction points throughout space representing resources or leaves. Starting from a root node, iteratively grow branch segments toward the nearest unclaimed attraction point. Once a segment reaches an attractor, that attractor is "consumed" and removed. The result: a naturally optimized dendritic network that branches to reach all attractors, limited only by physical constraints. This matches both the mathematical optimality of minimal spanning trees and the organic aesthetics of biological growth.
    `,
    ko: String.raw`
**Space Colonization(공간 개척)**은 **나뭇가지의 분기 구조, 잎맥의 망상 조직, 혈관 계통, 신경 네트워크, 뿌리 시스템** 등 **생물학적 수지상 구조(Dendritic Network)**의 생장 패턴을 모사하는 **탐욕 알고리즘(Greedy Algorithm)**입니다. 성장 공간에 **자원 또는 잎을 상징하는 유인점(Attraction Point)**들을 무작위로 분포시키고, **시작 노드(Root)**에서 시작하여 반복적으로 **가장 가까운 미획득 유인점을 향해 가지 선분**을 뻗어냅니다. 가지가 유인점에 도달하면 그 유인점은 **소비(Consumed)**되어 제거되며, 이 과정을 반복하면 **한정된 공간 내에서 스스로 최적화되는 완전한 연결 네트워크**가 형성됩니다. 수학적으로 **최소 신장 트리(Minimum Spanning Tree)의 최적성**과 **생물학적 성장의 유기적 미학**을 동시에 달성합니다.

### 1. 핵심 수학적 원리
1. **알고리즘 단계:**
   - 초기화: 루트 노드 $r$, 유인점 집합 $A = \{a_1, a_2, ..., a_n\}$
   - 반복:
     1. 모든 유인점에 대해 가장 가까운 가지 노드 $v$를 찾기 (공간 색인 활용)
     2. 각 가지 노드 $v$에 대해, 자신으로 향하는 모든 유인점의 **방향 벡터 평균** 계산
     3. 이 평균 방향으로 단위 길이 $\Delta l$만큼 뻗기: $v_{\text{new}} = v + \Delta l \cdot \frac{\text{avg\_direction}}{|\text{avg\_direction}|}$
     4. 새 노드를 가지에 추가
     5. 반경 $r_{\text{kill}}$ 이내의 모든 유인점 제거
   - 종료: 모든 유인점이 제거될 때까지 반복

2. **방향 벡터 집계:**
   - 노드 $v$ 근처의 유인점들: $A_v = \{a : \|a - v\| < r_{\text{sense}}\}$
   - 방향 평균: $\mathbf{d}_v = \sum_{a \in A_v} \frac{a - v}{\|a - v\|}$ (정규화 필수)

3. **거리 탐색 최적화:**
   - **K-D 트리** 또는 **공간 해시(Spatial Hash)**: $O(\log n)$ 이웃 탐색
   - 나이브: $O(n \times m)$ (n = 가지 노드, m = 유인점)

4. **제약 조건:**
   - 감지 반경: $r_{\text{sense}}$ (유인점 탐지 거리)
   - 소비 반경: $r_{\text{kill}}$ (유인점 제거 거리, 보통 $r_{\text{sense}}$보다 작음)
   - 성장 속도: $\Delta l$ (매 스텝 증가 길이)

### 2. 주요 특징 및 장점
- **극도의 자연성:** 식물 성장의 단순한 규칙만으로 복잡한 분기 구조 형성.
- **자원 기반 최적화:** 유인점 분포에 따라 가지가 자동으로 최적 경로 선택.
- **다양한 형태:** 유인점 분포, 반경, 성장 속도를 조절하여 다양한 식물 모양 생성.
- **비용 효율:** 거리 탐색 최적화로 수백만 유인점도 처리 가능.

### 3. 구현 시 고려 사항
- **감지 반경 vs 소비 반경:** 두 값의 비율이 분기 형태 결정 (차이 크면 촘촘, 작으면 성근).
- **유인점 분포:** 균일하면 균형 잡힌 나무, 편중되면 비대칭 구조.
- **루트 위치:** 루트가 편향되면 한쪽으로만 뻗음.
- **애니메이션:** 반복 과정을 프레임 단위로 시각화하여 성장 과정 표시.

### 4. 활용 분야
- **게임 개발:** 나무 모델 자동 생성, 식물 월드 생성, 미로 게임.
- **영화 & VFX:** 식물 애니메이션, 자연 조경 씬.
- **건축 시각화:** 자연-영감적(Bio-inspired) 건축 설계, 구조 최적화.
- **Generative Art:** 식물 미술, 음악 시각화, 신경망 시각화.
- **과학 교육:** 식물 생장 모델, 자원 경쟁 시뮬레이션.
    `,
  },
  sketch,
  params: [
    { key: 'maxLeaves', label: '잎 개수', min: 100, max: 1000, step: 50, default: 500, restart: true },
    { key: 'minDist', label: '먹이 섭취 반경', min: 5, max: 30, step: 1, default: 10, unit: 'px' },
    { key: 'maxDist', label: '먹이 인식 반경', min: 40, max: 150, step: 5, default: 80, unit: 'px' },
    { key: 'branchLength', label: '나뭇가지 마디 길이', min: 1, max: 8, step: 1, default: 3, unit: 'px', restart: true },
    { key: 'leafSize', label: '잎 크기', min: 1, max: 6, step: 0.5, default: 2, unit: 'px' },
    { key: 'leafSpreadRadius', label: '잎 분포 반경', min: 0.2, max: 0.5, step: 0.05, default: 0.38, unit: '배수', restart: true },
  ],
  related: ["L-System", "Differential Growth", "Reaction-Diffusion"],
};
