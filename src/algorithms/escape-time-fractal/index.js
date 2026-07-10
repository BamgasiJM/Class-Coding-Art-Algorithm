import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Escape-Time Fractal은 복소평면의 각 점 c에 대해 z = z² + c를 반복적으로 적용하고, 절댓값이 2를 초과하여 발산하는지 관찰합니다. 발산까지 걸린 반복 횟수에 따라 색상을 매핑하면, 만델브로트셋과 같은 무한히 복잡한 자기유사 경계가 나타납니다. 이 알고리즘은 단순한 수식으로부터 놀라운 기하학적 구조를 생성하는 대표적인 예시입니다.',
    en: 'The Escape-Time Fractal algorithm iteratively applies z = z² + c for each point c on the complex plane, observing whether the absolute value exceeds 2 and diverges. Mapping colors based on the number of iterations until divergence reveals infinitely complex self-similar boundaries like the Mandelbrot set. It is a quintessential example of generating astonishing geometric structures from simple formulas.',
  },
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