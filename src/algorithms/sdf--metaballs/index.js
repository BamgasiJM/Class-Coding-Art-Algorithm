import sketch from "./sketch";

export default {
  longDescription: {
    ko: "SDF(Signed Distance Field) & Metaballs는 거리장을 기반으로 여러 구의 영향력을 합산하여 부드러운 블롭 모양을 형성하는 알고리즘입니다. 각 픽셀의 거리값을 계산하고 누적하면 유기적인 형태의 흐름과 병합 효과가 나타납니다.",
    en: "SDF & Metaballs is an algorithm that forms smooth blob shapes by summing the influence of multiple spheres based on a distance field. By calculating and accumulating distance values for each pixel, organic flowing shapes and merging effects emerge.",
  },
  sketch,
  related: ["Particle System", "Attractor System", "Fractal Brownian Motion"],
};
