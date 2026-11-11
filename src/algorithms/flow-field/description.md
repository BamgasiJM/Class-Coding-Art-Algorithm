**Flow Field**(흐름장)는 화면의 모든 위치에 **방향**을 하나씩 정해 두고, 입자가 그 방향을 따라 움직이게 하는 방법입니다. 강물 위의 나뭇잎이 물결을 따라 떠내려가는 모습과 같습니다. 방향을 정하는 데 **노이즈**(부드럽게 이어지는 무작위 값)를 쓰기 때문에, 입자들이 제각각 움직이지 않고 큰 흐름을 이루며 움직입니다.

### 1. 핵심 원리

**(1) 위치마다 방향 정하기**
화면의 좌표 $(x, y)$를 노이즈 함수에 넣으면 0부터 1 사이의 값이 나옵니다. 이 값을 각도로 바꾸면 그 위치의 방향이 됩니다.

$$\theta(x, y) = \text{noise}(x \cdot s,\ y \cdot s) \cdot 4\pi$$

여기서 $s$는 **노이즈 스케일**입니다. 값을 작게 하면 가까운 곳끼리 비슷한 방향을 가져서 흐름이 넓고 부드럽게 보입니다.

**(2) 입자 속도 바꾸기**
입자는 그 위치의 방향으로 조금씩 가속합니다. 이때 이전 속도를 일부 남겨 둡니다. 그래서 방향이 바뀌어도 입자가 갑자기 꺾이지 않고 관성을 가지고 움직입니다.

$$\mathbf{v}_{new} = \mathbf{v}_{old} \cdot d + \mathbf{v}_{target} \cdot (1 - d)$$

여기서 $d$는 **댐핑**입니다. $d$가 크면 이전 속도를 많이 유지해서 천천히 흐르고, 작으면 방향 변화에 민감하게 반응합니다.

**(3) 입자 다시 놓기**
입자는 수명이 다하거나 화면 밖으로 나가면 무작위 위치에서 다시 출발합니다. 그래서 화면에 입자가 계속 채워져 있습니다.

### 2. 이 시뮬레이션의 작동 순서

1. 화면에 **짧은 선**으로 각 칸의 방향을 옅게 그립니다. 흐름의 전체 모양을 보여 줍니다.
2. 입자마다 현재 위치의 방향을 계산하고, 속도를 (2)의 식으로 갱신합니다.
3. 입자를 점으로 찍습니다.
4. 매 프레임 배경을 아주 조금만 덮어씌웁니다. 그래서 입자가 지나간 자리에 **잔상**(긴 선)이 남습니다.
5. 시간이 흐르면 노이즈 값도 천천히 바뀌어, 흐름 자체가 움직입니다.

### 3. 이 알고리즘의 장점

- **자연스러운 움직임**: 입자가 무작위로 튀지 않고, 주변과 비슷한 방향으로 흘러갑니다.
- **간단한 규칙**: 방향을 정하는 함수 하나와 속도 식 하나만 있으면 됩니다.
- **큰 패턴이 저절로 생김**: 입자 각각은 단순하게 움직이지만, 많이 모이면 소용돌이나 줄무늬 같은 전체 모양이 나타납니다.

### 4. 구현할 때 주의할 점

- **노이즈 스케일**이 너무 크면 방향이 칸마다 크게 바뀌어 어지럽고, 너무 작으면 거의 한 방향으로만 흘러 단조롭습니다. 알맞은 값을 찾는 것이 가장 중요합니다.
- **속도가 너무 빠르면** 입자가 화면 밖으로 튕겨 나갑니다. 속도 값을 적당히 제한하세요.
- **입자가 많아지면** 매 프레임 계산량이 크게 늘어납니다. 큰 작품에서는 GPU(그래픽 카드)로 계산을 나눠 맡기기도 합니다.

### 5. 활용 분야

- **제너레이티브 아트**: 입자의 잔상으로 흐르는 선 그림을 만듭니다.
- **게임**: 바람에 날리는 풀잎, 마법 효과 같은 파티클 움직임에 씁니다.
- **데이터 시각화**: 바람의 방향이나 바다의 해류처럼 공간 전체에 퍼진 방향 데이터를 보여 줍니다.

### 직접 실험해 보기

- **노이즈 스케일**을 0.001과 0.02 사이에서 바꿔 보세요. 흐름이 넓어지는지, 촘촘해지는지 확인해 보세요.
- **댐핑**을 0.5에 맞추고 다시 0.98에 맞춰 보세요. 입자가 민첩하게 움직이는지, 천천히 흐르는지 비교해 보세요.
- **필드 해상도**를 바꿔 보세요. 짧은 선이 촘촘할수록 방향을 더 세밀하게 나타냅니다.

<!-- en -->

**Flow Field** gives every point on the screen a direction, and then lets particles move along those directions. It works like leaves floating down a river. Each direction comes from **noise**, a smooth random value, so nearby particles move together and form a larger flow.

**How it works.** A noise function turns each position into a value between 0 and 1. That value becomes an angle, which is the direction at that point. Each particle speeds up in that direction but keeps part of its old speed, so it moves smoothly instead of snapping around. The **damping** value controls how much old speed is kept. Particles restart at random places when their life ends or they leave the screen.

**The result.** Each particle follows a simple rule, but many particles together create swirls and streaks. The background is refreshed only a little each frame, so the paths leave soft trails behind.
