import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Stippling은 이미지의 명암을 점의 "밀도"만으로 재현하는 예술 기법입니다. 이 스케치는 먼저 프록시 초상화의 밝기 맵을 만들고, 밝기에 반비례하는 확률로 2000개의 점을 초기 배치합니다. 이후 Lloyd relaxation을 공간 해시로 근사해 이웃 점끼리 반발력으로 밀어내며, 밝은 곳은 넓게·어두운 곳은 촘촘하게 간격이 자동 조정됩니다. 점들이 서서히 최적 위치에 정착하며 초상화가 드러나는 과정 자체가 이 알고리즘의 시각적 핵심입니다.',
    en: 'Stippling is an artistic technique that reproduces an image\'s tonal values solely through the density of uniform dots. This sketch first builds a brightness map of a proxy portrait, then seeds 2000 points with probability inversely proportional to brightness. It then approximates Lloyd relaxation via a spatial-hash neighbor repulsion, letting bright regions spread out while shadowed regions pack tightly. Watching the dots gradually settle into their equilibrium positions — and the portrait slowly emerge from their distribution — is the visual core of the algorithm.',
  },
  sketch,
  params: [
    { key: 'numPoints', label: '점 개수', min: 500, max: 5000, step: 100, default: 2000, restart: true },
    { key: 'relaxationStrength', label: '초기 Relaxation 강도', min: 0.3, max: 1.5, step: 0.1, default: 1.0 },
    { key: 'maxRelaxationFrames', label: 'Relaxation 지속 프레임', min: 100, max: 800, step: 50, default: 400, restart: true },
    { key: 'minRelaxationStrength', label: '유지 Relaxation 강도', min: 0, max: 0.5, step: 0.05, default: 0.15 },
    { key: 'pointRadiusMin', label: '점 최소 크기', min: 0.3, max: 2, step: 0.1, default: 0.7, unit: 'px' },
    { key: 'pointRadiusMax', label: '점 최대 크기', min: 1, max: 4, step: 0.1, default: 2.0, unit: 'px' },
    { key: 'cellSize', label: '해시 셀 크기', min: 8, max: 32, step: 2, default: 16, unit: 'px', restart: true },
    { key: 'influenceRadius', label: '반발력 반경', min: 10, max: 50, step: 2, default: 22, unit: 'px' },
  ],
  related: ['Voronoi Diagram', 'Poisson Disk Sampling', 'Diffusion-Limited Aggregation'],
}