**Harmonograph**(하모노그래프)는 **흔들리는 진자 여러 개가 펜을 함께 움직여 그리는 곡선**입니다. 19세기 말 무렵 실제로 쓰였던 기계 장치를 흉내 낸 것입니다. 진자는 시간이 지나면서 조금씩 멈추는데, 그 과정에서 그린 선이 점점 작아지는 나선이 됩니다.

### 1. 핵심 원리

펜의 $x$ 좌표와 $y$ 좌표는 각각 두 개의 진동을 더해서 정합니다. 각 진동은 사인 곡선이 시간이 갈수록 줄어드는 모양입니다.

$$x(t) = A_1 \sin(f_1 t + \phi_1)\,e^{-d_1 t} + A_2 \sin(f_2 t + \phi_2)\,e^{-d_2 t}$$

$$y(t) = A_3 \sin(f_3 t + \phi_3)\,e^{-d_3 t} + A_4 \sin(f_4 t + \phi_4)\,e^{-d_4 t}$$

- $A$는 **진폭**입니다. 진동이 얼마나 큰지를 정합니다.
- $f$는 **주파수**입니다. 진동이 얼마나 빨리 반복되는지를 정합니다.
- $\phi$는 **위상**입니다. 시작 위치를 정합니다.
- $e^{-dt}$는 **감쇠**입니다. 시간이 지나면서 진동이 줄어드는 정도를 정합니다.

**(1) 정수 비율**: 두 진동의 주파수 비가 1:2, 2:3처럼 간단한 정수 비이면, 곡선이 같은 모양을 반복하며 닫힌 무늬가 됩니다.

**(2) 주파수 차이**: 한 쌍의 진동 중 하나를 아주 조금 다른 주파수로 바꾸면, 곡선이 천천히 회전하며 장미 모양처럼 보입니다.

**(3) 감쇠**: 진동이 점점 줄어들기 때문에, 처음에는 넓게 그리다가 나중에는 중심 근처에 촘촘한 무늬가 생깁니다.

### 2. 이 시뮬레이션의 작동 순서

1. 클릭할 때마다 주파수 비, 위상, 감쇠 값을 무작위로 골라서 진동자 네 개를 만듭니다.
2. 매 프레임 시간을 조금씩 나아가면서, 그 시각의 펜 위치를 계산합니다.
3. 바로 전 위치와 지금 위치를 선으로 잇습니다. 시간이 갈수록 선의 진하기가 옅어집니다.
4. 감쇠 시간에 이르면 그리기를 멈춥니다.

### 3. 이 알고리즘의 장점

- **단순한 진동을 더하는 것만으로** 복잡하고 아름다운 무늬가 나옵니다.
- 주파수 비와 감쇠 값을 바꾸면 전혀 다른 그림이 되므로, 수학과 그림의 관계를 이해하기 좋습니다.
- 소리와 진동을 다루는 원리와 같은 수학을 씁니다.

### 4. 구현할 때 주의할 점

- 주파수 차이를 너무 크게 하면 곡선이 꼬여서 무늬를 알아보기 어려워집니다.
- 감쇠 시간을 너무 짧게 하면 진동이 충분히 줄어들기 전에 그림이 끝납니다.
- 이 예제는 클릭할 때마다 무작위로 새 패턴을 만들기 때문에, 같은 그림이 다시 나오지 않을 수도 있습니다.

### 5. 활용 분야

- **수학과 물리 교육**: 리사주 곡선과 감쇠 진동 설명.
- **음악 시각화**: 소리의 주파수 관계를 그림으로 보여 주기.
- **제너레이티브 아트**: 진자 그림과 기하학적 무늬 작품.

### 직접 실험해 보기

- **주파수 차이**를 1에 가깝게, 그리고 1.05에 가깝게 바꿔 보세요. 곡선이 회전하며 번지는 정도가 어떻게 달라지는지 비교해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **주 진폭**을 0.15와 0.45로 바꿔 보세요. 그림의 크기가 어떻게 달라지는지 확인해 보세요. 이 값도 바꾸면 다시 시작합니다.
- **감쇠 시간**을 30과 200으로 바꿔 보세요. 그림이 얼마나 오래 이어지는지, 중심이 얼마나 촘촘해지는지 살펴보세요. 이 값도 바꾸면 다시 시작합니다.

<!-- en -->

**Harmonograph** draws curves with a set of swinging pendulums that move a pen together. As the pendulums slowly lose energy, the curve spirals inward. The pen position is the sum of two damped sine waves for each direction, so simple waves produce complex patterns.

**How it works.** Whole-number frequency ratios make closed, repeating shapes. A small difference in one frequency makes the shape slowly rotate. Damping makes the curve shrink toward the center over time. Each click picks new random ratios and phases.

**Try it.** Change the frequency difference and the damping time to see how the curve changes.
