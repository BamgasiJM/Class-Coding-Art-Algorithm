**Easing & Interpolation**(이징과 보간)은 한 점에서 다른 점으로 **부드럽게 옮겨 가는 움직임**을 만드는 방법입니다. 엘리베이터가 출발할 때는 천천히 빨라지고, 도착할 때는 천천히 멈추는 것처럼, 움직임의 속도를 자연스럽게 바꾸는 것이 핵심입니다.

### 1. 핵심 원리

**(1) 보간: 두 점 사이의 중간 값 구하기**
시작점 $S$와 끝점 $E$ 사이의 위치는 다음과 같이 구합니다.

$$p(t) = S + t(E - S), \quad 0 \le t \le 1$$

$t$는 0이면 시작점, 1이면 끝점에 있다는 뜻입니다. 이렇게 하면 속도가 일정해서 움직임이 딱딱해 보입니다.

**(2) 이징: 속도를 바꾸는 규칙**
이 시뮬레이션은 조금 다른 방식을 씁니다. 매 프레임마다 **남은 거리의 일부만** 움직입니다.

$$\text{현재 위치} \leftarrow \text{현재 위치} + (\text{목표 위치} - \text{현재 위치}) \times k$$

여기서 $k$는 **이징 가중치**입니다. 목표에 가까워질수록 남은 거리가 줄어들기 때문에, 이동 속도도 자동으로 줄어듭니다. 이것이 **감속**입니다. 처음에는 거리가 멀어서 빠르게 출발합니다.

### 2. 이 시뮬레이션의 작동 순서

1. 화면 안에 무작위로 **목표 점**을 하나 정합니다. 작은 원으로 보입니다.
2. 큰 원이 매 프레임 목표를 향해 남은 거리의 일부만큼 움직입니다.
3. 목표에 1픽셀 안으로 도착하면, 새로운 무작위 목표를 정합니다.
4. 배경을 조금씩 덮어씌웁니다. 원이 지나간 자리에 **잔상**이 남습니다.

### 3. 이 알고리즘의 장점

- **구현이 쉬움**: 한 줄짜리 계산이 전부입니다.
- **자연스러운 감속**: 사람은 갑자기 멈추는 움직임보다 천천히 멈추는 움직임을 자연스럽게 느낍니다.
- **다양한 곳에 적용**: 위치뿐 아니라 색, 크기, 투명도에도 같은 방법을 쓸 수 있습니다.

### 4. 구현할 때 주의할 점

- **목표에 영원히 도착하지 않을 수 있습니다.** 그래서 "충분히 가까우면 도착"이라는 기준(여기서는 1픽셀)을 둡니다.
- **시간 기준과 프레임 기준은 다릅니다.** 이 방식은 프레임마다 움직이므로, 컴퓨터가 느리면 움직임도 느려집니다. 시간 기준으로 바꾸려면 경과 시간을 이용하세요.
- **다른 이징 함수**도 있습니다. 처음에 느리다가 빨라지는 함수(ease-in), 튕기는 함수(bounce) 등이 있으며, 모두 같은 보간 식에 $k$ 대신 다른 곡선을 넣는 방식입니다.

### 5. 활용 분야

- **UI 애니메이션**: 버튼을 눌렀을 때 메뉴가 부드럽게 펼쳐지는 효과.
- **게임**: 캐릭터 이동, 카메라 따라가기.
- **제너레이티브 아트**: 움직임을 부드럽게 만들어 리듬감 있는 작품을 만듭니다.

### 직접 실험해 보기

- **이싱 가중치**를 0.01로 낮춰 보세요. 원이 아주 천천히 움직이는 것을 볼 수 있습니다.
- **이싱 가중치**를 0.3으로 올려 보세요. 거의 바로 목표에 도착해서 감속이 잘 안 보입니다.
- **잔상 강도**를 50과 255 사이에서 바꿔 보세요. 잔상이 길어지거나 짧아지는 차이를 확인해 보세요.

<!-- en -->

**Easing & Interpolation** describes how to move something smoothly from one point to another. Interpolation finds the point between a start and an end. Easing changes how fast the movement happens, so an object can start slowly and stop gently instead of moving at a fixed speed.

**How this sketch works.** Each frame, the circle moves a fraction of the remaining distance to its target. Because the distance gets smaller, the circle slows down as it arrives. This is called ease-out. When the circle is within one pixel of the target, a new random target is chosen.

**Try it.** Change the easing value. A small value makes the circle move slowly, and a large value makes it arrive almost at once.
