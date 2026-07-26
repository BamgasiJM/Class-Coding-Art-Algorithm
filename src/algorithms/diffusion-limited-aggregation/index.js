import sketch from "./sketch";

export default {
  longDescription: {
    en: "Diffusion-Limited Aggregation (DLA) is an algorithmic process where particles undergoing Brownian motion (random walk) cluster together to form beautiful, organic, dendritic structures. Driven by diffusion rather than direct attraction, wandering particles solidify the moment they collide with the pre-existing cluster. This simulation produces complex, self-similar branch-like clusters that accurately model physical phenomena like lightning paths, coral growth, and mineral crystallization.",
    
    ko: String.raw`
**Diffusion-Limited Aggregation**(DLA, 확산 제한 응집)은 **브라운 운동**(Brownian Motion)에 의해 임의로 이동하는 입자들이 서로 **비탄성 충돌**(Inelastic Collision)을 통해 응집되는 과정을 모델링하는 확률적 알고리즘입니다. 중력이나 인력이 아닌, **무작위 확산**만에 의존하여 입자들이 기존 클러스터에 붙어가므로, 번개의 경로, 산호 군체의 성장, 광물의 결정화, 박테리아 군집 등 자연에서 관찰되는 복잡한 **수지상(Dendritic)** 또는 **분지형(Branching)** 구조를 정밀하게 재현합니다. DLA로부터 생성되는 클러스터는 **자기닮음(Self-Similar)** 성질을 가지며 **프랙탈 차원**을 갖습니다.

### 1. 핵심 수학적 원리
확산 제한 응집 과정은 다음과 같이 정의됩니다:

1. **입자의 무작위 보행(Random Walk):**
   - 입자 위치 $\mathbf{p}(t+1) = \mathbf{p}(t) + \Delta \mathbf{r}$ (여기서 $\Delta \mathbf{r}$는 균등 무작위 방향/거리)
   - 각 프레임에서 보행 거리: $\|\Delta \mathbf{r}\| = \text{step\_size}$ (고정값)

2. **응집 조건:**
   - 입자가 기존 클러스터와의 거리가 임계값 $r_{stick}$ 이하가 되면, 즉시 고정
   - 고정된 입자는 클러스터의 일부가 되어 더 이상 움직이지 않음

3. **클러스터의 성장:**
   - 초기: 단일 "씨앗(Seed)" 입자
   - 각 프레임: 여러 새 입자를 원 경계에 생성, 무작위 보행 시뮬레이션
   - 응집 입자 수가 임계값 도달 시 시뮬레이션 종료

4. **프랙탈 특성:**
   - 자기닮음 성질: 클러스터의 부분 구조가 전체와 유사
   - 프랙탈 차원: $D_f \approx 1.66$ (3D에서) 또는 $D_f \approx 1.71$ (2D에서, rule에 따라 변동)

### 2. 주요 특징 및 장점
- **물리적 정확성:** 실제 확산 과정을 직접 모델링하므로, 번개, 결정, 산호 등의 형태가 자연 현상과 놀라울 정도로 유사합니다.
- **극도의 복잡성으로부터의 창발:** 단순한 충돌 규칙만으로 극도로 정교한 분지 구조가 형성되며, 각 실행마다 다른 고유한 클러스터가 생성됩니다(확률적 다양성).
- **프랙탈 구조:** 자기닮음 형태로 인해 어떤 스케일에서 관찰해도 비슷한 복잡도를 가지며, 미적으로 매우 매력적입니다.
- **계산 효율성(상대적):** 각 입자는 독립적으로 처리되므로 병렬화가 용이하고, 공간 분할 구조로 충돌 검사를 최적화할 수 있습니다.

### 3. 구현 시 고려 사항
- **입자 생성 위치:** 클러스터 중심으로부터 거리 $r_{launch}$ 떨어진 원 경계에서 균등하게 생성하여, 먼 거리의 비효율적 보행을 줄입니다.
- **충돌 검사 최적화:** 모든 고정 입자와의 거리를 매번 계산하면 $O(n)$이 되므로, 공간 그리드(Spatial Hash)를 사용하여 $O(1)$ 근처 검사.
- **보행 제한:** 입자가 무한정 방황하지 않도록 최대 보행 횟수(Max Walk Steps)를 설정하여, 초과 시 폐기합니다.
- **시각적 표현:** 응집된 입자의 나이(Age) 또는 클러스터 중심으로부터의 거리를 색상으로 인코딩하여, 성장 과정을 시각화합니다.

### 4. 활용 분야
- **자연 현상 모델링:** 번개의 가지 경로, 하천 삼각주, 산호 방산, 혈관 계통, 신경망 등의 구조적 특성 분석.
- **Generative Art & 애니메이션:** 자연-영감적 시각 예술, 성장 과정의 시간 경과 시각화, 영화/게임 특수효과.
- **재료과학 & 물리학:** 광물 결정화, 전기 침착(Electrodeposition), 콜로이드 응집의 물리 시뮬레이션.
- **네트워크 설계:** 유기적이고 효율적인 네트워크 구조(파이프라인, 신경계 등)의 자동 설계.
- **게임 환경 생성:** 나무, 산호초, 동굴 시스템 등의 자동 절차적 생성.
    `,
  },
  sketch,
  params: [
  {
    key: 'maxParticles',
    label: '최대 입자 수',
    min: 200,
    max: 3000,
    step: 100,
    default: 1500,
    restart: true,
  },
  {
    key: 'stickRadius',
    label: '응집 반경',
    min: 2,
    max: 12,
    step: 1,
    default: 6,
  },
  {
    key: 'walkStep',
    label: '보행 거리',
    min: 1,
    max: 15,
    step: 1,
    default: 5,
  },
  {
    key: 'walkersPerFrame',
    label: '입자 생성 속도',
    min: 1,
    max: 50,
    step: 1,
    default: 13,
  },
  {
    key: 'launchDistance',
    label: '생성 거리',
    min: 20,
    max: 100,
    step: 5,
    default: 45,
  },
  {
    key: 'maxWalkSteps',
    label: '최대 이동 횟수',
    min: 200,
    max: 4000,
    step: 100,
    default: 1500,
  },
],
  related: ["Space Colonization", "Boids / Flocking", "Circle Packing"],
};
