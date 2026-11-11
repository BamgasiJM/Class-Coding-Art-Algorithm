**Poisson Disk Sampling**(푸아송 디스크 샘플링)은 **점들이 서로 최소 거리 이상 떨어지도록** 무작위로 흩뿌리는 방법입니다. 완전히 무작위로 찍으면 점이 한곳에 뭉치거나 빈 곳이 생기지만, 이 방법은 점들이 고르게 퍼진 모양을 만듭니다. 이런 분포를 **블루 노이즈**라고 부르며, 자연스러운 배치에 많이 씁니다.

### 1. 핵심 원리

이 예제는 브리드슨(Bridson)의 방법을 씁니다.

**(1) 시작**: 가운데 근처에 점 하나를 놓고, 이 점을 "아직 이웃을 찾는 중인 점"의 목록에 넣습니다.

**(2) 후보 찾기**: 목록에서 점 하나를 골라서, 그 점 주변 **최소 거리와 그 두 배 사이의 고리 모양 영역**에 후보 위치를 여러 개(후보 생성 시도 횟수) 만듭니다.

**(3) 검사**: 후보 위치에서 **최소 거리 안에 다른 점이 없으면** 새 점으로 받아들입니다. 받아들인 점은 목록에 추가합니다.

**(4) 퇴장**: 후보를 모두 시도했는데 하나도 받아들여지지 않으면, 그 점은 목록에서 뺍니다.

목록이 빌 때까지 이 과정을 반복하면, 모든 빈 곳에 점이 채워지고 점 사이 거리는 항상 최소 거리 이상이 됩니다.

### 2. 이 시뮬레이션의 작동 순서

1. 가운데 근처에 첫 점을 놓습니다.
2. 프레임마다 목록에서 점을 몇 개(프레임당 처리 점 수) 골라 후보를 만들고 검사합니다.
3. 받아들인 점은 원으로 그립니다. 새로 생긴 점일수록 밝고 크게 보입니다.
4. 모든 점이 완성되면, 각 점 주변에 최소 거리 원을 잠깐 보여 줍니다. 그다음 잠시 뒤에 새로 시작합니다.

### 3. 이 알고리즘의 장점

- **고르게 흩어진 점**을 만들 수 있습니다. 빈 곳과 뭉친 곳이 모두 줄어듭니다.
- 나무 배치, 식물의 씨앗, 별의 분포처럼 **자연스러운 배치**를 흉내 내기 좋습니다.
- 점을 하나씩 추가하므로 과정을 단계별로 관찰하기 좋습니다.

### 4. 구현할 때 주의할 점

- **격자**를 써서 검사 범위를 줄입니다. 격자 한 칸의 크기는 최소 거리를 √2로 나눈 값으로 잡으면, 한 칸에 점이 최대 하나만 들어갑니다.
- **후보 생성 시도 횟수**가 적으면 빈 곳이 많이 남고, 많으면 계산이 늘어납니다.

### 5. 활용 분야

- **게임과 맵**: 나무, 바위, 몬스터의 자연스러운 배치.
- **그래픽**: 샘플링 노이즈가 적은 점 배치.
- **제너레이티브 아트**: 고른 점 분포의 추상 작품.

### 직접 실험해 보기

- **최소 점간 거리**를 10과 60으로 바꿔 보세요. 점이 얼마나 촘촘해지는지 비교해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **후보 생성 시도 횟수**를 10과 50으로 바꿔 보세요. 빈 곳이 얼마나 덜 남는지 관찰해 보세요. 이 값도 바꾸면 다시 시작합니다.
- **프레임당 처리 점 수**를 1과 20으로 바꿔 보세요. 점이 찍히는 속도가 어떻게 달라지는지 확인해 보세요.

<!-- en -->

**Poisson Disk Sampling** scatters random points while keeping every pair of points at least a minimum distance apart. Purely random points clump together or leave gaps, but this method spreads them evenly, which looks natural. Such an even spread is called blue noise.

**How it works.** The sketch starts with one point. It picks an active point and tries several candidate spots in the ring between one and two times the minimum distance. A candidate is accepted only if no point is closer than the minimum distance. When no candidate works, that point is retired. The process ends when no active points remain.

**Try it.** Change the minimum distance and the number of candidate tries to see how dense the points become.
