import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Chladni Figures는 직사각형 플레이트의 2D 진동 고유모드를 시각화하는 알고리즘입니다. 두 주파수 파라미터 n, m에 대한 코사인 함수의 조합으로 정의된 변위 필드에서, 진동의 크기가 0이 되는 선(node line)을 따라 모래가 모이는 Cymatics 현상을 재현합니다. 주파수 파라미터를 변화시키면 대칭적인 기하학 패턴이 실시간으로 변형되며, 고전 물리학과 수학의 우아한 교차점을 보여줍니다.',
    en: 'Chladni Figures visualize the 2D eigenmodes of a vibrating rectangular plate. Within a displacement field defined by a combination of cosines for two frequency parameters n and m, sand accumulates along the node lines — where the vibration amplitude vanishes — reproducing the Cymatics phenomenon. As the frequency parameters change, symmetric geometric patterns morph in real time, revealing an elegant intersection of classical physics and mathematics.',
  },
  sketch,
params: [
    { key: 'cellSize', label: '셀 크기', min: 2, max: 16, step: 1, default: 4, unit: 'px', restart: true },
    { key: 'nBase', label: 'n 기본값', min: 1, max: 8, step: 0.5, default: 3 },
    { key: 'nRange', label: 'n 변동 범위', min: 0.5, max: 5, step: 0.5, default: 2.5 },
    { key: 'mBase', label: 'm 기본값', min: 1, max: 8, step: 0.5, default: 5 },
    { key: 'mRange', label: 'm 변동 범위', min: 0.5, max: 5, step: 0.5, default: 3 },
    { key: 'nSpeed', label: 'n 애니메이션 속도', min: 0.1, max: 2, step: 0.1, default: 0.7 },
    { key: 'mSpeed', label: 'm 애니메이션 속도', min: 0.1, max: 2, step: 0.1, default: 0.53 },
    { key: 'timeSpeed', label: '전체 시간 속도', min: 0.001, max: 0.02, step: 0.001, default: 0.005 },
    { key: 'clarity', label: '노드 라인 명확도', min: 2, max: 15, step: 1, default: 6 },
  ],
  related: ['Trigonometric Wave', 'Harmonograph', 'Perlin / Simplex Noise'],
}