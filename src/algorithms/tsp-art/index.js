import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'numPoints', label: '스티플 점 개수', min: 50, max: 500, step: 25, default: 200, restart: true },
    { key: 'noiseLowScale', label: '저주파 노이즈 스케일', min: 0.001, max: 0.01, step: 0.001, default: 0.004, restart: true },
    { key: 'noiseHighScale', label: '고주파 노이즈 스케일', min: 0.005, max: 0.03, step: 0.001, default: 0.012, restart: true },
    { key: 'noiseLowWeight', label: '저주파 가중치', min: 0, max: 1, step: 0.05, default: 0.65 },
    { key: 'noiseHighWeight', label: '고주파 가중치', min: 0, max: 1, step: 0.05, default: 0.35 },
    { key: 'twoOptPasses', label: '경로 최적화 패스', min: 1, max: 5, step: 1, default: 2, restart: true },
    { key: 'lineAlpha', label: '선 투명도', min: 50, max: 255, step: 10, default: 190 },
    { key: 'dotSize', label: '점 크기', min: 1, max: 8, step: 0.5, default: 3, unit: 'px' },
    { key: 'lineWeight', label: '선 두께', min: 0.5, max: 3, step: 0.1, default: 1.0, unit: 'px' },
    { key: 'renderSpeed', label: '렌더링 속도', min: 30, max: 300, step: 10, default: 120 },
  ],
  related: ['Poisson Disk Sampling', 'Space Colonization', 'Differential Growth'],
}