**Reaction-Diffusion**(반응-확산)은 **두 물질이 퍼지면서 서로 반응하는 과정**을 흉내 낸 방법입니다. 표범의 점무늬, 얼룩말의 줄무늬, 산호의 주름이 이런 과정으로 생긴다고 알려져 있습니다. 1952년 앨런 튜링이 이 아이디어를 제안했습니다. 이 예제는 가장 많이 쓰는 **Gray-Scott** 모델입니다.

### 1. 핵심 원리

화면의 칸마다 물질 A와 B가 있습니다. 각 칸의 값은 0부터 1 사이입니다. 시간이 지나면 두 물질은 세 가지 일을 합니다.

1. **퍼짐**: 각 칸은 이웃과 값을 나눕니다. A는 B보다 두 배 빨리 퍼집니다.
2. **반응**: A와 B가 만나면 B가 A를 먹고 B가 늘어납니다.
3. **공급과 소비**: A는 계속 공급되고, B는 일정한 비율로 사라집니다.

수식으로 쓰면 다음과 같습니다.

$$\frac{\partial A}{\partial t} = D_A \nabla^2 A - AB^2 + f(1-A)$$

$$\frac{\partial B}{\partial t} = D_B \nabla^2 B + AB^2 - (k+f)B$$

- $\nabla^2$는 **퍼짐**입니다. 주변 칸의 평균에서 내 값을 뺀 것이라고 생각하면 됩니다.
- $AB^2$는 **반응**입니다. A와 B가 만나는 양입니다.
- $f$는 **공급율**(Feed), $k$는 **소비율**(Kill)입니다.
- $D_A$와 $D_B$는 퍼지는 빠르기입니다. 이 예제에서는 A가 B보다 두 배 빠릅니다.

### 2. 이 시뮬레이션의 작동 순서

1. 처음에는 A가 칸 전체에 가득 차 있고, 가운데 작은 사각형에만 B를 넣습니다.
2. 매 프레임마다 계산을 여러 번 합니다(시뮬레이션 속도). 계산은 80×80 격자에서 하고, 화면 크기로 키워서 보여 줍니다.
3. 칸마다 A와 B의 차이에 따라 색을 입힙니다. 강조색이 진한 곳은 A가 많고 B가 적은 곳입니다.

### 3. 이 알고리즘의 장점

- 간단한 규칙 두 개로 **생물 무늬와 닮은 모양**이 나옵니다.
- 공급율과 소비율의 두 값만 바꿔도 점, 줄무늬, 미로 같은 전혀 다른 패턴이 나옵니다.

### 4. 구현할 때 주의할 점

- 한 프레임에 계산을 여러 번 하면 패턴이 빨리 자라지만, 값이 너무 급하게 바뀌면 화면이 깨질 수 있습니다.
- 같은 공급율과 소비율이라도 처음 모양에 따라 결과가 달라질 수 있습니다.

### 5. 활용 분야

- **생물학**: 동물 무늬와 조직 모양이 생기는 원리 연구.
- **그래픽**: 자연스러운 텍스처 만들기.
- **제너레이티브 아트**: 유기적인 무늬 작품.

### 직접 실험해 보기

- **공급율**을 0.03과 0.06으로 바꿔 보세요. 패턴이 얼마나 빨리 자라는지 비교해 보세요.
- **소비율**을 0.05와 0.065로 바꿔 보세요. 점과 줄무늬가 어떻게 달라지는지 확인해 보세요.
- **시뮬레이션 속도**를 1로 낮춰서 천천히 자라는 과정을 관찰해 보세요.

<!-- en -->

**Reaction-Diffusion** describes two chemicals that spread out and react with each other. Patterns such as leopard spots, zebra stripes, and coral ridges are often explained this way. Alan Turing proposed the idea in 1952. This sketch uses the Gray-Scott model.

**How it works.** Chemical A is supplied all the time, and chemical B is removed at a steady rate. A spreads about twice as fast as B. Where A and B meet, B turns A into more B. These three actions (spreading, reacting, and supplying or removing) make the pattern.

**Try it.** Change the feed and kill values. Small changes can turn the pattern into spots, stripes, or worm-like shapes.
