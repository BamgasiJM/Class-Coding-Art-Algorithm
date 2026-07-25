import sketch from "./sketch";

export default {
  longDescription: {
    ko: String.raw`
**Spring & Constraint**(탄성과 제약)는 **노드(Node)와 스프링(Spring)** 또는 **거리 제약(Distance Constraint)**으로 이루어진 **물리 기반 시뮬레이션(Physics-Based Simulation)**입니다. 각 스프링은 **훅의 법칙(Hooke's Law)** $\mathbf{F} = -k(|\mathbf{r}| - L_0)\frac{\mathbf{r}}{|\mathbf{r}|}$에 따라 정해진 휴지 길이(Rest Length) $L_0$를 유지하려 하고, **Verlet 적분(Verlet Integration)**을 이용하여 **중력**, **공기 저항(Damping)**, **제약 조건**을 함께 효율적으로 계산합니다. 결과적으로 **천이 흔들리고**, **그물이 변형되고**, **로프가 축 처지는** 등 **부드럽고 자연스러운 탄성 구조(Elastic Structure)**가 표현됩니다. 이는 게임, 영화, 시뮬레이션에서 **천, 로프, 머리카락, 깃발** 등을 효과적으로 표현하는 핵심 기법입니다.

### 1. 핵심 수학적 원리
1. **Verlet 적분:**
   - 위치: $\mathbf{x}(t + \Delta t) = 2\mathbf{x}(t) - \mathbf{x}(t - \Delta t) + \mathbf{a}(t)(\Delta t)^2$
   - 속도 명시적으로 저장하지 않음 (위치 차이에서 유도)
   - 장점: 속도 에러 누적 없음, 제약 만족 용이

2. **힘 계산:**
   - 중력: $\mathbf{F}_g = m\mathbf{g} = (0, -9.8m)$
   - 스프링 힘: $\mathbf{F}_s = -k(\ell - L_0)\frac{\mathbf{d}}{|\mathbf{d}|}$ (여기서 $\mathbf{d} = p_j - p_i$, $\ell = |\mathbf{d}|$)
   - 감속(공기 저항): $\mathbf{F}_d = -c(\mathbf{v})$ (여기서 $c$는 감속 계수)

3. **거리 제약(Distance Constraint):**
   - 두 노드 $p_i, p_j$ 사이의 거리를 $L_0$로 강제:
   - 제약 위반: $\Delta \ell = (|\mathbf{d}| - L_0) / 2$
   - 수정: $p_i \leftarrow p_i - \Delta \ell \cdot \mathbf{d}/|\mathbf{d}|$, $p_j \leftarrow p_j + \Delta \ell \cdot \mathbf{d}/|\mathbf{d}|$
   - 여러 반복으로 모든 제약 만족

4. **감속(Damping):**
   - 속도 감소: $\mathbf{v} \leftarrow \mathbf{v} \times (1 - c)$ (여기서 $c \in [0.01, 0.1]$)
   - 진동 억제, 안정성 향상

### 2. 주요 특징 및 장점
- **효율성:** Verlet 적분으로 속도 계산 불필요; 제약 전파로 명시적 힘 계산 회피.
- **안정성:** 거리 제약이 보증하는 불변(Invariant); 시간 스텝 크기 허용 범위 넓음.
- **자연성:** 물리 기반이면서도 계산 비용 낮아 실시간 성능 달성.
- **유연성:** 고정점(Pin), 외부 힘(Wind), 충돌 처리 추가 용이.

### 3. 구현 시 고려 사항
- **시간 스텝:** 작을수록 정확하지만 느림; 보통 $\Delta t = 0.016$ (60 FPS).
- **제약 반복 횟수:** 1~3회로 충분; 많을수록 정확하지만 느림.
- **수렴 기준:** 제약 위반 오차가 임계값 이하일 때 종료.
- **경계 조건:** 천 모서리 고정, 충돌 처리, 선택적 고정점.

### 4. 활용 분야
- **게임 개발:** 천, 머리카락, 깃발, 로프 시뮬레이션.
- **영화 & VFX:** 의류 애니메이션, 매크로 물리 정확도.
- **건축 시각화:** 포장(Fabric) 구조, 케이블 배치.
- **Generative Art:** 음악 시각화, 상호작용적 설치 미술.
- **교육:** 물리 시뮬레이션, 제약 충족 문제 학습.
    `,
    en: String.raw`
Spring & Constraint is a physics-based simulation of nodes connected by springs or distance constraints. Using Verlet integration, it efficiently computes gravity, air resistance, and constraint forces. Each spring maintains a fixed rest length via Hooke's Law; distance constraints are iteratively satisfied. The result: cloth that sways naturally, meshes that deform elastically, ropes that sag under gravity. This is a foundational technique in games and film for simulating fabric, hair, and flexible structures with minimal computational cost.
    `,
  },
  sketch,
  params: [
    { key: 'spacing', label: '격자 간격', min: 20, max: 100, step: 5, default: 50, unit: 'px', restart: true },
    { key: 'stiffness', label: '스프링 강도', min: 0.01, max: 0.15, step: 0.01, default: 0.04 },
    { key: 'gravity', label: '중력', min: 0, max: 0.3, step: 0.02, default: 0.1 },
    { key: 'damping', label: '속도 감쇠', min: 0.9, max: 0.99, step: 0.01, default: 0.98 },
    { key: 'mouseInfluenceRadius', label: '마우스 영향 반경', min: 20, max: 200, step: 10, default: 80, unit: 'px' },
    { key: 'mouseInfluenceStrength', label: '마우스 영향 강도', min: 0.1, max: 2.0, step: 0.1, default: 0.5 },
  ],
  related: ["Particle System", "Attractor System", "Differential Growth"],
};
