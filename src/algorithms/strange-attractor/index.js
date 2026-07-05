import sketch from './sketch'

export default {
  longDescription: {
    ko: 'Strange Attractor는 단순한 2D 반복 맵(sin/cos 조합)을 수천 번 반복하면서 궤적 위의 점들을 축적해 복잡한 카오스 패턴을 시각화해요. De Jong attractor 공식을 사용하면 초기점이 어디든 고정된 "이상한 끌개" 모양으로 수렴하는데, 그 과정에서 매우 세밀하고 우아한 구조가 드러나요. 반복 함수가 간단해도 카오스의 민감성으로 인해 복잡성이 창발되는 현상을 보여줍니다.',
    en: 'Strange Attractor visualizes the chaos that emerges from repeated application of simple 2D formulas combining sine and cosine functions. Using the De Jong attractor, any initial point converges to a fixed "strange" shape, and the trajectory traces reveal intricate fractal-like structures. Although the iteration rule is simple, sensitivity to initial conditions produces intricate complexity — a hallmark of chaotic systems.',
  },
  sketch,
  related: ['Fractal Brownian Motion', 'Perlin / Simplex Noise', 'Differential Growth'],
}