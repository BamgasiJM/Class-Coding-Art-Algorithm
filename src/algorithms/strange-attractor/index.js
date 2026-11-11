import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
      { key: 'dejongA', label: 'De Jong A', min: -2, max: 2, step: 0.05, default: 1.641, restart: true },
      { key: 'dejongB', label: 'De Jong B', min: -2, max: 2, step: 0.05, default: 1.902, restart: true },
      { key: 'dejongC', label: 'De Jong C', min: -2, max: 2, step: 0.05, default: 0.316, restart: true },
      { key: 'dejongD', label: 'De Jong D', min: -2, max: 2, step: 0.05, default: 1.525, restart: true },
    ],
  related: ['Fractal Brownian Motion', 'Perlin / Simplex Noise', 'Differential Growth'],
}
