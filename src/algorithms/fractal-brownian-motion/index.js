import sketch from './sketch';

export default {
  longDescription: {
    ko: "Fractal Brownian Motion(fBM)은 여러 옥타브의 Perlin 노이즈를 중첩하여 자연계의 프랙탈적 특성을 모사하는 알고리즘입니다. 각 옥타브마다 주파수는 증가하고 진폭은 감소하며, 이로 인해 큰 규모의 구조 안에 작은 규모의 디테일이 반복되는 자기유사성 패턴이 생성됩니다. 도메인 워핑(Domain Warping) 기법을 결합하여 구름, 지형, 불꽃 등 자연의 유기적 형태를 유동적으로 표현합니다.",
    en: "Fractal Brownian Motion (fBM) is an algorithm that mimics the fractal characteristics of nature by layering multiple octaves of Perlin noise. Each octave increases in frequency while decreasing in amplitude, creating self-similar patterns where small-scale details repeat within larger structures. Combined with domain warping, it is widely used to express organic forms in nature such as clouds, terrain, and fire.",
  },
  sketch,
  params: [
    {
      key: 'octaves',
      label: '옥타브 개수',
      min: 1,
      max: 6,
      step: 1,
      default: 3,
      restart: false
    },
    {
      key: 'persistence',
      label: '지속성(Persistence)',
      min: 0.1,
      max: 2.0,
      step: 0.1,
      default: 1.5,
      restart: false
    },
    {
      key: 'lacunarity',
      label: '간극(Lacunarity)',
      min: 1.0,
      max: 5.0,
      step: 0.1,
      default: 3.0,
      restart: false
    },
    {
      key: 'noiseScale',
      label: '노이즈 스케일',
      min: 0.005,
      max: 0.05,
      step: 0.005,
      default: 0.01,
      restart: false
    },
    {
      key: 'timeSpeed',
      label: '시간 속도',
      min: 0.001,
      max: 0.05,
      step: 0.001,
      default: 0.015,
      restart: false
    }
  ],
  related: [
    "Perlin / Simplex Noise",
    "Curl Noise",
    "Diffusion-Limited Aggregation",
  ],
};