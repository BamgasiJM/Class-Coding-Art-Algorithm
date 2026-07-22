import sketch from './sketch';

export default {
  longDescription: {
    ko: String.raw`
**Fractal Brownian Motion(fBM, 프랙탈 브라우니안 모션)**은 여러 **옥타브(Octaves)**의 **Perlin 노이즈**를 누적하여 자연계의 **프랙탈적 자기유사성(Self-Similarity)**을 수학적으로 모사하는 알고리즘입니다. 각 옥타브마다 주파수는 2배씩 증가하고 진폭은 기하급수적으로 감소하며 ($\text{amplitude} = \text{amplitude} \times \text{persistence}$), 이로 인해 **큰 규모의 구조 내에 작은 규모의 세밀한 디테일이 반복되는 자기유사성 패턴**이 생성됩니다. **도메인 워핑(Domain Warping)** 기법과 결합하면 구름, 지형, 불꽃, 파도 등 자연의 극도로 유기적인 형태를 유동적이고 설득력 있게 표현할 수 있습니다.

### 1. 핵심 수학적 원리
1. **단일 Perlin 노이즈:**
   - 함수 $\text{perlin}(x, y, z)$는 [-1, 1] 범위의 부드러운 난수값 반환

2. **옥타브 합산(Octave Summation):**
   - $\text{fBM}(x, y) = \sum_{i=0}^{n-1} \text{amplitude}_i \times \text{perlin}(\text{frequency}_i \times x, \text{frequency}_i \times y, t)$
   - 여기서:
     - 옥타브 인덱스: $i = 0, 1, 2, ..., n-1$
     - 주파수: $\text{frequency}_i = 2^i$ (각 옥타브마다 2배)
     - 진폭: $\text{amplitude}_i = \text{persistence}^i$ (0 < persistence < 1)

3. **주요 매개변수:**
   - **Persistence:** 진폭 감소율 (기본값 ~0.5~1.5)
     - 낮을수록: 큰 규모 구조만 보임 (매끄러움)
     - 높을수록: 작은 규모 디테일도 큼 (복잡함)
   - **Lacunarity:** 주파수 증가 배수 (기본값 ~2.0~4.0)
     - 보통 2배 증가를 사용하지만, 조정으로 스케일 비율 제어
   - **Octaves:** 합산할 옥타브 개수 (보통 3~6)

4. **정규화:**
   - 모든 옥타브의 합이 [-1, 1] 범위에 들어오도록 정규화:
   - $\text{fBM}_{\text{norm}} = \frac{\text{fBM}}{\sum \text{amplitude}_i}$

5. **도메인 워핑(Domain Warping):**
   - 기본 fBM에 다른 fBM을 더해서 좌표 자체를 변형:
   - $x' = x + \text{fBM}_1(x, y)$
   - $y' = y + \text{fBM}_2(x, y)$
   - 최종: $\text{result} = \text{fBM}_3(x', y')$
   - 이로부터 극도로 복잡하고 유기적인 형태 생성

### 2. 주요 특징 및 장점
- **자연의 자기유사성 표현:** 산맥의 계곡과 능선, 나뭇가지의 분지, 구름의 소용돌이 등 모든 스케일에서 비슷한 복잡도를 가진 자연 현상을 재현합니다.
- **직관적 제어:** 옥타브, persistence, lacunarity 세 매개변수만으로 다양한 질감과 형태를 생성합니다.
- **계산 효율성:** Perlin 노이즈는 GPU에 최적화되어 있으므로, 실시간 렌더링에 적합합니다.
- **끝없는 다양성:** 매개변수와 시드의 조합으로 무한한 변이를 생성합니다.

### 3. 구현 시 고려 사항
- **옥타브 개수:** 많을수록 세밀하지만 계산 비용 증가; 보통 3~6개 사이가 성능과 품질의 균형점.
- **정규화 필수:** 여러 옥타브를 더할 때 합이 1을 초과하면 값이 범위를 벗어나므로, 반드시 정규화합니다.
- **임계값 필터링:** fBM의 출력을 특정 범위로 클립(clip)하여 산과 계곡을 분리하거나, 해수면과 육지를 구분합니다.
- **색상 매핑:** fBM 값을 색상 그래디언트로 매핑하여, 높이에 따른 지형 색상(저지대는 파란색, 산꼭대기는 흰색) 표현.

### 4. 활용 분야
- **절차적 지형 생성:** 게임의 맵, 3D 게임 월드의 자동 생성, 하이트맵 기반 지형.
- **구름 및 하늘 시뮬레이션:** 영화, 게임의 동적 구름 텍스처 생성.
- **불꽃, 연기, 파도 시뮬레이션:** VFX(Visual Effects)의 자연적 질감.
- **Generative Art & 음악 시각화:** 추상적이고 유기적인 형태의 시각 예술.
- **지구/행성 생성:** 우주 게임에서 리얼한 행성 표면의 자동 생성.
    `,
    en: "Fractal Brownian Motion (fBM) is an algorithm that mimics the fractal characteristics of nature by layering multiple octaves of Perlin noise. Each octave increases in frequency while decreasing in amplitude, creating self-similar patterns where small-scale details repeat within larger structures. Combined with domain warping, it is widely used to express organic forms in nature such as clouds, terrain, and fire.",
  },
  sketch,
  params: [
    {
      key: 'octaves',
      label: '옥타브 개수',
      min: 1,
      max: 6,
      step: 1,
      default: 3,
      restart: false
    },
    {
      key: 'persistence',
      label: '지속성(Persistence)',
      min: 0.1,
      max: 2.0,
      step: 0.1,
      default: 1.5,
      restart: false
    },
    {
      key: 'lacunarity',
      label: '간극(Lacunarity)',
      min: 1.0,
      max: 5.0,
      step: 0.1,
      default: 3.0,
      restart: false
    },
    {
      key: 'noiseScale',
      label: '노이즈 스케일',
      min: 0.005,
      max: 0.05,
      step: 0.005,
      default: 0.01,
      restart: false
    },
    {
      key: 'timeSpeed',
      label: '시간 속도',
      min: 0.001,
      max: 0.05,
      step: 0.001,
      default: 0.015,
      restart: false
    }
  ],
  related: [
    "Perlin / Simplex Noise",
    "Curl Noise",
    "Diffusion-Limited Aggregation",
  ],
};