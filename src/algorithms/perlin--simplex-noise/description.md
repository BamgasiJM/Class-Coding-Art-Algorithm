**Perlin / Simplex Noise**(펄린/심플렉스 노이즈)는 **부드럽게 이어지는 무작위 값**을 만드는 방법입니다. 완전히 무작위인 값은 옆 점과 전혀 상관없이 튀지만, 노이즈는 가까운 점끼리 비슷한 값을 가집니다. 그래서 구름, 산, 물결처럼 자연스러운 모양을 만들 때 많이 씁니다. 두 방법은 1983년과 2002년에 나왔으며, 원리는 같고 계산 방식만 조금 다릅니다.

### 1. 핵심 원리

**(1) 격자 위의 기울기**
평면에 일정한 간격으로 격자점을 찍고, 각 격자점에 무작위 **기울기 방향**을 하나씩 정합니다.

**(2) 사이 값 섞기**
임의의 점 $(x, y)$의 값은 주변 격자점 네 개의 영향을 섞어서 구합니다. 각 격자점이 "나에게서 가까울수록 더 강하게" 영향을 주도록 가중치를 곱합니다. 가중치는 부드럽게 바뀌는 곡선을 사용합니다.

$$f(t) = t^3(10 - 15t + 6t^2), \quad 0 \le t \le 1$$

이 곡선은 값이 끝에서 갑자기 꺾이지 않도록 만들어 줍니다. 그래서 전체 결과가 매끄럽게 이어집니다.

**(3) 값의 범위**
이 예제에서 쓰는 노이즈 값은 0부터 1 사이입니다. 값이 크면 밝고 큰 원, 작으면 어둡고 작은 원으로 표현합니다.

### 2. 이 시뮬레이션의 작동 순서

1. 화면을 **격자 칸**으로 나눕니다. 칸마다 원을 하나씩 그립니다.
2. 각 칸의 좌표를 노이즈 함수에 넣어 0~1 사이의 값을 얻습니다.
3. 값으로 원의 **밝기**와 **크기**를 정합니다.
4. 값을 살짝 흔들어 원의 **위치**도 조금 밀어 냅니다. 그래서 격자가 정돈되지 않고 손으로 그린 듯 보입니다.
5. 값이 **임계값**보다 크면 가운데에 강조색 점을 하나 더 찍습니다.
6. 시간이 흐르면 노이즈 함수의 세 번째 입력값이 조금씩 바뀝니다. 그래서 전체 모양이 천천히 변합니다.

### 3. 이 알고리즘의 장점

- **자연스러움**: 구름, 산맥, 나뭇결처럼 자연에서 보는 무늬와 닮았습니다.
- **일정한 결과**: 같은 위치에 같은 값이 나오므로, 원하는 패턴을 반복해서 만들 수 있습니다.
- **쉬운 확장**: 시간을 세 번째 차원으로 넣으면 애니메이션이 됩니다.

### 4. 구현할 때 주의할 점

- **노이즈 스케일**이 크면 값이 빠르게 바뀌어 거칠어 보이고, 작으면 넓고 밋밋해 보입니다.
- **Perlin과 Simplex**의 차이는 격자 모양입니다. Perlin은 사각형 격자를 쓰고, Simplex는 삼각형 격자를 써서 차원이 높아질 때 계산이 더 가볍습니다.
- 이 예제는 p5.js의 `noise()` 함수를 씁니다. 이 함수는 Perlin 노이즈 계열입니다.

### 5. 활용 분야

- **게임**: 지형, 맵, 텍스처를 자동으로 만듭니다.
- **애니메이션**: 카메라 흔들림, 구름의 움직임.
- **제너레이티브 아트**: 유기적인 무늬와 점묘화.
- **과학 시뮬레이션**: 바람이나 지형의 높이 같은 자연 현상 흉내.

### 직접 실험해 보기

- **노이즈 스케일**을 0.01과 0.2 사이에서 바꿔 보세요. 무늬가 넓어지거나 거칠어지는 차이를 확인해 보세요.
- **강조 임계값**을 0.4로 낮춰 보세요. 강조 점이 훨씬 많아지는 것을 볼 수 있습니다.
- **흔들림**을 0으로 맞춰 보세요. 원들이 정확한 격자에 놓이면서 인상이 어떻게 달라지는지 비교해 보세요.

<!-- en -->

**Perlin / Simplex Noise** creates random values that change smoothly. Nearby points get similar values, unlike pure random numbers that jump around. This makes it useful for clouds, mountains, and wood grain. Perlin noise (1983) and Simplex noise (2002) work on the same idea, but they use different grid shapes.

**How it works.** Random gradient directions are placed on a grid. A point's value is found by blending the influence of nearby grid points, using a smooth curve so the result has no sharp edges. This sketch uses p5.js's `noise()` function, which is based on Perlin noise, and it returns values from 0 to 1.

**Try it.** The sketch draws a grid of circles. Each circle's brightness and size come from the noise value, and a third input moves the pattern over time. Change the noise scale and the threshold to see how the pattern changes.
