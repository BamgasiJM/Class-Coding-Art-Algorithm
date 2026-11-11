**Escape-Time Fractal**(탈출 시간 프랙탈)은 **복소수 점 하나에 같은 계산을 반복해서, 값이 얼마나 빨리 멀리 달아나는지로 색을 정하는** 방법입니다. 이 계산 결과를 화면에 그리면 **만델브로트 집합**이라는 유명한 프랙탈이 나타납니다. 경계에 가까울수록 무늬가 끝없이 복잡해지는 것이 특징입니다.

### 1. 핵심 원리

**(1) 복소수 한 점**: 화면의 각 칸은 복소평면의 한 점 $c$에 대응합니다. 복소수는 실수 부분 $x$와 허수 부분 $y$로 이루어진 수입니다.

**(2) 반복 계산**: 0에서 시작해서 다음 식을 반복합니다.

$$z_{n+1} = z_n^2 + c$$

이 식을 풀어서 쓰면 실수 부분과 허수 부분이 각각 다음과 같이 바뀝니다.

$$x_{n+1} = x_n^2 - y_n^2 + x_0, \qquad y_{n+1} = 2x_n y_n + y_0$$

- $x_0$, $y_0$는 칸의 위치(c)입니다.
- $x_n$, $y_n$은 $n$번째 계산 결과입니다.

**(3) 탈출 판정**: 계산 결과 $x^2 + y^2$이 4보다 커지면 **탈출**했다고 봅니다. 한 번 탈출하면 더 이상 돌아오지 않습니다.

**(4) 색 정하기**: 탈출할 때까지 걸린 횟수가 적을수록 어두운 색, 많을수록 강조색에 가깝게 칠합니다. 끝까지 탈출하지 않은 점은 가장 어두운 색으로 칠합니다. 이 어두운 부분이 만델브로트 집합입니다.

### 2. 이 시뮬레이션의 작동 순서

1. 화면을 격자로 나누고, 칸마다 복소평면의 점을 정합니다.
2. 각 칸에서 위의 반복 계산을 최대 반복 횟수까지 합니다.
3. 탈출 횟수에 따라 색을 입히고 칸을 그립니다.
4. 반복 횟수가 시간에 따라 조금씩 바뀌어서, 색이 천천히 흘러갑니다.

### 3. 이 알고리즘의 장점

- **아주 단순한 식 하나**가 무한히 복잡한 모양을 만듭니다.
- 확대하면 계속 새로운 무늬가 나타나는 **자기 닮음**을 직접 볼 수 있습니다.
- 복소수를 화면 좌표로 옮기는 방법을 배울 수 있습니다.

### 4. 구현할 때 주의할 점

- 반복 횟수가 많을수록 더 정확하지만 계산이 무거워집니다. 격자 칸이 많을수록 계산이 더 늘어납니다.
- 복소평면을 화면에 옮길 때 가로와 세로 비율을 맞춰야 합니다. 비율이 틀리면 프랙탈이 찌그러져 보입니다. 이 예제는 정사각형으로 맞춰 두었습니다.

### 5. 활용 분야

- **수학 교육**: 복소수와 반복 계산의 관계 설명.
- **시각 예술**: 프랙탈 그림과 확대 영상.
- **제너레이티브 아트**: 수식으로 그린 무늬 작품.

### 직접 실험해 보기

- **확대**를 1과 10 사이에서 바꿔 보세요. 같은 자리를 확대할 때 무늬가 얼마나 복잡해지는지 관찰해 보세요.
- **기본 반복 횟수**를 10과 100으로 바꿔 보세요. 반복이 많을수록 경계가 얼마나 정교해지는지 확인해 보세요.
- **X 위치**를 -2와 0 사이에서 바꿔 보세요. 화면이 어디를 보여 주는지 살펴보세요.

<!-- en -->

**Escape-Time Fractal** repeats a simple complex-number formula for each point on the screen and colors the point by how many steps it takes to escape. Drawing these results reveals the Mandelbrot set, a famous fractal whose edges become more and more detailed the closer you look.

**How it works.** For each point c, the sketch repeats z = z² + c, starting from zero. Each point is written as an x part and a y part, so the step is computed with two simple formulas. If the squared size goes above 4, the point escapes and is colored by how fast that happened. Points that never escape stay dark.

**Try it.** Change the zoom and the number of repeats to see more detail near the edges.
