import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    { 
      key: 'cellSize', 
      label: '셀 크기 (픽셀)', 
      min: 2, 
      max: 12, 
      step: 1, 
      default: 6, 
      restart: true 
    },
    { 
      key: 'initialGrains', 
      label: '초기 중심 모래량', 
      min: 1000, 
      max: 40000, 
      step: 1000, 
      default: 15000, 
      restart: true 
    },
    { 
      key: 'iterationsPerFrame', 
      label: '프레임당 연산 횟수', 
      min: 1, 
      max: 30, 
      step: 1, 
      default: 2, 
      restart: false 
    },
    { 
      key: 'clickGrains', 
      label: '클릭 시 추가 모래량', 
      min: 1000, 
      max: 30000, 
      step: 1000, 
      default: 10000, 
      restart: false 
    },
  ],
  related: ['Cellular Automata', 'Diffusion-Limited Aggregation', 'IFS & Fractal'],
}