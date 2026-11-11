**Quadtree**(쿼드트리)는 **넓은 공간을 네 칸으로 나누고, 그 칸이 너무 붐비면 다시 네 칸으로 나누는** 방법입니다. 점이 많은 곳은 칸이 잘게 나뉘고, 점이 적은 곳은 큰 칸 그대로 둡니다. 그래서 공간을 필요한 만큼만 나눠서 관리할 수 있습니다.

### 1. 핵심 원리

**(1) 칸 나누기**: 가장 큰 칸(전체 화면)에서 시작합니다. 칸 하나에 들어갈 수 있는 점의 최대 개수를 **노드 수용량**이라고 합니다. 점이 수용량을 넘으면 칸을 가로와 세로로 반씩 나눠서 네 개의 작은 칸을 만듭니다.

**(2) 점 나눠 담기**: 나눈 뒤에는 기존 점들을 그 점이 속하는 작은 칸으로 옮깁니다. 새 점도 마찬가지로 해당하는 칸에 넣습니다.

**(3) 깊이 제한**: 칸을 계속 나누면 아주 작은 칸이 생길 수 있습니다. 그래서 나눌 수 있는 최대 깊이를 정해 둡니다. 이 깊이에 이른 칸은 수용량을 넘어도 더 나누지 않습니다.

칸 구조를 쓰면 한 점 주변에 누가 있는지 찾을 때, 화면 전체를 뒤지지 않고 가까운 칸만 확인하면 됩니다. 이것이 쿼드트리를 쓰는 가장 큰 이유입니다.

### 2. 이 시뮬레이션의 작동 순서

1. 파티클을 화면 곳곳에 무작위로 놓고, 각각 속도를 줍니다.
2. 매 프레임 파티클을 움직이고, 화면 끝에 닿으면 방향을 바꿉니다.
3. 전체 화면을 담당하는 쿼드트리를 새로 만듭니다.
4. 모든 파티클을 쿼드트리에 넣습니다. 칸이 넘치면 그때마다 나눕니다.
5. 칸의 경계선을 그리고, 가장 작은 칸 안의 파티클을 점으로 찍습니다. 깊은 칸일수록 선이 얇고 흐리게 보입니다.

### 3. 이 알고리즘의 장점

- 점이 많이 모인 곳과 적은 곳을 **자동으로 구분**해서 관리합니다.
- 주변 점을 찾는 검색이 빨라서, 충돌 판정과 게임 물리에서 많이 씁니다.
- 공간 구조를 그림으로 보여 주기 좋습니다.

### 4. 구현할 때 주의할 점

- 점이 한곳에 몰리면 칸이 깊게 나뉘어 트리가 커집니다. 그래서 최대 깊이로 막습니다.
- 이 예제는 매 프레임 트리를 새로 만듭니다. 점이 움직일 때마다 다시 넣는 방식입니다.

### 5. 활용 분야

- **게임**: 가까운 적이나 충돌 대상만 골라서 검사하기.
- **지도와 이미지**: 공간 검색과 이미지 압축.
- **제너레이티브 아트**: 공간을 나눈 격자 무늬 작품.

### 직접 실험해 보기

- **파티클 개수**를 50과 1000으로 바꿔 보세요. 점이 많을수록 칸이 얼마나 잘게 나뉘는지 확인해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **노드 수용량**을 1과 10으로 바꿔 보세요. 칸 하나에 점이 몇 개까지 들어가야 나뉠지 정하는 값이 화면을 어떻게 바꾸는지 관찰해 보세요.
- **트리 최대 깊이**를 2와 9로 바꿔 보세요. 칸을 얼마나 깊이 나눌 수 있는지에 따라 가장 작은 칸의 크기가 어떻게 달라지는지 살펴보세요.

<!-- en -->

**Quadtree** divides a space into four parts, and divides a part again whenever it holds too many points. Crowded areas get small cells, and empty areas keep large cells. This lets a program search nearby points quickly, because it only needs to check the cells close to a point.

**How it works.** Each cell can hold a set number of points, called the capacity. When a cell overflows, it is split into four smaller cells, and its points are moved into them. A maximum depth stops the splitting from going on forever.

**Try it.** Change the number of particles, the capacity, and the maximum depth to see how the cells split.
