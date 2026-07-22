import sketch from "./sketch";

export default {
  longDescription: {
    en: "Cellular Automata consists of a regular grid of cells, each in one of a finite number of states, which alters and evolves through a discrete set of generations based on mathematical rules determined by neighboring cells. This implementation demonstrates Wolfram’s Rule 90 Elementary Cellular Automaton, mapping a 1D line over time down the vertical axis to illustrate how complex, recursive, and fractal-like Sierpinski structures organically materialize from minimal local behaviors.",
    ko: String.raw`
**Cellular Automata(세포 자동자, CA)**는 **이산 격자 위의 각 셀이 유한한 상태 중 하나를 가지며**, 이웃 셀들의 상태를 바탕으로 한 **결정론적 규칙**에 따라 동시에 상태를 갱신하는 **동역학 시스템**입니다. 오토마타 이론에서 비롯된 이 개념은 **Stephen Wolfram**의 기초적 연구와 존 콘웨이의 Game of Life로 대중화되었으며, 매우 단순한 국소 규칙으로부터 프랙탈, 패턴, 복잡성이 어떻게 창발하는지를 보여주는 수학적 모델로서 생물학, 물리학, 컴퓨터 과학 전반에서 광범위하게 응용됩니다.

### 1. 핵심 수학적 원리
1차원 기초 세포 자동자(Elementary Cellular Automaton)는 다음과 같이 정의됩니다:

1. **상태 공간:** 각 셀 $c_i(t)$는 시간 $t$에서 $\{0, 1\}$ 중 하나의 상태를 가집니다.

2. **규칙 정의:** Wolfram의 규칙 번호(Rule Number) $R$ (0 ~ 255)은 3개 이웃 셀의 가능한 8가지 조합에 대한 다음 상태를 이진 표현으로 정합니다.
   - 이웃 패턴: $\{111, 110, 101, 100, 011, 010, 001, 000\}_2$
   - 각 패턴에 대한 다음 상태: 규칙 번호를 이진화한 8비트에 대응
   - 예: Rule 90은 $01011010_2$이므로, 패턴 $110 \to 1$, $101 \to 0$, 등으로 매핑됩니다.

3. **상태 갱신 규칙:** 매 시간 단계 $t \to t+1$에서 모든 셀이 동시에 갱신됩니다.
   - $c_i(t+1) = f(c_{i-1}(t), c_i(t), c_{i+1}(t))$ (여기서 $f$는 규칙에 따른 결과 함수)

4. **경계 조건:** 격자의 끝에서의 이웃 정의 방식
   - **Open Boundary:** 격자 외부를 0으로 간주
   - **Periodic Boundary:** 양 끝을 연결하여 순환 구조 형성

### 2. 주요 특징 및 장점
- **극도의 단순성:** 규칙이 극히 단순하면서도 (겨우 8가지 경우의 수), 극히 복잡한 패턴이 발생하는 것이 세포 자동자의 핵심 매력입니다.
- **결정론적이면서도 비예측성:** 규칙이 명확하므로 완전히 결정론적이지만, 초기 조건의 미세한 변화가 극적으로 다른 결과를 낳으므로 혼돈적(Chaotic) 특성을 보입니다.
- **프랙탈 구조:** Rule 90은 특히 **시에르핀스키 삼각형(Sierpinski Triangle)**과 정확히 동일한 프랙탈 기하학을 생성하며, 자기 유사성(Self-similarity)과 무한 정교함을 시각적으로 드러냅니다.
- **계산 효율성:** 각 세대는 $O(n)$ 시간에 계산되므로 매우 빠른 시뮬레이션이 가능합니다.

### 3. 구현 시 고려 사항
- **규칙 해석:** 규칙 번호를 이진화하여 올바르게 8개의 이웃 조합과 매핑하는 로직이 정확해야 합니다.
- **경계 조건 선택:** Open Boundary와 Periodic Boundary가 패턴 형성에 미치는 영향이 상이하므로, 미적 목표에 따라 선택합니다.
- **초기 상태의 중요성:** 초기 상태가 단일 활성 셀인지, 무작위인지, 조합된 패턴인지에 따라 결과가 극적으로 달라집니다.
- **시각적 렌더링 최적화:** 세대 수가 크면 화면에 맞추기 위해 셀 크기를 조절하거나, 스케롤 가능한 대규모 그리드를 구현합니다.

### 4. 활용 분야
- **자연 패턴 모델링:** 식물의 분지, 동물 무늬(얼룩말, 표범), 해양 생물의 껍질 패턴 등 생물학적 형태 생성.
- **Generative Art & 시각화:** 셀 상태를 색상, 크기, 투명도로 인코딩하여 추상 예술, 뮤직비디오, 설치미술 제작.
- **게임 동굴 & 지형 생성:** 2D 게임의 절차적 맵 생성, 지하 던전의 자동 설계 알고리즘.
- **복잡계 이론 & 통계 물리학:** 상전이(Phase Transition), 자기 조직화(Self-Organization), 비평형 동역학 연구.
- **암호학:** 규칙 기반 난수 생성기, 선형 피드백 시프트 레지스터(LFSR) 기반 암호화.
    `,
  },
  sketch,
  params: [
  {
    key: 'ruleNumber',
    label: 'Rule 번호 : 50,54,77,90,129,183',
    min: 0,
    max: 255,
    step: 1,
    default: 90,
    restart: true,
  },
  {
    key: 'cellSize',
    label: '셀 크기',
    min: 2,
    max: 12,
    step: 1,
    default: 4,
    unit: 'px',
    restart: true,
  },
  {
    key: 'startMode',
    label: '초기 상태',
    min: 0,
    max: 1,
    step: 1,
    default: 0,
    restart: true,
  },
  {
    key: 'drawSpeed',
    label: '세대 속도',
    min: 1,
    max: 10,
    step: 1,
    default: 1,
  },
],
  related: ["IFS & Fractal", "L-System", "Reaction-Diffusion"],
};
