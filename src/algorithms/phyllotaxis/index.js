import sketch from "./sketch";

export default {
  longDescription: {
    ko: String.raw`
**Phyllotaxis(엽서열, 잎 배열)**는 **식물의 잎, 꽃잎, 씨앗이 효율적으로 배치되는 자연의 패턴**을 **황금비(Golden Ratio)** 기반 수학적으로 표현하는 알고리즘입니다. 각 점은 **중심에서부터 일정한 간격으로 멀어지면서** **약 137.5도의 황금각(Golden Angle)** $\theta = \frac{2\pi}{\phi^2}$ (여기서 $\phi = \frac{1+\sqrt{5}}{2}$)만큼 **반복 회전**하여 배치됩니다. 이 **극도로 단순한 규칙**만으로도 **해바라기 씨앗, 솔방울, 선인장 비늘, 파인애플 표면** 등에서 보이는 **완벽한 나선 구조**가 자연스럽게 형성됩니다. 자연의 성장 원리를 **간결한 수식**으로 구현할 수 있기 때문에 제너레이티브 아트에서 가장 널리 사용되는 알고리즘 중 하나입니다.

### 1. 핵심 수학적 원리
1. **극좌표 표현:**
   - 점 $i$의 위치 (0부터 시작):
     - 반지름: $r_i = c \sqrt{i}$ (여기서 $c$는 간격 상수)
     - 각도: $\theta_i = i \times \phi_{\text{golden}} = i \times 137.508°$ (황금각)

2. **황금각 정의:**
   - 황금비: $\phi = \frac{1+\sqrt{5}}{2} \approx 1.618$
   - 황금각: $\theta_{\text{golden}} = \frac{2\pi}{\phi^2} = 2\pi(1 - \frac{1}{\phi}) \approx 137.508°$
   - 이 각도는 $360° / \phi^2 \approx 137.508°$로도 표현됨

3. **직교좌표 변환:**
   - $x_i = r_i \cos(\theta_i) = c\sqrt{i} \cos(i \times 137.508°)$
   - $y_i = r_i \sin(\theta_i) = c\sqrt{i} \sin(i \times 137.508°)$
   - 중심 이동: $(x_i, y_i) \leftarrow (x_i + \text{centerX}, y_i + \text{centerY})$

4. **자기유사성(Self-Similarity):**
   - 모든 규모에서 동일한 나선 구조 반복
   - 부분 구조가 전체와 유사 → 프랙탈 특성

### 2. 주요 특징 및 장점
- **극도의 우아함:** 황금각 하나만으로 무한히 정교한 나선 패턴 생성.
- **자연 친화성:** 생물학적으로 검증된 식물 성장 패턴과 정확히 일치.
- **수학적 아름다움:** 황금비의 신비한 성질을 시각화.
- **계산 효율성:** $O(n)$의 단순 계산으로 수백만 점 배치 가능.

### 3. 구현 시 고려 사항
- **간격 상수 $c$:** 작으면 조밀한 나선, 크면 성근 나선; 일반적으로 1~10 범위.
- **점 개수:** 많을수록 정밀한 나선; 보통 500~2000개.
- **시각화:** 점의 크기, 색상을 거리나 인덱스에 따라 변화시켜 3D 효과.
- **회전 & 스케일:** 전체 패턴을 회전하거나 스케일 변경으로 다양한 표현.

### 4. 활용 분야
- **Generative Art:** 황금비 기반 추상 미술, 음악 시각화, 설치 미술.
- **자연 시뮬레이션:** 게임, 영화에서 식물 자동 생성.
- **데이터 시각화:** 분류 라벨 배치, 네트워크 노드 배치.
- **교육:** 황금비, 나선, 자기유사성, 프랙탈의 실제 사례.
- **3D 그래픽:** 구 표면의 균일한 점 샘플링 (반구 나선).
    `,

    en: String.raw`
Phyllotaxis models the natural arrangement of leaves, petals, and seeds using the golden angle—approximately 137.5 degrees, derived from the golden ratio φ ≈ 1.618. Each point moves radially outward (radius proportional to √i) while rotating by the golden angle, creating the spirals seen in sunflowers, pinecones, and cacti. Despite simplicity, this rule produces mathematically optimal packing: no point crowds another, and resources are equidistributed across all scales. It is a quintessential example of how minimal mathematical constraints generate infinite organic beauty.
    `,
  },

  sketch,
  params: [
    {
      key: "pointCount",
      label: "포인트 개수",
      min: 200,
      max: 2000,
      step: 50,
      default: 900,
      restart: true,
    },
    {
      key: "spacing",
      label: "나선 간격",
      min: 2,
      max: 20,
      step: 1,
      default: 8,
      unit: "px",
      restart: true,
    },
    {
      key: "goldenAngle",
      label: "회전 각도",
      min: 10,
      max: 180,
      step: 0.5,
      default: 137.5,
      unit: "°",
    },
    {
      key: "maxPointSize",
      label: "중심 점 크기",
      min: 2,
      max: 15,
      step: 0.5,
      default: 7.5,
      unit: "px",
    },
    {
      key: "minPointSize",
      label: "외곽 점 크기",
      min: 0.5,
      max: 15,
      step: 0.5,
      default: 2,
      unit: "px",
    },
    {
      key: "maxAlpha",
      label: "중심부 불투명도",
      min: 50,
      max: 255,
      step: 5,
      default: 200,
    },
    {
      key: "minAlpha",
      label: "외곽 불투명도",
      min: 10,
      max: 100,
      step: 5,
      default: 50,
    },
    {
      key: "brightnessFade",
      label: "밝기 감소 정도",
      min: 0,
      max: 1,
      step: 0.05,
      default: 0.5,
    },
  ],
  related: ["IFS & Fractal", "L-System", "Space Colonization"],
};
