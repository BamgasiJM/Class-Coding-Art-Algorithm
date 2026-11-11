**Boids / Flocking**(보이드 군집)은 **새 한 마리가 세 가지 간단한 규칙만 따르는데**, 여러 마리가 모이면 새떼처럼 움직이는 현상을 흉내 낸 방법입니다. 1986년 크레이그 레이놀즈가 이 규칙을 제안했습니다. 중앙에서 누가 지휘하지 않아도 무리 전체가 자연스럽게 움직인다는 점이 핵심입니다.

### 1. 핵심 원리

각 보이드(새 한 마리)는 주변의 이웃만 보고 다음 세 가지 힘을 받습니다.

**(1) 분리**: 너무 가까운 이웃에게서 멀어집니다. 부딪히지 않게 하는 힘입니다.

**(2) 정렬**: 이웃들의 평균 속도와 맞추려고 합니다. 같은 방향으로 날아가게 하는 힘입니다.

**(3) 응집**: 이웃들의 평균 위치 쪽으로 다가갑니다. 무리를 한곳에 모이게 하는 힘입니다.

세 힘을 더하면 보이드의 움직임이 정해집니다.

$$\mathbf{a} = w_{s}\,\mathbf{s} + w_{a}\,(\bar{\mathbf{v}} - \mathbf{v}) + w_{c}\,(\bar{\mathbf{p}} - \mathbf{p})$$

- $w_s$, $w_a$, $w_c$는 각각 **분리 강도**, **정렬 강도**, **응집 강도**입니다.
- $\bar{\mathbf{v}}$는 이웃들의 평균 속도, $\bar{\mathbf{p}}$는 이웃들의 평균 위치입니다.
- $\mathbf{s}$는 가까운 이웃에게서 멀어지는 방향입니다.

이 예제에서 각 보이드가 볼 수 있는 이웃의 거리(분리 15px, 정렬과 응집 30px)는 정해진 값입니다.

### 2. 이 시뮬레이션의 작동 순서

1. 보이드를 무작위 위치와 방향으로 놓습니다.
2. 매 프레임 각 보이드는 이웃을 찾아서 세 힘을 계산합니다.
3. 힘을 속도에 더하고, 최대 속도를 넘지 않게 제한합니다.
4. 위치를 옮깁니다. 화면 끝으로 나가면 반대쪽에서 다시 나타납니다.
5. 진행 방향을 향한 삼각형으로 보이드를 그립니다. 흔적이 조금씩 남습니다.

### 3. 이 알고리즘의 장점

- **중심 지휘자 없이** 무리 전체가 움직이는 모습을 만들 수 있습니다.
- 규칙이 세 가지뿐이라서, 각 규칙의 강도를 바꾸며 결과를 비교하기 쉽습니다.
- 새떼, 물고기떼, 군중의 움직임을 흉내 낼 때 기본으로 쓰입니다.

### 4. 구현할 때 주의할 점

- 모든 보이드 쌍을 확인하므로, 보이드가 많아지면 계산이 빠르게 늘어납니다.
- 분리 강도가 너무 약하면 보이드끼리 겹치고, 응집 강도가 너무 강하면 한 점에 뭉칩니다. 세 강도의 균형이 중요합니다.

### 5. 활용 분야

- **영화와 게임**: 새떼, 물고기떼, 군중 장면 만들기.
- **로봇 공학**: 여러 로봇이 함께 움직이는 방법 연구.
- **제너레이티브 아트**: 무리가 흘러가는 모습을 그린 작품.

### 직접 실험해 보기

- **응집 강도**를 0.001과 0.02로 바꿔 보세요. 무리가 흩어지는지, 한 점으로 뭉치는지 비교해 보세요.
- **정렬 강도**를 0.01과 0.2로 바꿔 보세요. 보이드들이 같은 방향으로 얼마나 빨리 맞춰지는지 관찰해 보세요.
- **분리 강도**를 0.1과 2.0으로 바꿔 보세요. 보이드끼리 얼마나 떨어져서 날아가는지 확인해 보세요.
- **보이드 개수**를 20과 500으로 바꿔 보세요. 개체 수에 따라 무리의 모양이 어떻게 달라지는지 살펴보세요. 이 값은 바꾸면 다시 시작합니다.

<!-- en -->

**Boids / Flocking** imitates flocks of birds or schools of fish. Each boid follows three simple rules that use only its nearby neighbors: separation keeps it from crowding others, alignment matches the average direction, and cohesion moves it toward the group's center. No leader is needed, yet the whole flock moves together. Craig Reynolds proposed these rules in 1986.

**How it works.** Each frame, every boid adds the three forces to its velocity, limits its speed, and moves. Boids that leave one edge of the screen reappear on the other side.

**Try it.** Change the strength of each rule to see how the flock spreads out, aligns, or clumps together.
