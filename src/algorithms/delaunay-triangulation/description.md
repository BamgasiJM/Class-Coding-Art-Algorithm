**Delaunay Triangulation**(들로네 삼각분할)은 흩어진 점들을 **삼각형으로 이어 붙이는** 방법입니다. 이때 삼각형이 가늘고 길어지지 않도록 고릅니다. 지도 제작, 3D 모델의 면 만들기, 게임의 길 찾기 등에서 많이 씁니다.

### 1. 핵심 원리

**(1) 들로네 조건**: 어떤 삼각형이든, 그 삼각형의 세 꼭짓점을 지나는 원(외접원)의 안쪽에 다른 점이 들어가지 않아야 합니다. 이 조건을 지키면 삼각형들이 대체로 **둥글고 고른 모양**이 됩니다.

**(2) 보와이어-왓슨(Bowyer-Watson) 방법**: 점을 한 개씩 추가하면서 삼각형을 고칩니다.
1. 새 점을 넣었을 때 외접원 안에 그 점이 들어가는 삼각형을 모두 찾습니다. 이 삼각형들은 조건을 깨뜨리므로 지웁니다.
2. 지운 자리는 구멍이 됩니다. 구멍의 가장자리 변마다 새 점과 이으면 새 삼각형이 생기고, 조건이 다시 지켜집니다.

**(3) 쌍대 관계**: 들로네 삼각분할은 보로노이 다이어그램과 짝을 이룹니다. 보로노이에서 이웃한 두 씨앗을 선으로 이으면, 그것이 들로네 삼각형의 변이 됩니다.

### 2. 이 시뮬레이션의 작동 순서

1. 화면 안에 점을 무작위로 놓습니다.
2. 각 점을 조금씩 흔듭니다. 흔드는 방향은 노이즈로 정합니다. 흔들림은 화면 안에 머물도록 가장자리에서 제한합니다.
3. 매 프레임 점 전체에 대해 보와이어-왓슨 방법으로 삼각형을 다시 계산합니다.
4. 삼각형을 칠합니다. 화면 가운데에 가까운 삼각형은 진하게, 가장자리에 있는 삼각형은 옅게 보입니다.

### 3. 이 알고리즘의 장점

- **고른 삼각형**: 가늘고 긴 삼각형이 적어서, 계산이나 그래픽에 쓰기 좋습니다.
- **구현 원리가 명확함**: "외접원에 든 삼각형을 지우고 구멍을 다시 메운다"는 한 문장으로 설명할 수 있습니다.

### 4. 구현할 때 주의할 점

- 이 예제는 매 프레임 전체를 다시 계산합니다. 점이 많을수록 계산이 무거워집니다.
- 점이 거의 한 줄에 있거나 네 점이 한 원 위에 있으면 계산이 불안정해질 수 있습니다. 그래서 점을 무작위로 놓고 조금씩 흔드는 방식을 씁니다.

### 5. 활용 분야

- **지형과 지도**: 측정한 높이 점들로 지형 면을 만듭니다.
- **3D 그래픽**: 점 구름을 삼각형 면으로 바꿉니다.
- **제너레이티브 아트**: 삼각형 그물 패턴 작품.

### 직접 실험해 보기

- **포인트 개수**를 50과 300으로 바꿔 보세요. 삼각형이 얼마나 잘게 나뉘는지 비교해 보세요. 이 값은 바꾸면 다시 시작합니다.
- **정점 애니메이션 속도**를 0으로 맞춰 보세요. 점들이 멈추면 삼각형 그물이 어떻게 보이는지 확인해 보세요.
- **정점 애니메이션 속도**를 0.05로 올려 보세요. 흔들림이 커질 때 삼각형이 어떻게 변하는지 관찰해 보세요.

<!-- en -->

**Delaunay Triangulation** connects scattered points into triangles, choosing them so that no triangle is long and thin. It is used for maps, 3D surfaces, and paths in games.

**How it works.** The key rule is that no point may lie inside the circle that passes through the three corners of any triangle. The sketch adds points one by one. Triangles that break the rule are removed, and the hole they leave is filled with new triangles that connect to the new point. The points also move slightly each frame, and the whole triangulation is recalculated.

**Try it.** Change the number of points, or set the animation speed to zero to see the still mesh.
