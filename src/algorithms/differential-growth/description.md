**Differential Growth**(차등 성장)은 **점들이 서로 밀어내면서 선이 자라나는** 방법입니다. 산호나 뇌 주름처럼, 어떤 부분은 빨리 자라고 어떤 부분은 천천히 자라서 선이 접히고 말리는 모양을 만듭니다.

### 1. 핵심 원리

이 예제는 닫힌 고리를 점들로 나타냅니다. 각 점은 세 가지 힘을 받습니다.

**(1) 반발**: 반발 반경 안에 있는 다른 점들은 서로 밀어냅니다. 가까울수록 세게 밀립니다.

$$\mathbf{F}_i = \frac{1}{n_i} \sum_{j:\, d_{ij} < r_{in}} \frac{r_{in} - d_{ij}}{d_{ij}} (\mathbf{p}_i - \mathbf{p}_j)$$

- $r_{in}$은 **반발 반경**입니다.
- $d_{ij}$는 두 점 사이의 거리입니다.
- $n_i$는 힘을 받는 이웃의 수입니다. 힘을 평균 내기 위해 나눕니다.

**(2) 당김**: 각 점은 양옆 이웃의 가운데 쪽으로 조금 당겨집니다. 선이 지나치게 뾰족해지지 않도록 막아 줍니다.

**(3) 분열**: 이웃한 두 점 사이 거리가 **분열 반경**보다 멀어지면, 그 가운데에 새 점을 끼워 넣습니다. 그래서 선이 길어지고 점이 늘어납니다.

힘이 너무 크면 **최대 가속도**로 제한하고, 속도는 매 프레임 조금씩 줄여서 진동이 가라앉게 합니다.

### 2. 이 시뮬레이션의 작동 순서

1. 가운데에 작은 원을 점 40개로 만듭니다.
2. 매 프레임 모든 점에 (1)과 (2)의 힘을 계산해서 움직입니다.
3. 이웃 사이가 분열 반경보다 멀어진 곳에 새 점을 넣습니다.
4. 점이 최대 노드 수에 이르면 더 늘리지 않습니다.
5. 점들을 선으로 이어서 보여 줍니다.

### 3. 이 알고리즘의 장점

- 간단한 힘 몇 개만으로 **산호 같은 복잡한 주름**이 나옵니다.
- 점의 개수와 반경을 바꾸는 것만으로도 모양이 크게 달라집니다.
- 생물이 자라며 모양이 바뀌는 과정을 설명하기 좋습니다.

### 4. 구현할 때 주의할 점

- **점 개수가 많을수록 계산이 느려집니다.** 모든 점 쌍을 서로 비교하기 때문입니다.
- 두 반경의 비율에 따라 주름이 많이 생기기도 하고, 거의 펴진 선이 되기도 합니다.

### 5. 활용 분야

- **생물 연구**: 산호, 뇌 주름, 나뭇잎 가장자리가 자라는 모양의 모델.
- **제너레이티브 아트**: 유기적인 곡선 패턴.
- **디자인**: 자연스러운 곡선 구조 만들기.

### 직접 실험해 보기

- **반발 반경**을 10과 30으로 바꿔 보세요. 점들이 얼마나 넓게 떨어지는지 비교해 보세요.
- **분열 반경**을 5와 20으로 바꿔 보세요. 점이 얼마나 많이 늘어나는지 확인해 보세요.
- **최대 노드 수**를 100과 600으로 바꿔 보세요. 점 수에 따라 주름의 복잡도가 어떻게 달라지는지 살펴보세요. 이 값은 바꾸면 다시 시작합니다.

<!-- en -->

**Differential Growth** models how a ring of points grows and folds, like coral or brain tissue. Points push away from nearby points, are pulled gently toward the middle of their neighbors, and new points are added when two neighbors get too far apart.

**How it works.** Because the ring keeps growing in some places faster than others, it bends and folds into curly shapes. The repulsion radius, the subdivision radius, and the maximum number of points control the result.

**Try it.** Change the repulsion and subdivision radius, and watch how the folds change.
