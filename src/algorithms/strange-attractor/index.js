import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
      { key: 'numSeeds', label: '초기점 개수', min: 100, max: 400, step: 25, default: 250, restart: true },
      { key: 'iterations', label: '반복 횟수', min: 100, max: 400, step: 25, default: 200, restart: true },
      { key: 'dejongA', label: 'De Jong A', min: -2, max: 2, step: 0.05, default: 1.641, restart: true },
      { key: 'dejongB', label: 'De Jong B', min: -2, max: 2, step: 0.05, default: 1.902, restart: true },
      { key: 'dejongC', label: 'De Jong C', min: -2, max: 2, step: 0.05, default: 0.316, restart: true },
      { key: 'dejongD', label: 'De Jong D', min: -2, max: 2, step: 0.05, default: 1.525, restart: true },
      { key: 'speed', label: '렌더링 속도', min: 5, max: 100, step: 5, default: 30 },
      { key: 'pointSize', label: '점 크기', min: 0.8, max: 5, step: 0.2, default: 2.2, unit: 'px' },
    ],
  related: ['Fractal Brownian Motion', 'Perlin / Simplex Noise', 'Differential Growth'],
}