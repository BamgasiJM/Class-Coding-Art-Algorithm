**Abelian Sandpile**(아벨 모래 더미)은 **격자 위에 모래를 한 알씩 쌓다가, 한 칸에 4개 이상이 모이면 네 이웃에게 나눠 주는** 규칙으로 만든 모래 더미입니다. 이 단순한 규칙만으로 대칭적이고 프랙탈을 닮은 복잡한 무늬가 나타납니다. 모래가 한꺼번에 무너지는 눈사태(애벌랜치)를 흉내 낸 모델입니다.

### 1. 핵심 원리

**(1) 격자와 모래**: 화면은 칸으로 나뉘어 있고, 각 칸에는 모래 알갱이가 몇 개 쌓여 있습니다.

**(2) 무너뜨리기 (토플링)**: 한 칸에 모래가 4개 이상이면, 그 칸은 **무너집니다**. 무너지는 칸은 4개의 알갱이를 위, 아래, 왼쪽, 오른쪽 이웃에게 한 개씩 나눠 줍니다. 이웃이 4개 이상이 되면 그 이웃도 무너집니다. 이렇게 무너짐이 연쇄적으로 퍼집니다.

**(3) 가장자리에서 떨어지기**: 격자 가장자리 밖으로 나간 알갱이는 사라집니다. 그래서 모래는 결국 안정된 상태에 도달합니다. 모든 칸이 0에서 3 사이가 되면 멈춥니다.

**(4) 순서와 무관한 결과**: 어느 칸부터 무너뜨려도 최종 모양은 같습니다. 이 성질을 **아벨 성질**이라고 부르며, 이 모델의 이름이 여기서 왔습니다.

### 2. 이 시뮬레이션의 작동 순서

1. 화면 가운데 칸에 모래를 많이 쌓습니다(초기 중심 모래량).
2. 매 프레임 설정한 횟수만큼 전체 칸을 훑으며, 4개 이상인 칸을 무너뜨립니다.
3. 칸의 모래 개수에 따라 색을 입힙니다. 0~3개는 어두운 색에서 강조색으로, 4개 이상(무너지는 중인 칸)은 흰색으로 보입니다.
4. 마우스를 클릭하면 그 칸에 모래를 더 붓습니다. 그러면 새로운 무너짐이 일어납니다.

### 3. 이 알고리즘의 장점

- **규칙이 매우 단순한데** 대칭적이고 아름다운 패턴이 나옵니다.
- 모래를 한 칸에 몰아 붓는 것만으로 연쇄 반응을 관찰할 수 있습니다.
- 자기 조직화 임계 현상, 즉 작은 자극에 큰 변화가 생기는 현상을 설명하기 좋습니다.

### 4. 구현할 때 주의할 점

- 한 번에 많은 모래를 넣으면 무너짐이 오래 이어져서 계산이 길어집니다.
- 무너짐을 계산할 때 모래를 한 칸씩 나눠 주는 대신, 4로 나눈 몫만큼 한꺼번에 나눠 줘도 결과는 같습니다. 이 예제는 그렇게 계산해서 빠릅니다.

### 5. 활용 분야

- **물리 연구**: 눈사태와 지진 같은 자기 조직화 임계 현상의 모델.
- **생물과 생태**: 개체가 한 번에 흩어지는 현상 흉내 내기.
- **제너레이티브 아트**: 대칭 무늬로 된 디지털 작품.

### 직접 실험해 보기

- **초기 중심 모래량**을 1000과 40000으로 바꿔 보세요. 모래가 많을수록 무늬가 얼마나 넓게 퍼지는지 비교해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **클릭 시 추가 모래량**을 1000과 30000으로 바꿔 보세요. 클릭한 곳에서 무너짐이 얼마나 커지는지 확인해 보세요.
- **프레임당 연산 횟수**를 1과 30으로 바꿔 보세요. 무너짐이 얼마나 빨리 진행되는지 관찰해 보세요.

<!-- en -->

**Abelian Sandpile** is a grid of cells that hold grains of sand. When a cell has four or more grains, it topples and gives one grain to each of its four neighbors. Grains that fall off the edge disappear. This simple rule creates symmetric, fractal-like patterns, and it models avalanches. The final pattern does not depend on the order in which the cells topple.

**How it works.** The sketch drops a large pile of sand in the center. Each frame it scans the grid and topples every cell with four or more grains. Clicking adds more sand to one spot and starts a new avalanche.

**Try it.** Change the starting sand and the amount added by a click to see how far the avalanches spread.
