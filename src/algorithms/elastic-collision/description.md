**Elastic Collision**(탄성 충돌)은 **두 물체가 부딪혀서 에너지를 잃지 않고 튕겨 나가는** 현상입니다. 당구공이 부딪힐 때가 대표적인 예입니다. 공이 서로 닿으면 속도와 방향이 바뀌지만, 두 공이 함께 가진 운동량과 운동 에너지는 변하지 않습니다.

### 1. 핵심 원리

**(1) 충돌 방향**: 두 공의 중심을 잇는 선의 방향을 **법선**($\mathbf{n}$)이라고 합니다. 충돌은 이 방향으로만 일어나고, 법선과 수직인 방향의 속도는 그대로입니다.

**(2) 속도 바꾸기**: 두 공이 가까워지고 있을 때(서로 다가오는 속도 성분이 있을 때) 다음 식으로 속도를 바꿉니다.

$$\mathbf{v}_1' = \mathbf{v}_1 - \frac{2m_2}{m_1+m_2}\,\big((\mathbf{v}_1-\mathbf{v}_2)\cdot\mathbf{n}\big)\,\mathbf{n}$$

$$\mathbf{v}_2' = \mathbf{v}_2 + \frac{2m_1}{m_1+m_2}\,\big((\mathbf{v}_1-\mathbf{v}_2)\cdot\mathbf{n}\big)\,\mathbf{n}$$

- $m_1$, $m_2$는 두 공의 질량입니다.
- $\mathbf{v}_1$, $\mathbf{v}_2$는 충돌 전 속도입니다.
- $\mathbf{v}_1'$, $\mathbf{v}_2'$는 충돌 후 속도입니다.

**(3) 질량**: 이 예제에서 질량은 반지름의 제곱에 비례합니다. 그래서 큰 공은 작은 공보다 무겁고, 작은 공을 세게 밀어내면서도 자신은 덜 튕깁니다.

**(4) 겹침 보정**: 계산 오차로 공이 조금 겹치면, 두 공을 서로 떨어뜨립니다. 가벼운 공이 더 많이 움직입니다.

### 2. 이 시뮬레이션의 작동 순서

1. 겹치지 않게 공을 여러 개 무작위 위치에 놓고, 무작위 방향과 속도를 줍니다.
2. 매 프레임 공을 움직입니다. 벽에 닿으면 그 방향 속도를 뒤집습니다.
3. 모든 공의 쌍에 대해 충돌을 확인하고, 충돌하면 위 식으로 속도를 바꿉니다.
4. 충돌한 공은 잠시 밝게 빛나고, 충돌 지점에는 링 모양이 퍼졌다가 사라집니다.

### 3. 이 알고리즘의 장점

- **물리 법칙을 직접 코드로 옮기는** 좋은 연습입니다.
- 운동량과 에너지가 보존되는 모습을 눈으로 확인할 수 있습니다.
- 기체 분자의 움직임처럼 **무작위로 흩어지는 모습**을 흉내 낼 수 있습니다.

### 4. 구현할 때 주의할 점

- 공이 많아지면 모든 쌍을 검사해야 하므로 계산이 빠르게 늘어납니다.
- 공이 겹쳐 있는 상태에서 충돌 계산을 하면 속도가 과하게 바뀔 수 있습니다. 그래서 위치 보정을 먼저 합니다.
- 실제 세계에는 마찰과 에너지 손실이 있지만, 이 예제는 이상적인 탄성 충돌만 다룹니다.

### 5. 활용 분야

- **물리 게임**: 공이 부딪히고 튕기는 퍼즐, 당구 게임.
- **기체 시뮬레이션**: 분자들이 부딪히며 움직이는 모습 흉내 내기.
- **제너레이티브 아트**: 충돌하며 번쩍이는 공 작품.

### 직접 실험해 보기

- **공 최대 반지름**을 0.03과 0.15로 바꿔 보세요. 큰 공과 작은 공이 부딪힐 때 튕겨 나가는 방향이 어떻게 달라지는지 관찰해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **공 최대 속도**를 1과 6으로 바꿔 보세요. 속도가 빠를수록 충돌이 얼마나 자주 일어나는지 확인해 보세요. 이 값도 바꾸면 다시 시작합니다.
- **공 개수**를 5와 50으로 바꿔 보세요. 공이 많아질 때 화면이 얼마나 복잡해지는지 살펴보세요. 이 값도 바꾸면 다시 시작합니다.

<!-- en -->

**Elastic Collision** describes two objects that bounce off each other without losing energy, like billiard balls. When they touch, their velocities change, but the total momentum and kinetic energy of the pair stay the same.

**How it works.** The sketch finds the direction along the line between two centers, called the normal. Only the speed along that direction changes. The formula uses the masses and the speeds of the two balls. In this sketch, a ball's mass grows with the square of its radius, so a bigger ball is heavier. Small overlaps are corrected by pushing the balls apart.

**Try it.** Change the maximum radius and the maximum speed to see how often balls collide and how they bounce.
