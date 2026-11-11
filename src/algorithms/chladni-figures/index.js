import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
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