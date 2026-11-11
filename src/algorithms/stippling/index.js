import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'numPoints', label: '점 개수', min: 500, max: 5000, step: 100, default: 2000, restart: true },
    { key: 'relaxationStrength', label: '초기 Relaxation 강도', min: 0.3, max: 1.5, step: 0.1, default: 1.0 },
    { key: 'influenceRadius', label: '반발력 반경', min: 10, max: 50, step: 2, default: 22, unit: 'px' },
  ],
  related: ['Voronoi Diagram', 'Poisson Disk Sampling', 'Diffusion-Limited Aggregation'],
}
