import sketch from './sketch';
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    {
      key: 'octaves',
      label: '옥타브 개수',
      min: 1,
      max: 6,
      step: 1,
      default: 3,
      restart: false
    },
    {
      key: 'persistence',
      label: '지속성(Persistence)',
      min: 0.1,
      max: 2.0,
      step: 0.1,
      default: 1.5,
      restart: false
    },
    {
      key: 'lacunarity',
      label: '간극(Lacunarity)',
      min: 1.0,
      max: 5.0,
      step: 0.1,
      default: 3.0,
      restart: false
    },
    {
      key: 'noiseScale',
      label: '노이즈 스케일',
      min: 0.005,
      max: 0.05,
      step: 0.005,
      default: 0.01,
      restart: false
    },
    {
      key: 'timeSpeed',
      label: '시간 속도',
      min: 0.001,
      max: 0.05,
      step: 0.001,
      default: 0.015,
      restart: false
    }
  ],
  related: [
    "Perlin / Simplex Noise",
    "Curl Noise",
    "Diffusion-Limited Aggregation",
  ],
};