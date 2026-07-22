import sketch from "./sketch";

export default {
  longDescription: {
    ko: String.raw`
**Attractor System**은 중력과 유사한 인력을 가진 하나 이상의 **어트랙터**가 주변의 파티클들을 끌어당기며, 그 궤적이 시간에 따라 복잡한 패턴을 형성하는 물리 기반 동역학 알고리즘입니다. 천체 역학에서 출발하여 뉴턴의 만유인력 법칙을 이산 파티클 시스템으로 모델링하며, **정적 어트랙터**(Fixed Attractor) 또는 **동적 어트랙터**(Moving Attractor, 예: Lissajous 곡선)의 상호작용으로부터 수학적 우아함을 드러내는 시각 작품을 생성합니다.

### 1. 핵심 수학적 원리
각 파티클 $p_i$의 운동은 뉴턴의 제2법칙과 역제곱 법칙을 기반으로 합니다.

1. **역제곱 법칙(Inverse-Square Law):** 어트랙터 $A$가 파티클 $p_i$에 작용하는 인력은 거리 $d$의 제곱에 반비례합니다.
   - 힘의 크기: $F = \frac{G \cdot M}{d^2}$ (여기서 $G$는 인력 상수, $M$은 어트랙터 질량)
   - 방향 벡터: $\hat{\mathbf{d}} = \frac{\mathbf{p}_{attractor} - \mathbf{p}_i}{d}$
   - 합력 벡터: $\mathbf{F}_i = F \cdot \hat{\mathbf{d}}$

2. **거리 기반 필터링:** 실제 구현에서는 계산 효율성과 시각적 효과를 위해 최소 거리 $d_{min}$과 최대 거리 $d_{max}$를 정의합니다.
   - $d < d_{min}$인 파티클: 최소 거리로 클램프하여 극도의 가속을 방지
   - $d > d_{max}$인 파티클: 어트랙터의 영향 범위 밖으로 분류하여 계산에서 제외

3. **동적 어트랙터(Lissajous 곡선):** 어트랙터가 고정되지 않고 매개변수 곡선을 따라 이동합니다.
   - $\mathbf{A}(t) = (R_x \sin(\omega_x t), R_y \sin(\omega_y t))$
   - 여기서 $R_x, R_y$는 진폭, $\omega_x, \omega_y$는 각 속도

4. **속도 감쇠(Damping):** 에너지가 시간에 따라 줄어듦을 모델링하여 파티클이 무한히 가속되는 현상을 방지합니다.
   - $\mathbf{v}_{new} = \mathbf{v}_{old} \cdot \alpha + \mathbf{a} \cdot \Delta t$ (여기서 $\alpha$는 감쇠 계수, $0 < \alpha < 1$)

### 2. 주요 특징 및 장점
- **궤도 역학:** 파티클들이 어트랙터 주변에서 타원형, 포물선형, 쌍곡선형 궤도를 그리며, 마치 태양 주위를 도는 행성의 궤도와 같은 아름다움을 표현합니다.
- **다양한 시각 패턴:** 여러 어트랙터의 경합으로 인해 예측할 수 없는 궤적이 발생하며, 파라미터 미세 조정으로 매우 다양한 패턴을 도출할 수 있습니다.
- **현실감 있는 물리 표현:** 역제곱 법칙을 정확히 구현하므로 실제 중력계에서 일어날 법한 자연스러운 움직임을 보여줍니다.
- **풍부한 상호 작용:** 동적 어트랙터, 정적 장애물, 파티클 간 상호작용 등을 추가할 수 있어 확장성이 높습니다.

### 3. 구현 시 고려 사항
- **거리 계산 최적화:** $d$를 매번 제곱근으로 계산하는 대신, 거리의 제곱 $d^2$를 직접 비교하고 필요한 순간에만 제곱근을 구합니다 ($O(n)$ 최적화).
- **감쇠 계수의 선택:** 감쇠가 작으면 파티클이 튕겨나가듯 계속 궤도를 회전하고, 크면 빠르게 수렴하여 어트랙터 중심으로 모입니다. 표현하고자 하는 아트워크에 따라 세밀한 조절이 필요합니다.
- **다중 어트랙터 관리:** 여러 어트랙터가 있을 때 각각의 힘을 벡터 합으로 통합하며, 각 어트랙터의 강도를 독립적으로 제어할 수 있도록 구현합니다.
- **렌더링 성능 고려:** 파티클 수가 늘어날수록 거리 계산 횟수가 급증하므로, GPU 가속 또는 공간 분할 구조 (Grid) 도입을 고려합니다.

### 4. 활용 분야
- **Generative Art & 미디어 아트:** 대규모 파티클 아트, 인터랙티브 설치미술에서 마우스나 센서로 어트랙터를 제어하는 작품.
- **데이터 시각화:** 수치 데이터 포인트를 어트랙터 역할 하게 하여, 데이터 간 거리와 유사도를 시각적으로 표현 (예: t-SNE, Force-Directed Graph).
- **우주 시뮬레이션 & 교육:** 태양계의 행성 운동, 은하계 병합 등 천문학적 현상을 정확하게 모델링하고 시각화.
- **영상 & 영화 특수효과:** 별빛, 우주 먼지, 반짝이는 파티클 효과의 물리 기반 애니메이션.
- **게임 개발:** 중력 기반 퍼즐, 우주 게임의 행성 궤도 시스템, 동적 몬순 환경 생성.
    `,
    en: "Attractor System is an algorithm where fixed or moving attractors pull surrounding particles like gravity. Using inverse-square-law distance calculation implements realistic attraction, and interaction of multiple attractors forms complex orbital patterns.",
  },
  sketch,
  params: [
    { key: 'numParticles', label: '파티클 개수', min: 100, max: 1500, step: 50, default: 600, restart: true },
    { key: 'attractorStrength', label: '어트랙터 강도', min: 20, max: 300, step: 10, default: 100 },
    { key: 'damping', label: '속도 감쇠', min: 0.85, max: 0.99, step: 0.01, default: 0.96 },
    { key: 'timeSpeed', label: '시간 진행 속도', min: 0.005, max: 0.05, step: 0.005, default: 0.02 },
    { key: 'lissajousSpeedX', label: '리사주 X 속도', min: 0.2, max: 2.0, step: 0.1, default: 0.7 },
    { key: 'lissajousSpeedY', label: '리사주 Y 속도', min: 0.2, max: 2.0, step: 0.1, default: 1.1 },
    { key: 'lissajousRadiusX', label: '리사주 X 진폭', min: 0.1, max: 0.5, step: 0.05, default: 0.3, unit: '배수' },
    { key: 'lissajousRadiusY', label: '리사주 Y 진폭', min: 0.1, max: 0.5, step: 0.05, default: 0.3, unit: '배수' },
    { key: 'minDistance', label: '최소 거리', min: 5, max: 50, step: 5, default: 10, unit: 'px' },
    { key: 'maxDistance', label: '최대 거리', min: 200, max: 800, step: 50, default: 500, unit: 'px' },
    { key: 'particleLineWeight', label: '파티클 크기', min: 0.5, max: 4.0, step: 0.25, default: 1.5, unit: 'px' },
    { key: 'attractorSize', label: '어트랙터 크기', min: 8, max: 60, step: 4, default: 20, unit: 'px' },
  ],
  related: ["Particle System", "Boids / Flocking", "Differential Growth"],
};
