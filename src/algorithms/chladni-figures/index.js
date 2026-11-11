import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  // 셀 크기, 변동 범위, 애니메이션 속도는 sketch.js의 기본값을 그대로 쓴다.
params: [
    { key: 'nBase', label: 'n 기본값', min: 1, max: 8, step: 0.5, default: 3 },
    { key: 'mBase', label: 'm 기본값', min: 1, max: 8, step: 0.5, default: 5 },
    { key: 'clarity', label: '노드 라인 명확도', min: 2, max: 15, step: 1, default: 6 },
  ],
  related: ['Trigonometric Wave', 'Harmonograph', 'Perlin / Simplex Noise'],
}
