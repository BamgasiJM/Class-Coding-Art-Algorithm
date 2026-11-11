import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    {
      key: 'ditherMode',
      label: '디더링 모드 (0:Bayer, 1:FS)',
      min: 0,
      max: 1,
      step: 1,
      default: 0,
      restart: false
    },
    {
      key: 'bayerScale',
      label: 'Bayer 스케일',
      min: 2,
      max: 8,
      step: 1,
      default: 8,
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
      key: 'lumMultiplier',
      label: '휘도 정규화 계수',
      min: 100,
      max: 510,
      step: 10,
      default: 255,
      restart: true
    },
    {
      key: 'brightnessBias',
      label: '밝기 보정 (Offset)',
      min: -0.5,
      max: 0.5,
      step: 0.05,
      default: 0.0,
      restart: false
    }
  ],
  related: ['Truchet Tiles', 'Cellular Automata', 'Perlin / Simplex Noise'],
}