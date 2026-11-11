**Curl Noise**(컬 노이즈)는 노이즈로 **흐름의 방향**을 만들되, 입자가 한 곳에 몰리거나 흩어지지 않도록 만드는 방법입니다. 물이 흐를 때 물방울이 한 점으로 모이지 않고 **등고선**을 따라 흘러가는 것과 비슷합니다. 연기나 물결 같은 유체 흐름을 흉내 낼 때 자주 씁니다.

### 1. 핵심 원리

**(1) 높이 지도 만들기**
먼저 노이즈로 화면 전체의 **높이 값** $F(x, y)$를 만듭니다. 이 값을 산의 높이라고 생각하면 이해하기 쉽습니다.

**(2) 기울기를 90도 돌리기**
높이가 낮은 쪽으로 굴러 내려가면 입자는 한 점으로 모입니다. 대신 **경사에 수직인 방향**으로 움직이면, 입자는 같은 높이를 따라 돕니다. 이 방향을 만드는 것이 컬(curl)입니다.

$$\mathbf{v} = (v_x, v_y) = \left(\frac{\partial F}{\partial y},\ -\frac{\partial F}{\partial x}\right)$$

$\frac{\partial F}{\partial x}$는 $x$ 방향으로 얼마나 기울었는지를 뜻합니다. 코드에서는 주변 두 점의 값 차이로 이 기울기를 근사합니다. 이 방법을 **중앙 차분법**이라고 합니다.

**(3) 속도 크기 맞추기**
계산된 벡터의 길이를 **흐름 강도** 값으로 맞춥니다. 그래서 모든 입자가 같은 빠르기로 움직입니다.

**왜 모이지 않을까?**
이 방식으로 만든 흐름은 **펼쳐지거나 모이지 않습니다**. 수학에서는 이것을 "발산이 0이다"라고 말합니다. 입자가 많아져도 한 점에 뭉치지 않는 이유입니다.

### 2. 이 시뮬레이션의 작동 순서

1. 입자 400개를 무작위 위치에 놓습니다.
2. 각 입자 위치에서 컬 방향을 계산합니다.
3. 입자를 그 방향으로 조금 옮깁니다.
4. 화면 밖으로 나가거나 수명이 다하면, 다시 무작위 위치에서 시작합니다.
5. 배경을 아주 조금만 덮어씌워서 입자가 지나간 자리에 긴 잔상이 남게 합니다.

### 3. 장점

- **자연스러운 흐름**: 연기나 물결처럼 소용돌이치는 움직임을 만듭니다.
- **고르게 채워짐**: 입자가 한곳에 뭉치지 않아서 화면이 고르게 채워집니다.
- **구현이 간단함**: 노이즈 함수 하나와 기울기 계산만 있으면 됩니다.

### 4. 주의할 점

- **미분 스텝**이 너무 크면 기울기가 부정확해집니다. 너무 작으면 계산 오차가 커질 수 있습니다.
- **노이즈 스케일**이 너무 크면 소용돌이가 잘게 쪼개져서 어지럽게 보입니다.
- 이 예제는 속도 크기를 **항상 같게** 맞춥니다. 그래서 실제 유체처럼 빠른 곳과 느린 곳이 생기지 않습니다.

### 5. 활용 분야

- **유체 효과**: 연기, 불꽃, 물결의 움직임.
- **자연 현상**: 바람에 흔들리는 풀잎이나 나뭇잎의 움직임.
- **제너레이티브 아트**: 소용돌이 무늬와 흐르는 선 그림.

### 직접 실험해 보기

- **흐름 강도**를 0.3과 3으로 바꿔 보세요. 입자가 얼마나 빨리 움직이는지 비교해 보세요.
- **파티클 개수**를 50과 1000 사이에서 바꿔 보세요. 입자가 많아질 때 흐름의 모양이 어떻게 드러나는지 확인해 보세요.
- **잔상 길이**를 2와 30으로 비교해 보세요. 흐름의 선이 얼마나 길게 남는지 살펴보세요.

<!-- en -->

**Curl Noise** uses noise to create a flow direction, but it is arranged so that particles never bunch up or spread apart. It is like water flowing along contour lines instead of collecting in one spot. It is often used to imitate smoke or ripples.

**How it works.** Noise creates a height map. Moving straight downhill would gather particles into one point. Instead, the sketch moves particles at a right angle to the slope, so they travel along the same height. This direction is called the curl. The code estimates the slope by comparing nearby points, and it sets every particle to the same speed.

**Try it.** Change the flow strength and the number of particles to see how the flow changes.
