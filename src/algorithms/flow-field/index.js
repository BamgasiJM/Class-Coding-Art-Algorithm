import sketch from "./sketch";

export default {
  // 마크다운 문자열 (react-markdown 으로 렌더링). ko는 본문(--fg), en은 보조(--muted).
  longDescription: {
    ko: `
Flow Field는 공간상의 각 좌표에 특정한 방향과 힘을 가진 벡터를 할당하여, 입자나 유체가 흐르는 듯한 움직임을 시뮬레이션하는 알고리즘입니다. 단순한 노이즈 함수를 벡터장으로 변환함으로써 자연스러운 유체 흐름, 바람, 혹은 눈에 보이지 않는 에너지의 흐름을 시각화할 수 있습니다.

### 1. 핵심 수학적 원리
Flow Field는 수학적으로 **벡터장(Vector Field)** $\mathbf{V}(x, y)$를 정의하는 과정입니다.

1. **벡터 생성 (Vector Generation):** 공간의 각 점 $(x, y)$에서 입자가 나아갈 방향 $\theta$를 결정합니다. 주로 **Perlin Noise**나 **Simplex Noise**와 같은 연속적인 노이즈 함수를 사용하여, 인접한 좌표 간의 벡터 방향이 급격하게 변하지 않고 부드럽게 연결되도록 합니다.
   - $\theta(x, y) = \text{noise}(x \cdot s, y \cdot s) \cdot 2\pi$ (여기서 $s$는 노이즈의 스케일링 인자)
2. **힘의 적용 (Force Application):** 생성된 벡터를 입자의 속도(Velocity)에 반영합니다. 입자의 현재 위치 $\mathbf{p}$에서의 속도 $\mathbf{v}$는 다음과 같이 업데이트됩니다.
   - $\mathbf{v}_{new} = \mathbf{v}_{old} + \mathbf{F}(x, y) \cdot \Delta t$
   - $\mathbf{p}_{new} = \mathbf{p}_{old} + \mathbf{v}_{new} \cdot \Delta t$
3. **보간 (Interpolation):** 격자 기반의 벡터 데이터를 사용할 경우, 입자의 위치가 격자점 사이일 때 **Bilinear Interpolation**을 통해 주변 벡터들을 부드럽게 결합하여 방향을 산출합니다.

### 2. 주요 특징 및 장점
- **Organic Motion (유기적 움직임):** 무작위적인 움직임이 아닌, 흐름의 맥락이 있는 부드러운 움직임을 생성합니다. 이는 물의 흐름, 구름의 이동, 공기의 흐름과 같은 자연 현상을 모사하는 데 탁월합니다.
- **Emergent Behavior (창발적 행동):** 개별 입자는 단순히 현재 위치의 벡터 방향을 따를 뿐이지만, 수만 개의 입자가 모이면 거대한 소용돌이나 줄기 형태의 복잡한 패턴이 나타납니다.
- **Scalability (확장성):** 노이즈의 주파수(Frequency)와 진폭(Amplitude)을 조절함으로써, 아주 미세한 떨림부터 거대한 해류의 움직임까지 자유롭게 제어할 수 있습니다.

### 3. 구현 시 고려 사항
- **Noise Scaling:** 노이즈의 스케일이 너무 크면 흐름이 너무 불규칙해져 직선적인 움직임처럼 보일 수 있고, 너무 작으면 흐름이 거의 느껴지지 않을 정도로 단조로워질 수 있습니다. 적절한 **Scale** 값을 찾는 것이 시각적 완성도의 핵심입니다.
- **Vector Normalization:** 벡터의 크기가 지나치게 커지면 입자가 화면 밖으로 순식간에 튕겨 나갈 수 있습니다. 따라서 생성된 벡터를 **단위 벡터(Unit Vector)**로 정규화한 후, 원하는 속도 상수를 곱해주는 방식이 안정적입니다.
- **Optimization:** 수만 개의 입자를 매 프레임마다 계산해야 하므로, CPU보다는 **GPU(Shader)**를 이용한 병렬 연산이 훨씬 효율적입니다.

### 4. 활용 분야
- **Generative Art:** 입자의 잔상(Trail)을 활용하여 유동적인 선(Line)의 미학을 구현하거나, 복잡한 텍스처 패턴을 생성하는 데 사용됩니다.
- **Game Development:** 캐릭터의 이동 경로, 바람에 날리는 풀잎의 움직임, 혹은 마법 효과와 같은 파티클 시스템의 기초 로직으로 활용됩니다.
- **Data Visualization:** 지도상의 풍향 데이터나 해류의 흐름과 같이, 공간에 걸쳐 있는 벡터 데이터를 직관적으로 시각화할 때 필수적인 기술입니다.

`,
    en: `
**Flow Field** is a foundational algorithm where particles follow velocity vectors defined by a noise field.
Using Perlin noise, we create a continuous vector field that smoothly varies across space and time.
Each particle senses the vector at its current position and follows that direction, creating organic, fluid-like motion patterns.

This technique is widely used in particle systems, creature animation, and natural phenomena visualization.
`,
  },
  sketch,
  // Playground 슬라이더 스키마. restart: true는 구조 파라미터(setup에서만 반영 → 인스턴스 재시작).
  params: [
    { key: "count", label: "파티클 수", min: 50, max: 800, step: 10, default: 300, restart: true },
    { key: "scl", label: "필드 해상도", min: 10, max: 60, step: 1, default: 25, unit: "px", restart: true },
    { key: "noiseScale", label: "노이즈 스케일", min: 0.001, max: 0.02, step: 0.001, default: 0.005 },
    { key: "speed", label: "파티클 속도", min: 0.5, max: 6, step: 0.1, default: 2 },
    { key: "damping", label: "댐핑", min: 0.5, max: 0.98, step: 0.01, default: 0.9 },
    { key: "timeSpeed", label: "필드 변화 속도", min: 0, max: 0.03, step: 0.001, default: 0.005 },
  ],
  related: ["Perlin / Simplex Noise", "Trigonometric Wave", "Curl Noise"],
};
