// src/algorithms/agent-system/index.js
import sketch from './sketch';

export default {
  longDescription: {
    ko: String.raw`
**Agent System** (또는 **Boids Model**)은 독립적인 개별 에이전트들이 국소적(Local) 규칙만을 따르면서도 전역적(Global) 차원의 조화로운 군집 행동을 자발적으로 창발시키는 알고리즘입니다. 새 떼, 물고기 군집, 박테리아 떼몰이와 같은 자연계의 현상을 수학적으로 모델링하며, **분리(Separation)**, **정렬(Alignment)**, **응집(Cohesion)** 세 가지 단순한 지역 규칙이 상호작용하여 고도의 복잡성을 띤 집단 패턴을 형성합니다.

### 1. 핵심 수학적 원리
각 에이전트 $a_i$는 시간 $t$에서 다음의 상태 변수를 갖습니다: **위치 $\mathbf{p}_i(t)$**, **속도 $\mathbf{v}_i(t)$**, **가속도 $\mathbf{a}_i(t)$**.

1. **분리(Separation):** 인식 반경 $r$ 내의 근처 에이전트들과의 충돌을 방지합니다.
   - 근처 에이전트 $a_j$로부터의 벡터 $\mathbf{d}_{ij} = \mathbf{p}_i - \mathbf{p}_j$를 계산하고, 이를 합산한 후 에이전트 자신의 속도에 더합니다.
   - 분리 가중치 $w_{sep}$을 적용하여 영향도를 조절합니다.

2. **정렬(Alignment):** 근처 에이전트들의 평균 속도 방향으로 자신의 속도를 조정합니다.
   - 인식 범위 내 에이전트들의 속도의 평균값 $\overline{\mathbf{v}}_{neighbors}$를 계산합니다.
   - 정렬 가중치 $w_{align}$을 곱하여 현재 속도에 가산합니다: $\mathbf{a}_i \mathrel{+}= w_{align}(\overline{\mathbf{v}}_{neighbors} - \mathbf{v}_i)$

3. **응집(Cohesion):** 근처 에이전트들의 무게중심을 향해 이동하려 합니다.
   - 인식 범위 내 에이전트들의 위치의 평균 $\overline{\mathbf{p}}_{neighbors}$를 구합니다.
   - 현재 위치에서 이 중심으로의 방향 벡터 $(\overline{\mathbf{p}}_{neighbors} - \mathbf{p}_i)$에 응집 가중치 $w_{coh}$를 곱해 가속도에 더합니다.

4. **속도 및 위치 갱신:**
   - $\mathbf{v}_i(t+\Delta t) = \text{clamp}(\mathbf{v}_i(t) + \mathbf{a}_i(t) \cdot \Delta t, v_{max})$ (최대 속도 제약)
   - $\mathbf{p}_i(t+\Delta t) = \mathbf{p}_i(t) + \mathbf{v}_i(t+\Delta t) \cdot \Delta t$

### 2. 주요 특징 및 장점
- **창발성(Emergent Behavior):** 개별 에이전트의 규칙은 극도로 단순하지만, 이들의 상호작용으로부터 새떼의 동작, 물고기 학교 같은 복잡한 거시적 패턴이 자연스럽게 나타납니다. 이는 전역 규칙을 명시적으로 프로그래밍하지 않고도 대규모 구조가 형성되는 사례를 보여줍니다.
- **효율적인 계산:** 각 에이전트는 오직 자신의 국소 범위($r$) 내의 이웃하고만 통신하므로, 적절한 공간 분할 자료구조(Grid, Octree)를 사용하면 $O(n)$ 또는 $O(n \log n)$ 수준의 선형 확장성을 유지할 수 있습니다.
- **시각적 매력:** 자연에서 관찰되는 유기적이고 역동적인 움직임을 수학적으로 재현하여 시각적으로 매우 아름답고 설득력 있는 애니메이션을 생성합니다.
- **안정성과 수렴:** 세 규칙의 가중치를 적절히 조절하면 시스템이 안정적인 집단 구조를 유지하며, 외란(장애물, 부분 손실)에 대해 복원력을 보입니다.

### 3. 구현 시 고려 사항
- **인식 범위의 최적화:** 모든 에이전트 쌍을 비교하면 $O(n^2)$ 복잡도가 되므로, 2D/3D 공간을 격자(Grid) 또는 사분트리(Quadtree)로 분할하여 인식 반경 내의 이웃을 효율적으로 탐색해야 합니다.
- **경계 조건 처리:** 에이전트가 화면 경계를 넘어갈 때 **재진입(Wrap-around)**, **반사(Reflection)**, **벽 회피(Wall Avoidance)** 등 경계 전략을 명확히 정의해야 합니다.
- **수렴 및 발산 방지:** 가중치 $(w_{sep}, w_{align}, w_{coh})$의 비율이 부적절하면 에이전트들이 수렴하거나 산만해질 수 있으므로, 실험을 통해 안정적인 범위를 찾는 것이 중요합니다.
- **Velocity Damping:** 수치 오차 누적을 방지하기 위해 각 프레임 속도에 감쇠(Damping) 계수를 곱하는 방식도 유용합니다.

### 4. 활용 분야
- **Generative Art & Animation:** 자연적이고 유기적인 움직임을 가진 시각 작품 제작, 뮤직비디오나 인터랙티브 설치 미술.
- **게임 개발:** NPC의 군집 행동, 적 그룹의 전술적 움직임, 배경의 동적 요소(새떼, 물고기 떼) 구현.
- **로보틱스 & 멀티 에이전트 시스템:** 자율주행 로봇 군집의 제어, 드론 스웜의 협력 움직임, 분산 네트워크 알고리즘의 시각화.
- **생물물리학 시뮬레이션:** 생물 개체군의 이동 패턴 모델링, 세포 군집 행동 연구, 집단 의사결정의 물리적 메커니즘 이해.
- **도시 시뮬레이션 & 재난 대피:** 보행자 흐름, 대피 경로 최적화, 군중 심리 모델링.
    `,
    en: 'Agent System is an algorithm where independent agents follow simple rules (separation, alignment, cohesion) to interact and exhibit emergent flocking behavior. Each agent perceives nearby agents, avoids collisions, aligns direction, and moves toward the center of the group. These simple rules combine to produce complex collective patterns (e.g., flocks, schools of fish), serving as a classic example of emergent behavior.',
  },
  sketch,
    params: [
    { key: 'count', label: '에이전트 수', min: 20, max: 500, step: 10, default: 200, restart: true },
    { key: 'perceptionRadius', label: '인식 반경', min: 10, max: 150, step: 1, default: 50, unit: 'px' },
    { key: 'maxSpeed', label: '최대 속도', min: 0.5, max: 6, step: 0.1, default: 2 },
    { key: 'separationWeight', label: '분리 가중치', min: 0, max: 4, step: 0.1, default: 1.5 },
    { key: 'alignmentWeight', label: '정렬 가중치', min: 0, max: 4, step: 0.1, default: 1.0 },
    { key: 'cohesionWeight', label: '응집 가중치', min: 0, max: 4, step: 0.1, default: 1.2 },
  ],
  related: ['Boids / Flocking', 'Particle System', 'Attractor System'],
};