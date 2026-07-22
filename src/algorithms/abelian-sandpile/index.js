import sketch from './sketch'

export default {
  longDescription: {
    ko: String.raw`
**Abelian Sandpile Model**은 이산적인 격자 위에서 입자의 이동과 축적을 통해 나타나는 자기 조직화된 임계 상태(Self-Organized Criticality)를 시뮬레이션하는 확률적 알고리즘입니다. 입자가 특정 임계치를 넘어서는 순간 주변으로 흩어지는 **토플링**(Toppling) 과정을 통해, 시스템이 평형을 찾아가는 과정에서 나타나는 복잡한 패턴과 프랙탈 구조를 수학적으로 모델링합니다.

### 1. 핵심 수학적 원리
ASM의 역학은 격자 위의 각 노드에 저장된 입자의 수 $z_i$와 인접 노드 간의 연결 상태를 기반으로 정의됩니다.

1. **임계값과 토플링(Toppling) 규칙:** 각 노드에는 최대 수용 가능한 입자 수인 임계값 $z_{max}$가 존재합니다. 만약 특정 노드의 입자 수 $z_i \ge z_{max}$가 되면, 해당 노드는 **불안정 상태**가 되어 입자를 인접한 노드로 분산시킵니다.
2. **상태 전이 방정식:** 2차원 격자에서 노드 $i$가 토플링될 때, 주변의 4개 인접 노드 $j$에 대해 다음과 같은 변화가 일어납니다.
   - $z_i \to z_i - 4$
   - $z_j \to z_j + 1$ (단, $j$가 인접 노드인 경우)
3. **라플라스 연산과의 관계:** 이 과정은 수학적으로 **라플라스 행렬(Laplacian Matrix)** $L$을 이용해 표현할 수 있습니다. 시스템의 상태 벡터를 $z$라고 할 때, 토플링 과정은 $z \leftarrow z - L\mathbf{e}_i$ (여기서 $\mathbf{e}_i$는 $i$번째 노드를 가리키는 단위 벡터)로 나타납니다.

### 2. 주요 특징 및 장점
- **Self-Organized Criticality (SOC):** 외부에서 미세한 입자를 지속적으로 투입하면, 시스템은 스스로 에너지를 소산하며 임계 상태에 도달합니다. 이 상태에서는 아주 작은 입력 하나가 시스템 전체에 거대한 아발란체(Avalanche, 눈사태)를 일으킬 수 있습니다.
- **Abelian Property (아벨 성질):** 모델의 이름이 유래된 핵심 특성입니다. 여러 노드가 동시에 토플링될 수 있는 상황에서, 어떤 순서로 토플링을 수행하더라도 최종적으로 도달하는 안정 상태(Stable State)는 동일합니다. 이는 알고리즘의 결정론적 결과를 보장합니다.
- **Fractal Pattern:** 입자가 쌓이는 과정에서 발생하는 토플링의 궤적은 매우 정교한 프랙탈 구조와 기하학적 패턴을 생성합니다.

### 3. 구현 시 고려 사항
- **Avalanche 처리 로직:** 입자가 추가된 후 임계값을 넘는 노드를 찾아 순차적 또는 병렬적으로 토플링을 수행하는 **Queue(큐)** 기반의 구현이 효율적입니다. 
- **Boundary Conditions (경계 조건):** 입자가 격자 밖으로 나갈 때 시스템에서 완전히 소멸하도록 설정하는 **Open Boundary** 설정이 중요합니다. 경계 조건이 시스템의 전체적인 입자 밀도와 패턴 형성에 결정적인 영향을 미칩니다.
- **Performance Optimization:** 격자 크기가 커질수록 토플링의 연쇄 반응이 급증하므로, 불필요한 전수 조사를 방지하기 위해 변화가 발생한 노드만을 추적하는 방식이 권장됩니다.

### 4. 활용 분야
- **Generative Art:** 입자 투입 위치와 임계값 설정을 조절하여 복잡하고 유기적인 결정 구조나 눈사태 패턴을 생성하는 예술적 도구로 활용됩니다.
- **Complexity Science:** 자연계의 지진, 산사태, 혹은 신경망의 발화 패턴과 같이 임계 상태에서 발생하는 비선형적 현상을 연구하는 물리 모델로 사용됩니다.
- **Statistical Physics:** 통계 역학적 관점에서 입자의 분포와 상전이(Phase Transition) 현상을 시뮬레이션하는 데 기여합니다.    
`,
    en: String.raw`Abelian Sandpile is a self-organized criticality model that tracks the number of grains of sand on each cell of a grid. When a cell exceeds a threshold (typically 4), it distributes one grain to each of its four neighbors, destabilizing them in turn and triggering cascading avalanches. Thanks to its Abelian property — the final state is independent of the toppling order — a single massive pile dropped at the center evolves through thousands of collapses into a strikingly symmetric fractal boundary.`,
  },
  sketch,
  params: [
    { 
      key: 'cellSize', 
      label: '셀 크기 (픽셀)', 
      min: 2, 
      max: 12, 
      step: 1, 
      default: 6, 
      restart: true 
    },
    { 
      key: 'initialGrains', 
      label: '초기 중심 모래량', 
      min: 1000, 
      max: 40000, 
      step: 1000, 
      default: 15000, 
      restart: true 
    },
    { 
      key: 'iterationsPerFrame', 
      label: '프레임당 연산 횟수', 
      min: 1, 
      max: 30, 
      step: 1, 
      default: 2, 
      restart: false 
    },
    { 
      key: 'clickGrains', 
      label: '클릭 시 추가 모래량', 
      min: 1000, 
      max: 30000, 
      step: 1000, 
      default: 10000, 
      restart: false 
    },
  ],
  related: ['Cellular Automata', 'Diffusion-Limited Aggregation', 'IFS & Fractal'],
}