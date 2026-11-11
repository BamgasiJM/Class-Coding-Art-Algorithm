**Attractor System**(끌개 시스템)은 **보이지 않는 끌개 하나가 입자들을 끌어당기는** 방법입니다. 끌개는 리사주 곡선을 따라 화면 안을 천천히 움직이고, 입자들은 그 끌개를 향해 모였다가 다시 튕겨 나갑니다. 끌개 주변에 입자가 모여 소용돌이처럼 보입니다.

### 1. 핵심 원리

**(1) 끌개의 움직임**: 끌개는 사인 함수 두 개로 위치가 정해집니다. 가로와 세로가 서로 다른 속도로 흔들리기 때문에, 전체적으로 곡선을 그립니다. 이런 곡선을 **리사주 곡선**이라고 합니다.

**(2) 인력**: 입자는 끌개와의 거리가 가까울수록 강하게 끌려갑니다. 거리의 제곱에 반비례하는 힘입니다.

$$\mathbf{F} = \frac{k}{d^2}\,\hat{\mathbf{d}}$$

- $k$는 **어트랙터 강도**입니다.
- $d$는 입자와 끌개 사이의 거리입니다.
- $\hat{\mathbf{d}}$는 끌개 쪽을 가리키는 방향입니다.

이 예제는 거리가 너무 가까우면 힘이 무한히 커지지 않도록 거리에 최소값을 둡니다. 또 너무 멀리 있는 입자에는 힘이 너무 약해지지 않도록 최대 거리도 둡니다.

**(3) 감쇠**: 입자의 속도는 매 프레임 조금씩 줄어듭니다. 그래서 입자가 끌개 주변에서 계속 튕기지 않고 점점 안정됩니다.

### 2. 이 시뮬레이션의 작동 순서

1. 입자를 화면 곳곳에 무작위로 놓습니다. 처음 속도는 0입니다.
2. 매 프레임 끌개의 위치를 리사주 곡선에 따라 옮깁니다.
3. 각 입자는 끌개와의 거리를 구하고, 인력을 속도에 더합니다.
4. 속도에 감쇠를 곱한 뒤, 속도만큼 위치를 옮깁니다.
5. 입자를 점으로 그립니다. 끌개 자체도 원으로 표시합니다.

### 3. 이 알고리즘의 장점

- **끌개 하나의 위치만 바꿔도** 입자들의 움직임이 크게 달라집니다.
- 입자가 끌개 주변에 모이는 모습은 **중력**이나 **자석**의 원리를 떠올리게 합니다.
- 계산이 간단해서 입자가 많아도 실시간으로 움직일 수 있습니다.

### 4. 구현할 때 주의할 점

- 끌개에 너무 가까워지면 힘이 매우 커지므로, 거리의 최소값으로 막아 둡니다.
- 감쇠가 너무 약하면 입자들이 계속 흔들려서 화면이 어지러워집니다.

### 5. 활용 분야

- **물리 시뮬레이션**: 중력과 자기장 흉내 내기.
- **게임 효과**: 마법진이나 블랙홀처럼 입자를 빨아들이는 효과.
- **제너레이티브 아트**: 끌개의 움직임을 따라 흐르는 입자 작품.

### 직접 실험해 보기

- **어트랙터 강도**를 20과 300으로 바꿔 보세요. 입자가 끌개에 얼마나 빨리 모이는지 비교해 보세요.
- **속도 감쇠**를 0.85와 0.99로 바꿔 보세요. 입자가 금방 멈추는지, 오래 흔들리는지 확인해 보세요.
- **파티클 개수**를 100과 1500으로 바꿔 보세요. 입자가 많을 때 어떤 모양이 만들어지는지 살펴보세요. 이 값은 바꾸면 다시 시작합니다.

<!-- en -->

**Attractor System** is a moving point that pulls particles toward itself. The attractor follows a Lissajous curve across the screen, and particles gather around it, swing past, and slowly settle. The pull grows stronger as particles get closer, like gravity. Damping slowly removes speed so the particles do not swing forever.

**How it works.** Each frame, the attractor moves along the curve. Every particle computes its distance to the attractor and gets a pull that is stronger when it is closer. A minimum and a maximum distance keep the force within a reasonable range.

**Try it.** Change the attractor strength and the damping to see how quickly particles settle around the attractor.
