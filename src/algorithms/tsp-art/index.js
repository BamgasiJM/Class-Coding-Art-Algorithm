import sketch from './sketch'

export default {
  longDescription: {
    ko: 'TSP Art는 수많은 스티플 점을 배치하고, 외판원 문제(Traveling Salesman Problem)의 근사 알고리즘으로 단 하나의 연속선이 모든 점을 순서대로 잇는 기법입니다. 최근접 이웃 휴리스틱으로 초기 경로를 생성한 뒤 2-opt 개선으로 교차 구간을 제거해 경로를 단축합니다. 점의 분포 패턴이 이미지를 정의하고, 한 줄의 선이 전체 구성을 완성한다는 점에서 수학적 최적화와 시각 예술이 교차합니다.',
    en: 'TSP Art places stipple points and connects them all with a single continuous line using an approximation of the Traveling Salesman Problem. An initial tour is built with the nearest-neighbor heuristic, then refined by 2-opt to eliminate crossing segments and shorten the total path. The distribution of points defines the image, and the elegance lies in a single line composing the entire composition — where mathematical optimization meets visual art.',
  },
  sketch,
  params: [
    { key: 'numPoints', label: '스티플 점 개수', min: 50, max: 500, step: 25, default: 200, restart: true },
    { key: 'noiseLowScale', label: '저주파 노이즈 스케일', min: 0.001, max: 0.01, step: 0.001, default: 0.004, restart: true },
    { key: 'noiseHighScale', label: '고주파 노이즈 스케일', min: 0.005, max: 0.03, step: 0.001, default: 0.012, restart: true },
    { key: 'noiseLowWeight', label: '저주파 가중치', min: 0, max: 1, step: 0.05, default: 0.65 },
    { key: 'noiseHighWeight', label: '고주파 가중치', min: 0, max: 1, step: 0.05, default: 0.35 },
    { key: 'twoOptPasses', label: '경로 최적화 패스', min: 1, max: 5, step: 1, default: 2, restart: true },
    { key: 'lineAlpha', label: '선 투명도', min: 50, max: 255, step: 10, default: 190 },
    { key: 'dotSize', label: '점 크기', min: 1, max: 8, step: 0.5, default: 3, unit: 'px' },
    { key: 'lineWeight', label: '선 두께', min: 0.5, max: 3, step: 0.1, default: 1.0, unit: 'px' },
    { key: 'renderSpeed', label: '렌더링 속도', min: 30, max: 300, step: 10, default: 120 },
  ],
  related: ['Poisson Disk Sampling', 'Space Colonization', 'Differential Growth'],
}