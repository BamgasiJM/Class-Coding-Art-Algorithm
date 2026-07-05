import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Random Walk는 매 단계마다 무작위 방향으로 이동하는 점의 궤적을 그리는 확률적 알고리즘입니다. 단순한 4방향 보행 규칙만으로도 브라우니 운동, 산책로, 도시 구조와 같은 자연 경로의 기초 형태가 나타납니다. 여러 워커가 동시에 이동하며 겹쳐지는 궤적은 우연 속 질서를 시각적으로 보여줍니다.',
    en: 'Random Walk is a stochastic algorithm that traces the path of a point moving in a random direction at each step. Even with simple four-directional movement rules, it produces the foundational patterns of natural paths such as Brownian motion, walking trails, and urban structures. Multiple walkers moving simultaneously create overlapping trajectories that reveal order within randomness.',
  },
  sketch,
  related: ['Diffusion-Limited Aggregation', 'Perlin / Simplex Noise', 'Flow Field'],
}