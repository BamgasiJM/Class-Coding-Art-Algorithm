import sketch from "./sketch";

export default {
  longDescription: {
    ko: String.raw`
**L-System(Lindenmayer System, 린덴마이어 시스템)** 은 생물의 **성장 과정과 분화 규칙**을 **형식 문법과 문자열 재작성**으로 모델링하는 **절차적 생성 알고리즘**입니다. 초기 문자열(Axiom, 공리)에 **생산 규칙**을 반복적으로 적용하여 점진적으로 복잡해지는 문자열을 생성하고, 이를 **Turtle Graphics**(벡터 지시어 기반 그리기)로 해석하면 나무, 식물, 고사리, 산호, 꽃 등 극도로 자연스러운 **분기 구조**(Branching Structure)를 자동 생성할 수 있습니다. 단순한 문법 규칙만으로도 자기유사적이고 생명력 있는 형태가 생겨나므로, 프랙탈과 식물 모델링에서 많이 사용됩니다.

### 1. 핵심 수학적 원리
1. **형식 문법(Formal Grammar):**
   - 알파벳: 기호 집합 $\Sigma = \{F, +, -, [, ], ...\}$
     - $F$: 앞으로 이동(Forward)
     - $+$: 시계 방향 회전(Turn right)
     - $-$: 반시계 방향 회전(Turn left)
     - $[$: 상태 저장(Push stack)
     - $]$: 상태 복원(Pop stack)
   - 공리: $\omega = "F"$ (초기 문자열)
   - 생산 규칙: $P = \{F \to F[+F]F[-F]F, ...\}$ (규칙 집합)

2. **문자열 재작성(String Rewriting):**
   - 제$n$세대 문자열 $S_n$에서 $S_{n+1}$ 생성:
   - 각 기호를 동시에(병렬적으로) 규칙 적용
   - $n$번 반복 후, 최종 문자열은 지수적으로 길어짐 ($|S_n| \propto \lambda^n$, $\lambda$는 성장률)

3. **Turtle Graphics 해석:**
   - 거북이의 위치: $(x, y)$
   - 거북이의 방향: $\theta$ (각도)
   - 한 스텝 거리: $d$ (고정값 또는 세대에 따라 감소)
   - 각 문자에 대한 명령:
     - $F$: $(x, y) \leftarrow (x + d\cos\theta, y + d\sin\theta)$, 선 그리기
     - $+$: $\theta \leftarrow \theta + \delta$ (회전각)
     - $-$: $\theta \leftarrow \theta - \delta$
     - $[$: 스택에 $(x, y, \theta)$ 저장
     - $]$: 스택에서 $(x, y, \theta)$ 복원

4. **자기닮음 성질:**
   - $n$번째 세대의 패턴이 $n-1$번째 패턴과 구조적으로 유사
   - 작은 가지와 큰 가지의 형태가 동일

### 2. 주요 특징 및 장점
- **극도의 우아함:** 몇 줄의 간단한 재작성 규칙만으로, 자연 식물의 놀라운 정교함을 완벽히 재현합니다.
- **성장 과정의 시각화:** 세대를 증가시킬 때마다 식물이 성장하는 과정을 직접 관찰할 수 있습니다.
- **무한 복잡도:** 이론적으로 무한 세대까지 계속 성장하므로, 끝없는 세부 디테일을 가집니다.
- **직관적 제어:** 회전각, 거리, 규칙 변경으로 다양한 식물 형태를 생성합니다.

### 3. 구현 시 고려 사항
- **스택 관리:** 괄호 $[, ]$로 분기 지점을 저장/복원하므로, 스택 자료구조가 필수입니다.
- **세대 제한:** 세대가 증가할수록 문자열이 기하급수적으로 길어져 계산량 증가; 보통 4~6세대가 시각적 균형점.
- **각도와 거리 조정:** 회전각이나 스텝 거리를 동적으로 조정하면 바람의 영향, 중력 굴곡 등을 모사할 수 있습니다.
- **색상 할당:** 세대별, 가지 깊이별로 다른 색상 사용하여 계층 구조 시각화.

### 4. 활용 분야
- **식물 생성:** 게임, 영화, 건축 시각화에서 나무와 식물의 자동 생성 - 핵심 도구.
- **프랙탈 예술:** L-System의 규칙 자체를 예술적으로 탐구하는 순수 수학 예술.
- **생물학 교육:** 식물 성장, 발생학(Developmental Biology), 분기 구조의 수학적 원리.
- **절차적 콘텐츠 생성:** 다양한 규칙과 매개변수 조합으로 무한한 식물 다양성 생성.
- **건축 설계:** 자연-영감적(Bio-inspired) 건축 형태 설계에 기반.
    `,
    en: "L-System (Lindenmayer System) is a procedural generation algorithm that models biological growth through string rewriting rules. Starting from an initial axiom, production rules are repeatedly applied to generate increasingly complex strings, which are then interpreted using Turtle Graphics to produce trees, plants, ferns, corals, and other branching structures. Because complex self-similar forms emerge from a small set of simple rules, L-Systems have become a fundamental technique in fractal geometry and procedural modeling. Today they are widely used in computer graphics, generative art, scientific visualization, and educational demonstrations of natural growth.",
  },
  sketch,
  params: [
    {
      key: 'iterations',
      label: '반복 횟수 (Iterations)',
      min: 1,
      max: 7,
      step: 1,
      default: 5,
      restart: true
    },
    {
      key: 'baseAngle',
      label: '가지 각도 (Angle)',
      min: 15,
      max: 45,
      step: 1,
      default: 25,
      restart: false
    },
    {
      key: 'windSpeed',
      label: '바람 세기 (Wind)',
      min: 0.0,
      max: 0.05,
      step: 0.005,
      default: 0.02,
      restart: false
    }
  ],
  related: ["IFS & Fractal", "Space Colonization", "Differential Growth"],
};