**TSP Art**(외판원 문제 아트)는 **흩어진 점들을 한 번도 빠짐없이 지나는 가장 짧은 선**을 찾는 문제를 그림으로 만든 것입니다. 외판원 문제(TSP)는 물건을 팔러 다니는 사람이 모든 도시를 한 번씩 들르고 돌아오는 가장 짧은 길을 찾는 문제입니다. 점이 많아지면 가능한 경로가 천문학적으로 많아져서, 정확한 답을 찾기 어렵습니다.

### 1. 핵심 원리

**(1) 점 찍기**: 화면에 점을 무작위로 찍습니다. 이때 밀도가 높은 곳과 낮은 곳이 생기도록 노이즈 값으로 확률을 조절합니다. 그래서 점들이 한 줄로 이어질 때 그림의 명암처럼 보입니다.

**(2) 이웃 따라가기 (가장 가까운 점 찾기)**: 처음 점에서 출발해서, 아직 방문하지 않은 점 중 가장 가까운 점으로 계속 이동합니다. 빠르게 경로를 만들 수 있지만, 마지막에는 멀리 돌아가는 구간이 생깁니다.

**(3) 두 간선 바꾸기 (2-opt)**: 경로에서 간선 두 개를 골라서, 그 사이 구간을 뒤집어 보는 방법입니다. 뒤집었을 때 두 간선의 길이 합이 줄어들면 그대로 바꿉니다. 이 과정을 여러 번 반복하면 경로가 점점 짧아지고, 선이 서로 교차하지 않게 됩니다.

**(4) 그리기**: 최적화된 순서대로 점을 이어서 선으로 그립니다. 선은 천천히 그려져서, 한 줄이 그림을 완성해 가는 모습을 볼 수 있습니다.

### 2. 이 시뮬레이션의 작동 순서

1. 노이즈 밀도에 따라 점을 찍습니다.
2. 가장 가까운 점 따라가기로 처음 경로를 만듭니다.
3. 2-opt로 경로를 다듬습니다. 설정한 횟수만큼 전체를 훑습니다.
4. 최적화된 경로를 따라 선을 그립니다. 그리기 속도로 한 프레임에 그릴 선의 개수를 정합니다.

### 3. 이 알고리즘의 장점

- **간단한 규칙으로 긴 선 그림**을 만들 수 있습니다.
- 가장 짧은 경로를 찾는 문제가 그림과 자연스럽게 연결됩니다.
- 점의 밀도 분포를 바꾸면 같은 방법으로 전혀 다른 명암의 그림이 나옵니다.

### 4. 구현할 때 주의할 점

- 2-opt는 점이 많아질수록 계산이 빠르게 늘어납니다.
- 2-opt는 가장 좋은 답을 보장하지 않습니다. 대부분 좋은 답에 가깝지만, 더 나은 경로가 남아 있을 수 있습니다.
- 이 예제는 열린 경로입니다. 시작점과 끝점이 이어지지 않으므로, 계산할 때 마지막 간선을 빼고 생각해야 합니다.

### 5. 활용 분야

- **물류와 배송**: 여러 장소를 한 번씩 방문하는 최단 경로 계획.
- **회로와 제조**: 드릴이나 로봇 팔이 점을 찍는 순서 정하기.
- **제너레이티브 아트**: 한 줄로 그린 점묘화 작품.

### 직접 실험해 보기

- **스티플 점 개수**를 50과 500으로 바꿔 보세요. 점이 많을수록 그림이 얼마나 선명해지는지 비교해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **경로 최적화 횟수**를 1과 5로 바꿔 보세요. 최적화 횟수가 많을수록 선이 교차하는 곳이 얼마나 줄어드는지 확인해 보세요. 이 값도 바꾸면 다시 시작합니다.
- **그리기 속도**를 30과 300으로 바꿔 보세요. 선이 그려지는 과정을 천천히, 또는 빠르게 관찰해 보세요.

<!-- en -->

**TSP Art** draws points as one continuous line, using the traveling salesman problem. The goal is the shortest path that visits every point once. The sketch starts with a path that always goes to the nearest unvisited point, then improves it with 2-opt, which swaps two edges when that makes the path shorter. The result is a single line that fills the picture like a drawing.

**How it works.** Points are placed with more density in some areas, using noise. The 2-opt steps are repeated a set number of times, and the final path is drawn slowly. The path is open, so its start and end are not connected.

**Try it.** Change the number of points and the number of optimization passes to see how the line becomes cleaner.
