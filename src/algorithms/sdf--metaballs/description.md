**Metaballs**(메타볼)는 **여러 개의 공이 가까워지면 서로 달라붙어 하나의 물방울처럼 합쳐지는** 방법입니다. 공 하나하나는 단순한 원이지만, 그 주변에 "영향력"을 퍼뜨리고 영향력이 일정 수준을 넘는 곳만 칠하면 공들이 자연스럽게 이어집니다. 이 예제는 거리에 따라 정해지는 값(거리 기반 함수)을 써서 이 모양을 만듭니다.

### 1. 핵심 원리

**(1) 영향력 더하기**: 화면의 한 점 $\mathbf{x}$에서 각 공의 영향력을 계산해서 모두 더합니다. 공이 가까울수록 영향력이 커집니다.

$$f(\mathbf{x}) = \sum_i \frac{r_i^2}{|\mathbf{x} - \mathbf{c}_i|^2}$$

- $\mathbf{c}_i$는 $i$번째 공의 중심입니다.
- $r_i$는 공의 반지름입니다.
- $|\mathbf{x} - \mathbf{c}_i|$는 그 점과 공 중심 사이의 거리입니다.

**(2) 경계 정하기**: 합이 **경계 임계값**보다 큰 곳만 칠합니다. 임계값을 높이면 칠해지는 곳이 줄어들어 공이 작아 보입니다.

**(3) 부드러운 가장자리**: 합이 임계값을 조금 넘는 곳은 옅게, 많이 넘는 곳은 진하게 칠합니다. 그래서 경계가 부드럽게 보입니다.

이 예제의 값은 **진짜 거리(SDF)**가 아니라 거리의 제곱으로 만든 값입니다. 그래도 같은 생각을 씁니다. 값의 등고선이 모양의 가장자리가 됩니다.

### 2. 이 시뮬레이션의 작동 순서

1. 공 여러 개를 무작위 위치와 속도로 만듭니다.
2. 매 프레임 공을 움직입니다. 벽에 닿으면 튕겨 나옵니다.
3. 화면을 일정 간격의 칸으로 나누고, 칸마다 위의 합을 계산합니다.
4. 합이 임계값을 넘는 칸을 칠합니다. 칸 크기는 렌더링 해상도로 정합니다.

### 3. 이 알고리즘의 장점

- 공이 가까워지면 **자연스럽게 합쳐지고 떨어지는** 모양을 만듭니다.
- 공의 위치와 크기만 정하면 복잡한 형태가 저절로 나옵니다.
- 3D 그래픽에서도 같은 생각을 써서 물, 젤리 같은 표면을 만듭니다.

### 4. 구현할 때 주의할 점

- 칸마다 모든 공을 계산하므로, 공 개수와 해상도가 높으면 계산이 매우 무거워집니다.
- 렌더링 해상도를 1로 두면 가장 선명하지만 가장 느립니다.

### 5. 활용 분야

- **그래픽**: 물방울, 젤리, 유기적인 표면 만들기.
- **게임**: 액체처럼 흐르는 캐릭터나 효과.
- **제너레이티브 아트**: 합쳐졌다 떨어지는 추상 작품.

### 직접 실험해 보기

- **메타볼 개수**를 2와 20으로 바꿔 보세요. 공이 많아질 때 합쳐지는 모양이 어떻게 달라지는지 확인해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **경계 임계값**을 0.5와 2.0으로 바꿔 보세요. 임계값이 커질 때 공이 얼마나 작아지는지 관찰해 보세요.
- **렌더링 해상도**를 1과 8로 바꿔 보세요. 가장자리가 얼마나 거칠어지는지, 얼마나 빨라지는지 비교해 보세요. 이 값도 바꾸면 다시 시작합니다.

<!-- en -->

**Metaballs** are blobs that merge when they come close. Each ball spreads an influence around itself, and the sketch fills only the places where the total influence passes a threshold. Nearby balls therefore join into one smooth shape. The sketch uses a distance-based value, which is not a true signed distance field, but it follows the same idea: a contour of a value defines the edge.

**How it works.** At each point, the influence of every ball is added together. Places above the threshold are colored, and places just above it are lighter for a soft edge. The balls move and bounce off the walls.

**Try it.** Change the number of balls and the threshold to see how the blobs merge and shrink.
