**Cellular Automata**(셀룰러 오토마타, 세포 자동자)는 **칸(세포)이 이웃의 상태를 보고 자기 상태를 바꾸는 규칙**을 되풀이하는 방법입니다. 이 예제는 가장 단순한 1차원 버전을 씁니다. 한 줄에 칸이 여러 개 있고, 줄 하나가 한 세대(generation)입니다. 줄을 위에서 아래로 내려 그리면, 시간이 흐르는 모습이 됩니다.

### 1. 핵심 원리

**(1) 세 칸을 보고 결정하기**
각 칸은 0(꺼짐) 또는 1(켜짐)입니다. 다음 줄의 칸은 **왼쪽, 자기 자신, 오른쪽**의 세 칸을 보고 정합니다. 세 칸이 켜졌는지 꺼졌는지의 조합은 모두 8가지입니다.

**(2) 규칙 번호 90 읽기**
8가지 조합에 대한 답을 2진수로 적은 것이 **규칙 번호**입니다. 90을 2진수로 쓰면 01011010입니다. 이 규칙의 결과를 몇 가지만 보면 다음과 같습니다.
- 왼쪽만 1 → 다음 칸은 1
- 오른쪽만 1 → 다음 칸은 1
- 왼쪽과 오른쪽이 모두 1 → 다음 칸은 0
- 가운데만 1 → 다음 칸은 0

정리하면, **왼쪽과 오른쪽 중 하나만 켜져 있을 때만 1**이 됩니다. 가운데 칸은 결과에 아무 영향을 주지 않습니다. 이런 계산을 **배타적 논리합**(XOR)이라고 합니다.

**(3) 줄마다 그리기**
첫 줄(0세대)은 가운데 칸 하나만 켭니다. 그다음 줄부터는 앞 줄을 보고 규칙대로 계속 만듭니다.

### 2. 이 시뮬레이션의 작동 순서

1. 첫 줄을 준비합니다. 가운데 칸 하나만 켜거나, 무작위로 채웁니다(초기 상태).
2. 한 줄을 그립니다. 켜진 칸은 강조색 사각형으로 그립니다.
3. 규칙을 적용해서 다음 줄을 계산합니다.
4. 세대 속도만큼 줄을 내려 그립니다. 화면 아래까지 내려가면 멈춥니다.

### 3. 장점

- **단순한 규칙, 복잡한 결과**: 규칙 90 하나로 **시에르핀스키 삼각형**이라는 프랙탈 무늬가 나옵니다.
- **자연의 무늬와 닮음**: 조개껍데기나 동물 털의 무늬를 설명할 때 자주 씁니다.
- **가벼운 계산**: 칸마다 이웃 세 칸만 보면 됩니다.

### 4. 주의할 점

- **가장자리 칸**은 계산하지 않아서 항상 0으로 남습니다. 그래서 바깥쪽이 조금 잘린 것처럼 보일 수 있습니다.
- **규칙 번호마다** 전혀 다른 결과가 나옵니다. 어떤 번호는 줄무늬를, 어떤 번호는 복잡한 무늬를 만듭니다.

### 5. 활용 분야

- **자연 모델링**: 조개껍데기, 동물 무늬 같은 패턴을 설명하는 모델.
- **교통과 확산 모델**: 차량 흐름이나 질병 확산을 간단하게 흉내 냅니다.
- **게임과 아트**: 맵 생성과 제너레이티브 아트에 씁니다.

### 직접 실험해 보기

- **규칙 번호**를 22, 54, 183으로 바꿔 보세요. 규칙마다 무늬가 어떻게 다른지 비교해 보세요.
- **초기 상태**를 랜덤으로 바꿔 보세요. 가운데 한 칸에서 시작할 때와 무엇이 다른지 살펴보세요.
- **셀 크기**를 2와 12로 바꿔 보세요. 칸이 커질수록 무늬가 어떻게 보이는지 확인해 보세요.

<!-- en -->

**Cellular Automata** are grids of cells that change state by following a rule based on their neighbors. This sketch uses the simplest version: a single row of cells, where each new row is a new generation. Drawing the rows from top to bottom shows how the pattern changes over time.

**How it works.** Each cell looks at its left neighbor, itself, and its right neighbor. Rule 90 is written in binary as 01011010. With this rule, a cell becomes 1 only when exactly one of its two neighbors is on. This is called XOR. Starting from one cell in the middle, the rule creates a Sierpinski triangle, a famous fractal pattern.

**Try it.** Change the rule number and the start mode to see how the patterns change.
