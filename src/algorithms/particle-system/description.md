**Particle System**(파티클 시스템)은 **아주 많은 작은 입자를 규칙에 따라 태어나고 움직이고 사라지게 하는** 방법입니다. 불꽃, 연기, 비, 반짝이는 먼지처럼 입자 하나하나는 단순하지만, 많이 모이면 자연 현상처럼 보입니다. 게임과 영상 효과에서 가장 많이 쓰는 기법 중 하나입니다.

### 1. 핵심 원리

입자 하나의 일생은 세 가지 단계로 나뉩니다.

**(1) 태어남**: 방출 위치에서 입자가 만들어집니다. 처음 속도는 정해진 범위에서 무작위로 고릅니다. 이 예제는 위쪽으로 튀어 오르도록 속도를 정해 둡니다.

**(2) 움직임**: 매 프레임 중력이 속도를 조금씩 아래로 바꿉니다. 그다음 속도만큼 위치를 옮깁니다.

$$v_y \leftarrow v_y + g, \qquad x \leftarrow x + v_x, \qquad y \leftarrow y + v_y$$

- $g$는 **중력**입니다. 값이 클수록 입자가 빨리 아래로 떨어집니다.

**(3) 사라짐**: 입자마다 수명이 있고, 매 프레임 수명이 **수명 감소율**만큼 줄어듭니다. 수명이 0 이하가 되면 입자를 지웁니다. 수명이 줄수록 투명해져서 자연스럽게 사라집니다.

### 2. 이 시뮬레이션의 작동 순서

1. 화면 아래쪽 방출 위치에서 매 프레임 입자 몇 개(방출 파티클 수)를 만듭니다.
2. 모든 입자에 중력을 적용하고 위치를 옮깁니다.
3. 수명이 줄어든 만큼 투명도를 바꿔서 입자를 그립니다.
4. 수명이 다한 입자는 목록에서 지웁니다.
5. 배경을 조금씩 덮어씌워서 움직인 흔적이 잔상으로 남게 합니다.

### 3. 이 알고리즘의 장점

- **규칙이 단순함**: 태어남, 움직임, 사라짐 세 단계만 있으면 됩니다.
- **다양한 효과**: 입자의 속도, 중력, 수명을 바꾸면 불꽃, 연기, 비처럼 보입니다.
- **계산이 가벼움**: 입자 하나하나는 몇 줄의 계산이면 됩니다.

### 4. 구현할 때 주의할 점

- 방출 파티클 수가 많아지면 화면에 입자가 너무 많아져서 느려집니다.
- 수명이 길고 감소율이 작으면 입자가 오래 남아서 화면이 금방 지저분해집니다.

### 5. 활용 분야

- **게임과 영상**: 불꽃, 먼지, 마법 효과.
- **자연 현상**: 비, 눈, 연기 흉내 내기.
- **제너레이티브 아트**: 흩날리는 입자로 그린 작품.

### 직접 실험해 보기

- **방출 파티클 수**를 1과 20으로 바꿔 보세요. 입자가 얼마나 빽빽하게 보이는지 비교해 보세요.
- **중력**을 0과 0.2로 바꿔 보세요. 입자가 떨어지는 모습이 어떻게 달라지는지 확인해 보세요.
- **수명 감소율**을 1과 10으로 바꿔 보세요. 입자가 얼마나 오래 남는지 살펴보세요.

<!-- en -->

**Particle System** creates many small particles that are born, move, and disappear by simple rules. Each particle is simple, but together they look like fire, smoke, or rain. It is one of the most common techniques in games and visual effects.

**How it works.** Each particle starts with a random velocity. Every frame, gravity changes its vertical speed, and the particle moves by its velocity. Each particle has a life that goes down every frame. When the life reaches zero, the particle is removed. As the life drops, the particle becomes more transparent and fades out.

**Try it.** Change the number of particles, the gravity, and the life decay to see how the effect changes.
