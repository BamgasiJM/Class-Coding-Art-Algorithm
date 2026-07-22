import sketch from './sketch'

export default {
  longDescription: {
    ko: String.raw`
**Wave Function Collapse(파동 함수 붕괴, WFC)**는 **양자 역학의 파동 함수 붕괴** 개념을 절차적 생성에 영감을 받아, **제약 충족 문제(Constraint Satisfaction Problem, CSP)**로 변환한 혁신적인 알고리즘입니다. 초기에 모든 격자 셀이 **슈퍼포지션(중첩 상태)**에 있다가, **엔트로피가 최소인 셀**부터 하나씩 **하나의 타일로 붕괴(Collapse)**시킵니다. 각 붕괴 후 **제약 전파(Constraint Propagation)**를 통해 이웃 셀의 불가능한 옵션을 제거하며, 이 과정을 반복하면 **타일 간 인접 규칙**을 완벽히 만족하면서도 **다양성이 높은 절차적 패턴**이 생성됩니다. 게임 맵, 픽셀 아트, 건축 구조 생성 등에서 획기적인 도구입니다.

### 1. 핵심 수학적 원리
1. **초기 상태(Superposition):**
   - 각 셀 $(i, j)$의 **가능한 타일 집합**: $S_{ij} = \{T_1, T_2, ..., T_K\}$ (모든 $K$개 타일)
   - 셀의 **엔트로피(Entropy)**: $H_{ij} = -\sum_{t \in S_{ij}} p_t \log p_t$ (또는 단순히 $|S_{ij}|$)

2. **붕괴(Collapse) 단계:**
   - 엔트로피가 최소인 셀 $(i^*, j^*)$ 선택
   - 셀의 확률 분포 $p_t$에 따라 하나의 타일 $t^*$ 샘플링
   - $S_{i^*j^*} \leftarrow \{t^*\}$ (셀 결정 완료)

3. **제약 전파(Constraint Propagation):**
   - 결정된 셀 $(i^*, j^*)$의 이웃 셀들을 큐에 추가
   - 각 이웃 셀 $(i', j')$에 대해:
     - $(i^*, j^*)$의 타일 $t^*$과 인접 가능한 타일 집합 $A(t^*)$ 계산
     - $S_{i'j'} \leftarrow S_{i'j'} \cap A(t^*)$ (불가능한 타일 제거)
     - 만약 $S_{i'j'}$가 변했으면, $(i', j')$의 이웃들을 큐에 추가
   - 큐가 빌 때까지 반복

4. **수렴 및 실패 처리:**
   - 모든 셀이 $|S_{ij}| = 1$이 되면 성공
   - 만약 어떤 셀의 $S_{ij} = \emptyset$ (불가능)이면 **백트래킹** 또는 **재시작**

5. **인접 규칙 정의:**
   - 각 타일에 대해 "상단에 올 수 있는 타일", "우측에 올 수 있는 타일" 등을 미리 정의
   - 이는 예시 이미지에서 학습하거나, 수동으로 정의

### 2. 주요 특징 및 장점
- **극도의 창의성:** 국소 제약만으로 전역적으로 일관성 있는 패턴 생성.
- **다양성:** 난수 샘플링이므로, 같은 규칙으로도 매번 다른 결과 생성.
- **제약 만족 보장:** 생성된 패턴은 항상 타일 인접 규칙을 완벽히 준수.
- **학습 가능성:** 예시 이미지에서 타일과 인접 규칙을 자동 추출하여 다양한 스타일 생성.

### 3. 구현 시 고려 사항
- **인접 규칙 학습:** 예시 이미지를 스캔하여 모든 이웃 타일 쌍 수집 ($O(W \times H)$).
- **엔트로피 선택:** 최소 엔트로피 세포 선택이 수렴 속도 영향; "noise" 추가로 다양성 향상.
- **확률 모델:** 각 타일이 예시에서 출현한 빈도에 따라 샘플링 확률 설정.
- **백트래킹:** 실패 시 이전 상태로 복원; 메모리 사용 늘어남.
- **성능 최적화:** 큐 기반 제약 전파로 $O(N)$ 시간; 나이브 전체 탐색은 $O(N^2)$.

### 4. 활용 분야
- **게임 개발:** 절차적 던전, 숲, 도시 맵 생성 (규칙 기반 일관성 보장).
- **픽셀 아트 생성:** 텍스처, 배경, 캐릭터 스프라이트의 다양한 변형 생성.
- **건축 시각화:** 건물 배치, 실내 설계, 도시 계획의 자동 생성.
- **Generative Art:** 추상 패턴, 보조개 구조, 음악 시각화의 절차적 생성.
- **교육:** 제약 만족 문제, 역 문제(Inverse Problem), 확률적 알고리즘의 실제 사례.
    `,
    en: String.raw`
Wave Function Collapse is a constraint satisfaction algorithm inspired by quantum mechanics. Initially, each grid cell exists in superposition — capable of holding any tile. The algorithm iteratively selects the cell with minimum entropy and collapses it to a single tile, then propagates constraints to eliminate incompatible options from neighbors. This process repeats until every cell is determined or a contradiction is reached. The result: procedurally generated patterns that perfectly respect local tile adjacency rules while exhibiting remarkable diversity, making it ideal for game maps, pixel art, and architectural design.
    `,
  },
  sketch,
  params: [
    { key: 'gridSize', label: '그리드 크기', min: 5, max: 40, step: 1, default: 20, restart: true },
    { key: 'restartDelayMs', label: '재시작 대기 시간', min: 500, max: 5000, step: 250, default: 2000, unit: 'ms' },
    { key: 'uncertaintyAlphaMax', label: '미결정 셀 최대 투명도', min: 50, max: 255, step: 10, default: 200 },
    { key: 'uncertaintyAlphaMin', label: '미결정 셀 최소 투명도', min: 5, max: 100, step: 5, default: 30 },
  ],
  related: ['Cellular Automata', 'Truchet Tiles', 'Wang Tiles'],
}