import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    {
      key: 'agentCount',
      label: '에이전트 수',
      min: 1000,
      max: 10000,
      step: 100,
      default: 4000,
      restart: true
    },
    {
      key: 'sensorAngle',
      label: '센서 각도 (도)',
      min: 10,
      max: 90,
      step: 1,
      default: 35,
      restart: false
    },
    {
      key: 'evaporationRate',
      label: '트레일 감쇠율 (Alpha)',
      min: 1,
      max: 50,
      step: 1,
      default: 8,
      restart: false
    },
  ],
  related: ['Flow Field', 'Boids / Flocking', 'Reaction-Diffusion'],
}
