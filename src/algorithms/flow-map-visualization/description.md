**Flow Map Visualization**(흐름 지도 시각화)은 **공간의 각 위치에 있는 흐름의 방향을 짧은 선분으로 그려서 보여 주는** 방법입니다. 바람이나 물이 어느 방향으로 흐르는지 한눈에 볼 때 쓰는 지도와 같습니다. 입자를 움직이는 대신, 흐름장 자체를 정지된 선으로 나타낸다는 점이 특징입니다.

### 1. 핵심 원리

**(1) 방향 정하기**: 화면의 각 칸마다 노이즈 값을 구합니다. 노이즈 값은 0과 1 사이이고, 가까운 곳끼리 비슷합니다. 이 값을 각도로 바꿉니다.

$$\theta(x, y, t) = \text{noise}(x \cdot s,\ y \cdot s,\ t) \cdot 4\pi$$

- $s$는 **노이즈 스케일**입니다. 값이 크면 방향이 칸마다 빨리 바뀝니다.
- $t$는 시간입니다. 시간이 흐르면 흐름장이 천천히 변합니다.
- 각도에 $4\pi$를 곱해서 두 바퀴를 돌 수 있게 했습니다. 그래서 방향의 변화가 더 다양해집니다.

**(2) 선분 그리기**: 각 칸의 중심에 선분을 하나 그립니다. 선분은 $\theta$ 방향으로 놓입니다. 그러면 칸마다 흐름의 방향이 보입니다.

**(3) 투명도로 파동 만들기**: 각도의 사인 값에 따라 선의 투명도가 바뀝니다. 그래서 흐름이 밝고 어두운 물결처럼 보입니다.

### 2. 이 시뮬레이션의 작동 순서

1. 화면을 격자로 나눕니다. 격자 칸 하나의 크기는 그리드 해상도로 정합니다.
2. 칸마다 노이즈 값을 구해서 각도를 정합니다.
3. 칸의 중심에서 그 각도 방향으로 짧은 선분을 그립니다.
4. 시간이 흐르면 노이즈가 변해서, 선분들의 방향이 천천히 바뀝니다.

### 3. 이 알고리즘의 장점

- **흐름 방향을 한눈에** 보여 줄 수 있습니다.
- 입자를 여러 개 움직이지 않아도 되므로 계산이 간단합니다.
- 바람 지도, 해류 지도, 전기장 그림처럼 **공간 전체의 방향 데이터**를 나타내는 데 씁니다.

### 4. 구현할 때 주의할 점

- 격자가 너무 성기면 흐름의 디테일이 보이지 않고, 너무 촘촘하면 선이 빽빽해서 어지럽습니다.
- 선의 길이와 굵기를 칸 크기에 맞춰야 칸끼리 겹치지 않습니다.

### 5. 활용 분야

- **기상과 해양**: 바람과 해류 지도.
- **물리 교육**: 전기장과 자기장을 선으로 그리기.
- **제너레이티브 아트**: 흐르는 선분으로 만든 추상 그림.

### 직접 실험해 보기

- **그리드 해상도**를 10과 60으로 바꿔 보세요. 선이 얼마나 촘촘하게 보이는지, 흐름의 디테일이 어떻게 달라지는지 비교해 보세요.
- **노이즈 스케일**을 0.005와 0.1로 바꿔 보세요. 방향이 넓게 변하는지, 잘게 변하는지 확인해 보세요.
- **시간 흐름 속도**를 0으로 맞춰 보세요. 흐름이 멈춘 지도를 보면서 방향 패턴을 자세히 살펴보세요.

<!-- en -->

**Flow Map Visualization** draws the direction of a flow at every grid point as a short line. It works like a wind map or a current map: instead of moving particles, the sketch shows the flow field itself. Each direction comes from a smooth noise value, and the field slowly changes over time.

**How it works.** Each noise value becomes an angle between 0 and four pi, so the lines can turn through two full circles. A short line is drawn at the center of each cell in that direction, and its transparency follows a sine wave, which makes the field look like it is rippling.

**Try it.** Change the grid resolution and the noise scale to see how the flow map changes.
