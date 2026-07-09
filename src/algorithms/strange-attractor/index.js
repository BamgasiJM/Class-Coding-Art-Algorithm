import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Strange Attractor는 단순한 2D 반복 맵(sin/cos 조합)을 수천 번 반복하면서 궤적 위의 점들을 축적해 복잡한 카오스 패턴을 시각화해요. De Jong attractor 공식을 사용하면 초기점이 어디든 고정된 "이상한 끌개" 모양으로 수렴하는데, 그 과정에서 매우 세밀하고 우아한 구조가 드러나요. 반복 함수가 간단해도 카오스의 민감성으로 인해 복잡성이 창발되는 현상을 보여줍니다.',
    en: 'Strange Attractor visualizes the chaos that emerges from repeated application of simple 2D formulas combining sine and cosine functions. Using the De Jong attractor, any initial point converges to a fixed "strange" shape, and the trajectory traces reveal intricate fractal-like structures. Although the iteration rule is simple, sensitivity to initial conditions produces intricate complexity — a hallmark of chaotic systems.',
  },
  sketch,
  params: [
      { key: 'numSeeds', label: '초기점 개수', min: 100, max: 400, step: 25, default: 250, restart: true },
      { key: 'iterations', label: '반복 횟수', min: 100, max: 400, step: 25, default: 200, restart: true },
      { key: 'dejongA', label: 'De Jong A', min: -2, max: 2, step: 0.05, default: 1.641, restart: true },
      { key: 'dejongB', label: 'De Jong B', min: -2, max: 2, step: 0.05, default: 1.902, restart: true },
      { key: 'dejongC', label: 'De Jong C', min: -2, max: 2, step: 0.05, default: 0.316, restart: true },
      { key: 'dejongD', label: 'De Jong D', min: -2, max: 2, step: 0.05, default: 1.525, restart: true },
      { key: 'speed', label: '렌더링 속도', min: 5, max: 100, step: 5, default: 30 },
      { key: 'pointSize', label: '점 크기', min: 0.8, max: 5, step: 0.2, default: 2.2, unit: 'px' },
    ],
  related: ['Fractal Brownian Motion', 'Perlin / Simplex Noise', 'Differential Growth'],
}