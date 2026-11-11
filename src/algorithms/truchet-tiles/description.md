**Truchet Tiles**(트루셰 타일)는 **같은 타일을 돌려 놓아서** 곡선과 미로 같은 무늬를 만드는 방법입니다. 타일은 한 가지뿐이고, 각 칸에서 어느 방향으로 돌려 놓을지만 정합니다. 1704년 프랑스 수도사 트루셰가 처음 생각해 냈다고 알려져 있습니다.

### 1. 핵심 원리

**(1) 타일 한 장**: 정사각형 칸에 두 개의 **호**(원의 일부)를 그립니다. 호는 두 모서리 쪽에서 가운데를 향해 굽어 있습니다.

**(2) 돌리기**: 타일은 90도씩 돌려서 놓을 수 있습니다. 돌릴 수 있는 방향은 0도, 90도, 180도, 270도 4가지입니다. 360도 돌리면 처음과 같아지므로 방향은 4가지뿐입니다.

**(3) 방향 정하기**: 이 예제는 칸마다 노이즈 값을 구하고, 그 값을 0부터 4 사이의 숫자로 바꿔서 방향을 정합니다.

$$\text{방향} = \lfloor 4 \times \text{noise}(i \cdot s,\ j \cdot s,\ t) \rfloor \bmod 4$$

- $i$, $j$는 칸의 가로·세로 번호입니다.
- $s$는 **노이즈 스케일**입니다. 값이 크면 이웃한 칸의 방향이 빨리 달라집니다.
- $t$는 시간입니다. 시간이 흐르면 노이즈가 천천히 바뀌어 무늬가 움직입니다.

노이즈는 가까운 값끼리 비슷하므로, 이웃한 칸은 비슷한 방향을 가집니다. 그래서 호들이 이어져 큰 곡선처럼 보입니다.

### 2. 이 시뮬레이션의 작동 순서

1. 화면을 칸으로 나눕니다.
2. 칸마다 노이즈로 방향을 정합니다.
3. 타일을 그 방향만큼 돌려서 호 두 개를 그립니다.
4. 시간이 흐르면 노이즈 값이 바뀌어 곡선이 천천히 흘러갑니다.

### 3. 이 알고리즘의 장점

- **타일 하나로 복잡한 무늬**가 나옵니다.
- **규칙이 단순함**: 타일은 한 가지이고, 방향만 고르면 됩니다.
- **미로와 곡선을 함께 볼 수 있어서** 무작위 패턴의 원리를 이해하기 좋습니다.

### 4. 구현할 때 주의할 점

- 방향은 4가지뿐입니다. 방향 값을 4보다 크게 해도 같은 방향이 반복되므로, 이 예제는 4로 고정했습니다.
- 호의 크기를 바꾸면 호의 끝이 칸의 가장자리와 맞지 않아 곡선이 끊어질 수 있습니다.

### 5. 활용 분야

- **그래픽 디자인**: 타일 무늬 배경과 패턴.
- **게임 맵**: 미로와 길을 짧은 규칙으로 만들기.
- **제너레이티브 아트**: 흐르는 곡선 작품.

### 직접 실험해 보기

- **타일 크기**를 15와 80으로 바꿔 보세요. 무늬가 얼마나 촘촘한지 비교해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **노이즈 스케일**을 0.05와 0.5로 바꿔 보세요. 방향이 넓게 변하는지, 잘게 변하는지 확인해 보세요.
- **애니메이션 속도**를 0으로 맞춰 보세요. 무늬가 멈추면 곡선이 어떻게 이어지는지 살펴보세요.

<!-- en -->

**Truchet Tiles** make curves and maze-like patterns from one tile that is rotated in different directions. Each cell has a tile with two quarter-circle arcs, and the rotation is chosen by noise. Because neighboring cells get similar noise values, their arcs connect into long flowing curves. The pattern slowly moves over time.

**How it works.** A tile can be turned only in four directions: 0, 90, 180, and 270 degrees. The noise value is multiplied by four and turned into one of those directions. The noise scale controls how quickly the direction changes from cell to cell.

**Try it.** Change the noise scale and the tile size to see how the curves change.
