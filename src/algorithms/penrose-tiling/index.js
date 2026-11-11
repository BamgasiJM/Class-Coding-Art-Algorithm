import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { 
      key: 'generations', 
      label: '분할 세대 수', 
      min: 1, 
      max: 4, 
      step: 1, 
      default: 2, 
      restart: true 
    },
    { 
      key: 'initialRadius', 
      label: '초기 반지름 비율', 
      min: 0.2, 
      max: 0.6, 
      step: 0.01, 
      default: 0.35, 
      restart: true 
    },
    { 
      key: 'goldenRatio', 
      label: '황금비 - 1.618', 
      min: 1.4, 
      max: 1.8, 
      step: 0.001, 
      default: 1.618, 
      restart: true 
    },
    { 
      key: 'lineWeight', 
      label: '경계선 굵기', 
      min: 0, 
      max: 3, 
      step: 0.1, 
      default: 0.2 
    },
    { 
      key: 'rotationSpeed', 
      label: '회전 속도', 
      min: -0.02, 
      max: 0.02, 
      step: 0.001, 
      default: 0.001 
    },
  ],
  related: ['IFS & Fractal', 'Truchet Tiles', 'Wang Tiles'],
}