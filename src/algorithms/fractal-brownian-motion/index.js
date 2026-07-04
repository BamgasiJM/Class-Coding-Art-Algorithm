import sketch from "./sketch";

export default {
  longDescription: {
    en: "Fractal Brownian Motion (fBm) is an algorithmic technique that layers multiple iterations of Perlin noise—known as octaves—at progressively higher frequencies and lower amplitudes. This multi-layered approach creates intricate, self-similar fractal patterns that simulate natural phenomena like terrain, clouds, and turbulent textures. This visualization displays a grid mesh warped by continuous fBm values, showcasing the organic complexity produced by stacking noise layers.",
    ko: "Fractal Brownian Motion (fBm)은 주파수가 점진적으로 높아지고 진폭이 낮아지는 여러 단계의 Perlin 노이즈 레이어(옥타브)를 중첩하는 알고리즘 기법입니다. 이 다층적 접근 방식은 지형, 구름, 난류 텍스처 등 자연계의 자기닮음 변동과 복잡성을 정밀하게 모사합니다. 본 구현체는 fBm 연속성 값에 의해 왜곡되는 격자 메쉬를 표현하여, 노이즈 적층이 만들어내는 유기적인 디테일을 시각화합니다.",
  },
  sketch,
  related: ["Perlin / Simplex Noise", "Flow Field", "Curl Noise"],
};
