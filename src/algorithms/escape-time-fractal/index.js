import sketch from './sketch'
import descriptionMd from './description.md?raw';
import { parseDescription } from '../parseDescription';

export default {
  longDescription: parseDescription(descriptionMd),
  sketch,
  params: [
    {
      key: 'gridSize',
      label: '그리드 해상도',
      min: 20,
      max: 120,
      step: 2,
      default: 60,
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
      key: 'animSpeed',
      label: '애니메이션 속도',
      min: 0.0,
      max: 1.0,
      step: 0.1,
      default: 0.3,
      restart: false
    },
    {
      key: 'xyMultiplier',
      label: '허수부 계수 (M)',
      min: -5.0,
      max: 5.0,
      step: 0.1,
      default: 2.0,
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
    {
      key: 'panY',
      label: 'Y 위치 (Pan Y)',
      min: -3.0,
      max: 3.0,
      step: 0.1,
      default: 0.0,
      restart: false
    },
    {
      key: 'zoom',
      label: '확대 (Zoom)',
      min: 0.1,
      max: 10.0,
      step: 0.1,
      default: 1.0,
      restart: false
    }
  ],
  related: ['IFS & Fractal', 'Fractal Brownian Motion', 'Cellular Automata'],
}