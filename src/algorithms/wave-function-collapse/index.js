import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'gridSize', label: '그리드 크기', min: 5, max: 40, step: 1, default: 20, restart: true },
    { key: 'restartDelayMs', label: '재시작 대기 시간', min: 500, max: 5000, step: 250, default: 2000, unit: 'ms' },
    { key: 'uncertaintyAlphaMax', label: '미결정 셀 최대 투명도', min: 50, max: 255, step: 10, default: 200 },
    { key: 'uncertaintyAlphaMin', label: '미결정 셀 최소 투명도', min: 5, max: 100, step: 5, default: 30 },
  ],
  related: ['Cellular Automata', 'Truchet Tiles', 'Wang Tiles'],
}