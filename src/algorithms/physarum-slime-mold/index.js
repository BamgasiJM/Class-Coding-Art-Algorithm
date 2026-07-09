import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Physarum Polycephalum(황색 점균류)의 네트워크 형성 행동을 에이전트 기반으로 시뮬레이션합니다. 각 에이전트는 전방·좌·우 세 방향의 페로몬 농도를 감지해 가장 강한 방향으로 이동하며 자신의 트레일을 남깁니다. 트레일은 매 프레임 확산·감쇠되고 에이전트들은 서로의 궤적에 이끌려 최적 연결망을 자발적으로 형성합니다. 이 창발적 패턴은 실제 점균류가 미로 최단 경로를 찾는 실험에서 검증된 메커니즘과 동일합니다.',
    en: 'This simulation models the network-forming behavior of Physarum polycephalum using particle agents. Each agent senses pheromone concentration in three directions — forward, left, and right — and steers toward the strongest signal while depositing its own trail. Trails diffuse and decay each frame, and agents collectively self-organize into efficient transport networks. This emergent behavior mirrors the mechanism verified in laboratory experiments where slime mold finds shortest paths through mazes.',
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