import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    {
      key: 'particleCount',
      label: '파티클 개수',
      min: 50,
      max: 1000,
      step: 10,
      default: 300,
      restart: true
    },
    {
      key: 'capacity',
      label: '노드 수용량',
      min: 1,
      max: 10,
      step: 1,
      default: 4,
      restart: false
    },
    {
      key: 'maxDepth',
      label: '트리 최대 깊이',
      min: 2,
      max: 9,
      step: 1,
      default: 6,
      restart: false
    },
  ],
  related: ['Circle Packing', 'Voronoi Diagram', 'Boids / Flocking'],
}
