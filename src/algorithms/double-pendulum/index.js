import sketch from "./sketch";

export default {
  longDescription: {
    ko: String.raw`
**Double Pendulum**(이중 진자)은 두 개의 강체 진자가 관절로 연결된 시스템으로, **라그랑주 역학**(Lagrangian Mechanics)으로부터 유도된 **비선형 연립 미분방정식**으로 기술되는 **면정론적 카오스**(Deterministic Chaos)의 가장 유명한 예시입니다. 초기 조건에 극미세한 차이(예: 각도 0.001 라디안)가 있다면 시간이 경과함에 따라 기하급수적으로 증폭되어 완전히 다른 궤적으로 발산하며, 이러한 현상을 **나비효과**(Butterfly Effect)라 부르며 혼돈 이론의 핵심을 보여줍니다. 끝점의 궤적은 절대로 반복되지 않는 극도로 복잡한 패턴을 그립니다.

### 1. 핵심 수학적 원리
두 진자의 상태는 두 각도 $\theta_1, \theta_2$와 그들의 각속도 $\dot{\theta}_1, \dot{\theta}_2$로 표현됩니다:

1. **라그랑주 함수(Lagrangian):**
   - 운동 에너지: $T = \frac{1}{2}(m_1 + m_2)l_1^2\dot{\theta}_1^2 + \frac{1}{2}m_2 l_2^2\dot{\theta}_2^2 + m_2 l_1 l_2 \dot{\theta}_1\dot{\theta}_2\cos(\theta_1 - \theta_2)$
   - 위치 에너지: $V = -(m_1 + m_2)g l_1\cos(\theta_1) - m_2 g l_2\cos(\theta_2)$
   - 라그랑주 함수: $L = T - V$

2. **오일러-라그랑주 방정식:**
   - $\frac{d}{dt}\frac{\partial L}{\partial \dot{\theta}_i} - \frac{\partial L}{\partial \theta_i} = 0$ (각 $i = 1, 2$)
   - 결과는 다음과 같은 비선형 연립 미분방정식:
     - $\ddot{\theta}_1 = \frac{-(g(2m_1 + m_2)\sin\theta_1 + m_2 g\sin(\theta_1-2\theta_2) + 2\sin(\theta_1-\theta_2)m_2(\dot{\theta}_2^2 l_2 + \dot{\theta}_1^2 l_1\cos(\theta_1-\theta_2)))}{l_1(2m_1 + m_2 - m_2\cos(2(\theta_1-\theta_2)))}$
     - $\ddot{\theta}_2$ 역시 비슷한 복잡한 형태

3. **수치 적분:** 초고차 비선형 미분방정식이므로 해석적 해가 없고, **Runge-Kutta 방법** 등의 수치 적분으로 근사합니다.

4. **초기 조건의 민감성:** $|\Delta\theta_0| < \epsilon$인 두 초기 조건이 시간 $t$ 후에 지수적으로 분리:
   - $|\Delta\theta(t)| \approx |\Delta\theta_0| e^{\lambda t}$ (여기서 $\lambda$는 Lyapunov 지수)

### 2. 주요 특징 및 장점
- **결정론적이면서도 비예측적:** 완전히 명확한 규칙으로 기술되지만, 초기값 민감성으로 인해 장기 예측 불가능 - 혼돈의 정의를 완벽히 보여줍니다.
- **나비효과의 시각화:** 두 개의 거의 동일한 초기 조건에서 출발하는 궤적이 어떻게 급격히 분기하는지를 시각적으로 명확히 드러냅니다.
- **스트레인지 어트랙터(Strange Attractor):** 궤적이 혼돈적이지만 특정 영역(프랙탈 형태)으로 제한되어, 무한 복잡성의 구조적 패턴을 보여줍니다.
- **물리적 정확성:** 실제 역학 법칙으로부터 엄밀히 유도되므로, 물리 교육의 완벽한 예시입니다.

### 3. 구현 시 고려 사항
- **수치 적분 방식:** 단순한 오일러 방법은 에너지 보존 오차가 크므로, **심플렉틱 방법(Symplectic Integrator)** 또는 **Runge-Kutta 4차** 사용이 권장됩니다.
- **카오스 계수 조정:** 여러 진자를 동시에 시뮬레이션할 때 각 진자의 초기 각도에 미세한 오차를 추가하여 분기를 시각화합니다.
- **시간 스케일:** 시간 간격 $\Delta t$가 너무 크면 수치 오차가 누적되고, 너무 작으면 계산이 느려집니다. 적절한 값 선택이 중요합니다.
- **궤적 렌더링:** 여러 진자의 궤적을 색상으로 구분하여 분기 과정을 시각적으로 추적합니다.

### 4. 활용 분야
- **혼돈 이론 교육:** 결정론적 카오스, Lyapunov 지수, 나비효과 등 현대 동역학 이론의 대표 사례.
- **예측 불가능성 연구:** 기상 예측, 생태계 모델링 등 자연계의 장기 예측 한계를 이해하는 도구.
- **Generative Art & 애니메이션:** 두 궤적의 분기를 시각화하는 아름다운 수학 예술, 시간에 따른 혼돈의 진화.
- **물리 시뮬레이션:** 게임, 영화의 현실적 물리 기반 애니메이션 참고 모델.
- **복잡계 과학:** 결정론적 시스템에서 창발하는 혼돈 행동의 기본 메커니즘 이해.
    `,
    en: "Double Pendulum is a system of two connected pendulums described by non-linear coupled differential equations derived from Lagrangian mechanics. Tiny differences in initial angles (around 0.001 rad) amplify exponentially over time, diverging into completely different trajectories — a classic example of deterministic chaos. The trajectory of the endpoint traces a complex, never-repeating pattern that beautifully illustrates the butterfly effect.",
  },
  sketch,
  params: [
    { key: 'gravity', label: '중력', min: 1, max: 6, step: 0.5, default: 3.0 },
    { key: 'length1', label: '첫 번째 암 길이', min: 0.1, max: 0.35, step: 0.02, default: 0.18, unit: '배수', restart: true },
    { key: 'length2', label: '두 번째 암 길이', min: 0.1, max: 0.4, step: 0.02, default: 0.28, unit: '배수', restart: true },
    { key: 'numPendulums', label: '진자 개수', min: 1, max: 8, step: 1, default: 3, restart: true },
    { key: 'baseChaos', label: '카오스 계수', min: 0, max: 0.01, step: 0.001, default: 0.001, restart: true },
    { key: 'timeStep', label: '시간 간격', min: 0.05, max: 0.3, step: 0.02, default: 0.15 },
    { key: 'trailLength', label: '궤적 길이', min: 100, max: 800, step: 50, default: 400, restart: true },
    { key: 'pivotYRatio', label: '피벗 Y 위치', min: 0.2, max: 0.5, step: 0.05, default: 0.35 },
  ],
  related: ["N-Body Gravity", "Spring & Constraint", "Attractor System"],
};
