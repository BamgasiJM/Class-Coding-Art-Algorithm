**Dithering**(디더링)은 **색이 많은 그림을 흰색과 검은색(또는 두 가지 색)만으로 표현하면서도, 중간 밝기가 느껴지도록 점의 배치를 조절하는** 방법입니다. 옛날 신문 사진이나 흑백 프린터, 초기 게임 화면에서 많이 쓰였습니다. 점이 촘촘하면 어둡게, 듬성듬성하면 밝게 보입니다.

### 1. 핵심 원리

이 예제는 두 가지 방법을 보여 줍니다.

**(1) 베이어 행렬 방식 (순서 디더링)**: 8×8 크기의 기준 표를 씁니다. 표의 각 칸에는 0부터 63까지의 값이 한 번씩 들어 있습니다. 그림의 각 픽셀 밝기를 표의 값과 비교해서, 밝으면 켜고 어두우면 끕니다. 표의 값이 골고루 섞여 있어서, 같은 밝기의 영역은 같은 점 무늬를 가집니다.

$$\text{켜짐} \iff \text{밝기} > \text{기준값} + (\text{임계점} - 0.5)$$

- 기준값은 표에서 찾은 값입니다. 0과 1 사이로 바꿔서 씁니다.
- **임계점**을 올리면 더 밝은 곳만 켜지고, 내리면 더 많은 점이 켜집니다.

**(2) 오차 확산 방식 (플로이드-슈타인베르크)**: 픽셀을 하나씩 순서대로 처리합니다. 한 픽셀을 켜거나 끌 때 생긴 **오차**(원래 밝기와 실제 밝기의 차이)를 오른쪽과 아래쪽 이웃에 나눠 줍니다. 그러면 이웃이 그 오차를 보정하면서, 전체 평균 밝기가 원본에 가깝게 유지됩니다.

$$\text{오차 } e \text{ 분배: } \frac{7}{16} \text{(오른쪽)},\ \frac{3}{16},\ \frac{5}{16},\ \frac{1}{16} \text{(아래 이웃들)}$$

### 2. 이 시뮬레이션의 작동 순서

1. 사진을 격자 크기로 줄이고, 픽셀마다 밝기를 구합니다. 밝기 보정으로 전체를 밝게 또는 어둡게 조절할 수 있습니다.
2. 디더링 방식에 따라 점을 찍습니다.
   - 베이어 방식은 화면 전체를 한 번에 찍습니다.
   - 오차 확산 방식은 몇 줄씩 나눠서 아래로 내려가며 찍습니다.
3. 켜진 점은 강조색, 꺼진 점은 어두운 배경색으로 칠합니다.

### 3. 이 알고리즘의 장점

- 색을 쓰지 않고도 **중간 밝기를 표현**할 수 있습니다.
- 계산이 가볍고 결과가 독특한 질감을 가집니다.
- 두 방식을 비교하면 같은 목적을 가진 방법이 얼마나 다른 질감을 내는지 알 수 있습니다.

### 4. 구현할 때 주의할 점

- 오차 확산은 앞 픽셀의 결과가 뒤 픽셀에 영향을 주므로, 순서를 바꾸면 결과가 달라집니다.
- 베이어 방식은 기준 표의 크기에 따라 패턴이 달라집니다. 이 예제는 8×8 표 하나만 씁니다.

### 5. 활용 분야

- **인쇄**: 흑백 프린터와 신문 사진의 중간 톤 표현.
- **디지털 그래픽**: 색이 적은 화면에서 사진 표현하기.
- **제너레이티브 아트**: 점 무늬와 질감을 활용한 작품.

### 직접 실험해 보기

- **디더링 방식**을 0과 1로 바꿔 보세요. 같은 사진이 두 방식에서 어떻게 다르게 보이는지 비교해 보세요.
- **임계점**을 0.1과 0.9로 바꿔 보세요. 점이 많이 켜지는지, 적게 켜지는지 관찰해 보세요.
- **밝기 보정**을 -0.5와 0.5로 바꿔 보세요. 사진이 전체적으로 어두워지거나 밝아지는 것을 확인해 보세요. 이 값은 바꾸면 다시 시작합니다.

<!-- en -->

**Dithering** shows a picture with only two colors while keeping the feeling of in-between tones. Dense dots look dark, and sparse dots look light. This sketch shows two methods. Ordered dithering compares each pixel with a fixed 8 by 8 threshold table. Error diffusion, the Floyd-Steinberg method, turns each pixel on or off and passes the leftover error to its neighbors, so the average brightness stays close to the original.

**How it works.** The image is shrunk to the grid size, and each cell's brightness is read. The threshold bias moves the cutoff brighter or darker. In error diffusion, the error is spread to the right and to the cells below with weights of seven sixteenths, three sixteenths, five sixteenths, and one sixteenth.

**Try it.** Switch between the two methods and change the threshold bias to see how the dots change.
