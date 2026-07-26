import sketch from './sketch'

export default {
  longDescription: {
    ko: String.raw`
**Strange Attractor**(이상한 끌개)는 동역학계(Dynamical System)에서 시간 진화 과정에 궤적이 수렴하는 불변 집합(Invariant Set)입니다. 특히 **De Jong Attractor**는 단순한 **2D 반복 맵을 수천 번 반복**하면서, 초기 조건과 무관하게 고정된 **"이상한" 형태**로 수렴하는 궤적을 생성합니다. 이 과정에서 세밀하고 자기유사적인 프랙탈 구조가 드러나며, 단순한 비선형 함수로부터 극도의 복잡성이 발현되는 **카오스 이론**의 핵심을 시각화합니다.

### 1. 핵심 수학적 원리
1. **De Jong Attractor의 반복 공식:**
   - 상태 벡터: $(x_n, y_n)$
   - 반복식:
     - $x_{n+1} = \sin(a \cdot y_n) - \cos(b \cdot x_n)$
     - $y_{n+1} = \sin(c \cdot x_n) - \cos(d \cdot y_n)$
   - 매개변수 $a, b, c, d$ (보통 $[-2, 2]$ 범위)

2. **궤적 축적:**
   - 초기점 $(x_0, y_0)$을 선택 (어디든 상관없음)
   - $n$번 반복: 수천~수백만 회 반복하여 궤적 점들을 수집
   - 처음 수십~수백 반복은 "과도 상태(Transient)"로서 버림
   - 이후의 점들이 끌개 위에 분포하여 시각화됨

3. **수렴 성질:**
   - 특정 매개변수 범위에서, 초기값에 관계없이 모든 궤적이 **같은 집합(Attractor)**으로 수렴
   - 이 수렴된 집합의 **Hausdorff 차원**은 정수가 아님 (프랙탈)
   - 예: De Jong attractor는 보통 차원 ≈ 1.5~1.8

4. **민감성과 카오스:**
   - 초기값 $(x_0, y_0)$와 $(x_0 + \epsilon, y_0)$ (아주 작은 $\epsilon$)의 궤적이 지수적으로 발산
   - **Lyapunov 지수** $\lambda > 0$: 초기 오차가 $e^{\lambda n}$로 증폭

### 2. 주요 특징 및 장점
- **극도의 단순성과 극도의 복잡성:** 4개 매개변수와 2개 식만으로 무한히 정교한 구조 생성.
- **결정론적 카오스:** 규칙은 확정적이지만, 초기 조건 민감성으로 인해 예측 불가.
- **프랙탈 구조:** 어느 스케일로 확대해도 비슷한 세부 구조가 드러나는 자기유사성.
- **매개변수 민감성:** 매개변수 $a, b, c, d$를 조금만 변경해도 완전히 다른 끌개 모양 생성.

### 3. 구현 시 고려 사항
- **과도 상태 버림:** 첫 수십~수백 반복을 렌더링하지 않아야 깔끔한 끌개 모양 획득.
- **점의 축적:** 수정이 충분해야 끌개의 세밀한 구조 드러남; 보통 초기점당 1000~10000회 반복.
- **색상 매핑:** 점의 방문 횟수, 궤적 나이, 또는 매개변수 값에 따라 색상 할당하여 구조 강조.
- **경계 설정:** 무한히 발산하는 매개변수 조합 있으므로, 점의 위치가 경계(예: $[-100, 100]$)를 벗어나면 궤적 종료.

### 4. 활용 분야
- **혼돈 이론 연구:** 카오스, Lyapunov 지수, 분기(Bifurcation) 현상의 구체적 사례.
- **Generative Art:** 끝없는 패턴 변화, 참신한 미적 경험 창출, 음악 시각화.
- **교육:** 동역학계, 프랙탈, 카오스 개념의 시각적 직관적 이해.
- **인터랙티브 탐험:** 매개변수를 조작하며 실시간으로 변하는 끌개 관찰.
- **이미지 생성:** 높은 해상도 끌개 이미지를 생성하여 포스터, 배경화면 활용.
    `,
    en: String.raw`
Strange Attractors visualize invariant sets that orbits converge to under repeated application of simple nonlinear maps. The De Jong Attractor is defined by a remarkably simple 2D formula combining sines and cosines. Despite the rule's simplicity, initial-condition sensitivity and nonlinearity produce infinitely intricate fractal-like structures. Accumulating thousands of iteration points from various starting positions reveals a single elegant "strange" shape — a quintessential example of chaos theory and how extreme complexity emerges from simple deterministic laws.
    `,
  },
  sketch,
  params: [
      { key: 'numSeeds', label: '초기점 개수', min: 100, max: 400, step: 25, default: 250, restart: true },
      { key: 'iterations', label: '반복 횟수', min: 100, max: 400, step: 25, default: 200, restart: true },
      { key: 'dejongA', label: 'De Jong A', min: -2, max: 2, step: 0.05, default: 1.641, restart: true },
      { key: 'dejongB', label: 'De Jong B', min: -2, max: 2, step: 0.05, default: 1.902, restart: true },
      { key: 'dejongC', label: 'De Jong C', min: -2, max: 2, step: 0.05, default: 0.316, restart: true },
      { key: 'dejongD', label: 'De Jong D', min: -2, max: 2, step: 0.05, default: 1.525, restart: true },
      { key: 'speed', label: '렌더링 속도', min: 5, max: 100, step: 5, default: 30 },
      { key: 'pointSize', label: '점 크기', min: 0.8, max: 5, step: 0.2, default: 2.2, unit: 'px' },
    ],
  related: ['Fractal Brownian Motion', 'Perlin / Simplex Noise', 'Differential Growth'],
}