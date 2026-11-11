import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'resolution', label: '그리드 해상도', min: 10, max: 60, step: 2, default: 24, restart: false },
    { key: 'noiseScale', label: '노이즈 스케일', min: 0.005, max: 0.1, step: 0.005, default: 0.02, restart: false },
    { key: 'timeSpeed', label: '시간 흐름 속도', min: 0, max: 0.05, step: 0.001, default: 0.005, restart: false },
  ],
  related: ['Flow Field', 'Perlin / Simplex Noise', 'Cellular Automata'],
}
