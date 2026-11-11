**Marching Squares**(마칭 스퀘어즈)는 **숫자가 적힌 격자에서 같은 높이의 선(등고선)을 찾아 그리는** 방법입니다. 지도에서 높이가 같은 곳을 이은 선을 떠올리면 됩니다. 격자의 네 꼭짓점이 기준보다 높은지 낮은지를 보면, 선이 그 칸을 어떻게 지나가는지 16가지 경우로 나눌 수 있습니다.

### 1. 핵심 원리

**(1) 노이즈 높이 만들기**: 격자의 각 꼭짓점에는 노이즈로 만든 높이 값이 있습니다. 노이즈는 가까운 곳끼리 비슷한 값을 가지므로, 산과 골짜기 같은 지형이 생깁니다.

**(2) 네 꼭짓점 비교**: 칸 하나의 네 꼭짓점을 기준 높이(등고선 높이)와 비교합니다. 기준보다 높으면 1, 낮으면 0으로 적습니다. 네 자리를 이으면 0과 1로 이루어진 4자리 숫자가 나옵니다. 이 숫자는 0부터 15까지 16가지입니다.

**(3) 선 그리기**: 16가지 경우마다 선이 칸의 어느 두 변을 지나는지가 정해져 있습니다. 표에서 찾아 그리면 됩니다.

**(4) 선의 위치**: 선이 변과 만나는 위치는 두 꼭짓점의 높이 차이로 계산합니다. 한쪽이 기준에 훨씬 가까우면 선이 그쪽에 가깝게 그려집니다.

**(5) 애매한 경우**: 대각선 방향으로 높고 낮은 꼭짓점이 엇갈린 칸(두 가지 경우)은 가운데 높이를 보고 선을 어떻게 이을지 정합니다.

### 2. 이 시뮬레이션의 작동 순서

1. 격자의 꼭짓점마다 노이즈 높이를 계산합니다. 시간이 흐르면 노이즈 값이 조금씩 바뀝니다.
2. 기준 높이를 중심으로 몇 개의 등고선을 그립니다. 가운데 것이 가장 진하고, 위아래로 갈수록 옅어집니다.
3. 칸마다 네 꼭짓점을 비교하고, 위 규칙으로 선을 그립니다.
4. 배경에는 노이즈 높이에 따라 옅은 색을 깔아서, 지형처럼 보이게 합니다.

### 3. 이 알고리즘의 장점

- 지도, 기온 분포, 의료 영상처럼 **숫자 격자를 선으로 바꾸는** 방법으로 널리 쓰입니다.
- 16가지 경우만 알면 되므로 구현이 간단합니다.
- 격자가 촘촘할수록 선이 부드러워지고, 성기면 빠르지만 거칠어집니다.

### 4. 구현할 때 주의할 점

- 격자 칸마다 노이즈를 여러 번 계산하므로, 등고선을 많이 그리면 계산이 무거워집니다.
- 대각선 엇갈림 칸은 두 가지 선 중 하나를 골라야 합니다. 이 규칙을 빼먹으면 선이 끊기거나 엉킵니다.

### 5. 활용 분야

- **지도와 지리**: 높이가 같은 곳을 잇는 등고선 지도.
- **기상과 의료**: 기온이나 밀도 분포를 선으로 나타내는 그림.
- **제너레이티브 아트**: 지형처럼 흐르는 등고선 작품.

### 직접 실험해 보기

- **등고선 높이**를 0.1과 0.9로 바꿔 보세요. 기준 높이가 바뀌면 선이 지형의 어느 부분을 따라가는지 확인해 보세요.
- **격자 크기**를 8과 40으로 바꿔 보세요. 격자가 촘촘할 때와 성길 때 선이 얼마나 부드러운지 비교해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **노이즈 밀도**를 0.05와 0.5로 바꿔 보세요. 지형의 굴곡이 넓어지는지, 잘게 나뉘는지 살펴보세요.

<!-- en -->

**Marching Squares** draws contour lines through a grid of height values. For each cell, the sketch compares the four corners with a threshold height. The pattern of above and below corners gives one of sixteen cases, and each case tells where the contour line crosses the cell. Noise creates the height values, so the result looks like a landscape.

**How it works.** Each corner gets a noise value. Several contour lines are drawn around the threshold, with the main line the darkest. A soft background shows the height, and the threshold can be moved to see different contours.

**Try it.** Change the threshold height and the noise density to see how the contour lines move.
