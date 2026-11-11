import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  // 베이어 행렬 크기는 8×8로 고정한다 (더 작은 크기는 임계값이 고르지 않아 뺐다).
  params: [
    {
      key: 'ditherMode',
      label: '디더링 방식 (0: 베이어, 1: 오차 확산)',
      min: 0,
      max: 1,
      step: 1,
      default: 0,
      restart: false
    },
    {
      key: 'thresholdBias',
      label: '임계점 (Bias)',
      min: 0.1,
      max: 0.9,
      step: 0.01,
      default: 0.5,
      restart: false
    },
    {
      key: 'brightnessBias',
      label: '밝기 보정 (Offset)',
      min: -0.5,
      max: 0.5,
      step: 0.05,
      default: 0.0,
      restart: true
    },
  ],
  related: ['Truchet Tiles', 'Cellular Automata', 'Perlin / Simplex Noise'],
}
