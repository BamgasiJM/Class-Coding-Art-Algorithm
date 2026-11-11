**Voronoi Diagram**(보로노이 다이어그램)은 **평면을 씨앗 점 기준으로 나눈 지도**입니다. 화면의 모든 점은 **가장 가까운 씨앗**에 속합니다. 그래서 씨앗마다 하나의 영역(셀)이 생기고, 영역 사이의 경계선은 두 씨앗에서 똑같이 가까운 곳들이 모인 선입니다. 세포, 거품, 갈라진 진흙 무늬에서 이런 모양을 볼 수 있습니다.

### 1. 핵심 원리

**(1) 영역 정하기**: 화면의 점 $\mathbf{x}$는 가장 가까운 씨앗 $\mathbf{p}_i$의 영역에 속합니다.

$$V_i = \{\, \mathbf{x} : |\mathbf{x} - \mathbf{p}_i| \le |\mathbf{x} - \mathbf{p}_j| \ \text{(모든 } j \ne i\text{)} \,\}$$

**(2) 경계선 찾기**: 한 점에서 가장 가까운 씨앗까지의 거리 $d_1$과, 두 번째로 가까운 씨앗까지의 거리 $d_2$를 비교합니다.

- $d_2 - d_1$이 작으면, 그 점은 두 영역이 만나는 곳에 가깝습니다.
- 이 차이가 **경계선 두께** 기준보다 작으면 경계선으로 칠합니다.

**(3) 색 정하기**: 경계선이 아닌 칸은 씨앗마다 정해진 밝기로 칠합니다. 씨앗에 가까울수록 밝고, 멀어질수록 어두워집니다.

### 2. 이 시뮬레이션의 작동 순서

1. 씨앗 점을 무작위로 흩뿌립니다.
2. 화면의 모든 점에 대해 가장 가까운 씨앗과 두 번째로 가까운 씨앗을 찾습니다.
3. 두 거리 차이가 기준보다 작으면 어두운 선으로 칠합니다.
4. 나머지 칸은 씨앗의 밝기와 거리에 따라 칠합니다.
5. 화면을 클릭하면 씨앗을 새로 뿌려서 다시 그립니다.

### 3. 이 알고리즘의 장점

- "가장 가까운 것을 고른다"는 한 가지 규칙으로 **공간을 나누는** 방법을 배울 수 있습니다.
- 게임 맵에서 가장 가까운 기지를 찾는 문제 등에 씁니다.

### 4. 구현할 때 주의할 점

- 씨앗이 많아질수록 계산이 늘어납니다. 모든 점마다 모든 씨앗을 확인하기 때문입니다.
- 경계선 두께는 화면 픽셀 기준이라, 화면을 키우면 선도 함께 두꺼워 보입니다.

### 5. 활용 분야

- **게임과 지도**: 가장 가까운 영역 나누기, 세력권 표시.
- **자연 무늬**: 세포, 거품, 진흙 균열의 모양 연구.
- **제너레이티브 아트**: 분할 그림과 추상 패턴.

### 직접 실험해 보기

- **Seed 개수**를 10과 150으로 바꿔 보세요. 영역이 크고 적은 모양과 작고 많은 모양을 비교해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **경계선 두께**를 0.5와 3으로 바꿔 보세요. 경계선이 얇아지거나 굵어지는 것을 확인해 보세요. 이 값도 바꾸면 다시 시작합니다.
- 화면을 클릭해서 씨앗을 새로 뿌려 보세요. 같은 설정에서도 무늬가 매번 달라지는 것을 확인할 수 있습니다.

<!-- en -->

**Voronoi Diagram** divides a plane into regions around seed points. Every point belongs to the region of its nearest seed. The borders between regions are the places where two seeds are equally close. Cells, soap bubbles, and cracked mud often show this pattern.

**How it works.** For each pixel, the sketch finds the nearest seed and the second-nearest seed. If their distances are almost the same, the pixel lies on a border and is drawn dark. Other pixels are colored by their seed, and they get brighter near the seed.

**Try it.** Change the number of seeds and the border thickness, or click the canvas to make a new pattern.
