import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    {
      key: 'gridScale',
      label: '격자 크기',
      min: 8,
      max: 40,
      step: 1,
      default: 16,
      unit: 'px',
      restart: true
    },
    {
      key: 'threshold',
      label: '등고선 높이',
      min: 0.1,
      max: 0.9,
      step: 0.01,
      default: 0.5
    },
    {
      key: 'noiseScale',
      label: '노이즈 밀도',
      min: 0.05,
      max: 0.5,
      step: 0.01,
      default: 0.2
    },
  ],
  related: ['Voronoi Diagram', 'Poisson Disk Sampling', 'SDF & Metaballs'],
}
