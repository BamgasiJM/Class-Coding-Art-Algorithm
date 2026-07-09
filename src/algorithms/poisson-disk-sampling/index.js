import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Poisson Disk Sampling은 점들이 서로 최소 간격을 유지하면서도 공간을 균일하게 채우도록 배치하는 알고리즘입니다. Bridson 알고리즘은 활성 목록과 공간 해시 그리드를 사용해 효율적으로 후보 점을 생성하고, 환형 영역(annular ring)에서 무작위 샘플링을 수행합니다. 완전 무작위 분포와 달리 뭉침(clustering)이 없고 격자 분포와 달리 자연스러운 "블루 노이즈" 특성을 가집니다.',
    en: 'Poisson Disk Sampling places points so they maintain a minimum distance from each other while uniformly filling space. The Bridson algorithm uses an active list and spatial hash grid to efficiently generate candidate points via random sampling in an annular ring. Unlike purely random distributions it avoids clustering, and unlike grid distributions it produces natural "blue noise" characteristics.',
  },
  sketch,
  params: [
    { key: 'minDistance', label: '최소 점간 거리', min: 10, max: 60, step: 2, default: 25, unit: 'px', restart: true },
    { key: 'candidateAttempts', label: '후보 생성 시도 횟수', min: 10, max: 50, step: 5, default: 30, restart: true },
    { key: 'iterationsPerFrame', label: '프레임당 처리 점 수', min: 1, max: 20, step: 1, default: 8 },
    { key: 'circleDisplayDuration', label: '배제 영역 표시 시간', min: 50, max: 300, step: 25, default: 150, unit: 'frame' },
    { key: 'restartDelayFrames', label: '재시작 대기 시간', min: 100, max: 400, step: 25, default: 240, unit: 'frame' },
    { key: 'pointRadiusMin', label: '최근 점 최대 크기', min: 4, max: 16, step: 1, default: 8, unit: 'px' },
    { key: 'pointRadiusMax', label: '점 기본 크기', min: 2, max: 8, step: 0.5, default: 4, unit: 'px' },
    { key: 'pointAlphaMin', label: '점 기본 투명도', min: 100, max: 220, step: 10, default: 160 },
    { key: 'pointAlphaMax', label: '최근 점 투명도', min: 200, max: 255, step: 5, default: 255 },
  ],
  related: ['Circle Packing', 'Voronoi Diagram', 'Space Colonization'],
}