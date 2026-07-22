import sketch from './sketch'

export default {
  longDescription: {
    ko: String.raw`
**Chladni Figures(클라드니 도형)**은 진동하는 판(Vibrating Plate)의 고유 진동 모드(Eigenmode)를 시각화하는 물리 기반 알고리즘으로, **Cymatics(음향 기하학)**라는 현상을 보여주는 고전적이면서도 아름다운 수학 예술입니다. 1787년 독일의 물리학자 Ernst Florens Friedrich Chladni가 진동하는 금속판 위에 모래를 뿌렸을 때 규칙적인 패턴이 나타나는 현상을 발견했으며, 이를 수학적으로 모델링하면 **두 주파수 매개변수 $(n, m)$의 코사인 조합**으로 정의된 진동 진폭 필드에서 진동이 정지하는 **노드 선(Node Lines)**을 따라 입자가 집적됩니다.

### 1. 핵심 수학적 원리
직사각형 판의 2D 진동은 다음과 같은 편미분방정식으로 모델링됩니다:

1. **변위 필드(Displacement Field):** 판의 각 위치 $(x, y)$에서의 진동 진폭은:
   - $w(x, y, t) = A \cos(n\pi x / L_x) \cos(m\pi y / L_y) \cos(\omega t)$
   - 여기서 $n, m$은 $x, y$ 방향의 정수 배수(조화 고조), $L_x, L_y$는 판의 크기, $\omega$는 진동 주파수

2. **노드 선:** 진폭이 항상 0인 선
   - $\cos(n\pi x / L_x) = 0$ 또는 $\cos(m\pi y / L_y) = 0$인 점들의 집합
   - 이들 직선이 교차하면서 형성하는 격자 또는 격자-방사형 패턴

3. **고유값과 공명:** 특정 주파수에서만 안정적인 진동 모드가 존재하며, 각 $(n, m)$ 쌍은 고유 공명 주파수를 가집니다:
   - $f_{n,m} \propto \sqrt{n^2 + m^2}$ (근사식)

4. **시간 진화:** 주파수 매개변수가 시간에 따라 천천히 변할 때:
   - $n(t) = n_{base} + n_{range} \sin(\omega_n t)$
   - $m(t) = m_{base} + m_{range} \sin(\omega_m t)$
   - 패턴이 유기적으로 변형됩니다.

### 2. 주요 특징 및 장점
- **고전 물리와 수학의 우아함:** 미분방정식의 해가 시각적으로 표현되어, 추상적인 수학이 구체적인 기하학 패턴으로 드러나는 감동을 제공합니다.
- **높은 대칭성:** 코사인 함수의 성질로 인해 생성되는 패턴들은 거울 대칭, 회전 대칭 등 강한 규칙성을 띠며, 특정 $(n, m)$ 조합에서는 극도의 정교한 기하 형태를 만듭니다.
- **실시간 변형:** 매개변수를 연속적으로 변화시키면 패턴이 부드럽게 변형되어, 마치 살아있는 생명체처럼 보입니다.
- **물리적 정확성과 예술성의 조화:** 실제 물리 현상을 정확히 모델링하면서도 극도의 미적 결과를 얻습니다.

### 3. 구현 시 고려 사항
- **격자 변위 계산:** 캔버스의 각 픽셀(또는 셀)에서 코사인 함수 값을 계산하여 진폭을 구합니다. 계산량이 많으므로, 셀 크기를 조정하여 성능과 해상도의 균형을 맞춥니다.
- **노드 라인의 시각화:** 진폭이 0에 가까운 영역을 감지하여, 임계값(명확도, Clarity) 이하의 영역을 검은색으로 표시합니다.
- **매개변수 범위 및 속도:** $n, m$의 기본값, 변동 범위, 애니메이션 속도를 독립적으로 제어하여 다양한 패턴을 생성합니다.
- **수치 안정성:** 코사인 값이 [-1, 1] 범위 내에 있으므로 수치적으로 안정적이며, 고주파(큰 $n, m$ 값)에서도 오버플로우 우려가 없습니다.

### 4. 활용 분야
- **음성 시각화(Sound Visualization):** 음악이나 음성 신호의 주파수 성분을 실시간으로 Chladni 도형으로 변환하여, 추상적인 소리를 시각적으로 인식하게 하는 인터랙티브 아트.
- **과학 교육 & 대중 과학:** 파동, 고유진동, 공명 현상을 직관적으로 이해시키는 교육 도구.
- **Generative Art:** 고정된 규칙으로부터 무한한 변이를 생성하는 예술 작품, 뮤직비디오 배경화면.
- **건축 음향:** 실제 건물의 음향 모드 시뮬레이션, 공명 주파수 시각화를 통한 음향 설계.
- **재료 과학:** 진동 응력 분포, 피로 파괴 패턴, 메타머티리얼의 파동 전파 분석.
    `,
    en: 'Chladni Figures visualize the 2D eigenmodes of a vibrating rectangular plate. Within a displacement field defined by a combination of cosines for two frequency parameters n and m, sand accumulates along the node lines — where the vibration amplitude vanishes — reproducing the Cymatics phenomenon. As the frequency parameters change, symmetric geometric patterns morph in real time, revealing an elegant intersection of classical physics and mathematics.',
  },
  sketch,
params: [
    { key: 'cellSize', label: '셀 크기', min: 2, max: 16, step: 1, default: 4, unit: 'px', restart: true },
    { key: 'nBase', label: 'n 기본값', min: 1, max: 8, step: 0.5, default: 3 },
    { key: 'nRange', label: 'n 변동 범위', min: 0.5, max: 5, step: 0.5, default: 2.5 },
    { key: 'mBase', label: 'm 기본값', min: 1, max: 8, step: 0.5, default: 5 },
    { key: 'mRange', label: 'm 변동 범위', min: 0.5, max: 5, step: 0.5, default: 3 },
    { key: 'nSpeed', label: 'n 애니메이션 속도', min: 0.1, max: 2, step: 0.1, default: 0.7 },
    { key: 'mSpeed', label: 'm 애니메이션 속도', min: 0.1, max: 2, step: 0.1, default: 0.53 },
    { key: 'timeSpeed', label: '전체 시간 속도', min: 0.001, max: 0.02, step: 0.001, default: 0.005 },
    { key: 'clarity', label: '노드 라인 명확도', min: 2, max: 15, step: 1, default: 6 },
  ],
  related: ['Trigonometric Wave', 'Harmonograph', 'Perlin / Simplex Noise'],
}