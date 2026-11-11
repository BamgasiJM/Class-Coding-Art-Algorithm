**IFS & Fractal**(반복 함수 시스템과 프랙탈)은 **간단한 변환 몇 개를 무작위로 골라서 계속 적용**하면, 복잡한 모양이 저절로 나타나는 방법입니다. 이 예제는 실제 식물인 **고사리**와 닮은 모양을 만듭니다.

### 1. 핵심 원리

**(1) 변환 규칙: 점을 옮기는 식**
점 $(x, y)$를 다음 식으로 새로운 위치 $(x', y')$로 옮깁니다. 예는 큰 잎을 만드는 규칙입니다.

$$x' = s \cdot x + \theta \cdot y, \qquad y' = -\theta \cdot x + s \cdot y + h$$

쉽게 말하면 점을 **조금 줄이고, 살짝 돌리고, 위로 옮기는** 과정입니다.
- $s$는 **잎 축소 비율**입니다. 0.85이면 점 사이 거리가 85%로 줄어듭니다.
- $\theta$는 **가지 휨 정도**입니다. 점을 조금씩 돌려서 가지가 휘어 보이게 합니다.
- $h$는 **줄기 높이**입니다. 점을 위쪽으로 밀어 올립니다.

**(2) 확률로 규칙 고르기**
규칙은 네 개이고, 매번 무작위로 하나를 고릅니다.
- 줄기: 1%
- 큰 잎: 85%
- 왼쪽 작은 잎: 7%
- 오른쪽 작은 잎: 7%

대부분 큰 잎 규칙을 쓰기 때문에 고사리의 뼈대는 큰 잎이 만듭니다. 작은 잎과 줄기는 가끔씩 찍혀서 디테일을 더합니다.

**(3) 반복하기: 카오스 게임**
"무작위로 규칙을 고르고, 그 규칙으로 점을 옮긴 뒤, 그 점을 찍는다"를 되풀이합니다. 이것을 **카오스 게임**이라고 부릅니다. 처음에는 흩어진 점처럼 보이지만, 수천 번 반복하면 고사리 모양이 나타납니다.

### 2. 이 시뮬레이션의 작동 순서

1. 시작 점을 무작위 위치에 둡니다.
2. 프레임마다 점을 300개씩 찍습니다(그리기 속도).
3. 각 점은 위에서 본 규칙 중 하나로 옮겨집니다.
4. 옮겨진 점을 화면 좌표로 바꿔서 찍습니다.
5. 찍은 점이 **최대 정밀도**에 도달하면 멈춥니다.

### 3. 장점

- **단순한 규칙으로 복잡한 모양**: 규칙 네 개만으로 고사리가 나옵니다.
- **자기 닮음**: 가지의 일부가 전체와 비슷하게 생겼습니다. 이것이 프랙탈입니다.
- **가벼운 계산**: 점 하나씩만 계산하므로, 그리기 속도를 조절하기 쉽습니다.

### 4. 주의할 점

- 규칙을 직접 바꿀 때는 **확률을 모두 더해서 100%**가 되도록 맞춰야 합니다. 그렇지 않으면 특정 규칙이 빠지거나 지나치게 많이 찍힙니다.
- **무질서도**를 올리면 점이 무작위로 흔들려서 고사리가 흐릿해집니다.
- 찍는 점이 적으면 빈틈이 많이 보입니다.

### 5. 활용 분야

- **식물과 나무**: 모양을 자동으로 만드는 데 씁니다.
- **자연스러운 무늬**: 프랙탈 그림과 추상 작품.
- **게임 배경**: 나무와 덤불을 적은 데이터로 만들 때 씁니다.

### 직접 실험해 보기

- **잎 축소 비율**을 0.7과 0.95로 바꿔 보세요. 작은 잎이 얼마나 빨리 줄어드는지 비교해 보세요.
- **무질서도**를 0.2로 올려 보세요. 고사리 모양이 흐려지는 것을 확인해 보세요.
- **그리기 속도**를 10에 가깝게 낮춰 보세요. 점이 하나씩 찍히는 과정을 천천히 볼 수 있습니다.

<!-- en -->

**IFS & Fractal** (Iterated Function System) repeats a few simple rules, chosen at random, and a complex shape appears on its own. This sketch draws a shape that looks like a fern.

**How it works.** Each rule moves a point to a new place. The main leaf rule shrinks the point a little, turns it slightly, and moves it upward. Four rules are chosen at random with fixed chances: the main leaf 85%, the two small leaves 7% each, and the stem 1%. Points are drawn after every move. This repeated random process is called the chaos game. At first the points look scattered, but after thousands of steps the fern appears.

**Try it.** Change the shrink ratio and the chaos factor to see how the fern changes.
