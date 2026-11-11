import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
params: [
    { key: 'morphSpeed', label: '변형 속도', min: 0.01, max: 0.1, step: 0.005, default: 0.025 },
    { key: 'starPoints', label: '별 극의 개수', min: 3, max: 12, step: 1, default: 5 },
    { key: 'starAmplitude', label: '별의 진폭', min: 0.2, max: 1.0, step: 0.05, default: 0.55 },
  ],
  related: ['Easing & Interpolation', 'Trigonometric Wave', 'SDF & Metaballs'],
}
