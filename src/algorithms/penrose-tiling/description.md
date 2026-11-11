**Penrose Tiling**(펜로즈 타일링)은 **두 종류의 마름모만으로 평면을 채우지만, 같은 모양이 주기적으로 반복되지 않는** 방법입니다. 1974년 수학자 로저 펜로즈가 발견했습니다. 마름모 두 종류의 길이 비가 황금비(약 1.618)이기 때문에, 황금비와 깊이 연결된 무늬입니다.

### 1. 핵심 원리

**(1) 두 종류의 마름모**: 한쪽은 두꺼운 마름모(두꺼운 쪽)이고, 다른 한쪽은 얇은 마름모(얇은 쪽)입니다. 두꺼운 것과 얇은 것의 개수 비도 황금비에 가깝습니다.

**(2) 황금비로 나누기**: 이 예제는 마름모를 삼각형 두 개씩으로 나눠서 다룹니다. 삼각형의 한 변을 황금비의 역수($1/\varphi \approx 0.618$)만큼 나누는 점을 찾고, 그 점을 이용해 더 작은 삼각형들을 만듭니다.

$$P = B + \frac{1}{\varphi}(C - B), \qquad \varphi = \frac{1+\sqrt{5}}{2}$$

이 나누기 규칙을 한 번 적용하는 것을 **한 세대**라고 부릅니다. 세대가 늘어날수록 무늬가 점점 촘촘해집니다.

**(3) 별 모양에서 시작**: 이 예제는 두꺼운 마름모 다섯 개를 둥글게 붙여서 별 모양을 만들고, 거기서부터 나눠 나갑니다.

**(4) 비주기성**: 이 규칙으로 만든 무늬는 이론적으로는 아무리 넓혀도 같은 모양이 정확히 반복되지 않습니다. 다만 몇 세대 정도의 그림으로는 이 성질을 직접 확인하기 어렵습니다.

### 2. 이 시뮬레이션의 작동 순서

1. 두꺼운 마름모 다섯 개를 만들어 별 모양의 기본 도형을 놓습니다.
2. 설정한 세대 수만큼 모든 삼각형을 황금비 규칙으로 나눕니다.
3. 나눠진 삼각형을 두 개씩 마름모처럼 칠합니다. 대각선은 그리지 않아서 마름모로 보입니다.
4. 회전 속도가 0이 아니면 그림 전체가 천천히 돕니다.

### 3. 이 알고리즘의 장점

- **두 가지 마름모**만으로 평면을 채울 수 있습니다.
- 황금비가 기하학에서 얼마나 중요한지 눈으로 볼 수 있습니다.
- 주기적인 타일 무늬와 달리 **반복이 덜 눈에 띄어서** 자연스럽고 신비로운 느낌을 줍니다.

### 4. 구현할 때 주의할 점

- 세대 수가 늘어날수록 삼각형의 개수가 빠르게 늘어납니다. 높은 세대에서는 그리기가 무거워집니다.
- 황금비 값을 바꾸면 더 이상 펜로즈 타일링이 아닙니다. 그래서 이 예제는 황금비를 고정해 두었습니다.

### 5. 활용 분야

- **수학과 기하학 교육**: 황금비와 비주기 타일링 설명.
- **디자인**: 바닥 타일과 벽 패턴.
- **제너레이티브 아트**: 비주기 무늬로 만든 추상 작품.

### 직접 실험해 보기

- **분할 세대 수**를 1과 4로 바꿔 보세요. 세대가 늘어날 때 마름모가 얼마나 잘게 나뉘는지 비교해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **회전 속도**를 -0.02와 0.02로 바꿔 보세요. 그림이 어느 방향으로 도는지, 얼마나 빨리 도는지 확인해 보세요.

<!-- en -->

**Penrose Tiling** covers a plane with just two kinds of rhombus, yet the pattern never repeats exactly in a regular way. Roger Penrose discovered it in 1974. The two rhombuses are related by the golden ratio, about 1.618.

**How it works.** The sketch starts with a star made of five thick rhombuses. Each triangle is split at a point that divides one side in the ratio of the golden ratio. One round of splitting is called a generation, and more generations make the pattern finer. Each pair of triangles is drawn as a rhombus without its inner diagonal.

**Try it.** Change the number of generations and the rotation speed to see how the tiling becomes finer and turns.
