import sketch from "./sketch";

export default {
  longDescription: {
    ko: "SDF(Signed Distance Field) & Metaballs는 거리장을 기반으로 여러 구의 영향력을 합산하여 부드러운 블롭 모양을 형성하는 알고리즘입니다. 각 픽셀의 거리값을 계산하고 누적하면 유기적인 형태의 흐름과 병합 효과가 나타납니다.",
    en: "SDF & Metaballs is an algorithm that forms smooth blob shapes by summing the influence of multiple spheres based on a distance field. By calculating and accumulating distance values for each pixel, organic flowing shapes and merging effects emerge.",
  },
  sketch,
  params: [
    { key: 'numBalls', label: '메타볼 개수', min: 2, max: 20, step: 1, default: 6, restart: true },
    { key: 'step', label: '렌더링 해상도', min: 1, max: 8, step: 1, default: 4, unit: 'px', restart: true },
    { key: 'ballRadiusMin', label: '메타볼 최소 반지름', min: 0.04, max: 0.2, step: 0.02, default: 0.08, unit: '배수', restart: true },
    { key: 'ballRadiusMax', label: '메타볼 최대 반지름', min: 0.1, max: 0.3, step: 0.02, default: 0.15, unit: '배수', restart: true },
    { key: 'ballSpeedMin', label: '메타볼 최소 속도', min: -3, max: 0, step: 0.5, default: -1.5, unit: 'px/f', restart: true },
    { key: 'ballSpeedMax', label: '메타볼 최대 속도', min: 0, max: 3, step: 0.5, default: 1.5, unit: 'px/f', restart: true },
    { key: 'sdfThreshold', label: 'SDF 임계값', min: 0.5, max: 2.0, step: 0.1, default: 1.0 },
    { key: 'sdfAlphaMin', label: '알파 최소값', min: 0, max: 100, step: 5, default: 10 },
    { key: 'sdfAlphaMax', label: '알파 최대값', min: 150, max: 255, step: 5, default: 255 },
    { key: 'sdfAlphaRange', label: 'SDF 알파 범위', min: 1.0, max: 5.0, step: 0.5, default: 3.0 },
  ],
  related: ["Particle System", "Attractor System", "Fractal Brownian Motion"],
};
