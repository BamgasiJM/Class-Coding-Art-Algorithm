// src/algorithms/agent-system/index.js
import sketch from './sketch';
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  // 분리·정렬·응집의 가중치는 sketch.js의 기본값(1.5, 1.0, 1.2)을 그대로 쓴다.
  params: [
    { key: 'count', label: '에이전트 수', min: 20, max: 500, step: 10, default: 200, restart: true },
    { key: 'perceptionRadius', label: '인식 반경', min: 10, max: 150, step: 1, default: 50, unit: 'px' },
    { key: 'maxSpeed', label: '최대 속도', min: 0.5, max: 6, step: 0.1, default: 2 },
  ],
  related: ['Boids / Flocking', 'Particle System', 'Attractor System'],
};
