import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { 
      key: 'numWalkers', 
      label: '워커 개수', 
      min: 1, 
      max: 30, 
      step: 1, 
      default: 6, 
      restart: false 
    },
    { 
      key: 'stepSize', 
      label: '이동 보폭(Speed)', 
      min: 2, 
      max: 40, 
      step: 1, 
      default: 12, 
      restart: false 
    },
    { 
      key: 'maxHistory', 
      label: '최대 꼬리 길이', 
      min: 10, 
      max: 300, 
      step: 10, 
      default: 100, 
      restart: false 
    },
    { 
      key: 'trailAlpha', 
      label: '배경 잔상(Trail)', 
      min: 5, 
      max: 255, 
      step: 5, 
      default: 45, 
      restart: false 
    }
  ],
  related: ['Diffusion-Limited Aggregation', 'Perlin / Simplex Noise', 'Flow Field'],
}