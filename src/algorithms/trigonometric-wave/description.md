**Trigonometric Wave**(삼각함수 파동)는 **사인**(sin)과 **코사인**(cos) 함수로 물결 모양의 선을 그리는 방법입니다. 사인과 코사인은 원을 한 바퀴 도는 값을 좌우로 펼친 것이라서, 같은 모양이 규칙적으로 반복됩니다. 이 반복되는 모양을 여러 개 겹치면 단순한 물결이 복잡한 리듬이 됩니다.

### 1. 핵심 원리

**(1) 기본 파동**
사인 함수 하나는 다음과 같이 쓸 수 있습니다.

$$y = A \sin(2\pi f t + \phi)$$

- $A$는 **진폭**입니다. 물결이 위아래로 얼마나 크게 움직이는지를 정합니다.
- $f$는 **주파수**입니다. 1초에 물결이 몇 번 반복되는지를 정합니다.
- $\phi$는 **위상**입니다. 물결을 좌우로 밀어서 시작 위치를 정합니다.

**(2) 여러 파동 더하기**
이 시뮬레이션에서는 사인 파동 하나에 코사인 파동과 작은 고조파(더 빠른 작은 물결)를 조금씩 섞습니다.

$$y = \text{사인 성분} \times 0.72 + \text{코사인 성분} \times 0.28 + \text{고조파}$$

이렇게 섞으면 물결이 한 가지 모양으로 반복되지 않고, 더 자연스럽고 복잡한 모양이 됩니다.

**(3) 줄마다 다르게 만들기**
화면에는 여러 줄의 파동이 겹쳐 그려집니다. 줄마다 주파수와 위상을 조금씩 다르게 줍니다. 그래서 줄들이 서로 어긋나며 흐르는 리듬이 생깁니다.

### 2. 이 시뮬레이션의 작동 순서

1. 화면 위쪽에 있는 줄은 **멀리 있는 것**으로 보고 작고 옅게 그립니다. 아래쪽 줄은 가깝다고 보고 크고 진하게 그립니다.
2. 화면 가운데 줄일수록 진폭이 커집니다. 그래서 가운데가 높게 솟아오릅니다.
3. 시간이 흐르면 위상이 조금씩 바뀝니다. 그래서 물결이 계속 움직입니다.
4. 매 프레임 배경을 살짝 덮어씌웁니다. 지나간 물결이 흐릿한 잔상으로 남습니다.

### 3. 이 알고리즘의 장점

- **간단한 공식**: 사인과 코사인만으로 복잡한 모양을 만들 수 있습니다.
- **작은 변화가 큰 차이**: 주파수나 진폭을 조금만 바꿔도 전혀 다른 그림이 나옵니다.
- **소리와 연결**: 소리도 파동이라서, 음악을 그림으로 옮길 때 자주 씁니다.

### 4. 구현할 때 주의할 점

- **주파수 비율**이 간단한 정수 비(예: 1:2)이면 모양이 깔끔하게 반복됩니다. 비율이 복잡하면 모양도 복잡해지고 반복이 잘 보이지 않습니다.
- **샘플 수**가 적으면 선이 각진 다각형처럼 보입니다. 샘플을 늘리면 곡선이 매끄러워지지만 계산이 더 필요합니다.

### 5. 활용 분야

- **음악 시각화**: 소리의 주파수를 파동 모양으로 바꿔서 실시간으로 보여 줍니다.
- **제너레이티브 아트**: 리사주 곡선처럼 파동이 겹쳐 만든 추상 그림.
- **애니메이션**: 흔들림이나 진동 효과, 카메라 흔들림.

### 직접 실험해 보기

- **파동 개수**를 10으로 줄이고 100으로 늘려 보세요. 줄 사이의 간격과 겹침이 어떻게 달라지는지 확인해 보세요.
- **파동별 주파수 차이**를 1로 낮춰 보세요. 줄들이 서로 비슷해져서 물결이 어떻게 보이는지 살펴보세요.
- **중심부 진폭 부스트**를 10(가장 작은 값)으로 낮춰 보세요. 가운데가 덜 솟아오르면서 전체가 평평해지는 것을 확인할 수 있습니다.

<!-- en -->

**Trigonometric Wave** draws wavy lines with the **sine** and **cosine** functions. These functions repeat the same shape over and over, like a point going around a circle and then flattening out. When several waves with different sizes and speeds are added together, a simple ripple becomes a complex rhythm.

**How it works.** Each line is a sine wave with its own **frequency** (how fast it repeats), **phase** (where it starts), and **amplitude** (how tall it is). The code also mixes in a cosine wave and a faster, smaller wave to make the shape less regular. Lines near the center are taller, and far lines are smaller and fainter, which creates a sense of depth. Over time the phases shift, so the waves keep moving.

**Try it.** Change the number of waves, or the difference in frequency between waves, to see how the rhythm changes. Simple number ratios make clean, repeating shapes, while complex ratios make the shapes harder to predict.
