import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
params: [
    { key: 'numPoints', label: '도형 정점 개수', min: 30, max: 300, step: 10, default: 150, restart: true },
    { key: 'baseRadius', label: '기본 반경', min: 0.15, max: 0.45, step: 0.03, default: 0.32, unit: '배수' },
    { key: 'starPoints', label: '별 극의 개수', min: 3, max: 12, step: 1, default: 5, restart: true },
    { key: 'starAmplitude', label: '별의 진폭', min: 0.2, max: 1.0, step: 0.05, default: 0.55, restart: true },
    { key: 'morphSpeed', label: '변형 속도', min: 0.01, max: 0.1, step: 0.005, default: 0.025 },
    { key: 'trailAlpha', label: '잔상 길이', min: 5, max: 80, step: 5, default: 28 },
    { key: 'lineWeight', label: '선 굵기', min: 1, max: 5, step: 0.5, default: 2.5, unit: 'px' },
  ],
  related: ['Easing & Interpolation', 'Trigonometric Wave', 'SDF & Metaballs'],
}