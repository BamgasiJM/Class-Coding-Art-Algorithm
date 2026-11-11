**Shape Morphing**(도형 변형)은 **한 도형이 다른 도형으로 부드럽게 바뀌는 중간 모양을 계속 보여 주는** 방법입니다. 이 예제는 원과 별 모양을 같은 개수의 점으로 나타내고, 점마다 두 도형의 위치 사이를 조금씩 옮겨서 변형시킵니다.

### 1. 핵심 원리

**(1) 같은 개수의 점**: 원과 별을 모두 같은 개수의 점으로 나타냅니다. 점 하나하나가 짝을 이루므로, 첫 번째 점은 원의 첫 번째 점에서 별의 첫 번째 점으로 옮겨 갑니다.

**(2) 원**: 점들을 원 둘레에 같은 간격으로 놓습니다. 모든 점이 같은 거리에 있습니다.

**(3) 별**: 점들을 같은 각도에 놓되, 거리를 각도에 따라 다르게 줍니다. 각도에 따라 거리가 주기적으로 늘었다 줄었다 하면 별 모양이 됩니다. 별의 뾰족한 개수는 **별 극의 개수**가 정합니다.

**(4) 보간 (두 점 사이 옮기기)**: 두 도형의 짝 점을 잇는 선 위에서 위치를 정합니다.

$$p(t) = (1 - t)\,\mathbf{p}_{원} + t\,\mathbf{p}_{별}, \qquad 0 \le t \le 1$$

$t$가 0이면 원, 1이면 별입니다. $t$를 0과 1 사이에서 오가게 하면 도형이 계속 변합니다. 이 방식을 **선형 보간**이라고 합니다.

### 2. 이 시뮬레이션의 작동 순서

1. 원과 별의 점 좌표를 계산합니다. 같은 개수, 같은 순서입니다.
2. 매 프레임 시간에 따라 $t$를 0과 1 사이에서 부드럽게 바꿉니다. 사인 함수를 쓰므로 원에서 별로, 다시 원으로 되돌아옵니다.
3. 각 점을 $t$ 비율로 옮긴 위치를 구합니다.
4. 옮겨진 점들을 순서대로 이어서 하나의 닫힌 선으로 그립니다.
5. 배경을 조금씩 덮어씌워서 이전 모양의 잔상이 남게 합니다.

### 3. 이 알고리즘의 장점

- 점의 짝을 맞추는 것만으로 **어떤 두 도형이든** 부드럽게 바꿀 수 있습니다.
- 보간 한 줄이 핵심이라서, 애니메이션 원리를 배우기 좋습니다.
- 로고 변형이나 캐릭터 애니메이션 같은 곳에 바로 응용할 수 있습니다.

### 4. 구현할 때 주의할 점

- 두 도형의 점 개수나 순서가 다르면 점들이 엉켜서 이상하게 변합니다. 짝을 먼저 맞춰야 합니다.
- 별의 뾰족한 부분이 많을수록 같은 점 개수로는 모양이 거칠어질 수 있습니다.

### 5. 활용 분야

- **그래픽 디자인**: 아이콘과 로고의 모양이 바뀌는 애니메이션.
- **게임**: 캐릭터나 물체가 다른 모양으로 변신하는 효과.
- **제너레이티브 아트**: 도형이 흐르듯 변하는 작품.

### 직접 실험해 보기

- **변형 속도**를 0.01과 0.1로 바꿔 보세요. 원에서 별로 바뀌는 속도가 어떻게 달라지는지 비교해 보세요.
- **별 극의 개수**를 3과 12로 바꿔 보세요. 뾰족한 부분이 많아질 때 중간 모양이 어떻게 달라지는지 확인해 보세요.
- **별의 진폭**을 0.2와 1.0으로 바꿔 보세요. 별이 얼마나 깊게 파이는지, 원과의 차이가 얼마나 커지는지 살펴보세요.

<!-- en -->

**Shape Morphing** smoothly changes one shape into another. This sketch uses a circle and a star, each made of the same number of points. Every point of the circle is paired with a point of the star, and each point slides between its two positions as the time value goes back and forth between 0 and 1. The linear interpolation step is the core of this method.

**How it works.** The circle has points spaced evenly around it. The star's distance changes with the angle, which creates its points. Each frame, the time value follows a sine wave, so the shape morphs from circle to star and back again.

**Try it.** Change the morph speed and the number of star points to see how the in-between shapes change.
