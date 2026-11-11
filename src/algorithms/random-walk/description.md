**Random Walk**(무작위 걸음)은 **다음 걸음을 무작위로 정하면서 움직인 점의 자취**를 그리는 방법입니다. 술에 취한 사람이 비틀비틀 걷는 모습과 비슷해서, 술 취한 걸음이라고도 부릅니다. 꽃가루가 물속에서 흔들리며 퍼지는 **브라운 운동**을 설명할 때 가장 먼저 나오는 모델입니다.

### 1. 핵심 원리

**(1) 네 방향 중 하나**: 점은 매 걸음마다 위, 오른쪽, 아래, 왼쪽 중 하나를 무작위로 고릅니다. 각 방향을 고를 확률은 같습니다.

**(2) 보폭만큼 이동**: 고른 방향으로 **보폭**만큼 움직입니다. 이 예제에서는 보폭이 일정합니다.

**(3) 자취 남기기**: 지나간 위치를 기록해 두고, 그 자취를 선으로 잇습니다. 오래된 자취는 옅고 가늘게, 최근 자취는 진하고 굵게 그립니다.

**(4) 얼마나 멀리 갈까?**: 걸음 수가 $n$일 때, 처음 자리에서 떨어진 거리는 걸음 수에 정확히 비례하지 않고, 대략 $\sqrt{n}$에 비례합니다. 방향이 무작위여서 서로 상쇄되기 때문입니다.

이 예제의 화면 가장자리는 벽처럼 작동합니다. 점이 가장자리에 닿으면 그 자리에 머뭅니다.

### 2. 이 시뮬레이션의 작동 순서

1. 워커(점)를 화면 가운데에 놓습니다.
2. 매 프레임 각 워커가 무작위 방향으로 보폭만큼 한 걸음 움직입니다.
3. 새 위치를 자취 기록에 추가합니다. 최대 꼬리 길이를 넘으면 가장 오래된 기록을 지웁니다.
4. 자취를 그리고, 맨 끝에 현재 위치를 점으로 표시합니다.

### 3. 이 알고리즘의 장점

- 규칙이 가장 단순한 확률 모델 중 하나입니다.
- 꽃가루, 분자, 주식 가격의 움직임처럼 **무작위로 흔들리는 현상**을 설명할 수 있습니다.
- 워커가 많아질수록 전체적으로 퍼지는 모양을 관찰하기 좋습니다.

### 4. 구현할 때 주의할 점

- 워커가 가장자리에 머무는 것은 이 예제의 설계입니다. 가장자리를 넘어 반대쪽으로 나가게 하면 다른 모양이 됩니다.
- 꼬리 길이를 길게 하면 기록이 많아져서 계산이 조금 무거워집니다.

### 5. 활용 분야

- **물리학**: 브라운 운동과 확산 현상 설명.
- **금융**: 주가 변동을 흉내 내는 모델.
- **생물학**: 동물의 먹이 찾기 움직임 연구.
- **제너레이티브 아트**: 흔들리며 퍼지는 선 그림.

### 직접 실험해 보기

- **워커 개수**를 1과 30으로 바꿔 보세요. 워커가 많을 때 화면이 얼마나 빽빽해지는지 확인해 보세요.
- **이동 보폭**을 2와 40으로 바꿔 보세요. 보폭이 클수록 자취가 얼마나 넓게 퍼지는지 비교해 보세요.
- **최대 꼬리 길이**를 10과 300으로 바꿔 보세요. 기록이 짧을 때와 길 때 자취가 어떻게 보이는지 살펴보세요.

<!-- en -->

**Random Walk** moves a point one step at a time in a random direction and draws its path. Each step goes up, right, down, or left with equal chance. The path looks like a drunken walk, and the same model describes Brownian motion, the jittery movement of tiny particles in water. Because the directions cancel each other out, the walker tends to spread out in proportion to the square root of the number of steps.

**How it works.** Each walker takes a fixed-size step. Its recent positions are kept as a trail, and older parts fade out and become thinner. A walker that reaches an edge of the screen stays there.

**Try it.** Change the number of walkers and the step size to see how the paths spread.
