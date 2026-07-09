import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Marching Squares는 2D 스칼라 필드에서 임계값(iso-level)을 기준으로 등고선을 추출하는 알고리즘입니다. 격자의 각 셀마다 4개 코너값을 비교해 16가지 경우를 판정하고, 각 경우에 해당하는 선분 패턴을 미리 정의된 테이블에서 찾아 등고선을 구성해요. 이를 통해 온도, 고도, 밀도 같은 스칼라 필드를 효율적으로 가시화할 수 있습니다.',
    en: 'Marching Squares extracts contour lines from a 2D scalar field based on an iso-level threshold. For each grid cell, it compares the four corner values and classifies one of 16 cases, then looks up the corresponding line segment pattern in a lookup table to construct the contour. This enables efficient visualization of scalar fields such as temperature, elevation, or density.',
  },
  sketch,
  params: [
    { 
      key: 'gridScale', 
      label: '격자 크기', 
      min: 8, 
      max: 40, 
      step: 1, 
      default: 16, 
      unit: 'px',
      restart: true 
    },
    { 
      key: 'noiseScale', 
      label: '노이즈 밀도', 
      min: 0.05, 
      max: 0.5, 
      step: 0.01, 
      default: 0.2 
    },
    { 
      key: 'threshold', 
      label: '등고선 높이', 
      min: 0.1, 
      max: 0.9, 
      step: 0.01, 
      default: 0.5 
    },
    { 
      key: 'lineWeight', 
      label: '선 굵기', 
      min: 0.5, 
      max: 5, 
      step: 0.1, 
      default: 1.5 
    },
    { 
      key: 'timeSpeed', 
      label: '변화 속도', 
      min: 0, 
      max: 0.01, 
      step: 0.0001, 
      default: 0.003 
    },
  ],
  related: ['Voronoi Diagram', 'Poisson Disk Sampling', 'SDF & Metaballs'],
}