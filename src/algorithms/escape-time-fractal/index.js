import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  // 허수부 계수(M)는 만델브로트 집합의 정의(2)를 그대로 쓰기 위해 슬라이더에서 뺐다 (sketch.js 기본값 2.0 사용).
  params: [
    {
      key: 'zoom',
      label: '확대 (Zoom)',
      min: 0.1,
      max: 10.0,
      step: 0.1,
      default: 1.0,
      restart: false
    },
    {
      key: 'baseMaxIter',
      label: '기본 반복 횟수',
      min: 10,
      max: 100,
      step: 5,
      default: 20,
      restart: false
    },
    {
      key: 'panX',
      label: 'X 위치 (Pan X)',
      min: -3.0,
      max: 3.0,
      step: 0.1,
      default: -0.75,
      restart: false
    },
  ],
  related: ['IFS & Fractal', 'Fractal Brownian Motion', 'Cellular Automata'],
}
