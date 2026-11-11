**2D Ray Casting**(2D 광선 쏘기)은 한 점에서 여러 방향으로 **광선**을 쏘아, 벽에 부딪히기 전까지 **어디가 보이는지**를 계산하는 방법입니다. 방 안에서 손전등을 비추면 벽에 가려진 곳은 어둡게 남습니다. 이 알고리즘은 그런 "보이는 곳"과 "가려진 곳"을 계산으로 구합니다.

### 1. 기본 원리

**광선**은 시작점 $P$에서 방향 $\vec{d}$로 뻗어 나가는 직선입니다. $t$는 시작점에서 얼마나 멀리 갔는지를 나타내는 값입니다.

$$R(t) = P + t\,\vec{d}, \quad t \ge 0$$

**벽**은 두 끝점 $A$, $B$를 잇는 선분입니다. $u$는 벽의 시작점에서 끝점까지 어디쯤인지를 나타내는 값입니다. $u = 0$이면 $A$, $u = 1$이면 $B$입니다.

$$S(u) = A + u(B - A), \quad 0 \le u \le 1$$

광선과 벽이 만나는 점은 두 식의 값이 같아지는 곳입니다. 그래서 두 식을 같다고 놓고 $t$와 $u$를 구합니다. 계산 결과가 아래 두 조건을 모두 만족하면 **실제로 만난 것**입니다.

- $t \ge 0$: 벽이 광선의 **앞쪽**에 있어야 합니다. 뒤쪽에 있는 벽은 맞힐 수 없습니다.
- $0 \le u \le 1$: 만난 점이 벽 **선분 안**에 있어야 합니다. 선분을 벗어나면 벽이 아닙니다.

광선이 벽 여러 개와 만날 수도 있습니다. 이때는 **시작점에서 가장 가까운 점**, 즉 $t$가 가장 작은 점만 남깁니다. 가까운 벽이 먼 벽을 가리기 때문입니다.

### 2. 이 시뮬레이션의 작동 순서

1. **빛의 위치 정하기**: 마우스가 화면 안에 있으면 마우스 위치가 빛이 됩니다. 밖에 있으면 빛이 가운데 근처를 스스로 천천히 움직입니다.
2. **광선 쏘기**: 빛에서 360도를 **레이 개수**만큼 똑같이 나눠 광선을 쏩니다.
3. **가장 가까운 벽 찾기**: 각 광선마다 위 원리로 가장 가까운 교차점을 찾습니다. 아무 벽에도 막히지 않으면 화면 끝까지 갑니다.
4. **모서리 광선 추가**: 벽 끝점이 있는 방향으로 광선을 조금 더 쏩니다. 이렇게 하면 모서리 근처의 그림자 경계가 뾰족하게 보입니다.
5. **점 이어 그리기**: 찾은 교차점들을 각도 순서대로 이으면, 빛이 닿는 영역이 한 덩어리의 도형으로 그려집니다.
6. **장애물 다시 그리기**: 벽을 어두운 색으로 다시 그려서, 빛이 닿지 않는 곳처럼 보이게 합니다.

### 3. 이 알고리즘의 장점

- **보이는 영역을 정확히 계산할 수 있습니다.** 왜 벽 뒤가 안 보이는지 수식으로 설명할 수 있습니다.
- **복잡한 모양도 하나의 도형으로 만들 수 있습니다.** 교차점을 이으면 불규칙한 빛의 영역도 다각형으로 그릴 수 있습니다.
- **실시간으로 움직일 수 있습니다.** 빛이나 벽이 움직이면 매 프레임 다시 계산하므로, 인터랙티브 작품에 잘 맞습니다.

### 4. 구현할 때 주의할 점

- **계산량이 많아집니다.** 광선 수 × 벽 수만큼 교차 검사를 해야 하므로, 벽이 많아지면 느려집니다. 이때는 **Grid**(격자)나 **Quadtree**(공간을 4칸씩 나누는 구조)로 가까운 벽만 골라서 검사합니다.
- **컴퓨터의 소수점 오차**: 컴퓨터는 소수를 아주 정확하게 다루지 못합니다. 그래서 거의 평행한 선분이나 아주 짧은 거리를 계산할 때 오차가 생길 수 있습니다. 이때는 $\epsilon$(아주 작은 값)보다 작은 값을 0으로 보고 처리합니다.

### 5. 활용 분야

- **2D 게임**: 캐릭터가 볼 수 있는 범위(시야) 구현, 손전등 효과.
- **제너레이티브 아트**: 빛과 그림자를 이용한 추상 작품.
- **로봇 시뮬레이션**: 2D 라이다(LiDAR) 센서가 주변을 스캔하는 과정 흉내.

### 직접 실험해 보기

- **레이 개수**를 20으로 줄여 보세요. 빛 영역이 어떻게 달라지는지, 왜 뭉툭해 보이는지 관찰해 보세요.
- **빛을 벽 모서리 가까이** 옮겨 보세요. 모서리 광선이 왜 필요한지 확인할 수 있습니다.
- **중앙 사각형 크기**를 키워 보세요. 벽이 커질 때 그림자 영역이 어떻게 바뀌는지 살펴보세요.

<!-- en -->

**2D Ray Casting** shoots rays from one point in every direction. Each ray travels until it hits a wall. The points where the rays stop show what can be seen from that point, and anything behind a wall stays hidden. It works like a flashlight in a room: walls block the light and leave dark areas behind them.

**The math.** A ray is a line $R(t) = P + t\,\vec{d}$ with $t \ge 0$. A wall is a segment $S(u) = A + u(B - A)$ with $0 \le u \le 1$. Set the two equal and solve for $t$ and $u$. If $t \ge 0$ and $0 \le u \le 1$, the ray really hits the wall. If a ray hits several walls, keep the closest hit, which is the smallest $t$.

**How this sketch works.** The light follows the mouse, or moves by itself when the mouse is outside the canvas. Rays are shot at equal angles around the light. The hit points are connected in angle order to draw the lit area. Extra rays aimed at the wall corners make the shadow edges sharp. The obstacles are drawn on top in a dark color.

**Why it matters.** Field of view in games, lighting effects, and simulated laser (LiDAR) sensors all use this idea. Many walls make the calculation slow, so programmers use grids or quadtrees to check only the nearby walls.
