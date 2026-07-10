import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Random Walk는 매 단계마다 무작위 방향으로 이동하는 점의 궤적을 그리는 확률적 알고리즘입니다. 단순한 4방향 보행 규칙만으로도 브라우니 운동, 산책로, 도시 구조와 같은 자연 경로의 기초 형태가 나타납니다. 여러 워커가 동시에 이동하며 겹쳐지는 궤적은 우연 속 질서를 시각적으로 보여줍니다.',
    en: 'Random Walk is a stochastic algorithm that traces the path of a point moving in a random direction at each step. Even with simple four-directional movement rules, it produces the foundational patterns of natural paths such as Brownian motion, walking trails, and urban structures. Multiple walkers moving simultaneously create overlapping trajectories that reveal order within randomness.',
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