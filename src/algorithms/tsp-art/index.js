import sketch from './sketch'

export default {
  longDescription: {
    ko: 'TSP Art는 수많은 스티플 점을 배치하고, 외판원 문제(Traveling Salesman Problem)의 근사 알고리즘으로 단 하나의 연속선이 모든 점을 순서대로 잇는 기법입니다. 최근접 이웃 휴리스틱으로 초기 경로를 생성한 뒤 2-opt 개선으로 교차 구간을 제거해 경로를 단축합니다. 점의 분포 패턴이 이미지를 정의하고, 한 줄의 선이 전체 구성을 완성한다는 점에서 수학적 최적화와 시각 예술이 교차합니다.',
    en: 'TSP Art places stipple points and connects them all with a single continuous line using an approximation of the Traveling Salesman Problem. An initial tour is built with the nearest-neighbor heuristic, then refined by 2-opt to eliminate crossing segments and shorten the total path. The distribution of points defines the image, and the elegance lies in a single line composing the entire composition — where mathematical optimization meets visual art.',
  },
  sketch,
  related: ['Poisson Disk Sampling', 'Space Colonization', 'Differential Growth'],
}