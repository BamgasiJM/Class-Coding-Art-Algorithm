import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { key: 'numPoints', label: '점 개수', min: 500, max: 5000, step: 100, default: 2000, restart: true },
    { key: 'relaxationStrength', label: '초기 Relaxation 강도', min: 0.3, max: 1.5, step: 0.1, default: 1.0 },
    { key: 'maxRelaxationFrames', label: 'Relaxation 지속 프레임', min: 100, max: 800, step: 50, default: 400, restart: true },
    { key: 'minRelaxationStrength', label: '유지 Relaxation 강도', min: 0, max: 0.5, step: 0.05, default: 0.15 },
    { key: 'pointRadiusMin', label: '점 최소 크기', min: 0.3, max: 2, step: 0.1, default: 0.7, unit: 'px' },
    { key: 'pointRadiusMax', label: '점 최대 크기', min: 1, max: 4, step: 0.1, default: 2.0, unit: 'px' },
    { key: 'cellSize', label: '해시 셀 크기', min: 8, max: 32, step: 2, default: 16, unit: 'px', restart: true },
    { key: 'influenceRadius', label: '반발력 반경', min: 10, max: 50, step: 2, default: 22, unit: 'px' },
  ],
  related: ['Voronoi Diagram', 'Poisson Disk Sampling', 'Diffusion-Limited Aggregation'],
}