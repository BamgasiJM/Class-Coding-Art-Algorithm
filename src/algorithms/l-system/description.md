**L-System**(린덴마이어 시스템)은 **글자를 규칙에 따라 바꾸어 나가면서** 식물 같은 가지 구조를 만드는 방법입니다. 1968년 식물학자 린덴마이어가 식물의 성장을 흉내 내려고 만들었습니다. 먼저 글자로 **설계도**를 만들고, 그 설계도를 거북이(Turtle)가 따라 그리면 나무가 됩니다.

### 1. 핵심 원리

**(1) 글자 규칙: 문자열 바꾸기**
시작 글자를 **공리**(axiom)라고 합니다. 이 예제는 "X"에서 시작합니다. 그리고 글자를 정해진 규칙에 따라 바꿉니다.
- X → F+[[X]-X]-F[-FX]+X
- F → FF

예를 들어 F는 FF로 두 배가 됩니다. 이 과정을 여러 번 반복하면 글자가 점점 길어집니다. 몇 번 반복할지는 **반복 횟수**로 정합니다.

**(2) 거북이로 그리기**
완성된 글자를 왼쪽부터 읽으면서 그립니다.
- **F**: 앞으로 한 칸 그립니다.
- **+**: 오른쪽으로 꺾습니다.
- **-**: 왼쪽으로 꺾습니다.
- **[**: 지금 위치를 기억해 둡니다. 가지가 시작되는 곳입니다.
- **]**: 기억해 둔 위치로 돌아갑니다. 가지가 끝나는 곳입니다.

**[**와 **]**는 책갈피와 같습니다. 가지로 들어갈 때 책갈피를 꽂고, 가지가 끝나면 책갈피로 돌아오는 것입니다.

**(3) 바람에 흔들리기**
각 가지의 꺾는 각도에 작은 흔들림을 더합니다. 흔들림은 시간에 따라 변하는 사인 함수로 정하기 때문에, 나무가 바람에 흔들리는 것처럼 보입니다.

### 2. 이 시뮬레이션의 작동 순서

1. 반복 횟수만큼 규칙을 적용해서 긴 글자 설계도를 만듭니다. 설계도는 반복 횟수나 각도가 바뀔 때만 다시 만듭니다.
2. 설계도 전체가 화면에 맞도록 크기와 위치를 계산합니다.
3. 거북이가 글자를 따라 선을 그립니다. 가지가 깊을수록 선이 얇아집니다.
4. 가지 끝에 작은 점을 찍어서 잎을 나타냅니다.
5. 프레임마다 바람 값을 조금씩 더해서 나무가 흔들리게 합니다.

### 3. 장점

- **적은 규칙으로 큰 구조**: 규칙 두 개로 나무 한 그루가 만들어집니다.
- **식물의 성장과 닮음**: 줄기가 자라고 가지가 갈라지는 과정을 따라 합니다.
- **조절이 쉬움**: 반복 횟수와 각도만 바꿔도 전혀 다른 나무가 됩니다.

### 4. 주의할 점

- **반복할수록 글자 수가 빠르게 늘어납니다.** 반복 횟수는 적당히 고르세요.
- **각도 값**에 따라 가지가 벌어지는 정도가 크게 달라집니다.
- 설계도를 **매 프레임** 다시 만들면 느려집니다. 이 예제는 바뀔 때만 다시 만들어서 이 문제를 피합니다.

### 5. 활용 분야

- **식물 모양**: 나무, 풀, 산호 같은 가지 구조를 자동으로 만듭니다.
- **게임과 영화**: 숲 배경을 짧은 규칙으로 만듭니다.
- **제너레이티브 아트**: 나뭇가지 그림과 성장하는 구조를 표현합니다.

### 직접 실험해 보기

- **반복 횟수**를 1, 3, 5로 바꿔 보세요. 나무가 점점 복잡해지는 과정을 볼 수 있습니다.
- **가지 각도**를 15와 45로 비교해 보세요. 가지가 좁게 모이는지 넓게 벌어지는지 확인해 보세요.
- **바람 세기**를 0으로 맞춰 보세요. 흔들림이 사라지면 나무의 느낌이 어떻게 달라지는지 살펴보세요.

<!-- en -->

**L-System** (Lindenmayer System) grows a plant-like branching shape by rewriting letters with simple rules. Aristid Lindenmayer created it in 1968 to imitate how plants grow. First the letters are rewritten into a long blueprint. Then a turtle follows the blueprint and draws the tree.

**How it works.** The start letter is "X". Each rule replaces a letter with a longer pattern, and the number of repeats is the iteration count. Then the turtle reads the pattern: F moves forward and draws a line, + and - turn right and left, [ saves the current position as a bookmark, and ] returns to it. Branches get thinner as they go deeper. A small sway value makes the branches move like they are in the wind.

**Try it.** Change the number of iterations and the branch angle to make different trees.
