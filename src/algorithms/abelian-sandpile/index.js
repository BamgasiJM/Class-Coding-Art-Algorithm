import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Abelian Sandpile은 격자 각 셀에 쌓인 "모래 알갱이 수"를 관리하는 자기조직화 임계성 모델입니다. 셀이 임계값(보통 4)을 넘으면 상하좌우 이웃에 하나씩 모래를 나누어 주며, 이 과정이 다시 이웃을 불안정하게 만들어 연쇄적인 avalanche를 일으킵니다. 연산 순서에 상관없이 최종 결과가 동일한 "아벨리안" 성질 덕분에, 중앙에서 시작한 거대한 더미는 수천 번의 붕괴 끝에 놀랍도록 대칭적인 프랙탈 경계를 그려냅니다.',
    en: 'Abelian Sandpile is a self-organized criticality model that tracks the number of "grains of sand" on each cell of a grid. When a cell exceeds a threshold (typically 4), it distributes one grain to each of its four neighbors, destabilizing them in turn and triggering cascading avalanches. Thanks to its "Abelian" property — the final state is independent of the toppling order — a single massive pile dropped at the center evolves through thousands of collapses into a strikingly symmetric fractal boundary.',
  },
  sketch,
  related: ['Cellular Automata', 'Diffusion-Limited Aggregation', 'IFS & Fractal'],
}