import sketch from './sketch'

export default {
  longDescription: {
    ko: String.raw`
**Maze Generation**(미로 생성하기)은 **깊이 우선 탐색(Depth-First Search, DFS)** 기반의 **백트래킹(Backtracking)** 알고리즘으로, 격자 공간의 벽을 무작위로 허물며 **완전 연결 미로**(Perfect Maze, 시작에서 끝까지 유일한 경로가 존재하는 미로)를 생성하는 절차적 생성 알고리즘입니다. 현재 셀에서 **방문하지 않은 이웃 셀**을 무작위로 선택하여 그 사이의 벽을 제거하고, 경로를 스택에 저장합니다. 막다른 길에 도달하면 스택을 역추적하여 새로운 분기를 탐색하며, 이 과정을 시각화하면 미로가 마치 살아있는 생명체처럼 천천히 펼쳐지는 모습을 관찰할 수 있습니다.

### 1. 핵심 수학적 원리
1. **격자 구조:**
   - 격자 크기: $W \times H$ (가로 × 세로 셀 개수)
   - 각 셀의 상태: 방문됨/미방문됨
   - 각 셀과 이웃 사이: 벽 (passage) / 열림 (open)

2. **깊이 우선 탐색(DFS):**
   - 스택 $S$ 초기화: 시작 셀을 스택에 추가
   - 반복:
     1. 스택 최상단 셀 $c$ 꺼냄
     2. $c$의 모든 이웃 중 미방문 이웃 찾음
     3. 미방문 이웃이 있으면:
        - 하나를 무작위로 선택: $n$
        - $c$와 $n$ 사이의 벽 제거
        - $n$을 방문 표시
        - $n$을 스택에 추가
     4. 미방문 이웃이 없으면:
        - 스택에서 꺼내기 (백트래킹)
        - 다른 분기 탐색
   - 스택이 비면 완료

3. **공간 복잡도:**
   - 각 셀이 정확히 한 번만 방문: $O(W \times H)$
   - 스택 깊이: 최악의 경우 $O(W \times H)$

4. **완전 미로의 특성:**
   - **사이클 없음(Acyclic):** 트리 구조 (그래프 이론)
   - **연결성(Connectivity):** 모든 셀이 연결
   - **유일 경로:** 시작에서 끝까지 정확히 하나의 경로만 존재

### 2. 주요 특징 및 장점
- **완전성 보장:** 생성된 미로는 항상 시작에서 끝까지 경로가 정확히 하나 존재합니다.
- **균형 잡힌 난이도:** DFS의 특성상 긴 복도와 짧은 막다른 길이 적절히 혼합되어, 해법 난이도가 자연스럽습니다.
- **절차적 생성의 우아함:** 무작위 선택만으로 논리적으로 일관된 미로가 자동 생성됩니다.
- **시각화의 매력:** 생성 과정 자체가 시각적으로 흥미로우며, 애니메이션으로 표현하기 좋습니다.

### 3. 구현 시 고려 사항
- **이웃 선택:** 각 셀의 4개 이웃(상하좌우) 중 미방문 이웃만 후보로 고려합니다.
- **무작위성:** 이웃 선택과 스택에서의 선택이 무작위여야 다양한 미로 생성.
- **메모리 효율:** 격자가 크면 스택과 방문 배열의 메모리 사용이 커집니다.
- **생성 속도 시각화:** 각 프레임에서 여러 스텝(예: 10단계)을 실행하여, 생성 과정을 부드럽게 시각화합니다.

### 4. 활용 분야
- **게임 설계:** 게임 맵, 던전 자동 생성의 기초 알고리즘 (로그라이크 게임).
- **퍼즐 생성:** 종이 미로 책, 앱 미로 게임의 자동 생성.
- **교육:** 그래프 알고리즘(DFS, 백트래킹), 탐색 알고리즘의 구체적 사례.
- **아트 & 시각화:** 미로 생성 과정 자체를 시각 예술로 표현하는 예술가 도구.
- **건축 설계:** 건물 레이아웃, 보안 시스템 설계 참고.
    `,
    en: 'This algorithm generates a perfect maze using depth-first search (DFS) with backtracking. Starting from the current cell, it randomly picks an unvisited neighbor, removes the wall between them, and pushes the path onto a stack. When it hits a dead end, it backtracks by popping the stack until a new branch is found. Visualizing this process reveals how the maze procedurally unfolds.',
  },
  sketch,
  params: [
  {
    key: 'cols',
    label: '격자 분할 수',
    min: 8,
    max: 50,
    step: 2,
    default: 16,
    restart: true,
  },
  {
    key: 'stepsPerFrame',
    label: '생성 속도',
    min: 1,
    max: 50,
    step: 1,
    default: 1,
  },
  {
    key: 'wallWeight',
    label: '벽 두께',
    min: 0.5,
    max: 4,
    step: 0.1,
    default: 1.5,
  },
  {
    key: 'visitedBrightness',
    label: '방문 영역 밝기',
    min: 0,
    max: 40,
    step: 1,
    default: 18,
  },
  {
    key: 'restartDelay',
    label: '재시작 대기',
    min: 500,
    max: 5000,
    step: 100,
    default: 2500,
    unit: 'ms',
  },
],
  related: ['Space Colonization', 'Cellular Automata', 'Diffusion-Limited Aggregation'],
}