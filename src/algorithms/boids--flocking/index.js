import sketch from "./sketch";

export default {
  longDescription: {
    ko: String.raw`
**Boids / Flocking**은 컴퓨터 과학자 **Craig Reynolds**가 1986년 발표한 획기적인 알고리즘으로, **세 가지 국소 규칙(분리, 정렬, 응집)** 만을 조합하여 새떼, 물고기 학교와 같은 자연계의 집단 행동을 수학적으로 모델링합니다. 이 알고리즘은 **분산 제어(Distributed Control)**와 **창발 시스템(Emergent Systems)**의 가장 고전적이면서도 영향력 높은 사례로, 게임, 애니메이션, 로봇 공학, 사회과학 시뮬레이션 분야에서 광범위하게 활용되어 왔습니다.

### 1. 핵심 수학적 원리
각 보이드(Boid) $b_i$는 위치 $\mathbf{p}_i$, 속도 $\mathbf{v}_i$, 가속도 $\mathbf{a}_i$를 갖으며, 다음 세 가지 힘을 조합합니다:

1. **분리(Separation):** 근처 보이드와의 충돌 회피
   - 인식 반경 $r_{sep}$ 내의 각 이웃 보이드 $b_j$에 대해 벡터 $\mathbf{d}_{ij} = \mathbf{p}_i - \mathbf{p}_j$를 계산
   - 이들을 누적한 후 가중치 $w_{sep}$를 곱함: $\mathbf{F}_{sep} = w_{sep} \sum_{j} \mathbf{d}_{ij}$

2. **정렬(Alignment):** 근처 보이드들의 평균 속도로 자신의 속도 방향 조정
   - 인식 범위 내 이웃의 평균 속도 $\overline{\mathbf{v}}_{neighbors}$를 계산
   - $\mathbf{F}_{align} = w_{align} (\overline{\mathbf{v}}_{neighbors} - \mathbf{v}_i)$

3. **응집(Cohesion):** 근처 보이드들의 무게중심을 향해 이동
   - 인식 범위 내 이웃들의 평균 위치 $\overline{\mathbf{p}}_{neighbors}$를 구함
   - $\mathbf{F}_{cohesion} = w_{cohesion} (\overline{\mathbf{p}}_{neighbors} - \mathbf{p}_i)$

4. **속도 및 위치 갱신:**
   - 총 가속도: $\mathbf{a}_i = \mathbf{F}_{sep} + \mathbf{F}_{align} + \mathbf{F}_{cohesion}$
   - 속도 갱신: $\mathbf{v}_i(t+\Delta t) = \text{clamp}(\mathbf{v}_i(t) + \mathbf{a}_i \cdot \Delta t, v_{max})$
   - 위치 갱신: $\mathbf{p}_i(t+\Delta t) = \mathbf{p}_i(t) + \mathbf{v}_i(t+\Delta t) \cdot \Delta t$

### 2. 주요 특징 및 장점
- **극도의 단순성과 강력한 창발성:** 세 가지 규칙만으로도 자연에서 관찰되는 매우 복잡하고 정교한 집단 행동이 나타나며, 중앙 제어자 없이도 분산된 개체들의 상호작용으로 전역적 조화가 달성됩니다.
- **분산 시스템의 특성:** 각 보이드는 오직 자신의 인식 반경 내의 이웃하고만 통신하며, 전역 네트워크나 중앙 서버에 의존하지 않으므로 확장성과 복원력이 우수합니다.
- **계산 효율성:** 적절한 공간 분할 자료구조(Grid, KD-Tree)를 사용하면 $O(n \log n)$ 또는 $O(n)$ 복잡도로 실시간 렌더링이 가능합니다.
- **높은 시각적 신뢰도:** 실제 생물의 무리 행동과 매우 유사하여, 영화와 게임에서 자연스러운 NPC 행동이나 동물 무리 애니메이션을 생성합니다.

### 3. 구현 시 고려 사항
- **공간 분할 최적화:** 모든 보이드 쌍을 비교하면 $O(n^2)$이 되므로, 2D 그리드 또는 사분트리를 사용하여 인식 반경 내의 이웃만 빠르게 탐색합니다.
- **가중치 튜닝:** 세 가중치 $(w_{sep}, w_{align}, w_{cohesion})$의 비율이 결과에 결정적 영향을 미칩니다. 너무 강한 분리는 무리가 흩어지고, 약한 분리는 충돌을 초래합니다.
- **경계 처리:** 보이드가 화면 경계를 벗어날 때 **토로이드 래핑(Toroidal Wrapping)**, **탄성 반사(Elastic Reflection)**, **자석 같은 중력 복귀(Magnetic Pull Back)** 등의 방식을 명확히 정의합니다.
- **레이턴시와 감쇠:** 속도에 작은 감쇠 계수를 적용하면 에너지 진동을 줄이고 안정적인 무리 구조를 유지하는 데 도움이 됩니다.

### 4. 활용 분야
- **게임 및 영화:** NPC 무리 행동, 적 그룹의 전술적 움직임, 영화 특수효과의 새떼 또는 물고기 떼 애니메이션.
- **로봇 공학 & 멀티에이전트 시스템:** 자율주행 로봇 군집, 드론 스웜, 분산 네트워크 알고리즘의 시각화.
- **생태계 시뮬레이션:** 야생동물 개체군의 이동 경로 모델링, 포식자-피식자 동역학, 생물 무리 패턴 분석.
- **Generative Art & 인터랙티브 설치:** 뮤직비디오, 무용 공연과 결합한 시각 아트, 마우스나 센서로 조종하는 대규모 파티클 설치.
- **도시 계획 & 재난 대피:** 보행자 흐름 시뮬레이션, 경기장 내 군중 거동 분석, 대피 경로 최적화.
    `,
    en: "Boids / Flocking is Craig Reynolds' flocking algorithm that simulates realistic collective behavior with just three rules: cohesion, alignment, and separation. Since each individual only perceives local neighbors, it demonstrates distributed system characteristics.",
  },
  sketch,
  params: [
    { key: 'numBoids', label: '보이드 개수', min: 20, max: 500, step: 10, default: 150, restart: true },
    { key: 'separationDistance', label: '분리 거리', min: 5, max: 50, step: 2, default: 15, unit: 'px' },
    { key: 'separationStrength', label: '분리 강도', min: 0.1, max: 2.0, step: 0.1, default: 0.5 },
    { key: 'alignmentDistance', label: '정렬 거리', min: 10, max: 100, step: 5, default: 30, unit: 'px' },
    { key: 'alignmentStrength', label: '정렬 강도', min: 0.01, max: 0.2, step: 0.01, default: 0.05 },
    { key: 'cohesionDistance', label: '응집 거리', min: 10, max: 100, step: 5, default: 30, unit: 'px' },
    { key: 'cohesionStrength', label: '응집 강도', min: 0.001, max: 0.02, step: 0.001, default: 0.005 },
    { key: 'maxSpeed', label: '최대 속도', min: 1, max: 8, step: 0.5, default: 4, unit: 'px/f' },
    { key: 'trailAlpha', label: '궤적 길이', min: 5, max: 100, step: 5, default: 40 },
    { key: 'boidSize', label: '보이드 크기', min: 2, max: 15, step: 1, default: 6, unit: 'px' },
  ],
  related: ["Particle System", "Attractor System", "Space Colonization"],
};
