// src/algorithms/agent-system/index.js
import sketch from './sketch';
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
    params: [
    { key: 'count', label: '에이전트 수', min: 20, max: 500, step: 10, default: 200, restart: true },
    { key: 'perceptionRadius', label: '인식 반경', min: 10, max: 150, step: 1, default: 50, unit: 'px' },
    { key: 'maxSpeed', label: '최대 속도', min: 0.5, max: 6, step: 0.1, default: 2 },
    { key: 'separationWeight', label: '분리 가중치', min: 0, max: 4, step: 0.1, default: 1.5 },
    { key: 'alignmentWeight', label: '정렬 가중치', min: 0, max: 4, step: 0.1, default: 1.0 },
    { key: 'cohesionWeight', label: '응집 가중치', min: 0, max: 4, step: 0.1, default: 1.2 },
  ],
  related: ['Boids / Flocking', 'Particle System', 'Attractor System'],
};