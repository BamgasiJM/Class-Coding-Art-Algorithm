import sketch from './sketch'

export default {
  longDescription: {
    ko: String.raw`
**Shape Morphing(형태 변형)**은 **서로 다른 두 도형(Source Shape & Target Shape)**을 **동일한 수의 정점(Vertex)**으로 재구성한 후, **선형 보간(Linear Interpolation, Lerp)**을 이용하여 부드럽게 변형시키는 애니메이션 알고리즘입니다. 원과 별처럼 위상적으로(Topologically) 전혀 다른 형태 사이에서도, **균등하게 샘플링된 정점들** 사이의 **일대일 대응(Point Correspondence)**을 확립하면 자연스러운 중간 형태가 생성됩니다. 시간 매개변수를 주기적으로 변화시키면, 도형이 쉼 없이 두 형태 사이를 오가며 **호흡하듯 신체적 리듬**을 표현합니다.

### 1. 핵심 수학적 원리
1. **정점 샘플링:**
   - Source 도형(원): 각도 $\theta_i = 2\pi i / N$ (i=0..N-1)에서 반지름 $r$ 따라 샘플
   - Target 도형(별): 각도 $\phi_j = 2\pi j / N$에서, 극 $R_{\max}$와 골짜기 $R_{\min}$ 교대로 샘플
   - 두 도형 모두 **정확히 $N$개의 정점** 생성

2. **정점 대응(Point Matching):**
   - Source의 $i$번째 정점 $P_i^{\text{source}}$과 Target의 $i$번째 정점 $P_i^{\text{target}}$ 연결
   - 각도 기반 샘플링으로 자동 대응 확립; 더 정교한 방법은 Hausdorff distance 최소화

3. **선형 보간:**
   - 보간 계수 $t \in [0, 1]$에 대해:
   - $P_i(t) = (1-t) P_i^{\text{source}} + t P_i^{\text{target}}$
   - 모든 정점을 동시에 보간하여 중간 도형 생성

4. **시간 애니메이션:**
   - $t(T) = 0.5 + 0.5 \sin(\pi T / \text{duration})$ 형태로 $T$에 따라 진동
   - $T \in [0, \text{duration}]$ 범위에서 $t$는 0에서 1로 증가 후 다시 0으로 감소
   - 반복하면 원과 별 사이를 무한히 순환

### 2. 주요 특징 및 장점
- **극도의 부드러움:** 정점 수가 많으면 보간이 거의 무한히 부드럽게 진행.
- **직관적 이해:** 선형 보간의 기하학적 의미가 명확하여, 디버깅과 매개변수 조정이 용이.
- **위상 독립성:** 원과 별처럼 완전히 다른 형태를 연결해도 자연스러운 경로 존재.
- **계산 효율성:** 각 프레임마다 $N$개 정점의 선형 보간만 필요 ($O(N)$).

### 3. 구현 시 고려 사항
- **정점 개수 선택:** 적으면 각진 모양, 많으면 부드럽지만 계산 오버헤드. 보통 100~300.
- **정점 대응 최적화:** 단순 인덱스 순서 대응 대신, 최소 이동 거리를 보장하는 최적 할당(Hungarian algorithm) 사용 시 더 자연스러움.
- **보간 경로 선택:** 선형 보간 외 Catmull-Rom, 베지에 곡선 사용으로 더 유동적 경로 가능.
- **색상 변화:** 도형 변형과 동시에 색상도 변화시켜, 시각적 표현력 강화.

### 4. 활용 분야
- **UI/UX 애니메이션:** 아이콘, 로고, 버튼의 부드러운 상태 전환.
- **모션 그래픽:** 타이틀 애니메이션, 로고 모핑, 시각적 변형 효과.
- **Generative Art:** 형태적 변형을 통한 추상 애니메이션, 음악 시각화.
- **게임 UI:** 캐릭터 상태 표시(원=약함, 별=강함 같은 의미 부여).
- **교육 시뮬레이션:** 두 개념 사이의 연속적 변환, 기하학적 개념 학습.
    `,
    en: String.raw`
Shape Morphing reconstructs two different shapes with the same number of vertices and smoothly transitions between them via linear interpolation. Even topologically distinct forms—like circles and stars—produce natural intermediate shapes through proper vertex correspondence. By modulating the interpolation coefficient periodically, the shape appears to breathe infinitely, creating a mesmerizing visual rhythm that reveals the continuity underlying seemingly discontinuous change.
    `,
  },
  sketch,
params: [
    { key: 'numPoints', label: '도형 정점 개수', min: 30, max: 300, step: 10, default: 150, restart: true },
    { key: 'baseRadius', label: '기본 반경', min: 0.15, max: 0.45, step: 0.03, default: 0.32, unit: '배수' },
    { key: 'starPoints', label: '별 극의 개수', min: 3, max: 12, step: 1, default: 5, restart: true },
    { key: 'starAmplitude', label: '별의 진폭', min: 0.2, max: 1.0, step: 0.05, default: 0.55, restart: true },
    { key: 'morphSpeed', label: '변형 속도', min: 0.01, max: 0.1, step: 0.005, default: 0.025 },
    { key: 'trailAlpha', label: '잔상 길이', min: 5, max: 80, step: 5, default: 28 },
    { key: 'lineWeight', label: '선 굵기', min: 1, max: 5, step: 0.5, default: 2.5, unit: 'px' },
  ],
  related: ['Easing & Interpolation', 'Trigonometric Wave', 'SDF & Metaballs'],
}