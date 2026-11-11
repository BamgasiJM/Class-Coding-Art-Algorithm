**Spring & Constraint**(스프링과 제약)은 **점들을 용수철로 이어서 천, 그물, 로프 같은 부드러운 물체를 흉내 내는** 방법입니다. 용수철은 늘어나면 원래 길이로 돌아가려고 당기고, 줄어들면 밀어냅니다. 이 힘의 규칙만으로 천이 늘어지고 흔들리는 모습이 나옵니다.

### 1. 핵심 원리

**(1) 용수철 힘 (후크의 법칙)**: 두 점이 원래 길이보다 늘어나면 서로를 당기고, 줄어들면 서로를 밉니다. 힘의 크기는 늘어난 만큼에 비례합니다.

$$\mathbf{F} = k \,(|\mathbf{d}| - L)\,\frac{\mathbf{d}}{|\mathbf{d}|}$$

- $\mathbf{d}$는 두 점 사이를 잇는 벡터입니다.
- $L$은 용수철의 원래 길이입니다. 이 예제에서는 **격자 간격**과 같습니다.
- $k$는 **스프링 강도**입니다. 값이 클수록 용수철이 단단해집니다.

**(2) 중력**: 맨 윗줄 점들은 고정되어 있고, 나머지 점들은 **중력**으로 아래로 당겨집니다.

**(3) 움직임 계산**: 매 프레임 점마다 힘을 더해서 속도를 바꾸고, 속도만큼 위치를 옮깁니다. 속도에는 **감쇠**(약간씩 줄이는 값)를 곱해서, 흔들림이 점점 가라앉게 합니다.

### 2. 이 시뮬레이션의 작동 순서

1. 점들을 격자로 놓고, 가로와 세로로 이웃한 점끼리 용수철로 잇습니다.
2. 맨 위 줄 점은 고정합니다.
3. 매 프레임 모든 용수철이 두 점에 힘을 줍니다. 중력도 더합니다.
4. 힘에 따라 속도와 위치를 바꿉니다.
5. 선과 점을 그립니다. 마우스를 누르면 그 근처 점들이 밀려납니다.

### 3. 이 알고리즘의 장점

- **천, 그물, 로프** 같은 물체를 간단한 규칙으로 만들 수 있습니다.
- 용수철 강도나 중력만 바꿔도 **딱딱한 모양에서 흐물거리는 모양까지** 다양하게 나옵니다.
- 게임의 머리카락, 깃발, 옷자락 같은 움직임을 흉내 낼 때 씁니다.

### 4. 구현할 때 주의할 점

- 용수철 강도가 너무 크면 점들이 과하게 떨립니다. 이때는 감쇠를 줄이거나 강도를 낮추세요.
- 격자 간격이 작을수록 점과 용수철이 많아져서 계산이 무거워집니다.

### 5. 활용 분야

- **게임**: 천, 깃발, 머리카락, 로프 움직임.
- **로봇과 시뮬레이션**: 부드러운 물체의 움직임 계산.
- **제너레이티브 아트**: 흔들리는 그물과 천 작품.

### 직접 실험해 보기

- **스프링 강도**를 0.01과 0.15로 바꿔 보세요. 천이 얼마나 부드럽게 늘어지는지 비교해 보세요. 이 값은 재시작 없이 바로 반영됩니다.
- **중력**을 0과 0.3으로 바꿔 보세요. 중력이 없을 때 천이 어떻게 되는지 확인해 보세요.
- **격자 간격**을 20과 100으로 바꿔 보세요. 점과 용수철이 촘촘한지 성긴지 비교해 보세요. 이 값은 바꾸면 다시 시작합니다.

<!-- en -->

**Spring & Constraint** connects points with springs to imitate soft objects such as cloth, nets, and ropes. A spring pulls its two ends together when stretched and pushes them apart when compressed. This simple rule produces sagging and swinging motion.

**How it works.** The force grows with how far the spring is stretched from its rest length. The top row of points is fixed, and gravity pulls the rest down. Each frame, the forces change each point's velocity, and the velocity is slightly reduced so that the motion settles.

**Try it.** Change the spring strength and the gravity to see how stiff or loose the cloth becomes. Press the mouse to push the nodes.
