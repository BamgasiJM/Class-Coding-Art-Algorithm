import sketch from "./sketch";

export default {
  longDescription: {
    ko: "Fractal Brownian Motion(fBM)은 여러 옥타브의 Perlin 노이즈를 중첩하여 자연계의 프랙탈적 특성을 모사하는 알고리즘입니다. 각 옥타브마다 주파수는 증가하고 진폭은 감소하며, 이로 인해 큰 규모의 구조 안에 작은 규모의 디테일이 반복되는 자기유사성 패턴이 생성됩니다. 구름, 지형, 불꽃 등 자연의 유기적 형태를 표현하는 데 널리 사용됩니다.",
    en: "Fractal Brownian Motion (fBM) is an algorithm that mimics the fractal characteristics of nature by layering multiple octaves of Perlin noise. Each octave increases in frequency while decreasing in amplitude, creating self-similar patterns where small-scale details repeat within larger structures. It is widely used to express organic forms in nature such as clouds, terrain, and fire.",
  },
  sketch,
  related: [
    "Perlin / Simplex Noise",
    "Curl Noise",
    "Diffusion-Limited Aggregation",
  ],
};
