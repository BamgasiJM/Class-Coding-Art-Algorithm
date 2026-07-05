import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Marching Squares는 2D 스칼라 필드에서 임계값(iso-level)을 기준으로 등고선을 추출하는 알고리즘입니다. 격자의 각 셀마다 4개 코너값을 비교해 16가지 경우를 판정하고, 각 경우에 해당하는 선분 패턴을 미리 정의된 테이블에서 찾아 등고선을 구성해요. 이를 통해 온도, 고도, 밀도 같은 스칼라 필드를 효율적으로 가시화할 수 있습니다.',
    en: 'Marching Squares extracts contour lines from a 2D scalar field based on an iso-level threshold. For each grid cell, it compares the four corner values and classifies one of 16 cases, then looks up the corresponding line segment pattern in a lookup table to construct the contour. This enables efficient visualization of scalar fields such as temperature, elevation, or density.',
  },
  sketch,
  related: ['Voronoi Diagram', 'Poisson Disk Sampling', 'SDF & Metaballs'],
}