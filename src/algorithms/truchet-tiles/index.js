import sketch from "./sketch";

export default {
  longDescription: {
    ko: String.raw`
**Truchet Tiles(트루셰 타일)**는 각 **단위 타일(Unit Tile)**이 한 모서리에서 반대 모서리로 연결되는 **곡선(Arc)** 또는 **선분(Line)**을 가진 **타일 패턴(Tile Pattern)**입니다. 모든 타일의 기하학적 구조는 동일하지만, **회전 방향(Orientation)**을 **노이즈(Noise)** 또는 **규칙(Rule)**으로 제어하면 **연속적인 경로(Continuous Paths)**와 **복잡한 흐름 구조(Complex Flow Pattern)**가 자발적으로 형성됩니다. **Perlin Noise**로 회전을 조절하면 **유기적이고 부드러운 흐름**, **규칙으로 조절하면 정교한 미로나 기하학적 패턴**을 생성합니다. 이는 **Wang Tiles**보다 간단하면서도 강력한 **절차적 생성** 도구입니다.

### 1. 핵심 수학적 원리
1. **기본 Truchet 타일:**
   - 정사각형 타일: 한 모서리에서 대각 대면의 모서리로 곡선
   - 2가지 기본 방향: 좌상-우하 또는 우상-좌하

2. **회전(Orientation):**
   - 타일의 각도: $\theta = \text{Noise}(x, y) \times 2\pi$ (0~$2\pi$ 범위)
   - 또는 이산 방향: $\theta \in \{0, \pi/2, \pi, 3\pi/2\}$ (4방향)

3. **곡선 표현:**
   - 호(Arc): 반지름 $r = \frac{s}{2}$ (타일 크기 $s$), 중심은 타일 모서리
   - 직선(Line): 양 끝점 직선 연결
   - 매개변수 표현: $(x(t), y(t)) = (r\cos(t), r\sin(t)) + \mathbf{c}$ ($t \in [\alpha, \beta]$)

4. **경로 추적:**
   - 이웃 타일과의 경로 연속성: 한 타일의 끝점이 이웃 타일의 시작점과 일치
   - 최종 경로: 시작점에서 출발하여 인접 타일을 따라 순회하는 연속 곡선

### 2. 주요 특징 및 장점
- **극도의 단순성:** 단일 타일과 회전 규칙만으로 무한히 복잡한 패턴 생성.
- **창발성:** 국소 규칙(노이즈)으로부터 전역 구조(경로, 흐름) 창발.
- **효율성:** 모든 타일이 동일하므로 메모리 낭비 없음; 런타임 렌더링 가능.
- **시각적 우아함:** 매끄러운 곡선, 유기적인 흐름감, 수학적 아름다움.

### 3. 구현 시 고려 사항
- **곡선 해상도:** 곡선을 여러 점으로 샘플링할 때 정확도 vs 성능 트레이드오프.
- **노이즈 스케일:** 작으면 매끄럽고 연결된 경로, 크면 끊긴 자유로운 패턴.
- **색상 할당:** 경로 ID, 거리, 노이즈 값에 따라 색상 변화로 구조 강조.
- **애니메이션:** 노이즈를 시간 함수로 만들면 동적으로 변하는 패턴.

### 4. 활용 분야
- **벽지 & 패턴 설계:** 절차적 배경 생성, 텍스처 합성.
- **게임 설계:** 미로, 통로, 흐름 맵 생성.
- **Generative Art:** 흐름 시각화, 음악 시각화, 추상 패턴.
- **건축 설계:** 타일 및 바닥재 패턴, 구조 장식.
- **교육:** 타일링, 위상수학, 경로 추적 개념.
    `,
    en: String.raw`
Truchet Tiles consists of identical square tiles, each bearing a single curve connecting one edge to the opposite edge. By controlling tile rotation via noise or rules, continuous paths and complex flow patterns emerge globally from simple local variation. Unlike Wang Tiles which require edge-color matching, Truchet achieves coherence through geometric continuity—a curve exiting one tile enters the next at the same point. This makes it exceptionally elegant and efficient for procedural generation.
    `,
  },
  sketch,
  params: [
    { key: 'tileSize', label: '타일 크기', min: 15, max: 80, step: 5, default: 40, unit: 'px', restart: true },
    { key: 'timeSpeed', label: '애니메이션 속도', min: 0, max: 0.01, step: 0.001, default: 0.002 },
    { key: 'noiseScaleX', label: '노이즈 스케일 X', min: 0.05, max: 0.5, step: 0.05, default: 0.2 },
    { key: 'noiseScaleY', label: '노이즈 스케일 Y', min: 0.05, max: 0.5, step: 0.05, default: 0.2 },
    { key: 'orientationCount', label: '방향 개수', min: 2, max: 12, step: 1, default: 6, restart: true },
    { key: 'lineWeight', label: '선 굵기', min: 0.5, max: 5, step: 0.5, default: 2, unit: 'px' },
    { key: 'arcRadius', label: '호 크기', min: 0.5, max: 1.5, step: 0.1, default: 1.0 },
  ],
  related: ["Flow Field", "Perlin / Simplex Noise", "Cellular Automata"],
};
