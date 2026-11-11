**Strange Attractor**(이상한 끌개)는 **아주 단순한 식을 같은 방식으로 계속 반복했을 때, 점들이 모이는 복잡한 모양**을 보여 주는 방법입니다. 이 예제는 **드종(De Jong) 끌개**라는 식을 씁니다. 식이 네 개의 숫자로만 이루어져 있어서, 숫자를 바꿀 때마다 완전히 다른 그림이 나옵니다.

### 1. 핵심 원리

점 하나 $(x, y)$를 다음 식으로 옮깁니다.

$$x_{n+1} = \sin(a\, y_n) - \cos(b\, x_n)$$

$$y_{n+1} = \sin(c\, x_n) - \cos(d\, y_n)$$

- $a$, $b$, $c$, $d$는 네 개의 숫자입니다. 이 값들이 그림의 모양을 정합니다.
- 식을 한 번 적용할 때마다 점이 새로운 자리로 옮겨집니다.

**(1) 반복하기**: 아무 점에서 시작해서 식을 수백 번 반복합니다. 처음 몇 번은 버리고, 그 뒤의 점들만 기록합니다. 이 과정을 **예열**이라고 합니다.

**(2) 점 쌓기**: 기록된 점들을 모두 화면에 찍으면, 점들이 어떤 모양의 영역 안에 모여 있는 것을 볼 수 있습니다. 이 모양이 **끌개**입니다.

**(3) 여러 시작점**: 시작점을 여러 개 골라서 각각 반복하면, 같은 끌개를 여러 방향에서 채우게 됩니다. 그래서 그림이 촘촘해집니다.

**(4) 화면에 맞추기**: 계산된 점들의 범위를 구해서 화면 크기에 맞게 늘이거나 줄입니다.

### 2. 이 시뮬레이션의 작동 순서

1. 임의의 시작점을 여러 개 고릅니다.
2. 각 시작점에서 예열한 뒤, 식을 반복하면서 점을 기록합니다.
3. 모든 점의 범위를 구해서 화면 좌표로 바꿉니다.
4. 점을 순서대로 조금씩 찍습니다. 그림이 점점 완성되는 모습을 볼 수 있습니다.

### 3. 이 알고리즘의 장점

- **식은 한 줄인데** 그림은 매우 복잡하고 아름답습니다.
- 숫자를 조금만 바꿔도 전혀 다른 모양이 나와서, 실험하는 재미가 큽니다.
- 혼돈 속에서도 질서가 생기는 **카오스**의 개념을 눈으로 확인할 수 있습니다.

### 4. 구현할 때 주의할 점

- 어떤 숫자 조합은 점이 한 곳에 붙거나 흩어져서 그림이 거의 나오지 않습니다. 이때는 다른 숫자를 시도해 보세요.
- 점이 계산 도중 너무 커지면 화면 밖으로 나가므로, 범위가 너무 큰 점은 기록에서 뺍니다.

### 5. 활용 분야

- **수학과 물리**: 카오스 이론과 끌개 개념 설명.
- **시각 예술**: 수식으로 그린 추상 작품.
- **제너레이티브 아트**: 무작위 시작점과 숫자로 만드는 다양한 무늬.

### 직접 실험해 보기

- **De Jong A**를 -2와 2 사이에서 바꿔 보세요. 한 숫자만 바뀌어도 그림의 모양이 얼마나 달라지는지 확인해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **De Jong B**와 **De Jong C**를 조금씩 바꿔 보세요. 그림이 어느 쪽으로 퍼지는지, 얼마나 촘촘한지 관찰해 보세요. 이 값도 바꾸면 다시 시작합니다.
- **De Jong D**를 바꿔 보세요. 네 숫자 중 어느 것이 그림을 가장 크게 바꾸는지 찾아보세요. 이 값도 바꾸면 다시 시작합니다.

<!-- en -->

**Strange Attractor** repeats one simple formula many times and draws where the points gather. This sketch uses the De Jong attractor, which is defined by only four numbers. Each starting point is repeated many times, and the points it produces trace a complex shape. Changing the four numbers gives very different pictures.

**How it works.** Each point is moved by the formula, and the first iterations are thrown away so the point settles. The remaining points from many starting points are collected, scaled to fit the canvas, and drawn one by one.

**Try it.** Change the four numbers A, B, C, and D to see how the shape changes.
