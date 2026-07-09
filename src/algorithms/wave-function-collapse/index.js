import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Wave Function Collapse는 각 격자 셀이 모든 가능한 타일의 슈퍼포지션(중첩 상태)으로 시작하여, 엔트로피가 가장 낮은 셀부터 하나씩 붕괴시키는 제약 충족 알고리즘입니다. 셀이 결정되면 인접 셀의 불가능한 옵션을 전파(propagate)하여 제약을 좁혀갑니다. 이 과정을 반복하면 타일 간 인접 규칙을 완벽히 만족하는 절차적 패턴이 생성되며, 게임 맵이나 픽셀 아트에서 자연스러운 구조를 만들어냅니다.',
    en: 'Wave Function Collapse begins with each grid cell in a superposition of all possible tiles, then iteratively collapses the cell with the lowest entropy while propagating constraints to neighbors. By eliminating incompatible options from adjacent cells, the algorithm converges into a procedural pattern that perfectly respects tile adjacency rules. It is widely used to generate coherent game maps and pixel art from simple local constraints.',
  },
  sketch,
  params: [
    { key: 'gridSize', label: '그리드 크기', min: 5, max: 40, step: 1, default: 20, restart: true },
    { key: 'restartDelayMs', label: '재시작 대기 시간', min: 500, max: 5000, step: 250, default: 2000, unit: 'ms' },
    { key: 'uncertaintyAlphaMax', label: '미결정 셀 최대 투명도', min: 50, max: 255, step: 10, default: 200 },
    { key: 'uncertaintyAlphaMin', label: '미결정 셀 최소 투명도', min: 5, max: 100, step: 5, default: 30 },
  ],
  related: ['Cellular Automata', 'Truchet Tiles', 'Wang Tiles'],
}