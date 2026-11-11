**Wang Tiles**(왕 타일)는 **가장자리의 색이 맞는 타일만 이웃해서 놓는** 방법입니다. 각 타일의 네 변에는 색이 하나씩 있고, 두 타일이 맞닿는 변의 색이 같아야 합니다. 이 규칙만 지키면 같은 타일 몇 종류로도 넓은 바닥 무늬를 이어 붙일 수 있습니다. 1961년 수학자 왕 하오가 이 아이디어를 제안했습니다.

### 1. 핵심 원리

**(1) 타일의 변**: 각 타일은 위, 오른쪽, 아래, 왼쪽 네 변에 색 번호를 하나씩 가집니다. 그림에서는 각 변을 삼각형으로 칠해서 보여 줍니다.

**(2) 이웃 규칙**: 타일을 한 줄씩 왼쪽에서 오른쪽, 위에서 아래로 놓습니다. 새 타일은 다음 두 조건을 만족해야 합니다.
- 왼쪽 이웃 타일의 **오른쪽 변**과, 새 타일의 **왼쪽 변**의 색이 같아야 합니다.
- 위쪽 이웃 타일의 **아래 변**과, 새 타일의 **위 변**의 색이 같아야 합니다.

**(3) 타일 종류 만들기**: 모든 색 조합을 다 쓰면 타일이 너무 많아집니다. 이 예제는 필요한 조합이 빠지지 않도록, 위 변과 왼쪽 변의 색 조합마다 타일을 하나씩 먼저 만들고, 나머지는 무작위로 채웁니다. 그래서 어떤 칸에서도 맞는 타일이 항상 있습니다.

### 2. 이 시뮬레이션의 작동 순서

1. 색의 종류(경계 색상 수)를 정하고, 그 색들로 타일 종류를 만듭니다.
2. 화면의 칸을 왼쪽 위에서부터 한 칸씩 채웁니다. 이웃의 색과 맞는 타일 중 하나를 무작위로 고릅니다.
3. 타일마다 네 변의 색을 삼각형으로 칠합니다. 대각선을 얇게 그어 이음새를 보이게 합니다.

### 3. 이 알고리즘의 장점

- **적은 타일로 넓은 무늬**를 만들 수 있습니다.
- **규칙만 지키면 어디든 이어 붙일 수 있어서**, 게임의 맵 타일이나 바닥 무늬에 씁니다.
- 타일 종류가 많을수록 같은 모양이 반복되는 것이 덜 눈에 띕니다.

### 4. 구현할 때 주의할 점

- 색을 맞추는 방법을 잘못 짜면 타일이 이어지지 않고 끊어져 보입니다. 이 예제는 **그림과 검사가 같은 변**을 기준으로 하도록 맞췄습니다.
- 타일 종류가 적으면 맞는 타일을 찾지 못하고 패턴 생성이 실패할 수 있습니다. 그래서 필요한 조합을 먼저 넣습니다.

### 5. 활용 분야

- **게임 맵**: 짧은 타일 세트로 넓은 지도를 만들기.
- **바닥과 벽 무늬**: 디자인 타일 패턴.
- **제너레이티브 아트**: 색이 이어지는 타일 그림.

### 직접 실험해 보기

- **경계 색상 수**를 2와 5로 바꿔 보세요. 색이 많을수록 타일 조합이 얼마나 다양해지는지 확인해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **타일 종류 수**를 24와 48로 바꿔 보세요. 같은 타일이 얼마나 자주 반복되는지 비교해 보세요. 이 값도 바꾸면 다시 시작합니다.
- **타일 크기**를 바꿔 보세요. 칸이 커질수록 이음새가 어떻게 보이는지 살펴보세요. 이 값도 바꾸면 다시 시작합니다.

<!-- en -->

**Wang Tiles** are square tiles with a color on each edge. Two neighboring tiles must have the same color on their shared edge. Following this one rule lets a small set of tiles cover a large area without visible seams. The sketch picks a tile for each cell, from top-left to bottom-right, so that it matches its left and top neighbors.

**How it works.** The sketch first creates a tile for every combination of top and left colors, so there is always a matching tile. Then it fills the rest of the tile set with random tiles. Each tile's four edges are drawn as colored triangles that meet in the center.

**Try it.** Change the number of edge colors and the number of tile types to see how the pattern changes.
