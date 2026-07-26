import sketch from "./sketch";

export default {
  longDescription: {
    ko: String.raw`
**Trigonometric Wave**(삼각함수 파형)은 **사인(Sine)과 코사인(Cosine) 함수의 주기성**을 이용하여 **다양한 파형과 리듬을 생성**하는 제너레이티브 아트의 기본적인 알고리즘 중 하나입니다. 서로 다른 진폭(Amplitude), 주파수(Frequency), 위상(Phase)을 가진 **여러 삼각함수를 조합**하면, **단순한 곡선이 복잡하고 유기적인 리듬**을 가진 형태로 변화합니다. 이 원리는 **오디오 신호 처리, 진동 시뮬레이션, 물결 표현, 데이터 시각화, 음악 합성** 등 **광범위한 분야**에서 활용됩니다.
### 1. 핵심 수학적 원리
1. **기본 삼각함수:**
   - 사인파: $y = A \sin(2\pi f t + \phi)$ (진폭 $A$, 주파수 $f$, 위상 $\phi$, 시간 $t$)
   - 코사인파: $y = A \cos(2\pi f t + \phi)$
   - 기간: $T = 1/f$ (한 주기의 시간)

2. **함수 합성(Superposition):**
   - 여러 파형의 선형 결합:
   - $y(t) = \sum_{i=1}^{n} A_i \sin(2\pi f_i t + \phi_i)$ 또는 코사인 조합
   - 각 항이 독립적으로 기여하여 복합 패턴 형성

3. **Lissajous Curve (리사주 곡선):**
   - X, Y 축에 다른 주파수의 사인파 적용:
     - $x(t) = A_x \sin(2\pi f_x t + \phi_x)$
     - $y(t) = A_y \sin(2\pi f_y t + \phi_y)$
   - 주파수 비 $f_x : f_y$에 따라 다양한 폐곡선 생성

4. **푸리에 급수(Fourier Series):**
   - 임의의 주기 함수는 삼각함수의 무한 합으로 표현:
   - $f(t) = a_0 + \sum_{n=1}^{\infty} [a_n \cos(nwt) + b_n \sin(nwt)]$
   - 기본 주파수의 정수 배인 고조파(Harmonics) 조합

### 2. 주요 특징 및 장점
- **극도의 단순성:** 기본 공식만으로 무한히 복잡한 패턴 생성.
- **물리적 직관:** 실제 진동, 파동, 음파의 수학적 표현.
- **매개변수 민감성:** 진폭, 주파수, 위상의 미세 변화가 극적인 시각 변화.
- **음악적 연계:** 음악의 음정, 음색을 시각적으로 변환 가능 (음악 시각화).

### 3. 구현 시 고려 사항
- **주파수 선택:** 정수 비 $f_1 : f_2$가 단순 곡선, 비정수 비가 복잡한 사이클.
- **진폭 조정:** 각 항의 진폭을 조절하여 지배적 성분 제어.
- **위상 오프셋:** 위상을 변화시키면 곡선이 회전하거나 변형.
- **시간 해상도:** 많은 시간 샘플로 부드러운 곡선; 적은 샘플로 거친 폴리곤.

### 4. 활용 분야
- **음악 시각화:** 음악의 주파수 성분을 곡선으로 변환하여 실시간 시각화.
- **Generative Art:** Lissajous 곡선, 조화 패턴의 추상 미술.
- **데이터 시각화:** 주기적 현상 (계절, 일일 변화) 표현.
- **게임 & 애니메이션:** 자연스러운 움직임, 진동 효과, 카메라 셰이크.
- **신호 처리 교육:** 푸리에 급수, 고조파, 공명의 직관적 이해.
    `,

    en: String.raw`
Trigonometric Wave is one of the most fundamental generative art algorithms, using the periodic nature of sine and cosine functions to create dynamic waveforms. Combining multiple trigonometric functions with different amplitudes, frequencies, and phases, simple curves evolve into rich organic patterns—Lissajous curves, complex spirals, undulating waves. These principles underpin audio synthesis, vibration simulation, and music visualization. Because minute parameter changes produce dramatically different results, trigonometric waves exemplify the profound connection between mathematics and visual art.
    `,
  },

  sketch,
  params: [
    { key: 'waveCount', label: '파동 개수', min: 10, max: 100, step: 5, default: 50, restart: true },
    { key: 'samples', label: '샘플링 해상도', min: 40, max: 200, step: 10, default: 120, restart: true },
    { key: 'timeSpeed', label: '애니메이션 속도', min: 0.001, max: 0.03, step: 0.001, default: 0.008 },
    { key: 'fmBaseFreq', label: '기본 주파수', min: 1, max: 5, step: 0.2, default: 2.5 },
    { key: 'fmModulation', label: '주파수 변조', min: 0, max: 1.5, step: 0.1, default: 0.5 },
    { key: 'frequencyModulation', label: '파동별 주파수 차이', min: 1, max: 6, step: 0.2, default: 3.2 },
    { key: 'baseAmplitude', label: '기본 진폭', min: 5, max: 40, step: 1, default: 12, unit: 'px' },
    { key: 'centerAmplitudeBoost', label: '중심부 진폭 부스트', min: 10, max: 80, step: 2, default: 40, unit: 'px' },
  ],

  related: ["Flow Field", "Perlin / Simplex Noise", "Fractal Brownian Motion"],
};
