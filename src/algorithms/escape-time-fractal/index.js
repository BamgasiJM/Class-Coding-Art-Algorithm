import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Escape-Time Fractal은 복소평면의 각 점 c에 대해 z = z² + c를 반복적으로 적용하고, 절댓값이 2를 초과하여 발산하는지 관찰합니다. 발산까지 걸린 반복 횟수에 따라 색상을 매핑하면, 만델브로트셋과 같은 무한히 복잡한 자기유사 경계가 나타납니다. 이 알고리즘은 단순한 수식으로부터 놀라운 기하학적 구조를 생성하는 대표적인 예시입니다.',
    en: 'The Escape-Time Fractal algorithm iteratively applies z = z² + c for each point c on the complex plane, observing whether the absolute value exceeds 2 and diverges. Mapping colors based on the number of iterations until divergence reveals infinitely complex self-similar boundaries like the Mandelbrot set. It is a quintessential example of generating astonishing geometric structures from simple formulas.',
  },
  sketch,
  related: ['IFS & Fractal', 'Fractal Brownian Motion', 'Cellular Automata'],
}