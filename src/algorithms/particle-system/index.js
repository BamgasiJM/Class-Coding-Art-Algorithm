import sketch from "./sketch";

export default {
  longDescription: {
    ko: String.raw`
**Particle System**(파티클 시스템)은 다수의 **개별 입자(Particle)** 를 **방출(Emission) → 이동(Movement) → 소멸(Lifespan Decay)** 의 생명주기로 관리하는 동역학 시뮬레이션의 기본 알고리즘입니다. 각 파티클은 **위치, 속도, 가속도, 수명** 등의 상태를 가지며, 각 프레임마다 새로운 파티클을 방출하고 기존 파티클을 갱신하며 수명이 다한 파티클을 제거합니다. 중력, 감속, 방향성 등의 물리 효과를 적용하면 폭발의 불꽃, 연기의 확산, 물의 분사, 불의 타오름 등 극도로 동적이고 자연스러운 시각화를 생성할 수 있습니다.

### 1. 핵심 수학적 원리
1. **파티클의 상태 벡터:**
   - 각 파티클 $p_i$: 위치 $\mathbf{r}_i$, 속도 $\mathbf{v}_i$, 나이 $\text{age}_i$, 최대 수명 $\text{lifetime}_i$

2. **방출(Emission):**
   - 매 프레임 $\Delta n$ 개의 새 파티클 생성 (또는 이벤트 기반)
   - 초기 위치: 방출원 위치 $\mathbf{r}_{emitter}$ (또는 작은 범위 내 무작위)
   - 초기 속도: 방출 방향 $\hat{\mathbf{d}}$와 속도 크기 $v_0$ 이용:
     - $\mathbf{v}_{init} = v_0 \hat{\mathbf{d}}$ (직선) 또는 각도 무작위 분포

3. **물리 효과:**
   - 중력: $\mathbf{a}_{gravity} = \mathbf{g} = (0, -9.8)$ (또는 사용자 설정)
   - 감속(공기 저항): $\mathbf{a}_{drag} = -c_d \mathbf{v}$ (여기서 $c_d$는 감속 계수)
   - 풍장: $\mathbf{a}_{wind} = \mathbf{w}(t)$ (시간 또는 위치 기반)
   - 총 가속도: $\mathbf{a} = \mathbf{a}_{gravity} + \mathbf{a}_{drag} + \mathbf{a}_{wind}$

4. **입자 갱신(Particle Update):**
   - 매 프레임마다:
     - $\mathbf{v}_i(t+\Delta t) = \mathbf{v}_i(t) + \mathbf{a}_i \Delta t$
     - $\mathbf{r}_i(t+\Delta t) = \mathbf{r}_i(t) + \mathbf{v}_i(t+\Delta t) \Delta t$
     - $\text{age}_i += \Delta t$
     - $\text{life\_fraction} = \text{age}_i / \text{lifetime}_i$

5. **수명 감소(Life Decay):**
   - 알파값(투명도): $\alpha = 255 \times (1 - \text{life\_fraction})^2$ (제곱으로 빠른 페이드)
   - 크기: $\text{size} = \text{size}_{init} \times (1 - \text{life\_fraction})$ 또는 다른 감소 함수
   - $\text{age}_i \geq \text{lifetime}_i$이면 파티클 제거 (pool에서 재사용 또는 삭제)

### 2. 주요 특징 및 장점
- **극도의 유연성:** 속도, 중력, 감속, 색상 변화 등 거의 모든 매개변수를 조정하여 다양한 효과 생성.
- **계산 효율성:** 각 파티클이 독립적이므로 병렬화 용이하고, 프레임 기반 갱신으로 실시간 성능 달성.
- **시각적 설득력:** 단순한 규칙으로부터 자연스럽고 물리적으로 정확해 보이는 효과 생성.
- **창발적 복잡성:** 수천 개의 파티클이 상호작용하면서 단순 규칙만으로 복잡한 현상(연기, 불, 파도) 모사.

### 3. 구현 시 고려 사항
- **메모리 효율:** 죽은 파티클을 즉시 삭제하지 말고 **객체 풀(Object Pool)** 에 저장하여 재사용하면 메모리 할당 오버헤드 감소.
- **방출 속도 조정:** emitCount를 동적으로 조정하여 이펙트의 강도 제어 (예: 폭발은 많이, 연기는 적게).
- **초기 속도 분포:** 속도를 정확히 같게하면 단순하고, 범위 내 무작위로 하면 유기적임.
- **색상 변화:** 파티클의 나이에 따라 색상 그래디언트 적용하여, 식는 불의 색상 변화 (흰색 → 주황색 → 검은색) 표현.

### 4. 활용 분야
- **VFX & 게임 특수효과:** 폭발, 연기, 불, 스파크, 물의 분사 등 모든 동적 이펙트의 기초.
- **영화 & 애니메이션:** 시네마틱 이펙트 (구름, 안개, 먼지, 마법 효과).
- **Generative Art & 음악 시각화:** 파티클의 궤적으로부터 추상 예술 생성, 음악의 박자에 동기화.
- **데이터 시각화:** 입자군으로 대규모 데이터셋 시각화 (각 입자가 데이터 포인트).
- **교육 시뮬레이션:** 물리 현상(확산, 중력, 공기 저항) 학습 도구.
    `,
    en: "Particle System is a fundamental algorithm for emitting, moving, and disappearing multiple particles. Each particle has velocity, lifespan, and physics effects (gravity, drag), and combining them creates dynamic visualizations like explosions, flows, and dissipation.",
  },
  sketch,
  params: [
    { key: 'emitCount', label: '방출 파티클 수', min: 1, max: 20, step: 1, default: 5 },
    { key: 'emitterY', label: '방출 위치 Y', min: 0.3, max: 0.95, step: 0.05, default: 0.8, unit: '배수' },
    { key: 'velocityXMin', label: '수평 속도 최소', min: -10, max: 0, step: 0.5, default: -3, unit: 'px/f' },
    { key: 'velocityXMax', label: '수평 속도 최대', min: 0, max: 10, step: 0.5, default: 3, unit: 'px/f' },
    { key: 'velocityYMin', label: '수직 속도 최소', min: -15, max: -1, step: 0.5, default: -6, unit: 'px/f' },
    { key: 'velocityYMax', label: '수직 속도 최대', min: -5, max: 1, step: 0.5, default: -1, unit: 'px/f' },
    { key: 'particleSizeMin', label: '파티클 최소 크기', min: 0.5, max: 6, step: 0.5, default: 2, unit: 'px' },
    { key: 'particleSizeMax', label: '파티클 최대 크기', min: 4, max: 20, step: 1, default: 8, unit: 'px' },
    { key: 'particleLife', label: '파티클 수명', min: 100, max: 600, step: 50, default: 300, restart: true },
    { key: 'lifeDecay', label: '수명 감소율', min: 1, max: 10, step: 0.5, default: 4 },
    { key: 'gravity', label: '중력', min: 0, max: 0.2, step: 0.01, default: 0.05 },
    { key: 'trailAlpha', label: '잔상 길이', min: 5, max: 100, step: 5, default: 40 },
  ],
  related: ["Flow Field", "Spring & Constraint", "Attractor System"],
};
