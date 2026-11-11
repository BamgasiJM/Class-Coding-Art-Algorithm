import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'numPoints', label: '스티플 점 개수', min: 50, max: 500, step: 25, default: 200, restart: true },
    { key: 'twoOptPasses', label: '경로 최적화 횟수', min: 1, max: 5, step: 1, default: 2, restart: true },
    { key: 'renderSpeed', label: '그리기 속도', min: 30, max: 300, step: 10, default: 120 },
  ],
  related: ['Poisson Disk Sampling', 'Space Colonization', 'Differential Growth'],
}
