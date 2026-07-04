// 각 알고리즘 폴더의 index.js를 모아 slug → 상세 정보 맵을 구성한다.
// 새 알고리즘을 완성하려면: src/algorithms/<slug>/ 폴더를 만들고
// (index.js + sketch.js), 아래에 한 줄로 등록하면 된다.
import flowField from './flow-field'
import trigonometricWave from './trigonometric-wave'
import easingInterpolation from './easing--interpolation'
import phyllotaxis from './phyllotaxis'
import perlinSimplexNoise from './perlin--simplex-noise'
import fractalBrownianMotion from './fractal-brownian-motion'
import curlNoise from './curl-noise'
import ifsFractal from './ifs--fractal'
import lSystem from './l-system'

export const ALGORITHM_DETAILS = {
  'flow-field': flowField,
  'trigonometric-wave': trigonometricWave,
  'easing--interpolation': easingInterpolation,
  'phyllotaxis': phyllotaxis,
  'perlin--simplex-noise': perlinSimplexNoise,
  'fractal-brownian-motion': fractalBrownianMotion,
  'curl-noise': curlNoise,
  'ifs--fractal': ifsFractal,
  'l-system': lSystem,
}

export function getAlgorithmDetail(slug) {
  return ALGORITHM_DETAILS[slug] || null
}
