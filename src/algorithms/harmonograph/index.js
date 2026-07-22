import sketch from "./sketch";

export default {
  longDescription: {
    ko: String.raw`
**Harmonograph(하모노그래프)**는 19세기 기계식 악기에서 영감을 얻어, **감쇠하는 사인 진동(Damped Sinusoidal Oscillation)** 여러 개를 합성하여 정교한 **리사주 곡선(Lissajous Curve)**을 그리는 알고리즘입니다. $x$축과 $y$축에 각각 2개씩, 총 4개의 **진동자(Oscillator)**를 배치하고 각각 다른 주파수, 위상, 진폭, 감쇠율을 적용합니다. 시간이 경과함에 따라 진폭이 **지수적으로 감소**하며 궤적이 중심부로 점차 수렴하는 아름다운 **나선형(Spiral)** 패턴을 형성하며, 특히 진동자들의 주파수 비율이 정수비(1:2, 2:3, 3:5 등)를 이룰 때 극도로 정교하고 대칭적인 기하학 구조가 나타납니다.

### 1. 핵심 수학적 원리
1. **감쇠 사인 진동:**
   - 시간 $t$에서의 진동값: $A(t) \sin(\omega t + \phi) = A_0 e^{-\gamma t} \sin(\omega t + \phi)$
   - 여기서:
     - $A_0$: 초기 진폭
     - $\omega = 2\pi f$: 각 주파수 (또는 $\omega$를 직접 사용)
     - $\phi$: 위상
     - $\gamma$: 감쇠 상수 (decay rate), $\gamma > 0$이면 시간에 따라 진동이 줄어듦

2. **X축 진동(두 진동자):**
   - $x(t) = (A_{x1} e^{-\gamma_{x1} t} \sin(\omega_{x1} t + \phi_{x1})) + (A_{x2} e^{-\gamma_{x2} t} \sin(\omega_{x2} t + \phi_{x2}))$

3. **Y축 진동(두 진동자):**
   - $y(t) = (A_{y1} e^{-\gamma_{y1} t} \sin(\omega_{y1} t + \phi_{y1})) + (A_{y2} e^{-\gamma_{y2} t} \sin(\omega_{y2} t + \phi_{y2}))$

4. **리사주 곡선의 대칭성:**
   - 두 주파수의 비율이 정수비 $p:q$일 때, 폐곡선(Closed Curve)이 형성됨
   - 대칭축 개수: $\text{gcd}(p, q)$개 (최대공약수에 따라)

5. **곡선의 수렴:**
   - 감쇠율이 커질수록 빠르게 중심으로 수렴하고, 감쇠 시간이 길수록 큰 나선 형성

### 2. 주요 특징 및 장점
- **순수한 수학적 아름다움:** 사인 함수라는 가장 기본적인 수학 함수의 조합으로부터 극도로 정교한 기하학이 창발합니다.
- **주파수 비율의 마법:** 정수비 주파수는 완벽한 대칭을 만들고, 비정수비는 준주기적(Quasi-periodic) 복잡한 패턴을 만듭니다.
- **감쇠의 감정:** 감쇠율 조정으로 우아한 수렴, 오래 유지되는 진동 등 다양한 시각적 인상을 만들 수 있습니다.
- **역사적 중요성:** 19세기 기계식 악기(Harmonograph)를 수학적으로 재현하여, 수학과 음악의 오래된 관계를 시각화합니다.

### 3. 구현 시 고려 사항
- **주파수 설정:** 정수비를 유지하려면, 기본 주파수에 정수를 곱하는 방식을 사용합니다.
- **위상 조정:** 초기 위상을 변경하면 같은 주파수 설정에서도 완전히 다른 패턴이 나타나므로, 시드로 사용할 수 있습니다.
- **감쇠 시간 관리:** 감쇠 상수 $\gamma$는 전체 시뮬레이션 시간과 균형을 맞춰야 합니다.
- **궤적 렌더링:** 곡선의 색상을 시간에 따라 변화시키거나, 궤적의 속도에 따라 색상을 다르게 하면 시각적 풍부함이 증가합니다.

### 4. 활용 분야
- **수학 예술(Mathematical Art):** 정수비 주파수 조합의 아름다움을 탐험하는 순수 수학 예술.
- **음악 시각화(Music Visualization):** 음악의 주파수 성분을 리사주 곡선으로 변환하여 음악을 "보기."
- **애니메이션 & 모션그래픽:** 나선형 움직임, 복잡한 궤적의 자동 생성.
- **과학 교육:** 삼각함수, 주기성, 대칭, 감쇠 개념의 직관적 이해.
- **인터랙티브 설치:** 사용자가 주파수, 진폭, 감쇠를 실시간으로 조정하는 참여형 예술.
    `,
    en: "Harmonograph is an algorithm that draws intricate Lissajous curves by combining multiple damped sine oscillations. It places two oscillators each on the x and y axes (four total), applying different frequencies, phases, amplitudes, and damping rates to each. As time progresses, the amplitudes decay exponentially toward the center, forming spiral patterns. Particularly beautiful Lissajous curves emerge when the oscillators' frequency ratios are integer values (1:2, 2:3, etc.).",
  },
  sketch,
  params: [
  {
    key: 'amplitude',
    label: '주 진폭',
    min: 0.15,
    max: 0.45,
    step: 0.01,
    default: 0.3,
    restart: true,
  },
  {
    key: 'secondaryAmplitude',
    label: '보조 진폭',
    min: 0.05,
    max: 0.3,
    step: 0.01,
    default: 0.15,
    restart: true,
  },
  {
    key: 'frequencyOffset',
    label: '주파수 차이',
    min: 1,
    max: 1.05,
    step: 0.001,
    default: 1.01,
    restart: true,
  },
  {
    key: 'dt',
    label: '곡선 해상도',
    min: 0.005,
    max: 0.05,
    step: 0.001,
    default: 0.02,
  },
  {
    key: 'pointsPerFrame',
    label: '그리기 속도',
    min: 10,
    max: 300,
    step: 10,
    default: 80,
  },
  {
    key: 'maxTime',
    label: '감쇠 시간',
    min: 30,
    max: 200,
    step: 5,
    default: 100,
    restart: true,
  },
],
  related: ["Trigonometric Wave", "Double Pendulum", "Attractor System"],
};
