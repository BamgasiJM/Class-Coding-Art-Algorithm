import sketch from "./sketch";

export default {
  longDescription: {
    en: "Perlin / Simplex Noise is a gradient noise algorithm used to produce natural, pseudo-random organic textures and structures. Unlike pure random values, it generates smooth transitions between points by interpolating spatial gradients. This implementation visualizes a shifting 3D noise field, mapping the continuous values to dynamic grid patterns and rotational vectors.",
    ko: "Perlin / Simplex Noise는 자연스럽고 유기적인 의사 난수 텍스처와 구조를 생성하는 그래디언트 노이즈 알고리즘입니다. 완전히 독립적인 무작위 값과 달리, 공간적 그래디언트를 보간하여 연속적이고 부드러운 전이를 만들어냅니다. 본 구현체는 시시각각 변화하는 3차원 노이즈 필드를 시각화하며, 연속적인 노이즈 값을 그리드의 밀도와 회전 벡터로 변환하여 보여줍니다.",
  },
  sketch,
  related: ["Flow Field", "Fractal Brownian Motion", "Curl Noise"],
};
