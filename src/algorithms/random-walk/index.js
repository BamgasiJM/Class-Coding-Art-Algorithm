import sketch from './sketch'

export default {
  longDescription: {
    ko: String.raw`
**Random Walk(무작위 보행)**는 **확률적 과정(Stochastic Process)**으로서, 시작점에서 매 단계마다 **무작위 방향**으로 일정 거리만큼 이동하는 점의 궤적을 모델링하는 알고리즘입니다. 단순하고 국소적인 운동 규칙만으로도 **브라우니 운동(Brownian Motion)**, **확산(Diffusion)**, **포식자-피식자 추적**, **도시 구조의 거리망** 등 자연계의 우연과 질서가 얽혀있는 현상을 근본적으로 설명합니다. 여러 독립적인 워커들이 동시에 보행할 때, 겹쳐진 궤적들은 개별 무작위성이 모여 **집단 패턴(Collective Pattern)**을 형성하는 창발 현상을 보여줍니다.

### 1. 핵심 수학적 원리
1. **1차원 Random Walk:**
   - 위치: $X_n = X_0 + \sum_{i=1}^{n} \Delta X_i$
   - 각 스텝: $\Delta X_i \in \{-1, +1\}$ (확률 1/2씩)
   - $n$번 스텝 후 예상 거리: $E[|X_n|] = O(\sqrt{n})$ (확산의 제곱근 법칙)

2. **2차원 Random Walk:**
   - 각 스텝마다 4개 방향 중 하나 선택: $(+1,0), (-1,0), (0,+1), (0,-1)$ (또는 8방향)
   - 위치 벡터: $\mathbf{r}_n = \mathbf{r}_0 + \sum_{i=1}^{n} \Delta \mathbf{r}_i$
   - 예상 거리: $E[\|\mathbf{r}_n\|^2] = 2n$ (2차원 격자 상의 상수)

3. **확률 분포:**
   - $n$번 스텝 후, 원점으로부터 거리 $d$에 있을 확률 $P_n(d)$는 **정규분포(Normal Distribution)**에 수렴 (중심극한정리)
   - $P_n(d) \approx \frac{1}{\sqrt{4\pi Dn}} \exp\left(-\frac{d^2}{4Dn}\right)$ (여기서 $D$는 확산 계수)

4. **재귀성(Recurrence):**
   - 1D, 2D Random Walk는 **재귀적(Recurrent)**이므로, 충분히 오래 걸으면 원점으로 돌아올 확률 = 1
   - 3D 이상은 **과도적(Transient)**이므로, 무한히 멀어질 확률 > 0

### 2. 주요 특징 및 장점
- **극도의 단순성:** 국소적 무작위 선택만으로 전역 패턴 창발.
- **물리적 직관성:** 실제 확산, 입자 운동, 물질 이동의 근본 모델.
- **확장 가능성:** 바이어스(선호 방향), 음의 상관(자기 회피), 상호작용 등을 추가하여 복잡한 시스템 모델링.
- **계산 효율성:** 매 단계가 $O(1)$ 연산이므로, 수백만 스텝을 빠르게 계산 가능.

### 3. 구현 시 고려 사항
- **경계 처리:** 캔버스 경계에 도달했을 때 다시 돌아오기, 경계 반사, 또는 주기적 경계(Toroidal) 중 선택.
- **워커 개수와 속도:** 많은 워커는 집단 패턴을 두드러지게 하지만, 계산 오버헤드 증가.
- **스텝 크기 조정:** 작은 스텝은 부드러운 궤적, 큰 스텝은 거친 이동.
- **이력(History) 관리:** 과거 궤적을 모두 렌더링하려면 메모리 사용; 최근 $N$개 스텝만 보관으로 메모리 절감.

### 4. 활용 분야
- **물리 시뮬레이션:** 분자 확산, 열 전달, 입자 운동 모델링.
- **금융 수학:** 주식 가격 변동(Brownian Motion 기반 Black-Scholes), 옵션 가격 결정.
- **생물학:** 동물의 포식 행동(levy flight), 질병 확산 모델.
- **Generative Art:** 유기적 무작위 패턴, 산책로 시각화, 도시 구조 생성.
- **게임 AI:** NPC의 무작위 배회, 포로우 시스템의 수학적 기초.
    `,
    en: String.raw`
Random Walk is a stochastic process in which a point takes steps in random directions at each iteration. Starting from an initial position, the walker traces a path determined only by local randomness. Despite its simplicity, random walks model profound natural phenomena like Brownian motion, diffusion, and animal foraging. Multiple walkers moving simultaneously create overlapping trajectories that visualize how individual randomness emerges into collective patterns — revealing order within apparent chaos.
    `,
  },
  sketch,
  params: [
    { 
      key: 'numWalkers', 
      label: '워커 개수', 
      min: 1, 
      max: 30, 
      step: 1, 
      default: 6, 
      restart: false 
    },
    { 
      key: 'stepSize', 
      label: '이동 보폭(Speed)', 
      min: 2, 
      max: 40, 
      step: 1, 
      default: 12, 
      restart: false 
    },
    { 
      key: 'maxHistory', 
      label: '최대 꼬리 길이', 
      min: 10, 
      max: 300, 
      step: 10, 
      default: 100, 
      restart: false 
    },
    { 
      key: 'trailAlpha', 
      label: '배경 잔상(Trail)', 
      min: 5, 
      max: 255, 
      step: 5, 
      default: 45, 
      restart: false 
    }
  ],
  related: ['Diffusion-Limited Aggregation', 'Perlin / Simplex Noise', 'Flow Field'],
}