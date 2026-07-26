import sketch from './sketch'

export default {
  longDescription: {
    ko: String.raw`
**Escape-Time Fractal**(탈출 시간 프랙탈)은 **복소평면**의 각 점 $c$에 대해 **만델브로트 집합**의 생성 함수 $z_{n+1} = z_n^2 + c$ (초기값 $z_0 = 0$)를 반복 적용하고, 절댓값이 **탈출 반경 $R = 2$를 초과**하는 데 걸리는 반복 횟수를 계산하는 **복소수 동역학** 알고리즘입니다. 탈출까지의 반복 횟수를 색상으로 매핑하면, **무한히 복잡한 자기유사 경계**(Self-Similar Boundary)를 갖는 만델브로트 집합의 극도로 정교한 구조가 드러나며, 이는 단순한 수식으로부터 놀라운 기하학적 패턴이 생겨나는 현상을 보여줍니다.

### 1. 핵심 수학적 원리
1. **복소수 반복(Complex Iteration):**
   - 초기값: $z_0 = 0 + 0i$
   - 반복식: $z_{n+1} = z_n^2 + c$ (여기서 $c = x + yi$는 평면의 점)
   - 복소수 제곱: $(a+bi)^2 = a^2 - b^2 + 2abi$

2. **발산 판정:**
   - 절댓값(Modulus): $|z_n| = \sqrt{(z_n^{\text{real}})^2 + (z_n^{\text{imag}})^2}$ 
   - $|z_n| > 2$이면 $n$이 증가함에 따라 무한히 커짐(발산)
   - 임계값 2는 수학적으로 증명된 값으로, 이보다 작으면 발산 보장

3. **만델브로트 집합의 정의:**
   - 점 $c$는 시퀀스가 유한하게 유계(Bounded)이면 집합에 포함
   - 점 $c$는 시퀀스가 무한히 커지면 집합 외부
   - 경계는 무한 복잡도의 자기유사 구조(Fractal)를 가짐

4. **색상 매핑:**
   - 발산 반복 횟수 $n$에 따라 색상 할당: $\text{color} = f(n)$
   - 매끄러운 색상 전환을 위해 비정수 반복 횟수 계산: $n + \frac{\log(2/|z_n|)}{\log 2}$

### 2. 주요 특징 및 장점
- **극도의 단순성과 극도의 복잡성:** 가장 단순한 이차 다항식 $z^2 + c$ 하나로부터 무한히 정교한 구조가 창발합니다.
- **자기유사성(Self-Similarity):** 어떤 스케일로 확대해도 비슷한 복잡한 패턴이 반복되며, 이는 프랙탈의 정의를 구체화합니다.
- **비예측적 경계:** 경계는 정확히 그릴 수 없으며, 항상 새로운 세부 구조가 드러나므로 영원한 탐험의 대상입니다.
- **시각적 아름다움:** 계산 결과가 시각적으로 극도로 매력적이어서, 수학과 예술의 경계를 보여주는 완벽한 사례입니다.

### 3. 구현 시 고려 사항
- **반복 횟수 제한:** 무한 반복을 방지하기 위해 최대 반복 횟수(예: 256)를 설정합니다.
- **복소수 연산:** 2D 좌표를 직접 복소수로 계산하거나, $(a+bi)^2$ 공식을 실수부와 허수부로 전개하여 계산합니다.
- **줌 및 팬:** 특정 영역으로 확대하기 위해, 복소평면의 영역 범위를 동적으로 조정합니다.
- **안티앨리아싱:** 픽셀 경계에서 색상 급격한 변화를 부드럽게 하기 위해, 각 픽셀 내 여러 점을 샘플링하여 평균합니다.

### 4. 활용 분야
- **순수 수학 탐구:** 복소수 동역학, 혼돈 이론, 프랙탈 기하학의 구체적 사례.
- **Generative Art & 시각화:** 프랙탈의 무한 아름다움을 시각적으로 탐험하는 예술.
- **교육:** 복소수, 반복, 발산, 프랙탈 등 수학 개념을 직관적으로 이해하는 도구.
- **인터랙티브 탐험:** 사용자가 줌/팬으로 "무한 여행"을 떠나는 몰입적 경험.
- **이미지 생성:** 고해상도 프랙탈 이미지를 생성하여 탁본, 포스터, 벽지 등으로 사용.
    `,
    en: 'The Escape-Time Fractal algorithm iteratively applies z = z² + c for each point c on the complex plane, observing whether the absolute value exceeds 2 and diverges. Mapping colors based on the number of iterations until divergence reveals infinitely complex self-similar boundaries like the Mandelbrot set. It is a quintessential example of generating astonishing geometric structures from simple formulas.',
  },
  sketch,
  params: [
    {
      key: 'gridSize',
      label: '그리드 해상도',
      min: 20,
      max: 120,
      step: 2,
      default: 60,
      restart: false
    },
    {
      key: 'baseMaxIter',
      label: '기본 반복 횟수',
      min: 10,
      max: 100,
      step: 5,
      default: 20,
      restart: false
    },
    {
      key: 'animSpeed',
      label: '애니메이션 속도',
      min: 0.0,
      max: 1.0,
      step: 0.1,
      default: 0.3,
      restart: false
    },
    {
      key: 'xyMultiplier',
      label: '허수부 계수 (M)',
      min: -5.0,
      max: 5.0,
      step: 0.1,
      default: 2.0,
      restart: false
    },
    {
      key: 'panX',
      label: 'X 위치 (Pan X)',
      min: -3.0,
      max: 3.0,
      step: 0.1,
      default: -0.75,
      restart: false
    },
    {
      key: 'panY',
      label: 'Y 위치 (Pan Y)',
      min: -3.0,
      max: 3.0,
      step: 0.1,
      default: 0.0,
      restart: false
    },
    {
      key: 'zoom',
      label: '확대 (Zoom)',
      min: 0.1,
      max: 10.0,
      step: 0.1,
      default: 1.0,
      restart: false
    }
  ],
  related: ['IFS & Fractal', 'Fractal Brownian Motion', 'Cellular Automata'],
}