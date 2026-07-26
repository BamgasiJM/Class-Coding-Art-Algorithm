import sketch from "./sketch";

export default {
  longDescription: {
    en: "IFS (Iterated Function System) & Fractal explores self-similar structures created by applying a set of affine transformations repeatedly. Using a chaos game approach, random functions are picked based on specific probabilities to map points dynamically. This implementation generates the famous Barnsley Fern, visualizing how complex, organic, and lifelike natural geometries emerge from deterministic linear algebraic matrices.",
    ko: String.raw`
**IFS (Iterated Function System) & Fractal**은 일련의 **아핀 변환(Affine Transformation)** 여러 개를 **반복적으로 무작위 선택**하여 적용하는 방식으로 **프랙탈 자기닮음 구조(Self-Similar Fractal Structures)**를 생성하는 강력한 알고리즘입니다. **카오스 게임(Chaos Game)** 방식을 기반으로 하여, 확률에 따라 변환 함수를 무작위로 선택하고 좌표를 반복적으로 변환하면, 결정론적인 선형대수 변환만으로도 극도로 자연스럽고 생명력 있는 기하학적 형태(나뭇잎, 고사리, 나무 등)가 자동으로 생성됩니다.

### 1. 핵심 수학적 원리
1. **아핀 변환(Affine Transformation):**
   - 2D 점 $(x, y)$에 적용하는 변환: $\begin{pmatrix} x' \\ y' \end{pmatrix} = \begin{pmatrix} a & b \\ c & d \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} + \begin{pmatrix} e \\ f \end{pmatrix}$
   - 또는 행렬식: $T(\mathbf{p}) = M \mathbf{p} + \mathbf{t}$ (여기서 $M$는 2×2 변환 행렬, $\mathbf{t}$는 평행 이동 벡터)

2. **IFS 정의:**
   - $N$개의 변환 함수 집합: $\{T_1, T_2, ..., T_N\}$
   - 각 변환 $T_i$에 할당된 확률: $p_i$ (단, $\sum p_i = 1$)

3. **카오스 게임 알고리즘:**
   - 초기 점: $\mathbf{p}_0 = (0, 0)$ (또는 임의의 점)
   - 반복:
     - 확률 $\{p_1, p_2, ..., p_N\}$에 따라 변환 $T_i$ 선택
     - $\mathbf{p}_{n+1} = T_i(\mathbf{p}_n)$ 계산
     - 점 렌더링
   - 충분한 반복(수만 회 이상) 후, **어트랙터(Attractor)** 구조가 시각화됨

4. **자기닮음 성질:**
   - 어트랙터 $A$는 다음을 만족: $A = \bigcup_{i=1}^{N} T_i(A)$
   - 즉, 전체가 각 변환된 부분들의 합집합과 동일 (프랙탈 특성)

5. **바른슬리 고사리(Barnsley Fern)의 변환:**
   - 총 4개의 변환으로 정의됨 (각각 가지, 잎맥, 줄기 등을 표현)
   - 각 변환의 확률은 조심스럽게 설계됨 (예: 0.02, 0.15, 0.13, 0.70)

### 2. 주요 특징 및 장점
- **단순함에서 복잡함으로:** 몇 개의 선형 변환 행렬만으로 정교한 생물 구조를 완벽히 재현합니다.
- **자연 모사:** 바른슬리 고사리는 실제 고사리와 거의 구분되지 않을 정도로 현실적입니다.
- **확률의 마법:** 각 변환의 확률을 미세 조정하면 다양한 식물 형태(나무, 꽃, 산호 등) 생성 가능.
- **계산 효율성:** $O(n)$ 시간에 $n$개 점을 생성하므로 매우 빠릅니다.

### 3. 구현 시 고려 사항
- **확률 설정:** 기본 고사리 이외의 IFS를 설계할 때, 각 변환의 확률을 신중히 선택해야 합니다 (균등하게 하면 원래 대로 돌아옴).
- **초기점의 수렴:** 처음 수십 반복의 결과는 비정상 상태이므로, 렌더링 전에 "버려야" 합니다 (burn-in).
- **색상 인코딩:** 변환 인덱스 또는 반복 횟수에 따라 색상을 할당하여, 각 가지의 계층을 시각화합니다.
- **동적 애니메이션:** 변환 행렬을 시간에 따라 천천히 변화시키면, 고사리가 자라나는 애니메이션 효과를 만듭니다.

### 4. 활용 분야
- **식물 생성:** 게임, 영화의 나무, 고사리, 산호, 꽃 등의 자동 생성.
- **프랙탈 예술:** IFS의 수학적 구조 자체를 시각 예술로 표현.
- **과학 교육:** 선형 변환, 자기닮음, 프랙탈 기하학의 구체적 사례.
- **생물학 모델링:** 식물 발생학(Phytogenesis), 분기 구조의 수학적 이해.
- **절차적 콘텐츠 생성:** 무한한 식물 다양성을 확률 기반으로 자동 생성.
    `,
  },
  sketch,
  params: [
    { 
      key: 'maxPoints', 
      label: '최대 정밀도', 
      min: 10000, 
      max: 100000, 
      step: 5000, 
      default: 40000, 
      restart: true 
    },
    { 
      key: 'pointsPerFrame', 
      label: '그리기 속도', 
      min: 10, 
      max: 1000, 
      step: 10, 
      default: 300 
    },
    { 
      key: 'pointSize', 
      label: '점 크기', 
      min: 0.1, 
      max: 3, 
      step: 0.1, 
      default: 1 
    },
    { 
      key: 'mainShrink', 
      label: '잎 축소 비율', 
      min: 0.5, 
      max: 0.95, 
      step: 0.01, 
      default: 0.85 
    },
    { 
      key: 'branchAngle', 
      label: '가지 휨 정도', 
      min: -0.2, 
      max: 0.2, 
      step: 0.01, 
      default: 0.04 
    },
    { 
      key: 'stemHeight', 
      label: '줄기 높이', 
      min: 0.5, 
      max: 3.0, 
      step: 0.1, 
      default: 1.6 
    },
    { 
      key: 'chaosFactor', 
      label: '무질서도', 
      min: 0, 
      max: 0.5, 
      step: 0.01, 
      default: 0 
    },
  ],
  related: ["Phyllotaxis", "L-System", "Cellular Automata"],
};
