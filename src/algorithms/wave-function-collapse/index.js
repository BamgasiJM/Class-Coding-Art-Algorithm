import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'gridSize', label: '그리드 크기', min: 5, max: 40, step: 1, default: 20, restart: true },
    { key: 'restartDelayMs', label: '재시작 대기 시간', min: 500, max: 5000, step: 250, default: 2000, unit: 'ms' },
  ],
  related: ['Cellular Automata', 'Truchet Tiles', 'Wang Tiles'],
}
