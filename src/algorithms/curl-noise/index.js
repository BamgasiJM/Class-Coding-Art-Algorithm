import sketch from "./sketch";

export default {
  // 마크다운 문자열 (react-markdown 으로 렌더링). ko는 본문(--fg), en은 보조(--muted).
  longDescription: {
    // LaTeX 백슬래시(\psi, \frac 등)가 템플릿 리터럴에서 이스케이프로 먹히지 않도록 String.raw 사용.
    ko: String.raw`
Curl Noise는 유체 역학의 물리적 특성을 시뮬레이션하기 위해 사용되는 그래픽스 알고리즘으로, 벡터장의 **비회전성**과 **용량 보존성**을 수학적으로 보장하는 기술입니다. 일반적인 Perlin Noise나 Simplex Noise가 단순히 스칼라 값을 생성하는 것과 달리, Curl Noise는 벡터 필드를 생성하여 유체가 소용돌이치며 흐르는 듯한 자연스러운 움직임을 만들어냅니다.

### 1. 핵심 수학적 원리

Curl Noise의 핵심은 스칼라 함수(Potential function) $\psi$에 대해 그 **Curl(회전)** 연산을 수행하는 것입니다. 2D와 3D 환경에서의 원리는 다음과 같습니다.

1. **Potential Function 생성:** 먼저 입력 좌표 $(x, y, z)$를 기반으로 연속적인 스칼라 필드 $\psi(x, y, z)$를 생성합니다. 이때 주로 Perlin Noise나 Simplex Noise를 사용합니다.
2. **Curl 연산 적용:** 생성된 스칼라 필드의 회전(Curl)을 계산하여 벡터 필드 $\mathbf{F}$를 얻습니다.
   - **2D 환경:** $\mathbf{F} = \left( \frac{\partial \psi}{\partial y}, -\frac{\partial \psi}{\partial x} \right)$
   - **3D 환경:** $\mathbf{F} = \nabla \times \psi = \left( \frac{\partial \psi}{\partial y} - \frac{\partial \psi}{\partial z}, \frac{\partial \psi}{\partial z} - \frac{\partial \psi}{\partial x}, \frac{\partial \psi}{\partial x} - \frac{\partial \psi}{\partial y} \right)$

이렇게 계산된 벡터장 $\mathbf{F}$는 수학적으로 $\nabla \cdot \mathbf{F} = 0$을 만족하게 되어, 유체의 질량이 보존되는(Divergence-free) 특성을 가집니다.

### 2. 주요 특징 및 장점

- **Incompressibility (비압축성):** 벡터장의 발산(Divergence)이 0이기 때문에, 입자들이 한곳에 뭉치거나 갑자기 사라지지 않고 일정한 흐름을 유지하며 부드럽게 순환합니다.
- **Vorticity (와도):** 단순한 흐름이 아니라 국소적인 회전 성분을 포함하므로, 연기, 구름, 물의 흐름과 같은 복잡한 유체 패턴을 표현하기에 매우 적합합니다.
- **Efficiency (효율성):** 실제 유체 시뮬레이션(Navier-Stokes 방정식 등)처럼 복잡한 물리 연산을 매 프레임 수행하지 않고도, Noise 함수와 미분(Gradient) 연산만으로 매우 유사한 시각적 효과를 실시간으로 얻을 수 있습니다.

### 3. 구현 시 고려 사항 (GLSL/Shader 중심)

Shader에서 Curl Noise를 구현할 때는 미분값을 어떻게 계산할지가 핵심입니다.

- **Finite Difference Method (수치 미분):** 실제 미분 공식을 직접 계산하는 대신, 현재 좌표에서 아주 작은 오프셋($\epsilon$)을 더한 지점의 Noise 값 차이를 이용하여 기울기(Gradient)를 근사합니다.
  - $\frac{\partial \psi}{\partial x} \approx \frac{\psi(x+\epsilon, y, z) - \psi(x-\epsilon, y, z)}{2\epsilon}$
- **Performance:** 미분을 위해 동일한 위치에서 여러 번의 Noise 샘플링이 필요하므로, 3D Curl Noise의 경우 샘플링 비용이 높을 수 있습니다. 따라서 적절한 Octave 구성과 최적화가 중요합니다.

### 4. 활용 분야

- **Particle Systems:** 연기(Smoke), 불꽃(Fire), 안개(Fog)의 입자 흐름 제어.
- **Fluid Simulation:** 실시간 렌더링에서의 가벼운 유체 움직임 표현.
- **Procedural Textures:** 물결(Water ripples)이나 구름의 움직임을 결정하는 벡터장 생성.
`,    
    en: "Curl Noise is an algorithmic technique that generates divergence-free, incompressible fluid-like velocity fields by taking the curl of a scalar potential field (typically Perlin or Simplex noise). Because the divergence is mathematically zero, particles flowing through this field naturally warp and navigate around virtual obstacles without clumping together. This implementation derives velocity vectors using numerical differentiation, resulting in elegant, turbulent, and non-intersecting pathways.",
  },
  sketch,
  related: ["Perlin / Simplex Noise", "Flow Field", "Fractal Brownian Motion"],
};
