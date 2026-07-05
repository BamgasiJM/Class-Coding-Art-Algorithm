import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Poisson Disk Sampling은 점들이 서로 최소 간격을 유지하면서도 공간을 균일하게 채우도록 배치하는 알고리즘입니다. Bridson 알고리즘은 활성 목록과 공간 해시 그리드를 사용해 효율적으로 후보 점을 생성하고, 환형 영역(annular ring)에서 무작위 샘플링을 수행합니다. 완전 무작위 분포와 달리 뭉침(clustering)이 없고 격자 분포와 달리 자연스러운 "블루 노이즈" 특성을 가집니다.',
    en: 'Poisson Disk Sampling places points so they maintain a minimum distance from each other while uniformly filling space. The Bridson algorithm uses an active list and spatial hash grid to efficiently generate candidate points via random sampling in an annular ring. Unlike purely random distributions it avoids clustering, and unlike grid distributions it produces natural "blue noise" characteristics.',
  },
  sketch,
  related: ['Circle Packing', 'Voronoi Diagram', 'Space Colonization'],
}