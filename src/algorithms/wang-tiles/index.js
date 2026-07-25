import sketch from "./sketch";

export default {
  longDescription: {
    ko: String.raw`
**Wang Tiles(왕 타일)**은 각 **정사각형 타일의 네 변에 색(또는 패턴)**이 할당된 **제약 충족 타일링(Constraint-Satisfaction Tiling)** 알고리즘입니다. **타일링 규칙:** 인접한 두 타일의 공유 변(Shared Edge)의 색이 반드시 일치해야 합니다. 이 **국소 제약(Local Constraint)**만으로도, **유한한 타일 집합(일반적으로 16개 이하)**으로부터 **반복되지 않는 비주기적 패턴(Aperiodic Pattern)**을 생성할 수 있습니다. 이는 **Penrose Tiling**보다 계산이 훨씬 간단하면서도 수학적 깊이가 있으며, **게임 맵, 텍스처, 바닥 패턴** 등에서 강력한 절차적 생성 도구입니다.

### 1. 핵심 수학적 원리
1. **타일 정의:**
   - 각 타일: 네 변의 색 $(c_{\text{top}}, c_{\text{right}}, c_{\text{bottom}}, c_{\text{left}})$
   - 색 집합: $C = \{1, 2, 3, ..., k\}$ (k가지 색)
   - 타일 집합: $T = \{t_1, t_2, ..., t_n\}$ (일반적으로 $n = 4k^2$ 이하)

2. **배치 규칙(Tiling Rule):**
   - 타일 $(t_i, t_j)$가 좌우로 인접: $c_{\text{right}}(t_i) = c_{\text{left}}(t_j)$
   - 타일 $(t_i, t_j)$가 상하로 인접: $c_{\text{bottom}}(t_i) = c_{\text{top}}(t_j)$

3. **배치 알고리즘:**
   - 격자: $m \times n$ 크기 타일 배치
   - 각 셀 $(i, j)$에 가능한 타일들의 집합 $P_{ij}$ 유지
   - 반복:
     1. 엔트로피가 가장 낮은 셀 선택
     2. 가능한 타일 중 하나 무작위 선택
     3. 이웃 셀의 가능 타일 집합에서 색 불일치 타일 제거
   - 일종의 **Wave Function Collapse**

4. **비주기성 증명:**
   - de Bruijn의 위상수학적 증명: 특정 색 조합으로 무한 배치의 가능성 보장
   - 하지만 실제로는 대부분의 유한 배치가 비주기적

### 2. 주요 특징 및 장점
- **극도의 단순성:** 색상 매칭만으로 복잡한 제약 충족.
- **계산 효율성:** Backtracking이나 SAT solver 불필요; 탐욕적 배치 가능.
- **무한 다양성:** 유한 타일로 무한히 많은 배치 가능.
- **수학적 깊이:** 타일링 이론, 위상수학, 부호 이론 연계.

### 3. 구현 시 고려 사항
- **타일 세트 설계:** 색 조합이 모든 인접 상황을 커버하는지 확인.
- **Backtracking:** 배치 실패 시 이전 상태로 복원 필요.
- **색상 시각화:** 색상 대신 패턴(기울기선, 기하학)으로 더 풍부한 시각.
- **성능 최적화:** 타일 집합이 크면 가능 타일 탐색 오버헤드; 해시 테이블 활용.

### 4. 활용 분야
- **게임 개발:** 절차적 맵 생성, 던전 구조, 환경 타일 배치.
- **텍스처 합성:** 패턴 확장, 원본 이미지 구조 보존.
- **벽지 & 바닥재:** 비주기적 타일 배치, 시각적 단조로움 회피.
- **타일링 수학 교육:** 제약 충족, 비주기성, 위상수학 개념.
- **Generative Art:** 규칙 기반 추상 패턴, 음악 시각화.
    `,
    en: String.raw`
Wang Tiles assigns a color to each edge of square tiles and arranges them so that adjacent tiles have matching edge colors. This local constraint alone enables generation of aperiodic (non-repeating) patterns from a finite tile set. Compared to explicit aperiodic tilings like Penrose, Wang Tiles are computationally simpler yet mathematically profound. They are ideal for procedural generation: game maps, textures, floor patterns—anywhere you need infinite non-repeating variety from simple rules.
    `,
  },
  sketch,
params: [
  {
    key: 'tileSize',
    label: '타일 크기',
    min: 20,
    max: 80,
    step: 2,
    default: 40,
    unit: 'px',
    restart: true,
  },
  {
    key: 'numColorVariations',
    label: '경계 색상 수',
    min: 2,
    max: 8,
    step: 1,
    default: 3,
    restart: true,
  },
  {
    key: 'tileComplexity',
    label: '타일 종류 수',
    min: 4,
    max: 32,
    step: 1,
    default: 12,
    restart: true,
  },
  {
    key: 'gridLineAlpha',
    label: '구분선 투명도',
    min: 0,
    max: 180,
    step: 5,
    default: 80,
  },
  {
    key: 'tileOutlineWeight',
    label: '외곽선 두께',
    min: 0,
    max: 5,
    step: 0.1,
    default: 2,
  },
  {
    key: 'colorBrightness',
    label: '밝기',
    min: 0.3,
    max: 1.2,
    step: 0.05,
    default: 1.0,
    restart: true,
  },
],
  related: ["Truchet Tiles", "Wave Function Collapse", "Circle Packing"],
};