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
    key: 'wallWeight',
    label: '벽 두께',
    min: 0.5,
    max: 4,
    step: 0.1,
    default: 1.5,
  },
  {
    key: 'visitedBrightness',
    label: '방문 영역 밝기',
    min: 0,
    max: 40,
    step: 1,
    default: 18,
  },
  {
    key: 'restartDelay',
    label: '재시작 대기',
    min: 500,
    max: 5000,
    step: 100,
    default: 2500,
    unit: 'ms',
  },
],
  related: ['Space Colonization', 'Cellular Automata', 'Diffusion-Limited Aggregation'],
}