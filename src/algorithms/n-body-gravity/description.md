**N-Body Gravity**(다체 중력)는 **모든 천체가 서로를 끌어당기는 힘**으로 움직이는 방법입니다. 태양과 행성이 도는 모습이 대표적인 예입니다. 천체가 두 개뿐이면 궤도를 정확히 계산할 수 있지만, 여러 개가 되면 서로의 영향이 얽혀서 예측하기 어려워집니다. 그래서 시뮬레이션으로 확인하는 방법이 많이 쓰입니다.

### 1. 핵심 원리

**(1) 만유인력**: 두 천체는 서로를 질량의 곱에 비례하고 거리의 제곱에 반비례하는 힘으로 끌어당깁니다.

$$F = G\,\frac{m_1 m_2}{r^2}$$

- $G$는 **중력 상수**입니다. 이 값이 클수록 모든 천체가 세게 끌어당깁니다.
- $m_1$, $m_2$는 두 천체의 질량입니다.
- $r$은 두 천체 사이의 거리입니다.

**(2) 특이점 방지**: 두 천체가 아주 가까워지면 거리가 0에 가까워져서 힘이 무한히 커집니다. 그래서 거리 제곱에 작은 값을 더해서, 힘이 너무 커지지 않도록 막습니다. 이 값을 **특이점 방지 거리**라고 부릅니다.

**(3) 시간에 따라 움직이기**: 힘을 질량으로 나누면 가속도가 됩니다. 가속도로 속도를 바꾸고, 속도로 위치를 바꿉니다. 이 과정을 매 프레임 반복합니다.

### 2. 이 시뮬레이션의 작동 순서

1. 가운데에 큰 **항성**을 놓습니다.
2. 주변에 **행성**을 여러 개 무작위 거리에 놓습니다. 행성에는 궤도를 돌 수 있을 만큼의 속도를 줍니다.
3. 매 프레임 모든 쌍의 천체 사이 힘을 계산합니다.
4. 힘에 따라 속도와 위치를 바꿉니다.
5. 천체를 그립니다. 흔적(궤적)이 조금씩 남습니다.

### 3. 이 알고리즘의 장점

- **천체의 움직임**을 간단한 힘의 법칙으로 흉내 낼 수 있습니다.
- 중력 상수나 질량을 바꾸면 **궤도가 얼마나 빨리 도는지, 얼마나 흔들리는지**를 바로 볼 수 있습니다.
- 물리 법칙을 코드로 옮기는 연습에 좋습니다.

### 4. 구현할 때 주의할 점

- 모든 쌍을 계산하므로 천체가 많아지면 계산이 크게 늘어납니다. 천체 수가 두 배가 되면 계산은 약 네 배가 됩니다.
- 특이점 방지 거리가 너무 작으면 천체가 가까이 지날 때 튕겨 나가는 움직임이 과하게 보일 수 있습니다.

### 5. 활용 분야

- **천문학**: 행성계, 성단의 움직임 연구.
- **게임과 영상**: 우주 배경과 궤도 효과.
- **제너레이티브 아트**: 궤도를 그리는 추상 작품.

### 직접 실험해 보기

- **중력 상수**를 0.2와 2.0으로 바꿔 보세요. 행성이 얼마나 빨리 도는지 비교해 보세요. 이 값은 재시작 없이 바로 반영됩니다.
- **항성 질량**을 500과 2000으로 바꿔 보세요. 질량이 클수록 행성의 궤도가 어떻게 달라지는지 확인해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **행성 개수**를 20과 150으로 바꿔 보세요. 행성이 많아질 때 궤도가 어떻게 얽히는지 살펴보세요. 이 값도 바꾸면 다시 시작합니다.

<!-- en -->

**N-Body Gravity** simulates many bodies that all pull on each other. The Sun and planets are a familiar example. With only two bodies, the orbits can be calculated exactly. With many bodies, their pulls tangle together, which is why simulation is a useful way to explore them.

**How it works.** Each pair of bodies attracts with a force that grows with their masses and shrinks with the square of their distance. A small softening value keeps the force from becoming infinite when two bodies get very close. Each frame, the force on every body changes its velocity, and the velocity moves the body.

**Try it.** Change the gravitational constant and the star's mass to see how fast the planets orbit.
