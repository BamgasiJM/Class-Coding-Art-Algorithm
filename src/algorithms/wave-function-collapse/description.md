**Wave Function Collapse**(파동 함수 붕괴, 줄여서 **WFC**)는 **각 칸이 여러 가능성을 동시에 가진 상태에서 시작해, 이웃과 맞도록 하나씩 정해 가며 전체 그림을 완성하는** 방법입니다. 이름은 양자역학의 용어를 빌려 왔지만, 실제로는 **제약 조건을 지키며 퍼즐을 맞추는 방법**입니다. 게임 맵이나 픽셀 아트를 자동으로 만들 때 쓰입니다.

### 1. 핵심 원리

**(1) 타일과 연결면**: 이 예제는 여덟 종류의 타일을 씁니다. 빈 칸, 직선, 모서리, 십자 모양입니다. 각 타일의 네 변에는 길이 연결되는지 여부가 있습니다. 두 타일이 맞닿는 변의 연결 상태가 같아야 이어집니다.

**(2) 가능성 목록**: 처음에는 모든 칸이 어떤 타일이든 될 수 있습니다. 칸마다 가능한 타일의 목록을 가지고 있습니다. 목록의 길이를 **엔트로피**(불확실한 정도)라고 부릅니다. 목록이 짧을수록 결정이 가까운 칸입니다.

**(3) 가장 확실한 칸부터 정하기**: 아직 정해지지 않은 칸 중에서 엔트로피가 가장 낮은 칸을 고릅니다. 그 칸에서 가능한 타일 중 하나를 무작위로 골라 확정합니다. 이때 타일마다 가중치가 있어서, 자주 나와야 하는 타일은 더 자주 뽑힙니다.

**(4) 제약 전파**: 확정된 칸의 연결면을 보고, 이웃 칸의 가능성 목록에서 맞지 않는 타일을 지웁니다. 지운 결과로 또 다른 칸의 목록이 줄어들면, 그 칸의 이웃에도 같은 일을 반복합니다. 이를 **전파**라고 합니다.

**(5) 끝내기**: 모든 칸이 정해지면 그림이 완성됩니다.

### 2. 이 시뮬레이션의 작동 순서

1. 모든 칸에 여덟 종류의 타일 가능성을 넣습니다. 불확실한 칸은 작은 점으로 보이고, 가능성이 적을수록 점이 진해집니다.
2. 매 프레임 가장 확실한 칸 하나를 골라 타일을 확정합니다.
3. 확정된 칸의 영향을 이웃으로 퍼뜨려서, 맞지 않는 가능성을 지웁니다.
4. 모든 칸이 정해지면 잠시 기다린 뒤 새로 시작합니다.

### 3. 이 알고리즘의 장점

- **규칙만 정하면** 복잡한 그림이 자동으로 만들어집니다.
- 맵이나 패턴을 디자인할 때 사람이 모든 칸을 직접 그리지 않아도 됩니다.
- 제약 조건을 전파하는 원리는 퍼즐 풀이와 인공지능 문제 해결에서도 씁니다.

### 4. 구현할 때 주의할 점

- **모순**이 생기는 경우가 있습니다. 어떤 칸이 가능한 타일을 하나도 갖지 못하면, 이미 정한 이웃과 맞는 그림을 만들 수 없습니다. 이때 완벽한 해결은 처음부터 다시 시작하는 것입니다.
- 이 예제는 모순이 생기면 간단한 방법으로 칸을 다시 열어 둡니다. 그래서 가끔 이음새가 맞지 않는 곳이 보일 수 있습니다.
- 타일 종류와 연결 규칙이 복잡할수록 모순이 자주 생깁니다.

### 5. 활용 분야

- **게임 맵**: 도시, 던전, 마을 배치를 자동으로 만들기.
- **픽셀 아트와 텍스처**: 작은 견본 그림에서 큰 그림 만들기.
- **제너레이티브 아트**: 규칙으로 만드는 타일 그림.

### 직접 실험해 보기

- **그리드 크기**를 5와 40으로 바꿔 보세요. 칸이 많아질수록 그림이 얼마나 복잡해지고, 완성까지 얼마나 걸리는지 확인해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **재시작 대기 시간**을 500ms와 5000ms로 바꿔 보세요. 완성된 그림을 얼마나 오래 보여 주는지 비교해 보세요.

<!-- en -->

**Wave Function Collapse** builds a picture from tiles. Every cell starts with all tile options possible. Each step, the sketch picks the cell with the fewest options, fixes it to one random tile, and removes the options that no longer match its neighbors. This spreading of constraints continues until every cell is fixed, so the whole picture fits together.

**How it works.** Tiles have connection sockets on their four sides, and neighbors must match at the shared edge. The number of options in a cell is called its entropy. The lowest-entropy cell is collapsed first. Sometimes a cell runs out of options, which is a contradiction, and this simple sketch then reopens that cell, so a few seams may not match.

**Try it.** Change the grid size to see how the picture grows more complex.
