**Fractal Brownian Motion**(프랙탈 브라운 운동, 줄여서 **fBm**)은 노이즈를 **여러 겹 겹쳐서** 구름이나 산처럼 세밀한 무늬를 만드는 방법입니다. 노이즈 한 겹은 너무 매끈해서 밋밋합니다. 큰 무늬 위에 작은 무늬를 여러 번 얹으면, 확대해도 비슷한 모양이 계속 보이는 **프랙탈**(자기 닮음) 느낌이 납니다.

### 1. 핵심 원리

**(1) 옥타브: 노이즈를 여러 겹 더하기**
노이즈 한 겹을 **옥타브**라고 부릅니다. 겹이 하나씩 늘어날 때마다 두 가지가 바뀝니다.
- **주파수**(무늬가 촘촘한 정도)는 **간극**(lacunarity)만큼 곱해집니다. 점점 잘게 쪼개집니다.
- **진폭**(무늬의 세기)은 **지속성**(persistence)만큼 곱해집니다.

$$\text{fBm}(x) = \sum_{i=0}^{n-1} A_i \cdot \text{noise}(F_i \cdot x)$$

여기서 $A_i$는 $i$번째 겹의 진폭, $F_i$는 $i$번째 겹의 주파수입니다. 보통은 지속성을 0.5처럼 1보다 작게 씁니다. 그러면 작은 무늬일수록 세기가 약해집니다. 이 예제의 기본값은 1.5라서 **오히려 진폭이 커지는** 설정입니다. 그래서 세밀한 무늬가 더 두드러집니다.

**(2) 도메인 워핑: 좌표를 먼저 구부리기**
이 예제는 한 가지를 더 합니다. 좌표를 노이즈로 살짝 밀어낸 뒤, 밀려난 위치에서 다시 노이즈를 계산합니다.

$$r = \text{fBm}\big(x + 4q_0,\ y + 4q_1\big)$$

여기서 $q_0$, $q_1$은 원래 위치에서 구한 노이즈 값입니다. 이렇게 하면 무늬가 소용돌이치는 구름처럼 휘어집니다.

**(3) 색 입히기**
결과 값을 0과 1 사이의 밝기로 보고, 강조색과 배경색을 섞습니다. 밝은 곳은 강조색에 가깝고, 어두운 곳은 배경색에 가깝습니다.

### 2. 이 시뮬레이션의 작동 순서

1. 화면 전체를 **60×60 크기의 작은 그림**으로 계산합니다. 그다음 화면 크기로 키워서 보여 줍니다. 그래서 칸이 살짝 보입니다.
2. 칸마다 도메인 워핑을 포함한 fBm 값을 구합니다.
3. 값으로 밝기를 정하고 색을 입힙니다.
4. 시간을 조금씩 더해서 무늬가 천천히 흘러가게 합니다.

### 3. 장점

- **자연스러운 질감**: 구름, 산맥, 연기, 나무껍질 같은 무늬에 잘 맞습니다.
- **조절이 쉬움**: 옥타브 수 하나로 디테일의 양을 바꿀 수 있습니다.
- **여러 곳에 쓰임**: 높이 지도, 텍스처, 흐름장 같은 곳에 함께 씁니다.

### 4. 주의할 점

- **도메인 워핑 때문에** 한 칸을 계산하려면 fBm을 세 번 계산해야 합니다. 옥타브 수가 많으면 그만큼 더 무거워집니다.
- **계산 해상도**(60×60)는 속도와 선명함 사이의 균형입니다. 해상도를 올리면 선명해지지만 느려집니다.

### 5. 활용 분야

- **자연 현상**: 구름, 연기, 불꽃의 질감.
- **지형**: 산과 계곡의 높이 지도.
- **제너레이티브 아트**: 유기적인 추상 그림.

### 직접 실험해 보기

- **옥타브 개수**를 1, 3, 6으로 바꿔 보세요. 단순한 덩어리에서 점점 잘게 갈라지는 과정을 볼 수 있습니다.
- **지속성**을 0.5와 1.5로 비교해 보세요. 세밀한 무늬의 세기가 어떻게 달라지는지 확인해 보세요.
- **간극**을 2.0과 4.0으로 바꿔 보세요. 겹마다 무늬가 얼마나 빨리 잘게 쪼개지는지 관찰해 보세요.

<!-- en -->

**Fractal Brownian Motion (fBm)** stacks several layers of noise. The first layer makes big, soft shapes. Each new layer adds smaller and sharper details. The result looks like clouds or mountains, and it looks similar at many zoom levels, which is the feeling of a fractal.

**How it works.** Each layer is called an octave. Its frequency (how fine the detail is) grows by the lacunarity, and its strength changes by the persistence. This sketch also uses domain warping: it first bends the coordinates with noise, and then samples the noise again at the bent position. This creates swirling, cloud-like shapes.

**Try it.** Change the number of octaves to add or remove detail. Compare a persistence of 0.5 with 1.5 to see how the fine details change.
