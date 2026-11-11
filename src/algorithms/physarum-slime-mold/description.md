**Physarum (Slime Mold)**(점균 시뮬레이션)은 **아주 단순한 규칙을 가진 수많은 에이전트가 흔적을 남기며 움직이면, 길 같은 네트워크가 저절로 생기는** 방법입니다. 실제 점균(슬라임 몰드)은 머리가 없지만, 먹이를 잇는 가장 효율적인 길을 찾아냅니다. 이 예제는 그 특징을 흉내 냅니다.

### 1. 핵심 원리

에이전트 하나는 세 가지 일만 합니다.

**(1) 센서**: 자기 앞쪽 방향에 세 개의 센서를 둡니다. 왼쪽, 가운데, 오른쪽입니다. 각 센서는 그 자리에 남아 있는 흔적의 세기를 읽습니다.

**(2) 방향 바꾸기**: 흔적이 가장 강한 쪽으로 방향을 바꿉니다.
- 가운데가 가장 강하면 그대로 갑니다.
- 왼쪽이 더 강하면 왼쪽으로, 오른쪽이 더 강하면 오른쪽으로 돕니다.
- 세 곳 모두 약하면 무작위로 방향을 바꿉니다.

**(3) 흔적 남기기**: 에이전트는 지나간 자리에 흔적을 남깁니다. 흔적은 매 프레임 조금씩 사라집니다(감쇠).

흔적이 강한 길에는 에이전트가 더 많이 모이고, 그 길은 더 강해집니다. 이 되먹임 과정 때문에 몇 개의 굵은 길이 남고 가느다란 길은 사라집니다.

화면의 가장자리를 넘어가는 에이전트는 반대편에서 다시 나타납니다.

### 2. 이 시뮬레이션의 작동 순서

1. 에이전트를 화면 곳곳에 무작위 방향으로 놓습니다.
2. 매 프레임 각 에이전트는 세 센서로 흔적을 읽고, 방향을 정한 뒤 한 칸 움직입니다.
3. 에이전트가 지나간 자리에 밝은 흔적을 찍습니다.
4. 화면 전체의 흔적을 조금씩 지워서, 오래된 길이 점점 흐려지게 합니다.

### 3. 이 알고리즘의 장점

- **중앙 계획 없이** 복잡한 네트워크가 만들어집니다.
- 센서 각도나 감쇠율 같은 작은 값을 바꾸면 길의 모양이 크게 달라집니다.
- 교통망이나 혈관처럼 **효율적인 연결망**을 만드는 원리를 배울 수 있습니다.

### 4. 구현할 때 주의할 점

- 에이전트가 많을수록 계산이 무거워집니다. 화면의 픽셀을 매 프레임 읽고 쓰기 때문입니다.
- 감쇠율이 너무 낮으면 흔적이 화면을 덮어 버리고, 너무 높으면 길이 생기기 전에 사라집니다.

### 5. 활용 분야

- **도시와 교통 계획**: 사람과 차가 자연스럽게 만드는 길 연구.
- **생물학**: 실제 점균의 먹이 찾기 원리 연구.
- **제너레이티브 아트**: 나뭇가지나 혈관처럼 보이는 네트워크 작품.

### 직접 실험해 보기

- **에이전트 수**를 1000과 10000으로 바꿔 보세요. 에이전트가 많을수록 길이 얼마나 빨리 선명해지는지 확인해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **센서 각도**를 10도와 90도로 바꿔 보세요. 센서가 넓게 보면 길의 모양이 어떻게 달라지는지 관찰해 보세요.
- **트레일 감쇠율**을 1과 50으로 바꿔 보세요. 흔적이 얼마나 오래 남는지, 길이 얼마나 뚜렷하게 보이는지 비교해 보세요.

<!-- en -->

**Physarum (Slime Mold)** simulates thousands of simple agents. Each agent senses three spots ahead of it, turns toward the strongest trail, and leaves a trail where it walks. The trails fade slowly. Paths that get more traffic grow stronger, so a network of lines appears on its own, similar to how real slime molds connect food sources.

**How it works.** An agent with a stronger trail ahead keeps going. If the trail is stronger on one side, it turns that way. If nothing is sensed, it turns at random. Agents that leave the screen reappear on the opposite side.

**Try it.** Change the number of agents and the sensor angle to see how the network changes.
