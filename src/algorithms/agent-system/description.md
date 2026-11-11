**Agent System**(에이전트 시스템)은 **스스로 판단하는 작은 에이전트 여러 개가, 주변을 보고 방향을 조금씩 바꾸며 움직이는** 방법입니다. 이 예제는 **조향**(steering) 방식을 씁니다. 에이전트는 자기가 가고 싶은 방향을 정하고, 지금 방향과의 차이만큼만 힘을 받아 방향을 틀습니다. 그래서 움직임이 부드럽습니다.

### 1. 핵심 원리

에이전트는 주변 **인식 반경** 안의 다른 에이전트만 봅니다. 세 가지 생각으로 원하는 방향을 정합니다.

**(1) 분리**: 너무 가까운 에이전트에게서 멀어지고 싶어 합니다. 가까울수록 더 강하게 밀어냅니다.

**(2) 정렬**: 주변 에이전트들의 평균 속도와 같은 방향으로 가고 싶어 합니다.

**(3) 응집**: 주변 에이전트들의 평균 위치 쪽으로 모이고 싶어 합니다.

각 생각마다 **원하는 속도**와 **지금 속도**의 차이를 구합니다. 그 차이가 **조향 힘**입니다.

$$\mathbf{F} = \mathbf{v}_{원하는} - \mathbf{v}_{현재}$$

조향 힘은 너무 커지지 않도록 **최대 힘**으로 제한합니다. 그 힘을 속도에 더하고, 속도가 **최대 속도**를 넘지 않게 합니다.

### 2. 이 시뮬레이션의 작동 순서

1. 에이전트를 무작위 위치와 방향으로 놓습니다.
2. 매 프레임 각 에이전트는 인식 반경 안의 이웃을 찾아서 세 가지 조향 힘을 계산합니다.
3. 세 힘을 더해서 속도를 바꾸고, 위치를 옮깁니다.
4. 화면 밖으로 나가면 반대쪽에서 다시 나타납니다.
5. 에이전트를 진행 방향을 향한 삼각형으로 그립니다.

### 3. 이 알고리즘의 장점

- **원하는 방향과 현재 방향의 차이**라는 한 가지 생각으로 많은 움직임을 설명할 수 있습니다.
- 자동차, 드론, 게임 캐릭터의 움직임을 만드는 기본 방법입니다.
- 인식 반경과 최대 속도만 바꿔도 움직임의 성격이 크게 달라집니다.

### 4. 구현할 때 주의할 점

- 모든 에이전트 쌍을 확인하므로, 에이전트가 많아지면 계산이 빠르게 늘어납니다.
- 인식 반경이 너무 작으면 에이전트가 이웃을 못 보고 흩어지고, 너무 크면 모든 에이전트가 한곳에 뭉칩니다.

### 5. 활용 분야

- **게임**: 군중, 새떼, 몬스터 무리의 움직임.
- **로봇과 자율 주행**: 여러 로봇이 충돌 없이 움직이는 방법.
- **제너레이티브 아트**: 에이전트의 흔적으로 그린 작품.

### 직접 실험해 보기

- **에이전트 수**를 20과 500으로 바꿔 보세요. 개체 수에 따라 무리의 움직임이 어떻게 달라지는지 확인해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **인식 반경**을 10과 150으로 바꿔 보세요. 에이전트가 얼마나 멀리 있는 이웃까지 보고 반응하는지 관찰해 보세요.
- **최대 속도**를 0.5와 6으로 바꿔 보세요. 느린 무리와 빠른 무리의 움직임을 비교해 보세요.

<!-- en -->

**Agent System** places many small agents that look at their neighbors and steer themselves. Each agent wants to move in a direction chosen by three rules: separation from crowded neighbors, alignment with their average velocity, and cohesion toward their average position. The difference between the wanted velocity and the current velocity is the steering force, which keeps the motion smooth.

**How it works.** Each agent looks only at others inside its perception radius. The steering force is limited, and the speed is capped at a maximum. Agents that leave one side of the screen reappear on the other side.

**Try it.** Change the number of agents, the perception radius, and the maximum speed to see how the group behaves.
