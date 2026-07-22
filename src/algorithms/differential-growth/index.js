import sketch from "./sketch";

export default {
  longDescription: {
    ko: String.raw`
**Differential Growth(차등 성장)**는 뇌산호의 주름, 나뭇잎 가장자리의 구불거림, 꽃 잎사귀의 파형 등 자연계에서 관찰되는 **비균등한 공간 채우기(Non-uniform Space-Filling)** 현상을 수학적으로 모델링하는 알고리즘입니다. 폐곡선 노드 링크 시스템이 **국소 응집력(Local Cohesion)**과 **국소 반발력(Local Separation)** 사이의 균형을 유지하면서, 인접 노드 간 거리가 임계값을 초과하면 자동으로 새 노드를 분열시키는 방식으로 곡선이 유기적으로 성장하고 주름잡히는 과정을 재현합니다. 이로부터 극도로 정교하고 우아한 기하학적 형태가 창발합니다.

### 1. 핵심 수학적 원리
폐곡선은 $N$개의 노드 $\{p_1, p_2, \ldots, p_N\}$의 순환 체인으로 표현됩니다 ($p_N$의 다음은 $p_1$):

1. **응집력(Cohesion):** 이웃 노드들을 함께 유지하려는 힘
   - 노드 $p_i$에 작용하는 응집 가속도: $\mathbf{a}_{coh,i} = k_{coh} \cdot (\mathbf{p}_{i-1} + \mathbf{p}_{i+1} - 2\mathbf{p}_i)$ (라플라시안 평활화)

2. **반발력(Separation):** 이웃 노드들이 너무 가까우면 밀어냄
   - 거리 $d_{ij} = \|\mathbf{p}_i - \mathbf{p}_j\|$이 임계값 $r_{inner}$보다 작으면:
   - $\mathbf{a}_{sep,i} += k_{sep} \cdot \frac{\mathbf{p}_i - \mathbf{p}_j}{d_{ij}}$

3. **분열 조건(Subdivision):** 이웃 노드 간 거리가 임계값 $r_{outer}$를 초과하면
   - 새 노드 $p_{new} = \frac{\mathbf{p}_i + \mathbf{p}_{i+1}}{2}$ 삽입
   - 노드 수 $N$ 증가, 곡선 해상도 향상

4. **속도 및 위치 갱신:**
   - $\mathbf{v}_i \leftarrow \alpha \mathbf{v}_i + (\mathbf{a}_{coh,i} + \mathbf{a}_{sep,i}) \cdot \Delta t$ (감쇠 적용)
   - $\mathbf{p}_i \leftarrow \mathbf{p}_i + \mathbf{v}_i \cdot \Delta t$

### 2. 주요 특징 및 장점
- **자기조직화(Self-Organization):** 명시적인 형태 정의 없이, 물리 기반 규칙만으로 정교한 기하학이 창발하는 경이로움.
- **자연의 다양성 재현:** 산호, 양배추, 뇌의 주름, 버섯 갓 등 매우 다양한 유기 형태를 한 알고리즘으로 표현 가능.
- **공간 채우기의 효율성:** 곡선이 구불거리며 성장함으로써 좁은 공간에 더 긴 경계를 형성하고, 이는 표면적을 극대화하는 자연의 전략을 반영합니다.
- **시각적 주름의 아름다움:** 규칙적이지 않으면서도 조화로운 곡선의 주름이 깊이감과 복잡성을 부여합니다.

### 3. 구현 시 고려 사항
- **노드 관리:** 분열로 인해 노드 수가 증가하므로, 최대 노드 수를 설정하여 메모리 과다 사용을 방지합니다.
- **응집력 vs 반발력의 균형:** 두 힘의 가중치 비율이 최종 형태를 결정합니다. 응집이 강하면 작은 폐곡선, 반발이 강하면 더 퍼진 곡선.
- **경계 제약:** 곡선이 캔버스를 벗어나지 않도록, 또는 특정 영역 내에서만 성장하도록 제약을 추가할 수 있습니다.
- **성능 최적화:** 모든 노드 쌍의 거리를 매번 계산하면 $O(N^2)$이므로, 이웃 노드(일반적으로 $i \pm k$)와의 상호작용만 고려합니다.

### 4. 활용 분야
- **Generative Art & 설치 미술:** 유기적 형태의 추상 예술, 곡선의 시간적 변화를 추적하는 애니메이션.
- **생물학 시뮬레이션:** 엽맥(Leaf Venation), 뇌 주름(Brain Folding), 산호 형태, 곰팡이 성장 패턴 모델링.
- **건축 설계:** 자연-영감적(Bio-inspired) 건축 형태, 곡선 파사드의 기하학적 최적화.
- **게임 월드 생성:** 해안선, 동굴 경계, 유기적 던전 설계의 절차적 생성.
- **직물 & 공예 디자인:** 주름진 패턴, 레이스, 자수 모티프의 자동 생성.
    `,
    en: "Differential Growth simulates the organic expanding patterns found in nature, such as the undulating ripples of brain corals, leaf margins, and petals. It works by managing a closed loop of nodes governed by balancing physical forces: a separation constraint that pushes neighboring nodes apart and a cohesion constraint that maintains structural integrity. As points split and self-subdivide due to distance thresholds, the path naturally buckles and warps into elegant, space-filling curves.",
  },
  sketch,
  params: [
    {
      key: 'maxNodes',
      label: '최대 노드 수',
      min: 100,
      max: 600,
      step: 10,
      default: 300,
      restart: true
    },
    {
      key: 'rInner',
      label: '반발 반경 (Separation)',
      min: 10,
      max: 30,
      step: 1,
      default: 18,
      restart: false
    },
    {
      key: 'rOuter',
      label: '분열 반경 (Subdivision)',
      min: 5,
      max: 20,
      step: 1,
      default: 12,
      restart: false
    },
    {
      key: 'maxForce',
      label: '최대 가속도',
      min: 0.1,
      max: 1.5,
      step: 0.1,
      default: 0.5,
      restart: false
    }
  ],
  related: ["Reaction-Diffusion", "Space Colonization", "Spring & Constraint"],
};