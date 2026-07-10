import sketch from "./sketch";

export default {
  longDescription: {
    en: "Perlin / Simplex Noise is a gradient noise algorithm used to produce natural, pseudo-random organic textures and structures. Unlike pure random values, it generates smooth transitions between points by interpolating spatial gradients. This implementation visualizes a shifting 3D noise field, mapping the continuous values to dynamic grid patterns and rotational vectors.",
    ko: "Perlin / Simplex Noise는 자연스럽고 유기적인 의사 난수 텍스처와 구조를 생성하는 그래디언트 노이즈 알고리즘입니다. 완전히 독립적인 무작위 값과 달리, 공간적 그래디언트를 보간하여 연속적이고 부드러운 전이를 만들어냅니다. 본 구현체는 시시각각 변화하는 3차원 노이즈 필드를 시각화하며, 연속적인 노이즈 값을 그리드의 밀도와 회전 벡터로 변환하여 보여줍니다.",
  },
  sketch,
  params: [
  {
    key: 'cellSize',
    label: '격자 크기',
    min: 8,
    max: 40,
    step: 1,
    default: 18,
    unit: 'px',
    restart: true,
  },
  {
    key: 'noiseScale',
    label: '노이즈 스케일',
    min: 0.01,
    max: 0.2,
    step: 0.005,
    default: 0.08,
  },
  {
    key: 'timeSpeed',
    label: '애니메이션 속도',
    min: 0,
    max: 0.05,
    step: 0.001,
    default: 0.01,
  },
  {
    key: 'threshold',
    label: '강조 임계값',
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.58,
  },
  {
    key: 'radiusMultiplier',
    label: '원 크기',
    min: 0.5,
    max: 2.5,
    step: 0.1,
    default: 1.4,
  },
  {
    key: 'jitter',
    label: '흔들림',
    min: 0,
    max: 10,
    step: 0.5,
    default: 2,
  },
],
  related: ["Flow Field", "Fractal Brownian Motion", "Curl Noise"],
};
