**Phyllotaxis**(잎차례)는 식물의 **잎, 씨앗, 꽃잎이 자리 잡는 규칙**을 흉내 낸 알고리즘입니다. 해바라기 씨앗이나 솔방울을 보면 나선 모양이 보이는데, 이 모양을 아주 단순한 규칙 두 개로 만들 수 있습니다.

### 1. 핵심 원리

점을 하나씩 찍을 때마다 두 가지를 정합니다.

**(1) 거리: 중심에서 얼마나 멀리 있을지**

$$r_i = c \cdot \sqrt{i}$$

- $i$는 점의 번호입니다. 0번 점은 가운데에 있고, 번호가 커질수록 바깥으로 나갑니다.
- $c$는 **나선 간격**입니다. 이 값이 클수록 점 사이가 넓어집니다.
- 거리를 $i$가 아니라 $\sqrt{i}$로 정하는 이유가 있습니다. 바깥쪽은 원의 둘레가 길어서 점을 같은 간격으로 흩으면 밀도가 낮아집니다. 제곱근을 쓰면 점이 많아질수록 **면적당 점의 개수가 거의 일정하게** 유지됩니다.

**(2) 각도: 몇 도 돌아서 찍을지**

$$\theta_i = i \times 137.5^\circ$$

- 137.5도는 **황금각**이라고 부릅니다. 360도를 황금비의 제곱($\phi^2 \approx 2.618$)으로 나눈 값입니다.
- 매번 137.5도씩 돌면, 점들이 어느 한 방향으로 줄지어 서지 않고 가장 고르게 흩어집니다. 이 각도를 바꾸면 모양이 바로 달라집니다.

두 값을 극좌표에서 화면의 $x$, $y$ 좌표로 바꾸면 점의 위치가 됩니다.

$$x_i = r_i \cos\theta_i, \quad y_i = r_i \sin\theta_i$$

### 2. 이 시뮬레이션의 작동 순서

1. 점을 900개 찍습니다. 각 점의 거리와 각도를 위 식으로 계산합니다.
2. 점의 **크기**는 가운데에서 크고 바깥에서 작아집니다.
3. 점의 **밝기와 투명도**도 가운데에서 진하고 바깥에서 옅어집니다. 그래서 공간에 깊이감이 생깁니다.
4. 이 과정을 매 프레임 다시 그립니다. 값을 바꾸면 바로 반영됩니다.

### 3. 이 알고리즘의 장점

- **규칙이 단순함**: 식 두 개면 충분합니다.
- **자연스러운 모양**: 실제 식물의 나선과 많이 닮았습니다.
- **다양한 응용**: 점의 크기와 색을 바꾸면 꽃, 별, 그래픽 패턴으로 바뀝니다.

### 4. 구현할 때 주의할 점

- **각도를 아주 조금만 틀려도** 모양이 크게 바뀝니다. 예를 들어 137도와 137.5도는 바깥쪽에서 전혀 다른 나선을 만듭니다.
- **점이 너무 많으면** 점끼리 겹쳐서 흐려 보입니다. 점 크기를 점 개수에 맞춰 조절하세요.
- **각도 단위**에 주의하세요. 많은 언어의 삼각함수는 라디안을 쓰므로 도 단위를 라디안으로 바꿔야 합니다.

### 5. 활용 분야

- **제너레이티브 아트**: 꽃과 나선을 닮은 추상 그림.
- **자연 시뮬레이션**: 게임이나 영화에 나오는 식물 모양을 자동으로 만듭니다.
- **3D 그래픽**: 공 표면에 점을 고르게 뿌릴 때 같은 원리를 씁니다.

### 직접 실험해 보기

- **회전 각도**를 137.5에서 120으로 바꿔 보세요. 점들이 세 줄기로 나뉘는 것을 볼 수 있습니다.
- **나선 간격**을 2로 줄이고 20으로 늘려 보세요. 점들이 촘촘해지거나 성기게 되는 모습을 확인해 보세요.
- **중심 점 크기**와 **외곽 점 크기**를 같은 값으로 맞춰 보세요. 크기 차이가 깊이감을 만든다는 것을 알 수 있습니다.

<!-- en -->

**Phyllotaxis** copies the way leaves, seeds, and petals are arranged on real plants. Sunflower seeds and pinecones show spiral patterns, and a few simple rules can create them. Each point is placed at a distance from the center that grows with the square root of its number, and it is rotated by the golden angle, about 137.5 degrees.

**Why these two rules?** The square-root distance keeps the points evenly spread, so they do not crowd together in the center or thin out at the edge. The golden angle keeps each new point away from the directions of earlier points, so no clear rows form. Changing the angle changes the whole pattern: for example, 120 degrees creates three separate arms.

**Try it.** Change the spacing, the angle, and the point sizes to see how the spiral changes.
