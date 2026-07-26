import sketch from './sketch'

export default {
  longDescription: {
    ko: String.raw`
**Stippling**(스티플링)은 이미지의 **명암 정보**(Luminance)를 **점의 밀도**(Density)만으로 재현하는 예술 기법이자 현대 컴퓨터 그래픽 알고리즘입니다. 균일한 크기의 작은 점들을 **거리 기반 최적화**로 배치하면, 밝은 영역은 점들이 듬성듬성하고 어두운 영역은 조밀하게 모여 전체 이미지의 톤이 자연스럽게 복원됩니다. **Lloyd Relaxation** 또는 **Voronoi Diagram** 기반의 공간 최적화를 통해, 점들이 서서히 평형 위치에 정착하며 원본 이미지가 드러나는 과정 자체가 이 알고리즘의 미학입니다.

### 1. 핵심 수학적 원리
1. **밝기 기반 확률 샘플링:**
   - 이미지 밝기 맵: $L(x, y) \in [0, 1]$
   - 초기 점 배치 확률: $P_{\text{seed}} = 1 - L(x, y)$ (밝을수록 낮은 확률)
   - $N$개 점을 생성할 때, 각 점의 위치는 확률 분포 $(1 - L)$를 따름

2. **Lloyd Relaxation (Lloyd's Algorithm):**
   - 초기화: 무작위 또는 확률 기반 배치
   - 반복:
     1. **Voronoi 다이어그램** 구성: 각 점 주변의 "영역" 정의
     2. **중심 계산**: 각 영역 내 점들의 무게중심 $c_i = \frac{1}{|V_i|} \sum_{(x,y) \in V_i} (x, y)$
     3. **점 이동**: $p_i \leftarrow c_i$ (점을 중심으로 이동)
   - 수렴: 여러 반복 후 점들이 최적 위치에 안정화

3. **공간 해시를 통한 근사:**
   - 완전한 Voronoi 계산은 $O(n^2)$로 비용이 크므로, **공간 해시(Spatial Hash)** 사용
   - 격자 셀 크기 $h$: 각 점 주변 반경 내 이웃점만 빠르게 쿼리
   - 이웃 점들끼리의 **반발력(Repulsion)**: $\mathbf{f}_{ij} = \frac{(p_i - p_j)}{|p_i - p_j|} \cdot w_{ij}$

4. **점 크기 조정:**
   - 각 점의 반지름: $r_i = r_{\min} + (r_{\max} - r_{\min}) \cdot (1 - L(x_i, y_i))$
   - 어두운 곳의 점이 더 크게 표현되어, 밀도와 함께 크기로도 톤 강화

### 2. 주요 특징 및 장점
- **극도의 시각적 우아함:** 점들이 서서히 정착하는 과정을 보는 것 자체가 관상적 경험.
- **톤 정확성:** 점의 밀도가 원본 이미지의 밝기를 충실히 표현하며, 색상 정보는 배제하여 본질적 구조만 강조.
- **수학적 최적성:** Lloyd Relaxation은 **최대 최소 거리(Maximin) 원칙**을 따르므로, 점 분포가 균형 잡혀 있음.
- **멀티미디어 응용:** 인쇄, 디지털 아트, 데이터 시각화 등 광범위한 활용.

### 3. 구현 시 고려 사항
- **점 개수:** 많으면 더 정확하지만 계산 오버헤드; 보통 1000~5000.
- **완화(Relaxation) 프레임:** 초기 수십 프레임은 강한 이동, 이후 약한 유지 이동으로 안정화.
- **공간 해시 셀 크기:** 반발력 반경(영향 반경)보다 작으면 모든 이웃을 놓칠 수 있음.
- **경계 처리:** 캔버스 경계 근처 점들의 Voronoi 영역이 잘린 형태가 되므로, 보정 필요.

### 4. 활용 분야
- **미술과 인쇄:** 전통 미술 기법의 디지털 재현, 고전 초상화 스타일.
- **게임 & 영화:** 독특한 시각 스타일, 레트로 또는 예술적 렌더링.
- **데이터 시각화:** 인구 분포, 밀도 맵, 히트맵 등을 점의 밀도로 표현.
- **UI/UX 효과:** 로딩 애니메이션, 이미지 전환 효과.
- **과학 교육:** Voronoi, Lloyd Algorithm, 공간 최적화 개념의 시각적 학습.
    `,
    en: String.raw`
Stippling is an artistic technique that renders an image's tonal range using only the density of uniformly small dots. The algorithm begins with brightness-based probability sampling, then applies Lloyd relaxation — repeatedly computing Voronoi diagrams and moving each point toward its region's centroid. A spatial-hash optimization approximates the expensive full Voronoi calculation, allowing points to gradually settle into equilibrium positions as the portrait emerges from their collective distribution.
    `,
  },
  sketch,
  params: [
    { key: 'numPoints', label: '점 개수', min: 500, max: 5000, step: 100, default: 2000, restart: true },
    { key: 'relaxationStrength', label: '초기 Relaxation 강도', min: 0.3, max: 1.5, step: 0.1, default: 1.0 },
    { key: 'maxRelaxationFrames', label: 'Relaxation 지속 프레임', min: 100, max: 800, step: 50, default: 400, restart: true },
    { key: 'minRelaxationStrength', label: '유지 Relaxation 강도', min: 0, max: 0.5, step: 0.05, default: 0.15 },
    { key: 'pointRadiusMin', label: '점 최소 크기', min: 0.3, max: 2, step: 0.1, default: 0.7, unit: 'px' },
    { key: 'pointRadiusMax', label: '점 최대 크기', min: 1, max: 4, step: 0.1, default: 2.0, unit: 'px' },
    { key: 'cellSize', label: '해시 셀 크기', min: 8, max: 32, step: 2, default: 16, unit: 'px', restart: true },
    { key: 'influenceRadius', label: '반발력 반경', min: 10, max: 50, step: 2, default: 22, unit: 'px' },
  ],
  related: ['Voronoi Diagram', 'Poisson Disk Sampling', 'Diffusion-Limited Aggregation'],
}