import sketch from "./sketch";

export default {
  longDescription: {
    en: String.raw`
Reaction-Diffusion models the mathematical interaction of two chemical substances (or morphogens) diffusing through space and reacting with one another. The Gray-Scott model describes feed, kill, and diffusion rates that generate self-organized patterns: stripes, spots, spirals, and labyrinths. These patterns emerge from Turing instability, where a stable equilibrium becomes unstable under diffusion, causing spatial organization. The algorithm precisely reproduces zebra stripes, leopard spots, coral skeletons, and bacterial colonies—demonstrating how morphogenesis emerges from local biochemical rules, with no global design.
    `,
    ko: String.raw`
**Reaction-Diffusion**(반응 확산)은 **공간상에서 확산되며 상호작용하는 두 종류의 화학 물질** (또는 **형태형성 인자, Morphogen**)의 역학(Dynamics)을 모델링하는 알고리즘입니다. **Gray-Scott 모델**은 공급율(Feed), 소비율(Kill), 확산 계수(Diffusion Rate)를 통해 **자기 조직화된 패턴(Self-Organized Pattern)** 을 생성합니다. 이는 **Turing 불안정성(Turing Instability)**이라는 현상에서 비롯되는데, **확산이 없을 때 안정한 평형**이 **확산 존재 하에서 불안정화**되어 공간적 구조가 형성됩니다. 얼룩말의 줄무늬, 표범의 반점, 산호의 골격, 박테리아 집단 배치 등을 정확히 재현하여, **전역 설계 없이 국소 규칙만으로 복잡한 형태형성이 일어나는 생물학적 현상**을 증명합니다.

### 1. 핵심 수학적 원리
1. **두 화학 물질:**
   - $U(x, y, t)$: 활성제(Activator) - 자기 촉진, 상대방 억제
   - $V(x, y, t)$: 억제제(Inhibitor) - 활성제 억제, 확산 느림

2. **Gray-Scott 미분 방정식:**
   - $\frac{\partial U}{\partial t} = D_U \nabla^2 U - UV^2 + F(1 - U)$
   - $\frac{\partial V}{\partial t} = D_V \nabla^2 V + UV^2 - (F+k)V$
   - $D_U, D_V$: 확산 계수
   - $F$: 공급율(Feed rate) - $U$ 공급, $V$ 제거
   - $k$: 소비율(Kill rate) - $V$ 소비 속도

3. **Laplacian (라플라시안) 계산:**
   - 이산화: 2D 격자에서 각 셀의 이웃과의 차이 이용
   - $\nabla^2 U[i,j] \approx U[i+1,j] + U[i-1,j] + U[i,j+1] + U[i,j-1] - 4U[i,j]$

4. **수치 적분:**
   - **전진 오일러(Forward Euler) 방법**: $U_{\text{new}} = U + \Delta t \cdot \frac{\partial U}{\partial t}$
   - $\Delta t$는 작아야 안정성 보장 (보통 0.1~1.0)

### 2. 주요 특징 및 장점
- **자기 조직화:** 외부 패턴 입력 없이 자발적 구조 형성.
- **생물학적 정확성:** 실제 동물 무늬의 형성 메커니즘 재현.
- **매개변수 민감성:** $F, k$ 값 변화로 다양한 패턴 (줄무늬 ↔ 점무늬).
- **무한 복잡도:** 공간 해상도가 높을수록 세밀한 구조 드러남.

### 3. 구현 시 고려 사항
- **격자 크기:** 보통 256×256 또는 512×512; 해상도에 따라 연산량 급증.
- **초기 조건:** 일반적으로 $U = 1, V = 0$ + 중앙에 작은 교란.
- **시간 스텝:** 너무 크면 불안정, 너무 작으면 느림; 동적 조정 가능.
- **주기적 경계(Toroidal):** 경계 효과 제거, 자연스러운 패턴.

### 4. 활용 분야
- **생물학 교육:** 형태형성, Turing 패턴, 자기 조직화의 수학적 기초.
- **Generative Art:** 유기적 무늬, 추상 패턴, 음악 시각화.
- **텍스처 생성:** 표피 무늬, 암석 표면, 식물 패턴 합성.
- **데이터 시각화:** 복잡한 동역학계 패턴의 시각화.
- **게임 개발:** 절차적 생물학적 맵, 생물 체표 텍스처.
    `,
  },
  sketch,
  params: [
    {
      key: "feed",
      label: "공급율(Feed)",
      min: 0.01,
      max: 0.1,
      step: 0.001,
      default: 0.055,
    },
    {
      key: "k",
      label: "소비율(Kill)",
      min: 0.02,
      max: 0.08,
      step: 0.001,
      default: 0.062,
    },
    {
      key: "speed",
      label: "시뮬레이션 속도",
      min: 1,
      max: 10,
      step: 1,
      default: 3,
    },
    {
      key: "trailAlpha",
      label: "잔상 강도",
      min: 10,
      max: 150,
      step: 5,
      default: 50,
    },
  ],
  related: ["Cellular Automata", "Space Colonization", "Differential Growth"],
};
