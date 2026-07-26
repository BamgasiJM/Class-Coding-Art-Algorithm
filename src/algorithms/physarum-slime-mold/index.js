import sketch from './sketch'

export default {
  longDescription: {
    ko: String.raw`
**Physarum Polycephalum**(점균류) 시뮬레이션은 점균류의 **최적화 행동**을 **에이전트 기반 모델**로 구현한 알고리즘입니다. 각 에이전트는 **전방·좌·우 세 방향의 페로몬 농도**를 **센서**로 감지하고, 가장 강한 신호를 따라 이동하며 자신의 궤적을 **트레일**(Trail)로 남깁니다. 트레일은 매 프레임 **확산(Diffusion)** 및 **감쇠(Decay)** 되고, 에이전트들은 서로의 화학 신호에 끌려 자발적으로 **최적 연결망**(Optimal Network)을 형성합니다. 이 현상은 실제 생물학 실험에서 점균류가 미로의 최단 경로를 찾는 현상과 동일한 메커니즘입니다.

### 1. 핵심 수학적 원리
1. **페로몬 필드(Pheromone Field):**
   - 2D 그리드 $P[x, y]$: 각 위치의 페로몬 농도
   - 에이전트 $i$의 위치: $(x_i, y_i)$, 방향: $\theta_i$

2. **센싱(Sensing):**
   - 전방 센서: $(x_i + s\cos\theta_i, y_i + s\sin\theta_i)$ 거리 $s$에서의 농도
   - 좌측 센서: $(x_i + s\cos(\theta_i + \alpha), y_i + s\sin(\theta_i + \alpha))$ (각도 $\alpha$)
   - 우측 센서: $(x_i + s\cos(\theta_i - \alpha), y_i + s\sin(\theta_i - \alpha))$
   - 센싱 값: $C_{\text{forward}}, C_{\text{left}}, C_{\text{right}}$

3. **행동 규칙(Behavior Rules):**
   - 좌우 센서 비교:
     - $C_{\text{left}} > C_{\text{right}}$ → 좌회전: $\theta_i += \Delta\theta$
     - $C_{\text{right}} > C_{\text{left}}$ → 우회전: $\theta_i -= \Delta\theta$
     - $C_{\text{forward}} > \max(C_{\text{left}}, C_{\text{right}})$ → 직진
   - 위치 업데이트: $(x_i, y_i) \leftarrow (x_i + v\cos\theta_i, y_i + v\sin\theta_i)$

4. **페로몬 업데이트:**
   - 에이전트 통과: $P[x_i, y_i] += M$ (감출(deposit) 양)
   - 확산: $P_{\text{new}}[x, y] = D \cdot P_{\text{old}}[x, y] + (1-D) \cdot \bar{P}_{\text{neighbor}}$ (가우시안 블러)
   - 감쇠: $P[x, y] *= (1 - E)$ (감쇠율 $E$)

### 2. 주요 특징 및 장점
- **최소 규칙으로 최대 복잡성:** 개별 에이전트의 단순한 규칙이 전역 최적화를 달성.
- **자기 조직화(Self-Organization):** 중앙 제어 없이 분산된 피드백만으로 효율적 구조 형성.
- **생물학적 정확성:** 실험 데이터와 일치하는 경로 최적화, 자원 배분 전략.
- **창발적 아름다움:** 무작위 에이전트로부터 정교한 네트워크 패턴 출현.

### 3. 구현 시 고려 사항
- **센서 거리 & 각도:** 센서 배치가 네트워크 구조 결정; 일반적으로 거리 5~15px, 각도 30~45도.
- **페로몬 매개변수:** 감출양(M), 감쇠율(E)의 균형이 중요 (너무 강하면 집단 행동 약화, 너무 약하면 신호 실종).
- **에이전트 수:** 적으면 사성 약함, 많으면 계산 오버헤드; 보통 1000~10000.
- **시간 스케일:** 확산과 감쇠 속도를 동일하게 맞춰 안정적 패턴 유지.

### 4. 활용 분야
- **경로 최적화:** 네트워크 설계, 교통 흐름, 배관 시스템.
- **Generative Art:** 유기적 네트워크, 음악 시각화, 추상 생명 형태.
- **로보틱스 & 스웜 인텔리전스:** 무리 로봇의 분산 제어 알고리즘.
- **생물학 교육:** 점균류의 신경망 유사 행동, 진화 최적화 메커니즘.
- **게임 AI:** NPC 무리 행동, 환경 탐색, 식료품점 경로 선택.
    `,
    en: String.raw`
Physarum Polycephalum simulation models the network-forming behavior of slime mold using agent-based principles. Each agent senses pheromone concentration in three directions—forward, left, and right—and steers toward the strongest signal while depositing its own trail. Trails diffuse and decay each frame, and agents collectively self-organize into efficient transport networks through local interactions alone. This emergent behavior reproduces the mechanism verified in biology labs where actual slime mold solves maze optimization and resource allocation problems with remarkable efficiency.
    `,
  },
  sketch,
  params: [
    { 
      key: 'agentCount', 
      label: '에이전트 수', 
      min: 1000, 
      max: 10000, 
      step: 100, 
      default: 4000, 
      restart: true 
    },
    { 
      key: 'sensorAngle', 
      label: '센서 각도 (도)', 
      min: 10, 
      max: 90, 
      step: 1, 
      default: 35, 
      restart: false 
    },
    { 
      key: 'sensorDist', 
      label: '센서 거리', 
      min: 2, 
      max: 30, 
      step: 1, 
      default: 10, 
      restart: false 
    },
    { 
      key: 'turnAngle', 
      label: '회전 각도 (도)', 
      min: 5, 
      max: 90, 
      step: 1, 
      default: 45, 
      restart: false 
    },
    { 
      key: 'evaporationRate', 
      label: '트레일 감쇠율 (Alpha)', 
      min: 1, 
      max: 50, 
      step: 1, 
      default: 8, 
      restart: false 
    },
  ],
  related: ['Flow Field', 'Boids / Flocking', 'Reaction-Diffusion'],
}