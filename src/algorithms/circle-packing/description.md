**Circle Packing**(원 채우기)은 **겹치지 않는 원을 빈 공간에 가득 채우는** 방법입니다. 원은 아주 작게 시작해서 조금씩 커지고, 다른 원이나 벽에 닿으면 멈춥니다. 그래서 큰 원과 작은 원이 섞여 있는 모양이 나옵니다. 벌집이나 돌멩이가 쌓인 모양을 떠올리면 됩니다.

### 1. 핵심 원리

**(1) 자리 찾기**: 매 프레임 화면의 무작위 위치를 몇 번 골라 봅니다. 그 자리에 놓은 원이 기존 원들과 **겹치지 않으면** 새 원을 만듭니다. 이때 원의 반지름은 아주 작게 시작합니다.

**(2) 겹침 검사**: 두 원 사이 거리가 두 반지름의 합과 최소 간격을 더한 값보다 작으면 겹친 것입니다.

$$d < r_1 + r_2 + \text{최소 간격}$$

- $d$는 두 원의 중심 사이 거리입니다.
- $r_1$, $r_2$는 두 원의 반지름입니다.

**(3) 성장**: 각 원은 매 프레임 반지름이 **성장 속도**만큼 커집니다. 벽에 닿거나 다른 원과 겹치면 더 이상 커지지 않습니다.

### 2. 이 시뮬레이션의 작동 순서

1. 매 프레임 새 원을 놓을 자리를 몇 번 (5번) 무작위로 고릅니다. 빈자리를 찾으면 원을 하나 만듭니다.
2. 아직 자라고 있는 원마다 벽이나 다른 원과 닿았는지 검사합니다.
3. 닿지 않은 원은 반지름을 조금 키웁니다.
4. 원을 그립니다. 반지름이 클수록 선이 굵어집니다.

### 3. 이 알고리즘의 장점

- **빈틈없이 채워짐**: 규칙만 지키면 빈 공간이 자연스럽게 채워집니다.
- **크기가 자연스럽게 섞임**: 먼저 생긴 큰 원 사이에 작은 원이 끼어듭니다.
- **돌멩이, 세포, 거품 같은 모양**을 흉내 내기 좋습니다.

### 4. 구현할 때 주의할 점

- 원이 많아지면 겹침 검사가 많아집니다. 이 예제는 원이 최대 개수에 이르면 새 원을 만들지 않습니다.
- 성장 속도가 너무 빠르면 원이 서로 밀고 들어가지 못하고 한꺼번에 멈춥니다. 천천히 자라야 빈틈이 잘 채워집니다.

### 5. 활용 분야

- **디자인**: 동그라미 패턴 포스터, 버블 차트.
- **자연 모델링**: 세포, 거품, 돌멩이의 배치.
- **제너레이티브 아트**: 원으로 채운 추상 작품.

### 직접 실험해 보기

- **성장 속도**를 0.1과 1.5로 바꿔 보세요. 빈틈이 얼마나 잘 채워지는지 비교해 보세요.
- **최소 간격**을 1과 8로 바꿔 보세요. 원 사이 여백이 어떻게 달라지는지 확인해 보세요.
- **최대 원 개수**를 30과 300으로 바꿔 보세요. 원이 많아질 때 화면이 어떻게 채워지는지 살펴보세요. 이 값은 바꾸면 다시 시작합니다.

<!-- en -->

**Circle Packing** fills a space with circles that never overlap. Each circle starts very small and grows until it touches a wall or another circle. The result has big and small circles mixed together, like bubbles or pebbles.

**How it works.** Every frame, the sketch tries a few random spots. A new circle is placed only if it does not overlap any existing circle. Each circle then grows a little each frame, and it stops when it touches the wall or another circle.

**Try it.** Change the growth speed and the minimum gap to see how the empty space is filled.
