**Space Colonization**(공간 점령)은 **나무가 먹이를 향해 가지를 뻗는 과정**을 흉내 낸 방법입니다. 잎맥이나 나뭇가지가 자라는 방식을 설명할 때 자주 쓰입니다. 먹이는 가지를 자기 쪽으로 끌어당기고, 가지가 먹이에 충분히 가까워지면 먹이는 사라집니다. 먹이가 다 떨어지면 나무는 더 자라지 않습니다.

### 1. 핵심 원리

세 가지 규칙으로 움직입니다.

**(1) 먹이 인식**: 각 먹이(잎)는 **인식 반경** 안에서 가장 가까운 가지 하나를 끌어당깁니다.

**(2) 가지 자라기**: 한 가지가 여러 먹이에게 끌리면, 먹이들이 가리키는 방향을 모두 더해서 평균 방향을 구합니다. 그 방향으로 **마디 길이**만큼 새 가지를 뻗습니다.

$$\mathbf{d} = \frac{1}{n} \sum_{k=1}^{n} \frac{\mathbf{l}_k - \mathbf{b}}{|\mathbf{l}_k - \mathbf{b}|}$$

- $\mathbf{b}$는 가지의 위치, $\mathbf{l}_k$는 $k$번째 먹이의 위치입니다.
- 각 먹이 방향의 길이를 1로 맞춘 뒤 평균을 냅니다.

**(3) 먹이 섭취**: 가지 끝이 먹이의 **섭취 반경** 안에 들어오면, 그 먹이는 사라집니다. 먹이가 줄어들면 그 근처에서는 가지가 더 자라지 않습니다.

### 2. 이 시뮬레이션의 작동 순서

1. 화면 아래 가운데에 뿌리(줄기)를 놓고, 먹이에 닿을 때까지 위로 자랍니다.
2. 매 프레임 각 먹이가 가장 가까운 가지를 찾습니다. 섭취 반경에 들어온 먹이는 지웁니다.
3. 먹이에 끌린 가지마다 새 가지가 하나씩 돋아납니다.
4. 먹이가 없어지거나 더 자랄 곳이 없으면 멈춥니다.

### 3. 이 알고리즘의 장점

- 가지가 **빈 공간을 고르게** 채우면서 자랍니다.
- 나무, 잎맥, 혈관처럼 **가지가 갈라지는 구조**를 잘 흉내 냅니다.
- 먹이의 위치만 바꿔도 전혀 다른 나무가 됩니다.

### 4. 구현할 때 주의할 점

- **먹이가 많을수록** 계산이 크게 늘어납니다. 모든 먹이와 모든 가지를 비교하기 때문입니다.
- **인식 반경이 너무 작으면** 먹이를 찾지 못해 나무가 자라지 않을 수 있습니다. 너무 크면 가지가 한꺼번에 몰립니다.
- 가지 방향이 서로 **정확히 상쇄되면** 방향이 없어집니다. 이 예제는 그런 가지를 건너뛰어서 오류를 막습니다.

### 5. 활용 분야

- **식물 모델링**: 나무와 잎맥 구조 만들기.
- **생물 구조**: 혈관이나 뿌리가 자라는 과정 흉내 내기.
- **제너레이티브 아트**: 나뭇가지 패턴과 건축 디자인의 영감.

### 직접 실험해 보기

- **먹이 인식 반경**을 40과 150으로 바꿔 보세요. 가지가 얼마나 넓게 뻗는지 비교해 보세요.
- **잎 개수**를 100과 1000으로 바꿔 보세요. 먹이 수에 따라 나무가 얼마나 빽빽해지는지 확인해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **나뭇가지 마디 길이**를 1과 8로 바꿔 보세요. 가지가 짧고 촘촘한지, 길고 성긴지 살펴보세요.

<!-- en -->

**Space Colonization** grows a branching tree toward food points. Food points pull the nearest branch toward them, and a branch that reaches a food point consumes it. When the food runs out, growth stops. This method is often used to model leaf veins and tree branches.

**How it works.** Each food point finds its nearest branch within the perception radius. Each branch that has food points grows one new segment in the average direction of those points. Food inside the consumption radius disappears.

**Try it.** Change the perception radius and the number of leaves to see how open or dense the tree becomes.
