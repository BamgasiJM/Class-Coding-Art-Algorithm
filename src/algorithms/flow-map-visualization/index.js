import sketch from './sketch'

export default {
  longDescription: {
    ko: String.raw`
**Flow Map Visualization**(흐름 지도 시각화)는 2D **벡터 필드(Vector Field)** $\mathbf{F}(x, y)$를 정적 그리드 기반으로 시각화하는 기법입니다. 화면을 일정한 해상도의 격자로 분할하고, 각 격자 셀의 중심에 작은 **선분(Line Segment)** 을 배치한 후, 그 선분의 **회전 각도(Orientation)** 와 **투명도(Alpha)** 를 벡터 필드(예: Perlin Noise)에 실시간으로 매핑합니다. 이 방식은 공간 전체의 유동적인 장 분포, 에너지 흐름, 힘의 방향을 기하학적이고 추상적인 텍스처로 **정적이면서도 동적으로** 표현하며, 입자 기반 방식보다 계산이 효율적입니다.

### 1. 핵심 수학적 원리
1. **벡터 필드 정의:**
   - 각 점 $(x, y)$에서 벡터 $\mathbf{F}(x, y) = (F_x, F_y)$ 정의
   - 일반적으로 Perlin Noise를 사용: $\mathbf{F}(x, y, t) = (\cos\theta, \sin\theta)$ (여기서 $\theta = \text{PerlinNoise}(x, y, t)$)

2. **격자 분할:**
   - 화면을 가로 $G_x \times$ 세로 $G_y$개 셀로 분할
   - 각 셀 중심: $(c_x, c_y) = (\text{cellIndex}_x \times \text{cellSize}, \text{cellIndex}_y \times \text{cellSize})$

3. **선분의 방향과 속성:**
   - 선분의 방향(각도): $\theta(c_x, c_y, t) = \text{atan2}(F_y, F_x)$
   - 선분 길이: $L = \text{cellSize} \times \text{lineLengthMult}$
   - 선분의 시작점: $(c_x - L\cos\theta/2, c_y - L\sin\theta/2)$
   - 선분의 끝점: $(c_x + L\cos\theta/2, c_y + L\sin\theta/2)$

4. **투명도 애니메이션:**
   - 투명도를 시간에 따라 변화: $\alpha(t) = 128 + 127 \sin(\pi t \times \text{frequency})$
   - 또는 벡터의 크기로 투명도 조정: $\alpha = 255 \times |\mathbf{F}|$

### 2. 주요 특징 및 장점
- **계산 효율성:** 입자 추적이 필요 없으므로 $O(G_x \times G_y)$의 선형 복잡도 (입자 방식은 $O(n \times T)$).
- **시각적 명확성:** 벡터 필드의 전체 구조를 한눈에 파악할 수 있으며, 입자 궤적보다 필드 자체를 이해하기 용이합니다.
- **실시간 애니메이션:** 선분의 회전과 투명도 변화로부터 유동감을 표현하면서도, 입자 없이 가벼운 계산.
- **시각적 추상성:** 기하학적 선분의 집합으로 표현되어, 예술적이고 추상적인 미감을 전달합니다.

### 3. 구현 시 고려 사항
- **해상도 조정:** 격자 해상도가 높을수록 세밀한 필드 표현이지만 계산량 증가; 직관적 균형점은 보통 20~40 정도.
- **선분 길이:** 길수록 방향이 명확하지만 겹침이 많고, 짧으면 필드가 흐릿합니다.
- **노이즈 스케일 및 시간 속도:** 선분의 회전 속도(애니메이션)를 조정하여 시각적 흐름감을 제어합니다.
- **색상 인코딩:** 선분의 색상을 벡터 크기, 각도, 또는 다른 스칼라 필드로 매핑하여 추가 정보를 표현합니다.

### 4. 활용 분야
- **유체 시뮬레이션 시각화:** 바람장, 유동장, 자기장 분포를 시각적으로 표현.
- **Generative Art:** 벡터 필드의 추상적 아름다움, 음악 시각화, 기하학 애니메이션.
- **데이터 시각화:** 기상 데이터(바람 방향/속도), 흐름 분석, 벡터장 분포.
- **UI 애니메이션:** 배경 텍스처로 사용되는 동적 패턴, 인터랙티브 시각효과.
- **교육:** 벡터 필드, 미분, 유체 역학 개념을 직관적으로 이해하는 도구.
    `,
    en: 'Flow Map Visualization is a technique for visualizing 2D vector fields without using particles. It divides the screen into a grid of a set resolution, mapping the rotation angle and transparency of a line segment in each cell to a Perlin Noise field in real time. This static grid-based approach intuitively expresses the distribution of the fluid field and energy flow across the space as a geometric texture.',
  },
  sketch,
  params: [
    { 
      key: 'resolution', 
      label: '그리드 해상도', 
      min: 10, 
      max: 60, 
      step: 2, 
      default: 24, 
      restart: false 
    },
    { 
      key: 'noiseScale', 
      label: '노이즈 스케일', 
      min: 0.005, 
      max: 0.1, 
      step: 0.005, 
      default: 0.02, 
      restart: false 
    },
    { 
      key: 'timeSpeed', 
      label: '시간 흐름 속도', 
      min: 0, 
      max: 0.05, 
      step: 0.001, 
      default: 0.005, 
      restart: false 
    },
    { 
      key: 'lineLengthMult', 
      label: '선 길이 배율', 
      min: 0.2, 
      max: 2.0, 
      step: 0.1, 
      default: 0.8, 
      restart: false 
    },
    { 
      key: 'alphaPulse', 
      label: '투명도 파동 강도', 
      min: 50, 
      max: 255, 
      step: 5, 
      default: 200, 
      restart: false 
    }
  ],
  related: ['Flow Field', 'Perlin / Simplex Noise', 'Cellular Automata'],
}