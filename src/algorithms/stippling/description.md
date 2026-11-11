**Stippling**(점묘법)은 **점의 밀도로 그림을 표현하는** 방법입니다. 어두운 곳에는 점이 많고, 밝은 곳에는 점이 적습니다. 멀리서 보면 점들이 모여서 사진처럼 보입니다. 이 예제는 사진의 밝기를 읽어서 점의 밀도를 정합니다.

### 1. 핵심 원리

**(1) 밀도 맵 만들기**: 사진을 흑백으로 바꾸고, 밝기를 뒤집습니다. 어두운 곳이 높은 값을 가지도록 만들면, 그 값이 점이 들어갈 확률이 됩니다.

**(2) 처음 점 흩뿌리기**: 화면에 무작위 위치를 많이 찍고, 그 자리의 밀도 값만큼 확률로 점을 남깁니다. 어두운 곳에 점이 자연스럽게 많이 남습니다.

**(3) 서로 밀어내기 (이완)**: 점들이 서로 가까우면 밀어내도록 힘을 줍니다. 그러면 점들이 뭉치지 않고 고르게 퍼집니다. 이 과정을 여러 번 반복하면 점의 간격이 밀도에 맞게 자리 잡습니다.

**(4) 반발력의 범위**: 점은 **반발력 반경** 안에 있는 다른 점만 밀어냅니다. 반경이 클수록 더 넓은 영역의 점을 함께 고려합니다.

이 과정은 보로노이 다이어그램이나 푸아송 디스크처럼 "점 사이 간격을 고르게" 만드는 방법과 연결됩니다.

### 2. 이 시뮬레이션의 작동 순서

1. 사진을 불러와서 밝기 맵을 만듭니다. 사진을 불러오지 못하면 원형 기본 그림을 씁니다.
2. 밀도에 따라 초기 점을 흩뿌립니다.
3. 매 프레임 점들을 서로 밀어냅니다. 처음 일정 기간에는 힘이 강하고, 그 뒤에는 약하게 줄입니다.
4. 점을 그립니다. 어두운 곳의 점은 조금 크고 진하게 보입니다.

### 3. 이 알고리즘의 장점

- **사진을 점으로 바꾸는** 가장 전통적인 방법 중 하나입니다.
- 점의 개수만 바꿔도 같은 그림이 거칠거나 섬세하게 보입니다.
- 점들이 고르게 퍼지는 원리를 시각적으로 이해하기 좋습니다.

### 4. 구현할 때 주의할 점

- 점이 많을수록 밀어내기 계산이 많아집니다. 이 예제는 칸으로 나눈 격자를 써서 가까운 점만 확인합니다.
- 반발력 반경이 크면 격자 칸을 더 멀리까지 살펴야 합니다. 이 예제는 그 범위를 반경에 맞춰 넓힙니다.

### 5. 활용 분야

- **인쇄와 그래픽**: 점묘화와 신문 사진의 망점 표현.
- **디지털 아트**: 사진을 점으로 재해석하는 작품.
- **제너레이티브 아트**: 밀도로 그린 추상 그림.

### 직접 실험해 보기

- **점 개수**를 500과 5000으로 바꿔 보세요. 점이 많을수록 그림이 얼마나 선명해지는지 비교해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **초기 Relaxation 강도**를 0.3과 1.5로 바꿔 보세요. 점들이 얼마나 빠르게 고르게 퍼지는지 관찰해 보세요.
- **반발력 반경**을 10과 50으로 바꿔 보세요. 점이 서로를 얼마나 멀리서부터 밀어내는지, 그림이 어떻게 달라지는지 확인해 보세요.

<!-- en -->

**Stippling** draws an image with dots instead of tones. Dark areas get more dots, and bright areas get fewer. This sketch reads the brightness of a photo to decide how dense the dots should be. The dots start at random, and then they push each other apart until their spacing matches the image.

**How it works.** The photo is turned into a density map, where dark areas have high values. Dots are placed at random and kept with a chance based on that density. Then each frame, nearby dots repel each other, so they spread evenly. The repulsion strength starts high and then drops.

**Try it.** Change the number of dots and the repulsion radius to see how the picture becomes finer or rougher.
