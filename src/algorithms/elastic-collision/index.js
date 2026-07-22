import sketch from "./sketch";

export default {
  longDescription: {
    ko: String.raw`
**Elastic Collision(완전 탄성 충돌)**은 두 원이 접촉하는 순간을 거리 기반으로 감지하고, **운동량(Momentum)**과 **운동 에너지(Kinetic Energy)** 모두 보존되는 완전 탄성 충돌 공식으로 반발 속도를 계산하는 물리 기반 알고리즘입니다. 충돌 법선 방향(두 원의 중심을 잇는 직선)에서만 속도 성분이 교환되며, 접선 방향(법선에 수직)의 속도는 변하지 않습니다. 질량비에 따라 작은 공은 크게 튕기고 큰 공은 적게 움직이며, **관통 해제(Penetration Resolution)** 기법으로 원들의 겹침을 방지하여 당구공 같은 자연스러운 반발 움직임을 재현합니다.

### 1. 핵심 수학적 원리
두 원의 충돌을 다음과 같이 모델링합니다:

1. **충돌 감지:**
   - 중심 간 거리 $d = \|\mathbf{p}_1 - \mathbf{p}_2\|$
   - 반지름 합 $r = r_1 + r_2$
   - 충돌 조건: $d \leq r$

2. **충돌 법선(Collision Normal):**
   - $\mathbf{n} = \frac{\mathbf{p}_2 - \mathbf{p}_1}{d}$ (1번에서 2번으로의 단위 벡터)

3. **운동량 보존을 이용한 속도 교환:**
   - 충돌 전 각 원의 속도: $\mathbf{v}_1, \mathbf{v}_2$
   - 법선 방향 상대속도: $v_{rel} = (\mathbf{v}_1 - \mathbf{v}_2) \cdot \mathbf{n}$
   - 만약 $v_{rel} > 0$이면 원들이 분리되고 있어 충돌 처리 불필요

4. **탄성 충돌 공식(질량이 다른 경우):**
   - 임펄스(충격량): $j = -\frac{(1 + e) v_{rel}}{m_1^{-1} + m_2^{-1}}$ (여기서 $e$는 반발 계수, 완전 탄성은 $e=1$)
   - 속도 갱신:
     - $\mathbf{v}_1' = \mathbf{v}_1 + j \cdot m_1^{-1} \cdot \mathbf{n}$
     - $\mathbf{v}_2' = \mathbf{v}_2 - j \cdot m_2^{-1} \cdot \mathbf{n}$

5. **관통 해제(Penetration Resolution):**
   - 겹침 깊이: $penetration = r - d$
   - 위치 보정: $\mathbf{p}_1 -= \mathbf{n} \cdot penetration \cdot 0.5$ 등으로 떼어냄

### 2. 주요 특징 및 장점
- **물리적 정확성:** 운동량과 에너지 보존이라는 자연의 기본 법칙을 구현하므로, 현실적인 동역학을 재현합니다.
- **질량의 영향:** 큰 공이 작은 공을 밀어낼 때, 큰 공은 거의 움직이지 않고 작은 공만 크게 튕겨나갑니다 (현실과 동일).
- **에너지 보존:** 완전 탄성 충돌이므로, 충돌 전후의 총 운동 에너지가 같습니다 (마찰이나 변형 없음).
- **계산 효율성:** 각 충돌 쌍에 대해 $O(1)$ 계산이므로, 많은 원들도 실시간 처리 가능합니다.

### 3. 구현 시 고려 사항
- **충돌 감지 최적화:** 모든 원 쌍의 거리를 매번 계산하면 $O(n^2)$이므로, 공간 분할(Grid, Quadtree)을 사용하여 인접 원들만 검사합니다.
- **반발 계수(Coefficient of Restitution):** $e=1$이면 완전 탄성, $e<1$이면 일부 에너지 손실(비탄성), $e=0$이면 완전 비탄성 충돌입니다.
- **수치 안정성:** 관통을 완전히 제거하지 못하면 시간이 지날수록 에러가 누적되므로, 각 프레임마다 관통을 체크하고 즉시 해제합니다.
- **경계와의 충돌:** 벽(경계)과의 충돌도 유사하게 처리하되, 벽의 질량은 무한대로 간주합니다.

### 4. 활용 분야
- **물리 기반 게임:** 당구, 핑퐁, 야구 등 구체적인 충돌이 중요한 게임의 핵심 메커니즘.
- **입자 시뮬레이션:** 기체, 액체, 입자 집단의 상호작용 모델링 (분자 동역학).
- **로봇공학 & 시뮬레이션:** 로봇이 물체와 상호작용할 때의 정확한 역학 계산.
- **제너레이티브 아트:** 여러 공의 충돌 궤적으로부터 창발하는 추상적 패턴과 리듬.
- **교육 & 과학 시뮬레이션:** 충돌의 물리학, 에너지 보존, 운동량 보존을 시각적으로 이해하는 도구.
    `,
    en: "Elastic Collision detects contact between circles using distance checks and computes rebound velocities using the perfectly elastic collision formula that conserves both momentum and kinetic energy. Only the velocity component along the collision normal is exchanged, so lighter balls bounce off sharply while heavier ones move less. Penetration resolution prevents circles from overlapping, producing smooth billiard-ball-like motion.",
  },
  sketch,
  params: [
    { key: 'numBalls', label: '공 개수', min: 5, max: 50, step: 1, default: 18, restart: true },
    { key: 'ballRadiusMin', label: '공 최소 반지름', min: 0.01, max: 0.08, step: 0.005, default: 0.025, unit: '배수', restart: true },
    { key: 'ballRadiusMax', label: '공 최대 반지름', min: 0.03, max: 0.15, step: 0.005, default: 0.05, unit: '배수', restart: true },
    { key: 'ballSpeedMin', label: '공 최소 속도', min: 0.5, max: 3, step: 0.25, default: 1.5, unit: 'px/f', restart: true },
    { key: 'ballSpeedMax', label: '공 최대 속도', min: 1, max: 6, step: 0.25, default: 3.5, unit: 'px/f', restart: true },
    { key: 'ballHueShiftRange', label: '공 색상 변형 범위', min: 5, max: 50, step: 5, default: 20, restart: true },
    { key: 'flashDecay', label: '플래시 감쇠율', min: 0.75, max: 0.99, step: 0.02, default: 0.9 },
    { key: 'collisionEffectLife', label: '충돌 효과 감쇠율', min: 0.02, max: 0.2, step: 0.02, default: 0.08 },
    { key: 'collisionRingMaxRadius', label: '충돌 링 최대 반지름', min: 15, max: 60, step: 5, default: 30, unit: 'px' },
    { key: 'collisionRingStrokeWeight', label: '충돌 링 선 굵기', min: 0.5, max: 3, step: 0.25, default: 1.5, unit: 'px' },
  ],
  related: ["N-Body Gravity", "Spring & Constraint", "Boids / Flocking"],
};
