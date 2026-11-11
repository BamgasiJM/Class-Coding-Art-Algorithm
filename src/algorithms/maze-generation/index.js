import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    {
      key: 'cols',
      label: '격자 분할 수',
      min: 8,
      max: 50,
      step: 2,
      default: 16,
      restart: true,
    },
    {
      key: 'stepsPerFrame',
      label: '생성 속도',
      min: 1,
      max: 50,
      step: 1,
      default: 1,
    },
    {
      key: 'visitedBrightness',
      label: '방문 영역 밝기',
      min: 0,
      max: 40,
      step: 1,
      default: 18,
    },
  ],
  related: ['Space Colonization', 'Cellular Automata', 'Diffusion-Limited Aggregation'],
}
