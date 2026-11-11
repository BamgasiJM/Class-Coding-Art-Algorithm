**Diffusion-Limited Aggregation**(확산 제한 응집, 줄여서 **DLA**)은 **떠돌던 입자가 덩어리에 닿아 붙으면서 덩어리가 자라는** 방법입니다. 서리 결정, 번개 모양, 산호 가지처럼 뾰족하게 뻗는 가지 모양이 나옵니다.

### 1. 핵심 원리

**(1) 무작위 걸음 (랜덤 워크)**: 입자는 매 순간 무작위 방향으로 조금씩 움직입니다. 어느 방향으로 가야 한다는 목표가 없습니다.

$$x_{t+1} = x_t + \xi_x, \qquad y_{t+1} = y_t + \xi_y$$

- $\xi$는 무작위 값입니다. 한 걸음의 크기는 이 예제에서 정해 둔 값(5픽셀 안팎)입니다.

**(2) 응집**: 입자가 덩어리의 다른 입자에 **응집 반경** 안까지 닿으면, 그 자리에 붙어서 덩어리의 일부가 됩니다.

**(3) 왜 뾰족해질까?**: 덩어리에서 튀어나온 끝부분은 주변보다 입자가 닿을 기회가 많습니다. 그래서 끝이 더 빨리 자라고, 전체 모양이 점점 가지처럼 뻗어 나갑니다.

### 2. 이 시뮬레이션의 작동 순서

1. 가운데에 씨앗 입자 하나를 둡니다.
2. 매 프레임 입자를 여러 개(입자 생성 속도) 덩어리 바깥에서 출발시킵니다.
3. 각 입자는 무작위로 걷다가 덩어리에 닿으면 멈춰서 붙습니다. 너무 멀리 벗어나면 버리고 새로 시작합니다.
4. 입자가 최대 입자 수에 이르면 멈춥니다. 화면을 클릭하면 다시 시작합니다.

### 3. 이 알고리즘의 장점

- 뾰족한 가지가 **왜 생기는지** 쉽게 설명할 수 있습니다.
- 규칙은 단순한데, 자연에서 보는 복잡한 모양이 나옵니다.

### 4. 구현할 때 주의할 점

- 입자 수가 많아지면 덩어리가 커져서 계산이 점점 무거워집니다. 이 예제는 **공간 격자**를 써서 주변 칸의 입자만 확인하므로, 모든 입자를 매번 확인하는 것보다 훨씬 빠릅니다.
- **응집 반경**이 크면 가지가 굵고 뭉툭해지고, 작으면 가늘고 정교해집니다.
- 같은 설정이라도 무작위로 움직이므로 결과 모양은 매번 다릅니다.

### 5. 활용 분야

- **자연 현상**: 서리, 눈 결정, 번개의 모양 연구.
- **재료 과학**: 금속과 결정이 자라는 과정 연구.
- **제너레이티브 아트**: 가지 패턴 작품.

### 직접 실험해 보기

- **응집 반경**을 2와 12로 바꿔 보세요. 가지가 가늘어지는지 굵어지는지 확인해 보세요.
- **입자 생성 속도**를 1과 50으로 바꿔 보세요. 천천히 쌓일 때와 빠르게 쌓일 때 모양이 어떻게 다른지 비교해 보세요.
- **최대 입자 수**를 500과 3000으로 바꿔 보세요. 덩어리가 얼마나 커지는지 살펴보세요. 이 값은 바꾸면 다시 시작합니다.

<!-- en -->

**Diffusion-Limited Aggregation (DLA)** builds a cluster from particles that wander at random until they touch the cluster and stick to it. The result has sharp, branching arms, like frost crystals, lightning, or coral.

**How it works.** Each particle takes random steps with no target. When it reaches the cluster, it sticks. The tips of the cluster are the first places a particle can touch, so they grow fastest, and the shape keeps branching outward.

**Try it.** Change the stick radius and the number of particles per frame to see how the cluster changes. Click the canvas to start again.
