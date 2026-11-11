**Maze Generation**(미로 생성)은 **길을 하나씩 뚫어 가면서, 막다른 곳에 이르면 되돌아와 다른 길을 뚫는** 방법으로 미로를 만드는 것입니다. 이 방식은 **깊이 우선 탐색(DFS)** 이라는 탐색 방법과 같은 원리입니다. 처음부터 끝까지 한 번만 지나가면, 모든 칸이 연결된 미로가 완성됩니다.

### 1. 핵심 원리

**(1) 격자와 벽**: 미로는 칸(셀)으로 이루어진 격자입니다. 각 칸은 위, 오른쪽, 아래, 왼쪽에 벽을 가집니다. 처음에는 모든 칸이 네 벽을 가지고 있습니다.

**(2) 길 뚫기**: 현재 칸에서 아직 방문하지 않은 이웃을 무작위로 하나 고릅니다. 그 이웃과 현재 칸 사이의 벽을 뚫고, 그 이웃으로 이동합니다.

**(3) 되돌아가기 (백트래킹)**: 주변에 방문하지 않은 이웃이 없으면, 지나온 길을 거꾸로 되돌아갑니다. 되돌아간 칸에서 다시 방문하지 않은 이웃을 찾아 길을 뚫습니다.

**(4) 끝내기**: 모든 칸을 방문하고 되돌아갈 곳도 없으면 미로가 완성됩니다.

이 방식으로 만든 미로에는 **어느 두 칸 사이든 길이 정확히 하나**뿐입니다. 그래서 고리가 없는 완벽한 미로가 됩니다.

### 2. 이 시뮬레이션의 작동 순서

1. 격자를 만들고 모든 벽을 세웁니다. 시작 칸을 방문한 칸으로 표시합니다.
2. 매 프레임 설정한 횟수만큼 길 뚫기와 되돌아가기를 반복합니다.
3. 지금 탐색 중인 칸은 강조색으로 표시합니다.
4. 모든 칸을 방문하면 잠시 기다린 뒤 새 미로를 만듭니다.

### 3. 이 알고리즘의 장점

- 규칙이 단순해서 구현하기 쉽습니다.
- 모든 칸이 빠짐없이 연결되며, 고리가 없는 미로가 만들어집니다.
- 되돌아가기 원리는 게임의 경로 탐색과 퍼즐 풀이에서도 많이 쓰입니다.

### 4. 구현할 때 주의할 점

- 칸이 많아지면 탐색 횟수가 늘어나서 완성까지 시간이 오래 걸립니다.
- 되돌아가기 기록을 스택(쌓아 두는 자료 구조)에 저장해야 합니다. 이 기록이 없으면 되돌아갈 길을 잃어버립니다.

### 5. 활용 분야

- **게임 맵**: 던전과 미로 같은 지형을 자동으로 만들기.
- **경로 탐색**: 길이 있는지 확인하고 찾는 기본 원리.
- **제너레이티브 아트**: 미로 무늬 작품.

### 직접 실험해 보기

- **격자 분할 수**를 8과 50으로 바꿔 보세요. 칸이 많아질수록 미로가 얼마나 복잡해지는지 확인해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **생성 속도**를 1과 50으로 바꿔 보세요. 되돌아가는 과정이 얼마나 빠르게 보이는지 비교해 보세요.
- **방문 영역 밝기**를 0과 40으로 바꿔 보세요. 이미 지나간 길이 어떻게 보이는지 살펴보세요.

<!-- en -->

**Maze Generation** builds a maze by carving paths one step at a time. When the walk reaches a dead end, it backs up along the path it came from and carves a new branch. This is depth-first search with backtracking. Visiting every cell once produces a maze in which there is exactly one route between any two cells.

**How it works.** Each cell starts with four walls. The walker picks a random unvisited neighbor, removes the wall between them, and moves on. When no unvisited neighbors remain, it goes back using a stack, which records the path taken.

**Try it.** Change the grid size and the generation speed to see how the maze grows.
