**Chladni Figures**(클라드니 도형)는 **진동하는 판 위에 모래를 뿌리면, 판이 움직이지 않는 선 위로 모래가 모여서 만들어지는 무늬**입니다. 18세기 독일의 물리학자 에른스트 클라드니가 바이올린 활로 금속판을 울려서 이 무늬를 처음 관찰했습니다. 소리의 진동이 눈에 보이는 모양으로 나타나는 현상입니다.

### 1. 핵심 원리

**(1) 진동하는 판**: 정사각형 판이 특정한 방식으로 진동합니다. 판의 높이는 위치마다 다르게 흔들립니다. 이때 흔들림이 0인 곳들이 이어진 선을 **마디선**(노드 라인)이라고 합니다.

**(2) 모드 번호 n과 m**: 진동 방식은 두 숫자 $n$, $m$으로 정해집니다. 숫자가 크면 마디선이 더 많아집니다.

**(3) 흔들림을 나타내는 식**: 판의 위치 $(x, y)$에서 흔들림의 정도는 다음과 같습니다. 0 근처가 마디선입니다.

$$f(x, y) = \cos(n\pi x)\cos(m\pi y) - \cos(m\pi x)\cos(n\pi y)$$

**(4) 모래가 모이는 곳**: 판이 세게 흔들리는 곳에서는 모래가 튀어 올라 밀려나고, 흔들림이 0인 마디선 위에는 모래가 가만히 남습니다. 그래서 모래가 마디선을 따라 모입니다.

이 예제는 $n$과 $m$을 시간에 따라 조금씩 바꿉니다. 그래서 무늬가 계속 변합니다.

### 2. 이 시뮬레이션의 작동 순서

1. 화면의 각 칸에 대해 위의 식으로 흔들림 값을 계산합니다.
2. 흔들림이 0에 가까울수록 강조색, 클수록 배경색으로 칠합니다. 그래서 마디선이 밝게 보입니다.
3. 시간이 흐르면 $n$과 $m$이 조금씩 바뀌어 무늬가 변합니다.
4. 화면 왼쪽 위에 현재의 $n$과 $m$ 값이 표시됩니다.

### 3. 이 알고리즘의 장점

- **소리와 진동**이 눈에 보이는 무늬로 바뀌는 것을 직접 볼 수 있습니다.
- 수식 하나로 다양한 대칭 무늬를 만들 수 있습니다.
- 파동과 고유 진동이라는 물리 개념을 배우기 좋습니다.

### 4. 구현할 때 주의할 점

- $n$과 $m$이 정수가 아니면 무늬가 대칭이 깨져서 복잡해집니다. 이 예제는 일부러 소수도 쓰게 해서 변화를 보여 줍니다.
- 칸이 너무 크면 마디선이 울퉁불퉁하게 보입니다. 칸을 작게 하면 부드러워지지만 계산이 늘어납니다.

### 5. 활용 분야

- **물리 교육**: 진동과 고유 모드 설명.
- **음향 공학**: 스피커와 악기 판의 진동 분석.
- **제너레이티브 아트**: 소리의 모양을 그린 작품.

### 직접 실험해 보기

- **n 기본값**을 1과 8로 바꿔 보세요. 마디선의 개수가 어떻게 달라지는지 관찰해 보세요.
- **m 기본값**을 1과 8로 바꿔 보세요. 가로와 세로 방향의 무늬가 어떻게 달라지는지 비교해 보세요.
- **노드 라인 명확도**를 2와 15로 바꿔 보세요. 모래가 모인 선이 얼마나 뚜렷하게 보이는지 확인해 보세요.

<!-- en -->

**Chladni Figures** show the patterns that appear on a vibrating plate covered with sand. Sand bounces off the parts of the plate that move the most and collects on the lines that stay still. Ernst Chladni first observed these patterns in the 18th century by bowing metal plates. Here, a formula with two mode numbers, n and m, gives the vibration at each point, and the lines where it is zero are drawn bright.

**How it works.** Each cell gets a value from the formula. Values near zero are colored with the accent color, so the still lines glow. The mode numbers change slowly over time, so the figure keeps changing. The current n and m are shown in the top-left corner.

**Try it.** Change the base values of n and m to see how the lines multiply and rotate.
