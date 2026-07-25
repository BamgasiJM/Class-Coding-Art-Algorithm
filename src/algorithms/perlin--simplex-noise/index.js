import sketch from "./sketch";

export default {
  longDescription: {
    en: String.raw`
Perlin Noise and Simplex Noise are gradient noise algorithms designed to produce natural, organic pseudo-random textures and structures. Unlike pure white noise, they generate smooth, continuous transitions between points via spatial gradient interpolation. Perlin Noise (1983) uses a cubic lattice and linear/cubic interpolation; Simplex Noise (2002) improves efficiency via n-dimensional simplicial lattices. Both are foundational to terrain generation, cloud simulation, texture synthesis, and flow field visualization in computer graphics and generative art.
    `,
    ko: String.raw`
**Perlin / Simplex Noise(펄린/심플렉스 노이즈)**는 **자연스럽고 유기적인 의사 난수(Pseudo-Random) 텍스처와 구조**를 생성하는 **그래디언트 노이즈(Gradient Noise) 알고리즘**입니다. 완전히 독립적인 **화이트 노이즈(White Noise)**와 달리, **공간적 그래디언트(Spatial Gradient)**를 **보간(Interpolation)**하여 연속적이고 부드러운 전이를 만들어냅니다. **Perlin Noise**(1983)는 3차 격자와 선형/3차 보간을 사용하고, **Simplex Noise**(2002)는 심플렉스 격자를 통해 더 효율적인 $n$차원 구현을 제공합니다. 두 알고리즘 모두 지형 생성, 구름 시뮬레이션, 텍스처 합성, 흐름장 시각화 등 컴퓨터 그래픽과 제너레이티브 아트의 기초입니다.

### 1. 핵심 수학적 원리
1. **Perlin Noise의 구조:**
   - 2D 격자: 정수 좌표 $(\lfloor x \rfloor, \lfloor y \rfloor)$의 교점에 무작위 그래디언트 벡터 배치
   - 소수점 좌표: $\mathbf{r} = (x - \lfloor x \rfloor, y - \lfloor y \rfloor)$ (0과 1 사이)
   - 각 코너에서 그래디언트와 위치 벡터의 **점곱(Dot Product)** 계산:
     - $(g_{00} \cdot \mathbf{r}_{00}, g_{01} \cdot \mathbf{r}_{01}, g_{10} \cdot \mathbf{r}_{10}, g_{11} \cdot \mathbf{r}_{11})$

2. **Interpolation (보간):**
   - 선형 보간: $\text{lerp}(a, b, t) = a(1-t) + bt$
   - **Fade Curve** (부드러운 보간): $f(t) = t^3(10 - 15t + 6t^2)$ 또는 유사한 3차 함수
   - $f(t)$는 $f(0) = 0, f(1) = 1, f'(0) = f'(1) = 0$을 만족 (양 끝에서 미분이 0)

3. **Simplex Noise의 개선:**
   - 격자: 정규 심플렉스(정삼각형 격자) 사용 → 더 적은 계산
   - $n$차원: 심플렉스는 $n+1$개 코너만 필요 (큐브는 $2^n$개)
   - 복잡도: Perlin은 $O(2^n)$, Simplex는 $O(n^2)$

4. **옥타브 합성 (Octave Combination):**
   - 여러 주파수의 노이즈 합산: $\text{fBm}(x) = \sum_{i=0}^{n} A_i \cdot \text{Noise}(\lambda^i x)$
   - $A_i = 0.5^i$ (진폭 감소)
   - $\lambda$ = 주파수 배수 (보통 2)

### 2. 주요 특징 및 장점
- **극도의 자연성:** 수학적으로 부드러우면서도 생물학적 복잡성 표현.
- **해상도 독립성:** 어느 스케일에서든 일관되고 자연스러운 패턴.
- **계산 효율성:** $O(n)$ 시간으로 임의 점의 값 계산 가능; 전체 필드 사전계산 불필요.
- **확장 가능성:** 옥타브 합성, 도메인 왜곡(Domain Warping), 밀도 보정 등 다양한 변형 가능.

### 3. 구현 시 고려 사항
- **그래디언트 생성:** 랜덤 그래디언트 벡터를 미리 계산하여 룩업 테이블로 저장.
- **Fade Curve 선택:** 3차(cubic) 또는 5차(quintic) 함수; 5차가 더 부드럽지만 느림.
- **주기성:** 격자를 주기적으로 반복하여 타일링 가능한 노이즈 생성.
- **3D/4D 확장:** 시간을 추가 차원으로 사용하여 애니메이션 노이즈 생성.

### 4. 활용 분야
- **게임 개발:** 절차적 지형 생성, 텍스처 합성, 월드 맵 생성.
- **애니메이션:** 카메라 흔들림, 자연스러운 움직임 보간, 클라우드 애니메이션.
- **Generative Art:** 유기적 패턴, 산책로 시각화, 음악 시각화.
- **과학 시뮬레이션:** 난류 시뮬레이션, 산림 밀도 분포, 해발고도 맵.
- **영화 & VFX:** 구름, 연기, 불, 수증기 등 자연 현상 표현.
    `,
  },
  sketch,
  params: [
  {
    key: 'cellSize',
    label: '격자 크기',
    min: 8,
    max: 40,
    step: 1,
    default: 18,
    unit: 'px',
    restart: true,
  },
  {
    key: 'noiseScale',
    label: '노이즈 스케일',
    min: 0.01,
    max: 0.2,
    step: 0.005,
    default: 0.08,
  },
  {
    key: 'timeSpeed',
    label: '애니메이션 속도',
    min: 0,
    max: 0.05,
    step: 0.001,
    default: 0.01,
  },
  {
    key: 'threshold',
    label: '강조 임계값',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.58,
  },
  {
    key: 'radiusMultiplier',
    label: '원 크기',
    min: 0.5,
    max: 2.5,
    step: 0.1,
    default: 1.4,
  },
  {
    key: 'jitter',
    label: '흔들림',
    min: 0,
    max: 10,
    step: 0.5,
    default: 2,
  },
],
  related: ["Flow Field", "Fractal Brownian Motion", "Curl Noise"],
};
