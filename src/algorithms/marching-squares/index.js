import sketch from './sketch'

export default {
  longDescription: {
    ko: String.raw`
**Marching Squares(마칭 스퀘어)**는 2D **스칼라 필드(Scalar Field)** $f(x, y)$에서 특정 **임계값(Iso-level)** $\tau$와 일치하는 **등고선(Contour Lines)**을 효율적으로 추출하는 알고리즘입니다. 격자를 정사각형 셀로 분할하고, 각 셀의 4개 코너에서의 함수값을 임계값과 비교하여 **16가지 토폴로지 경우** 중 하나로 분류한 후, 미리 계산된 **룩업 테이블(Lookup Table)**에서 해당하는 선분 패턴을 찾아 등고선을 구성합니다. 이 방식으로 온도 분포, 지형 고도, 밀도, 압력 등 연속 스칼라 필드를 효율적으로 시각화할 수 있습니다.

### 1. 핵심 수학적 원리
1. **스칼라 필드:**
   - 각 점 $(x, y)$에서 값 $f(x, y) \in \mathbb{R}$을 가지는 함수

2. **셀 분류(Cell Classification):**
   - 셀의 4개 코너: 좌하 $(0)$, 우하 $(1)$, 우상 $(2)$, 좌상 $(3)$
   - 각 코너에서의 함수값: $f_0, f_1, f_2, f_3$
   - 임계값 $\tau$와 비교: $f_i > \tau$이면 1, 아니면 0
   - 4비트 코드: $\text{case} = 8b_3 + 4b_2 + 2b_1 + b_0$ (0~15)

3. **엣지 교차점(Edge Intersection):**
   - 셀의 4개 엣지(가장자리) 중에서, 함수값이 임계값을 "넘는" 엣지 식별
   - 각 엣지에서 선형 보간으로 정확한 교차점 계산:
     - 엣지 $(p_i, p_j)$에서: $t = \frac{\tau - f_i}{f_j - f_i}$
     - 교차점: $p = p_i + t(p_j - p_i)$

4. **룩업 테이블 (16가지 경우):**
   - case 0: 모든 코너가 임계값 아래 → 선 없음
   - case 1: 좌하만 위 → 좌 엣지와 하 엣지의 교차점을 연결
   - case 2: 우하만 위 → 우 엣지와 하 엣지의 교차점을 연결
   - ... (총 16가지, 회전 및 반사 대칭 고려)

5. **선분 생성 및 연결:**
   - 각 셀마다 0~2개의 선분 생성
   - 인접 셀의 끝점이 연결되어 연속적인 등고선 형성

### 2. 주요 특징 및 장점
- **극도의 효율성:** 각 셀을 독립적으로 처리하므로 $O(n \times m)$ (격자 크기에 선형).
- **견고한 토폴로지:** 16가지 경우를 명확히 정의하므로, 대부분의 경우에 정확한 등고선 생성.
- **선형 보간의 정확성:** 엣지 교차점을 선형 보간으로 계산하여, 부드러운 등고선.
- **GPU 친화적:** 각 셀이 독립적이므로 병렬 처리 가능.

### 3. 구현 시 고려 사항
- **룩업 테이블 설계:** 16가지 경우를 정확히 정의해야 하며, 특히 애매한 경우(여러 등고선이 존재할 수 있는 경우)의 선택이 중요합니다.
- **여러 임계값:** 여러 등고선을 동시에 추출하려면, 각 임계값마다 별도의 패스를 실행합니다.
- **색상 매핑:** 임계값 크기에 따라 등고선에 다른 색상을 할당하여, 필드의 분포를 시각적으로 표현합니다.
- **경계 처리:** 격자 경계에서의 특수한 처리 (부분 셀, 경계 밖 점 처리).

### 4. 활용 분야
- **기상 시뮬레이션:** 기압 지도, 온도 분포, 습도 등고선 시각화.
- **지리정보시스템(GIS):** 지형 고도 등고선, 토양 유형 분포, 인구 밀도 등.
- **과학 시각화:** 물리 시뮬레이션 (유체 속도, 온도 필드), 의료 영상 처리.
- **게임 개발:** 지형 높이 등고선 추출, 물리 시뮬레이션 경계 생성.
- **Generative Art:** 필드를 기반으로 추상적이고 유기적인 라인 아트 생성.
    `,
    en: 'Marching Squares extracts contour lines from a 2D scalar field based on an iso-level threshold. For each grid cell, it compares the four corner values and classifies one of 16 cases, then looks up the corresponding line segment pattern in a lookup table to construct the contour. This enables efficient visualization of scalar fields such as temperature, elevation, or density.',
  },
  sketch,
  params: [
    { 
      key: 'gridScale', 
      label: '격자 크기', 
      min: 8, 
      max: 40, 
      step: 1, 
      default: 16, 
      unit: 'px',
      restart: true 
    },
    { 
      key: 'noiseScale', 
      label: '노이즈 밀도', 
      min: 0.05, 
      max: 0.5, 
      step: 0.01, 
      default: 0.2 
    },
    { 
      key: 'threshold', 
      label: '등고선 높이', 
      min: 0.1, 
      max: 0.9, 
      step: 0.01, 
      default: 0.5 
    },
    { 
      key: 'lineWeight', 
      label: '선 굵기', 
      min: 0.5, 
      max: 5, 
      step: 0.1, 
      default: 1.5 
    },
    { 
      key: 'timeSpeed', 
      label: '변화 속도', 
      min: 0, 
      max: 0.01, 
      step: 0.0001, 
      default: 0.003 
    },
  ],
  related: ['Voronoi Diagram', 'Poisson Disk Sampling', 'SDF & Metaballs'],
}